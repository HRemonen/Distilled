from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash

from db import db


class UserRepository:
    def __init__(self, db=db):
        self._db = db

    def get_user_role(self, username: str) -> Row:
        """Fetch the user's role from database using the username as query key.

        Args:
            username (str): user's username.

        Returns:
            Row: Returning the found user role.
        """
        user_input = {"username": username}

        sql = """
            SELECT 
                role 
            FROM 
                users 
            WHERE 
                username = :username
        """

        return self._db.session.execute(text(sql), user_input).fetchone()

    def get_user_id(self, username: str) -> Row:
        """Fethes an user id from database using the username as query key.

        Args:
            username (str): user's username.

        Returns:
            Row: Returning the found user id.
        """
        user_input = {"username": username}
        sql = """
            SELECT 
                id 
            FROM 
                users 
            WHERE
                username = :username
        """

        return self._db.session.execute(text(sql), user_input).fetchone()

    def register(self, user: object) -> Row:
        """Inserts new user information into the database.

        Args:
            user (object): User fields.
        """
        password_hash = generate_password_hash(user["password"])

        register_input = {
            "username": user["username"],
            "password": password_hash,
            "role": user.get("role", "user"),
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
                COALESCE(:role, 'user')
            )
            RETURNING *
        """

        result = self._db.session.execute(text(sql), register_input)
        self._db.session.commit()

        return result.fetchone()

    def login(self, user: object) -> Row:
        """Fetches user information from the database on login.

        Args:
            user (object): User login inputs.

        Returns:
            Row: Returning the found user.
        """
        login_input = {
            "username": user["username"],
        }
        sql = """
            SELECT 
                id,
                username,
                password,
                role
            FROM 
                users
            WHERE 
                username = :username
        """

        return self._db.session.execute(text(sql), login_input).fetchone()


user_repository = UserRepository()
