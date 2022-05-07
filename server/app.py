import os
from flask import Flask, request, url_for, flash, redirect, jsonify
from flask_cors import CORS
from werkzeug.exceptions import abort

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

# pipenv shell
# export FLASK_ENV=development
# flask run

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'
CORS(app)

local_path = os.path.abspath(os.path.dirname(__file__)) # finds project directory

# database
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(local_path, 'database.db')
db = SQLAlchemy(app)

# each User is an object
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    password = db.Column(db.Text)

    def __repr__(self):
        return f'User {self.username}, {self.password} ({self.user_id})'

# an ingredient that a user has in their pantry
class PantryIngredient(db.Model):
    pantry_ingredient_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer) # every user may have multiple entries, each entry represents an ingredient they have
    ingredient_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)

    def __repr__(self):
        return f'PantryIngredient {self.quantity} of {self.ingredient_id} owned by {self.user_id} ({self.pantry_ingredient_id})'

# one ingredient
class Ingredient(db.Model):
    ingredient_id = db.Column(db.Integer, primary_key=True) # its id will be used by other tables when searching for ingredients
    name = db.Column(db.Text)

    def __repr__(self):
        return f'Ingredient {self.name} ({self.ingredient_id})'

# get user data
@app.route('/user/<int:user_id>')
def get_user(user_id):
    user = User.query.filter_by(user_id=user_id).first()

    # convert the format so it can be turned into json easily
    user_formatted = {
        'user_id' : user.user_id,
        'username' : user.username,
    }

    return jsonify(user_formatted)

# to add an ingredient to pantry
@app.route('/add_to_pantry/', methods=["POST"])
def add_item_to_pantry():
    current_user_id = 1 # for now, use one default user account

    # get input and store it as a new ingredient
    user_input_data = request.get_json()
    print(user_input_data)

    # check token
    user_token = user_input_data['token']
    if user_token != 'token123':
        return 'Invalid token', 400

    # get value of user inputs
    ingredientNameInput = user_input_data['name']
    ingredientQuantityInput = user_input_data['quantity']

    # find the ingredient_id if it was already added by any user, otherwise make a new entry in Ingredient table
    ingredient_id = find_or_add_ingredient_db(ingredientNameInput)

    # check if user already has ingredient in their pantry
    exisiting_pantry_item = PantryIngredient.query.filter_by(ingredient_id=ingredient_id, user_id=current_user_id).first()

    # in case user already has ingredient in their pantry, update the value
    if exisiting_pantry_item is None:
        # store new
        new_ingredient = PantryIngredient(user_id=current_user_id,ingredient_id=ingredient_id, quantity=ingredientQuantityInput)
        db.session.add(new_ingredient)
        db.session.commit()

        # let the frontend know that adding pantry item to db was successful
        return user_input_data, 200
    else:
        # update existing
        exisiting_pantry_item.quantity = ingredientQuantityInput
        return user_input_data, 200

    return 'Failed to add to pantry', 400

# will either get the ingredient_id of an ingredient already in db, or create a new entry for the ingredient
def find_or_add_ingredient_db(ingredient_name):
    # find ingredient_id from Ingredient where the ingredient name == input ingredient name
    find_ingredient = Ingredient.query.filter_by(name=ingredient_name).first()

    # if this ingredient hasn't been added to db before, add
    if find_ingredient is None:
        # create a new ingredient object
        new_db_ingredient = Ingredient(name=ingredient_name)
        db.session.add(new_db_ingredient)
        db.session.commit()

        # get id from newly added item
        new_ingredient_added = Ingredient.query.filter_by(name=ingredient_name).first()
        new_db_ingredient_id = new_ingredient_added.ingredient_id
        print(new_db_ingredient_id)
        return new_db_ingredient_id

    else:
        return find_ingredient.ingredient_id

# get a user's pantry items data
@app.route('/pantry/<int:user_id>')
def index(user_id):
    pantry_ingredients = [
        {'name':'bananas', 'quantity': 10},
        {'name':'apples', 'quantity': 5}
        ]
    return jsonify(pantry_ingredients)
