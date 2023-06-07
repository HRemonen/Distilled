import psycopg2
import logging

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from config import JWT_SECRET_KEY

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

CORS(app)

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT EXPIRATION_DELTA"] = 3600 * 60 * 24

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

import routes