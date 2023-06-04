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

            
user_service = UserService()