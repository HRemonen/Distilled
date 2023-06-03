from flask_sqlalchemy import SQLAlchemy

from app import app
from config import DB_NAME, DB_USER, DB_PASSWORD

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{DB_USER}:{DB_PASSWORD}@tsoha-db:5432/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)