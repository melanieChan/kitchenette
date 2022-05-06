# How the database was initialized

# current directory: recipe-app/server
# pipenv shell
# flask shell

# These lines were typed into the flask shell one by one:

from app import db, User, PantryIngredient, Ingredient

db.create_all() # makes db tables


# Testing out the database:

# User Table:
# create a new object
default_user = User(username='pandas', password='dataframe')

# print out info about the user object
default_user
# user_id will be None because it's not added to db yet

# change data
default_user.username = 'Pandas'

# before adding, user object will not be in db
User.query.all()

# add the User object to db
db.session.add(default_user)

db.session.commit() # run command

# user object will show up after
User.query.all()

# create new user and add
user_keras = User(username='keras', password='tensorflow')
db.session.add(user_keras)
db.session.commit()
User.query.all()

# test out deleting the user
db.session.delete(user_keras)
User.query.all()

# User table should have 1 entry now
