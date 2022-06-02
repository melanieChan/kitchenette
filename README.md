# Kitchenette

A web app made with Python, Flask, SQLAlchemy, and React to manage pantry inventory and find recipes.

[Deployed app](https://kitchenette-app.netlify.app/)

### Prerequisites

-  Node
- Python
    - Pipenv
    - Flask
    - SQLAlchemy


### Setup

In the one terminal window:
- `cd` into the project directory
- `cd app` 
    - `npm i` (if setting up for the first time )
- `npm start`

In another terminal window:
- `cd` into the project directory
- `cd server` 
- `pipenv shell`
- `export FLASK_APP=app`
- `flask run`

### Dataset

A recipe dataset was used to populate the database with recipe and ingredient data. The original dataset had 400,000+ rows and 28 columns. After processing, it has less than 1,000 rows and has 6 columns

#### Dataset Processing

- Sorting the dataset by highest to lowest recipe rating using the `AggregatedRating` column

- Removing unneeded columns

- Populating the app's SQL database with the processed data

### Resources Used
- [Kaggle Dataset Source](https://www.kaggle.com/datasets/irkaal/foodcom-recipes-and-reviews?select=recipes.csv)
- Pandas
- Google Colab
