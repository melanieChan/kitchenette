import os
from flask import Flask, request, url_for, flash, redirect
from werkzeug.exceptions import abort

app = Flask(__name__)

@app.route('/')
def index():
    return 'hi'
