#!/bin/bash

# pip3 install -U Flask-SQLAlchemy
# pip3 install -U flask-cors
# chmod +x dev.sh
# chmod +x start.sh

# run server and react frontend simultaneously
(trap 'kill 0' SIGINT; (cd ../app && npm start) & pipenv run start)

# npx kill-port 3000 5000
