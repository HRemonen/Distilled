from sqlalchemy.sql import text

from db import db
from app import app

from database import models

class UserRepository:
    def __init__(self, db=db):
        self._db = db
        with app.app_context():
            self._db.session.execute(text(models.CREATE_USERS))
            self._db.session.commit()
            app.logger.info("Init db")

    def register(self, user):
        user_fields = {
            "username": user["username"],
            "password": user["password"],
            "role": user["role"]
        }
        sql = """
            INSERT INTO users (
                username,
                password,
                role
            )
            VALUES (
                :username,
                :password,
                :role
            )
        """
        
        self._db.session.execute(text(sql), user_fields)
        self._db.session.commit()

user_repository = UserRepository()