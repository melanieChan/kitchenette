import os
from flask import Flask, request, url_for, flash, redirect, jsonify
from werkzeug.exceptions import abort

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

# pipenv shell
# export FLASK_ENV=development
# flask run

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'

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

# get a user's pantry items data
@app.route('/pantry/<int:user_id>')
def index(user_id):
    pantry_ingredients = [
        {'name':'bananas', 'quantity': 10},
        {'name':'apples', 'quantity': 5}
        ]
    return jsonify(pantry_ingredients)
