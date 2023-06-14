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
            "username": query_result.username,
            "rating": query_result.rating,
            "comment": query_result.comment,
            "created_at": query_result.created_at,
        }
            
        return json_object
    
    def create_entity(self) -> Dict:
        id = uuid4()
        
        query_result = self._entity_repository.create_entity(id)
        
        new_entity = self._to_json(query_result)
        
        return new_entity
        
    def comment_entity(self, id: str, user_id: str, comment: dict) -> Dict:
        NewCommentSchema().load(comment)
        
        query_result = self._entity_repository.comment_entity(id, user_id, comment)
        
        new_comment = self._comment_to_json(query_result)
        
        return new_comment
    
    def rate_entity(self, id: str, user_id: str, rating: dict) -> Dict:
        NewRatingSchema().load(rating)
        
        query_result = self._entity_repository.rate_entity(id, user_id, rating)
        
        new_rating = self._rating_to_json(query_result)
        
        return new_rating
    
    def get_entity_reviews(self, id: str) -> List[Dict]:
        query_result = self._entity_repository.get_entity_reviews(id)
        
        if not query_result:
            raise Exception("reviews not found")
        
        found_reviews = map(self._review_to_json, query_result)
                
        return list(found_reviews)
        
entity_service = EntityService()