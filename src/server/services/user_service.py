from flask import jsonify

from werkzeug.security import check_password_hash
from werkzeug.exceptions import Unauthorized

from entities.user_entity import NewUserSchema
from repositories.user_repository import user_repository

from app import app

class UserService:
    def __init__(self, user_repository=user_repository):
        self._user_repository = user_repository
    
    def register(self, user):
        new_user = NewUserSchema().load(user)
        self._user_repository.register(user)
        
        return new_user

    def login(self, user):
        query_result = self._user_repository.login(user)
        
        found_user = {
            "username": query_result[1],
            "password": query_result[2]
        }
        
        if not found_user: return None
        
        if not check_password_hash(found_user["password"], user["password"]):
            raise Unauthorized("Invalid credentials")
        return found_user

            
user_service = UserService()