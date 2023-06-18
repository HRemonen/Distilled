from typing import List, Dict
from uuid import uuid4
from sqlalchemy.engine.result import Row

from repositories.entity_repository import entity_repository
from validators.entity_validators import NewCommentSchema
from validators.entity_validators import NewRatingSchema

from app import app

class EntityService:
    def __init__(self, entity_repository=entity_repository):
        self._entity_repository = entity_repository
        
    def _to_json(self, query_result: Row) -> Dict:
        """Generate JSON format entity for the query result
        that is type of Row from the database

        Args:
            query_result (sqlalchemy.engine.result.Row): SQLAlchemy Row datatype

        Returns:
            json: JSON result from the SQLAlchemy Row
        """
        json_object = {
            "id": query_result.id
        }
            
        return json_object
    
    def _comment_to_json(self, query_result: Row) -> Dict:
        """Generate JSON format entity for the query result
        that is type of Row from the database

        Args:
            query_result (sqlalchemy.engine.result.Row): SQLAlchemy Row datatype

        Returns:
            json: JSON result from the SQLAlchemy Row
        """
        json_object = {
            "id": query_result.id,
            "user_id": query_result.user_id,
            "entity_id": query_result.entity_id,
            "comment": query_result.comment,
        }
            
        return json_object
    
    def _rating_to_json(self, query_result: Row) -> Dict:
        """Generate JSON format entity for the query result
        that is type of Row from the database

        Args:
            query_result (sqlalchemy.engine.result.Row): SQLAlchemy Row datatype

        Returns:
            json: JSON result from the SQLAlchemy Row
        """
        json_object = {
            "id": query_result.id,
            "user_id": query_result.user_id,
            "entity_id": query_result.entity_id,
            "rating": query_result.rating,
        }
            
        return json_object
    
    def _review_to_json(self, query_result: Row) -> Dict:
        """Generate JSON format entity for the query result
        that is type of Row from the database

        Args:
            query_result (sqlalchemy.engine.result.Row): SQLAlchemy Row datatype

        Returns:
            json: JSON result from the SQLAlchemy Row
        """
        json_object = {
            "rating_id": query_result.rating_id,
            "username": query_result.username,
            "rating": query_result.rating,
            "comment": query_result.comment,
            "created_at": query_result.created_at,
        }
            
        return json_object
    
    def create_entity(self) -> Dict:
        """Service for creating an new entity.
        
        Creates the random UUID primary key and calls for the entity repository to insert
        the new entity into database.

        Returns:
            Dict: JSON object of the newly created entity.
        """        
        id = uuid4()
        
        query_result = self._entity_repository.create_entity(id)
        
        new_entity = self._to_json(query_result)
        
        return new_entity
        
    def comment_entity(self, id: str, user_id: str, comment: dict) -> Dict:
        """Service for commenting an entity.
        
        Validates the users input from the request.body object against set validation
        rules for the comment.
        
        Calls for the entity repository to insert the new comment to the database.

        Args:
            id (str): Entity id that is being commented.
            user_id (str): User id that is giving the comment.
            comment (dict): Request body that contains a comment field.

        Returns:
            Dict: JSON object of the newly created comment.
        """        
        NewCommentSchema().load(comment)
        
        query_result = self._entity_repository.comment_entity(id, user_id, comment)
        
        new_comment = self._comment_to_json(query_result)
        
        return new_comment
    
    def rate_entity(self, id: str, user_id: str, rating: dict) -> Dict:
        """Service for rating an entity.

        Validates the users input from the request.body object against set validation
        rules for the rating.
        
        Calls for the entity repository to insert the new rating to the database.
        
        Args:
            id (str): Entity id that is being rated.
            user_id (str): User id that is giving the rating.
            rating (dict): Request body that contains a rating field.

        Returns:
            Dict: JSON object of the newly created rating.
        """        
        NewRatingSchema().load(rating)
        
        query_result = self._entity_repository.rate_entity(id, user_id, rating)
        
        new_rating = self._rating_to_json(query_result)
        
        return new_rating
    
    def get_entity_reviews(self, id: str) -> List[Dict]:
        """Service for getting the reviews of an certain entity.

        Args:
            id (str): Entity id.

        Raises:
            Exception: Reviews not found.

        Returns:
            List[Dict]: List of the review JSON objects. 
        """        
        query_result = self._entity_repository.get_entity_reviews(id)
        
        if not query_result:
            return []
        
        found_reviews = map(self._review_to_json, query_result)
                
        return list(found_reviews)
        
entity_service = EntityService()