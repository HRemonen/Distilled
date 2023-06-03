from repositories.user_repository import user_repository

class UserService:
    def __init__(self, user_repository=user_repository):
        self._user_repository = user_repository
    
    def login():
        return True
    
user_service = UserService()