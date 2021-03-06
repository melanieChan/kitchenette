import os
from flask import Flask, request, url_for, flash, redirect, jsonify
from flask_cors import CORS
from werkzeug.exceptions import abort
from werkzeug.security import generate_password_hash, check_password_hash

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from flask_utils import get_db_path

# pipenv shell
# export FLASK_ENV=development
# flask run

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'
CORS(app)

local_path = os.path.abspath(os.path.dirname(__file__)) # finds project directory

# database
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + get_db_path()
db = SQLAlchemy(app)

# each User is an object
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    password = db.Column(db.Text)

    def __repr__(self):
        return f'User username={self.username}, password={self.password}, id={self.user_id}'

# an ingredient that a user has in their pantry
class PantryIngredient(db.Model):
    pantry_ingredient_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer) # every user may have multiple entries, each entry represents an ingredient they have
    ingredient_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)

    def __repr__(self):
        return f'PantryIngredient user_id={self.user_id} ingredient_id={self.ingredient_id} quantity={self.quantity}  ({self.pantry_ingredient_id})'

# one ingredient
class Ingredient(db.Model):
    ingredient_id = db.Column(db.Integer, primary_key=True) # its id will be used by other tables when searching for ingredients
    name = db.Column(db.Text)

    def __repr__(self):
        return f'Ingredient ingredient_id={self.ingredient_id} name={self.name}'

# a relationship between an ingredient and a recipe
class RecipeIngredient(db.Model):
    recipe_ingred_id = db.Column(db.Integer, primary_key=True)
    ingredient_id = db.Column(db.Integer) # ingredients can be used in multiple recipes
    recipe_id = db.Column(db.Integer) # recipes can have multiple ingredients

    def __repr__(self):
        return f'RecipeIngredient( ingredient_id={self.ingredient_id} recipe_id={self.recipe_id} ({self.recipe_ingred_id}) )'

class Recipe(db.Model):
    recipe_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    cook_time = db.Column(db.Integer)
    instructions = db.Column(db.Text)
    description = db.Column(db.Text)
    image = db.Column(db.Text)

    def __repr__(self):
        return f'Recipe name={self.name} recipe_id={self.recipe_id}'

class SavedRecipe(db.Model):
    saved_recipe_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer) # user that saved the recipe
    recipe_id = db.Column(db.Integer) # recipe that was saved

    def __repr__(self):
        return f'SavedRecipe user_id={self.user_id} recipe_id={self.recipe_id} ({self.saved_recipe_id})'

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

@app.route('/login/', methods=["POST"])
def login():
    # get inputs
    user_input_data = request.get_json()
    username_input = user_input_data['username']
    password_input = user_input_data['password']

    user = User.query.filter_by(username=username_input).first()

    # check username
    if (user is None):
        return jsonify({'success': False, 'msg': 'There\'s no account with this username'}), 200

    # check if stored password hash matches plaintext password input
    if (check_password_hash(user.password, password_input) == False):
        return jsonify({'success': False, 'msg': 'Wrong password'}), 200

    # convert the format so it can be turned into json easily
    user_formatted = {
        'user_id' : user.user_id,
        'username' : user.username,
    }

    return jsonify({'success': True, 'user': user_formatted}), 200

# adds a new user to the table if the username isn't already taken
@app.route('/register/', methods=["POST"])
def register():
    # get inputs
    user_input_data = request.get_json()
    username_input = user_input_data['username']
    password_input = user_input_data['password']

    user = User.query.filter_by(username=username_input).first()

    # check username
    if (user is not None):
        return jsonify({'success': False, 'msg': 'Username taken'}), 200

    hashed_password = generate_password_hash(password_input) # hashes password using its plaintext
    new_user = User(username=username_input, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': True}), 200


# ideally should check if token is valid and get user_id after the check,
# but for now it'll skip the token check, and just use token as user_id (user_id value is passed from client as argument into token parameter)
def get_user_id_by_token(token):
    try:
        int(token)
        return token
    except:
        return -1

# to add an ingredient to pantry
@app.route('/add_to_pantry/', methods=["POST"])
def add_item_to_pantry():
    # get input and store it as a new ingredient
    user_input_data = request.get_json()
    print(user_input_data)

    # check token
    user_token = user_input_data['token']
    if user_token == 'wrong token':
        return 'Invalid token', 400

    current_user_id = get_user_id_by_token(user_token)

    # get value of user inputs
    ingredientNameInput = user_input_data['name']
    ingredientQuantityInput = user_input_data['quantity']

    # find the ingredient_id if it was already added by any user, otherwise make a new entry in Ingredient table
    ingredient_id = find_or_add_ingredient_db(ingredientNameInput)

    # check if user already has ingredient in their pantry
    exisiting_pantry_item = PantryIngredient.query.filter_by(ingredient_id=ingredient_id, user_id=current_user_id).first()

    new_ingredient_data = {
        'ingredient_id': ingredient_id,
        'name': ingredientNameInput,
        'quantity': ingredientQuantityInput,
    }

    # update PantryIngredient table
    if exisiting_pantry_item is None: # adds new PantryIngredient for the current user
        # store new
        new_ingredient = PantryIngredient(user_id=current_user_id,ingredient_id=ingredient_id, quantity=ingredientQuantityInput)
        db.session.add(new_ingredient)
        db.session.commit()

    else: # in case user already has ingredient in their pantry, update the value
        # update existing
        exisiting_pantry_item.quantity = ingredientQuantityInput
        db.session.commit()

    # let the frontend know that adding pantry item to db was successful
    return jsonify(new_ingredient_data), 200

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

# get all items in pantry
@app.route('/get_pantry_items/', methods=["POST"])
def get_pantry_items():
    # get inputs
    user_input_data = request.get_json()
    user_token = user_input_data['token']

    current_user_id = get_user_id_by_token(user_token)

    all_user_pantry_items = PantryIngredient.query.filter_by(user_id=current_user_id).all()

    # create an object containg data for every ingredient
    pantry_response = map(lambda item : ({
        'ingredient_id': item.ingredient_id,
        'name': get_ingredient_name_by_id(item.ingredient_id),
        'quantity': item.quantity
    }), all_user_pantry_items)

    # format and return data
    pantry_response = list(pantry_response)
    return jsonify(pantry_response)

# searches through Ingredient for ingredient name
def get_ingredient_name_by_id(ingredient_id):
    ingredient = Ingredient.query.filter_by(ingredient_id=ingredient_id).first()

    if (ingredient is None): # in case we can't find ingredient
        return 'none'
    else:
        return ingredient.name

# deletes a PantryIngredient of the current user
@app.route('/delete_pantry_item/', methods=["POST"])
def delete_pantry_item():
    # get input
    user_input_data = request.get_json()
    # check token
    user_token = user_input_data['token']
    if user_token == 'wrong token':
        return 'Invalid token', 400

    current_user_id = get_user_id_by_token(user_token)

    # get value of user inputs
    delete_me_id = user_input_data['ingredient_id']

    # find and delete from db
    ingredient_from_db = PantryIngredient.query.filter_by(user_id=current_user_id, ingredient_id=delete_me_id).first()
    db.session.delete(ingredient_from_db)
    db.session.commit()

    return jsonify({'success': True}), 200

# searches through Ingredient, RecipeIngredient, and Recipe to find recipes given a list of input ingredient search queries
@app.route('/search_by_ingredient_names/', methods=["POST"])
def search_by_ingredient_names():
    # get input
    user_input_data = request.get_json()

    # check token
    user_token = user_input_data['token']
    if user_token == 'wrong token':
        return 'Invalid token', 400

    # get ingredient input
    ingredient_name_queries = user_input_data['ingredients']

    ingredient_ids = []
    # find ingredient_ids that correspond to the ingredient names
    for ingredient_name in ingredient_name_queries:
        idNameRel = Ingredient.query.filter_by(name=ingredient_name).first()
        if idNameRel is not None:
            ingredient_ids.append(idNameRel.ingredient_id)

    # get the recipe_ids to be used to find Recipes
    recipe_ids = []
    for ingredient_id in ingredient_ids:
        recipes_id_of_ingred = list(map(lambda recipeIngredRel: recipeIngredRel.recipe_id, RecipeIngredient.query.filter_by(ingredient_id=ingredient_id).all()))
        recipe_ids.extend(recipes_id_of_ingred)
    recipe_ids = set(recipe_ids) # convert list to set to remove duplicates

    # get recipes using recipe ids
    recipes_result = [ convert_res_to_recipe_obj(Recipe.query.filter_by(recipe_id=recipe_id).first(), get_recipe_ingredients(recipe_id)) for recipe_id in recipe_ids]
    # print(recipes_result)
    return jsonify(recipes_result), 200

# turns a db query response from querying Recipe into an object
def convert_res_to_recipe_obj(queryResponse, ingredients):
    return {
        'recipe_id': queryResponse.recipe_id,
        'name': queryResponse.name,
        'cook_time': queryResponse.cook_time,
        # process instructions string to into list by removing newline characters and string separators
        'instructions': queryResponse.instructions.replace('\n','').split("\", \""),
        'image': queryResponse.image,
        'ingredients': ingredients
    }

# gets a list of ingredient names for a given recipe using the recipe_id
def get_recipe_ingredients(recipe_id):
    # gets all ingredients that are used for the given recipe
    ingredient_ids = db.session.query(RecipeIngredient.ingredient_id).filter_by(recipe_id=recipe_id).all() # list of tuples
    ingredient_ids = [ing[0] for ing in ingredient_ids] # extract ingredient_id value from list of tuples

    # get names of ingredient that corresponds to each ingredient_id
    return [Ingredient.query.filter_by(ingredient_id=ingredient_id).first().name for ingredient_id in ingredient_ids]

# saves a new recipe for a user, given a recipe_id and user_id
@app.route('/save_recipe/', methods=["POST"])
def save_recipe():
    # get input
    user_input_data = request.get_json()

    # check token
    user_token = user_input_data['token']
    if user_token == 'wrong token':
        return 'Invalid token', 400

    current_user_id = get_user_id_by_token(user_token)

    # get ingredient input
    recipe_to_save = user_input_data['recipeData']
    print(recipe_to_save)
    new_saved_recipe_id = recipe_to_save['recipe_id']

    # make sure the user hasn't already saved it
    find_recipe = SavedRecipe.query.filter_by(recipe_id=new_saved_recipe_id, user_id=current_user_id).first()
    if find_recipe is not None:
        print(find_recipe)
        return jsonify({'success': False, 'msg': 'already saved this'}), 200

    # create new object and save
    new_saved_recipe = SavedRecipe(recipe_id=new_saved_recipe_id, user_id=current_user_id)
    db.session.add(new_saved_recipe)
    db.session.commit()

    return jsonify({'success': True, 'recipe_id': new_saved_recipe_id}), 200

@app.route('/get_save_recipes/', methods=["POST"])
def get_save_recipes():
    # get input
    user_input_data = request.get_json()

    # check token
    user_token = user_input_data['token']
    if user_token == 'wrong token':
        return 'Invalid token', 400

    current_user_id = get_user_id_by_token(user_token)

    # find data
    saved_recipes = SavedRecipe.query.filter_by(user_id=current_user_id).all()
    recipe_ids = [ saved_recipe.recipe_id for saved_recipe in saved_recipes]

    # go through each recipe_id, find the recipe object for that recipe_id
    recipes_result = [ convert_res_to_recipe_obj(Recipe.query.filter_by(recipe_id=recipe_id).first(), get_recipe_ingredients(recipe_id)) for recipe_id in recipe_ids]
    return jsonify(recipes_result), 200

@app.route('/update_pantry_item_quantity/', methods=["POST"])
def update_pantry_item_quantity():
    # get input
    user_input_data = request.get_json()

    # check token
    user_token = user_input_data['token']
    if user_token == 'wrong token':
        return 'Invalid token', 400

    current_user_id = get_user_id_by_token(user_token)

    ingredient_data = user_input_data['ingredient_data']
    print(ingredient_data)
    # update database

    #create new quantity variables
    newQuantity = ingredient_data['new_quantity']
    ingredient_id = ingredient_data['ingredient_id']

    ingredient = PantryIngredient.query.filter_by(user_id=current_user_id, ingredient_id=ingredient_id).first()
    ingredient.quantity = newQuantity

    db.session.commit()


    return jsonify({'newQuantity': newQuantity}), 200

# will search through the PantryIngredient table to decrement the quantity of any ingredients used to cook the recipe
# will also add or update the quantity of the recipe product to the user's pantry
@app.route('/cook_recipe/', methods=["POST"])
def cook_recipe():
    user_input_data = request.get_json() # get input

    # check token
    user_token = user_input_data['token']
    if user_token == 'wrong token':
        return 'Invalid token', 400

    current_user_id = get_user_id_by_token(user_token)

    # get input data
    recipe_data = user_input_data['recipe_data']
    ingredient_names = recipe_data['recipe_input']
    recipe_name = recipe_data['recipe_output']

    # find the ingredients in the user's pantry
    for ingredient_name in ingredient_names:
        # used to find the ingredient data needed for search
        ingredient = get_ingredient_by_name(ingredient_name)
        if ingredient is not None:
            # search for ingredient in user's pantry
            ingredient_id = ingredient.ingredient_id
            pantry_ingredient = PantryIngredient.query.filter_by(user_id=current_user_id, ingredient_id=ingredient_id).first()
            # if the user has this ingredient, decrement the quantity
            if pantry_ingredient is not None:
                newQuantity = pantry_ingredient.quantity - 1
                # delete the item if it's used up
                if newQuantity == 0:
                    db.session.delete(pantry_ingredient)

                else: # otherwise, update the value
                    pantry_ingredient.quantity = newQuantity

    # update the user's pantry with this new dish
    cooked_food_id = find_or_add_ingredient_db(recipe_name)
    existing_dish = PantryIngredient.query.filter_by(user_id=current_user_id, ingredient_id=cooked_food_id).first()
    if existing_dish is None:
        # add a new PantryIngredient of this recipe product to the user's pantry
        cooked_recipe = PantryIngredient(user_id=current_user_id, ingredient_id=cooked_food_id, quantity=1)
        db.session.add(cooked_recipe)
    else:
        existing_dish.quantity = existing_dish.quantity + 1

    db.session.commit()
    return jsonify({'success': True}), 200

# finds a row in the Ingredient table that has the given name
def get_ingredient_by_name(ingredient_name):
    ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
    return ingredient


@app.route('/unsave_recipe/', methods=["POST"])
def unsave_recipe():
    user_input_data = request.get_json() # get input

    # check token
    user_token = user_input_data['token']
    if user_token == 'wrong token':
        return 'Invalid token', 400

    current_user_id = get_user_id_by_token(user_token)

    # get input data
    unsave_recipe_id = user_input_data['recipe_id']

    # find and delete the relationship
    unsave_recipe = SavedRecipe.query.filter_by(user_id=current_user_id, recipe_id=unsave_recipe_id).first()
    db.session.delete(unsave_recipe)

    db.session.commit()
    return jsonify({'success': True}), 200
