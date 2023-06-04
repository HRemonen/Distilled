from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash

from db import db

class UserRepository:
    def __init__(self, db=db):
        self._db = db

    def register(self, user: object) -> None:
        password_hash = generate_password_hash(user["password"])
        
        register_input = {
            "username": user["username"],
            "password": password_hash,
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
        
        self._db.session.execute(text(sql), register_input)
        self._db.session.commit()
        
    def login(self, user: object) -> Row:
        login_input = {
            "username": user["username"],
        }
        sql = """
            SELECT * 
            FROM users 
            WHERE username=:username
        """
        
        return self._db.session.execute(text(sql), login_input).fetchone() 

user_repository = UserRepository()