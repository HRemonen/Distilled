from typing import Dict
from werkzeug.security import check_password_hash
from werkzeug.exceptions import Unauthorized

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

from validators.user_validators import NewUserSchema
from repositories.user_repository import user_repository

class UserService:
    def __init__(self, user_repository=user_repository):
        self._user_repository = user_repository
        
    def is_admin(self) -> bool:
        """Service for checking if the authenticated user is admin.
        
        Uses the JWT session to fetch the authenticated user from the authorization headers.

        Returns:
            bool: is the user admin or not.
        """        
        username = get_jwt_identity()
        
        user_role = self._user_repository.get_user_role(username)
        
        return user_role.role == "admin"
    
    def get_user_id(self) -> str:
        """Service for getting the authenticated user id.
        
        Uses the JWT session to fetch the authenticated user from the authorization headers.

        Returns:
            str: user id.
        """        
        username = get_jwt_identity()
        
        user_id = self._user_repository.get_user_id(username)
        
        return user_id.id
    
    def register(self, user: Dict) -> Dict:
        """Service for registering a new user.

        Validates the user input.
        
        Args:
            user (Dict): User model fields.

        Returns:
            Dict: Returning the newly created user object.
        """        
        new_user = NewUserSchema().load(user)
        self._user_repository.register(user)
        
        return new_user

    def login(self, user: Dict) -> Dict:
        """Service for logging in a user.
        
        Creates a JWT session token for the user that is returned.

        Args:
            user (Dict): _description_

        Raises:
            Unauthorized: _description_

        Returns:
            Dict: JSON of the user and the JWT token.
        """        
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