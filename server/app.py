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

# get a user's pantry items data 
@app.route('/pantry/<int:user_id>')
def index(user_id):
    pantry_ingredients = [
        {'name':'bananas', 'quantity': 10},
        {'name':'apples', 'quantity': 5}
        ]
    return jsonify(pantry_ingredients)
