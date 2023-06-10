from uuid import uuid4
from sqlalchemy.engine.result import Row

from repositories.entity_repository import entity_repository
from validators.entity_validators import NewCommentSchema
from validators.entity_validators import NewRatingSchema

class EntityService:
    def __init__(self, entity_repository=entity_repository):
        self._entity_repository = entity_repository
        
    def _to_json(self, query_result: Row) -> dict:
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
    
    def _comment_to_json(self, query_result: Row) -> dict:
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
    
    def _rating_to_json(self, query_result: Row) -> dict:
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
    
    def create_entity(self):
        id = uuid4()
        
        query_result = self._entity_repository.create_entity(id)
        
        new_entity = self._to_json(query_result)
        
        return new_entity
        
    def comment_entity(self, id: str, user_id: str, comment: dict) -> dict:
        NewCommentSchema().load(comment)
        
        query_result = self._entity_repository.comment_entity(id, user_id, comment)
        
        new_comment = self._comment_to_json(query_result)
        
        return new_comment
    
    def rate_entity(self, id: str, user_id: str, rating: dict) -> dict:
        NewRatingSchema().load(rating)
        
        query_result = self._entity_repository.rate_entity(id, user_id, rating)
        
        new_rating = self._rating_to_json(query_result)
        
        return new_rating
        
        
entity_service = EntityService()