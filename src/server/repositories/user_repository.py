from sqlalchemy.sql import text

from db import db

class UserRepository:
    def __init__(self, db=db):
        self._db = db

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