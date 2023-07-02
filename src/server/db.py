from sqlalchemy.sql import text
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

from app import app
from config import DB_NAME, DB_USER, DB_PASSWORD
from database import models

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"postgresql://{DB_USER}:{DB_PASSWORD}@distillery-db:5432/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

with app.app_context():
    db.session.execute(text(models.CREATE_USERS))
    db.session.execute(text(models.CREATE_ENTITIES))
    db.session.execute(text(models.CREATE_DISTILLERIES))
    db.session.execute(text(models.CREATE_WHISKEYS))
    db.session.execute(text(models.CREATE_RATINGS))
    db.session.execute(text(models.CREATE_COMMENTS))
    db.session.execute(
        text(
            """
                INSERT INTO Users (
                    username, password, role
                )
                SELECT 'admin', :password, 'admin'
                WHERE NOT EXISTS (
                    SELECT 1 FROM Users WHERE username = 'admin'
                )
            """
        ),
        {"password": generate_password_hash("admin")},
    )
    db.session.commit()
    app.logger.info("Seeded the database")
