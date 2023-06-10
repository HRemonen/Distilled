from werkzeug.security import check_password_hash
from werkzeug.exceptions import Unauthorized

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

from validators.user_validators import NewUserSchema
from repositories.user_repository import user_repository

class UserService:
    def __init__(self, user_repository=user_repository):
        self._user_repository = user_repository
        
    def is_admin(self):
        username = get_jwt_identity()
        
        user_role = self._user_repository.get_user_role(username)
        
        return user_role.role == "admin"
    
    def get_user_id(self):
        username = get_jwt_identity()
        
        user_id = self._user_repository.get_user_id(username)
        
        return user_id.id
    
    def register(self, user):
        new_user = NewUserSchema().load(user)
        self._user_repository.register(user)
        
        return new_user

    def login(self, user):
        query_result = self._user_repository.login(user)
        
        found_user = {
            "id": query_result[0],
            "username": query_result[1],
            "password": query_result[2]
        }
        
        if not found_user: return None
        
        if not check_password_hash(found_user["password"], user["password"]):
            raise Unauthorized("Invalid credentials")
        
        access_token = create_access_token(identity=found_user["username"])

        return {
            "user": found_user,
            "token": access_token
        }

            
user_service = UserService()