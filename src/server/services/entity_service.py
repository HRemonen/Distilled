from uuid import uuid4
from sqlalchemy.engine.result import Row

from repositories.entity_repository import entity_repository


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
    
    def create_entity(self):
        id = uuid4()
        
        query_result = self._entity_repository.create_entity(id)
        
        new_entity = self._to_json(query_result)
        
        return new_entity
        
    def comment_entity(self, id: str, user_id: str, comment: dict) -> dict:
        query_result = self._entity_repository.comment_entity(id, user_id, comment)
        
        new_comment = self._to_json(query_result)
        
        return new_comment
        
        
entity_service = EntityService()