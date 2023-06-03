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

    def login(self, username):
        try:
            sql = """SELECT id, username, password, role
                    FROM users
                    WHERE username=:username"""
            return self._db.session.execute(sql,
                                {"username":username}).fetchone()
        except:
            return False

user_repository = UserRepository()