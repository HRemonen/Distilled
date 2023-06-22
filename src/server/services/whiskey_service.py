from typing import List, Dict
from sqlalchemy.engine.result import Row

from validators.whiskey_validators import NewWhiskeySchema
from validators.whiskey_validators import UpdatedWhiskeySchema
from repositories.whiskey_repository import whiskey_repository

from app import app

class WhiskeyService:
    def __init__(self, whiskey_repository=whiskey_repository) -> None:
        self._whiskey_repository = whiskey_repository
        
    def _to_json(self, query_result: Row) -> Dict:
        """Generate JSON format entity for the query result
        that is type of Row from the database

        Args:
            query_result (sqlalchemy.engine.result.Row): SQLAlchemy Row datatype

        Returns:
            json: JSON result from the SQLAlchemy Row
        """
        json_object = {
            "id": query_result.id,
            "name": query_result.name,
            "distillery_id": query_result.distillery_id,
            "type": query_result.type,
            "age": query_result.age,
            "description": query_result.description
        }
        
        if hasattr(query_result, "distillery_name"):
            json_object["distillery_name"] = query_result.distillery_name
        
        if hasattr(query_result, "distillery_country"):
            json_object["distillery_country"] = query_result.distillery_country
            
        return json_object
    
    def get_whiskey(self, id: str) -> Dict:
        """Service for fetching a whiskey by entity id.

        Args:
            id (str): Entity id.

        Raises:
            Exception: Whiskey was not found.

        Returns:
            Dict: JSON object of the found whiskey.
        """        
        query_result = self._whiskey_repository.get_whiskey(id)
        
        app.logger.info(query_result)
        
        if not query_result:
            raise Exception("whiskey not found")
        
        found_whiskey = self._to_json(query_result)
        
        return found_whiskey
    
    def get_whiskeys_by_distillery(self, distillery_id: str) -> List[Dict]:
        """Service for fetching all whiskeys by a certain distillery.

        Args:
            distillery_id (str): Entity id.

        Raises:
            Exception: Whiskeys was not found.

        Returns:
            List[Dict]: Array of JSON objects of the found whiskeys.
        """             
        query_result = self._whiskey_repository.get_whiskeys_by_distillery(distillery_id)
        
        if not query_result:
            return []
        
        found_whiskeys = map(self._to_json, query_result)
        
        return list(found_whiskeys)
    
    def get_whiskeys(self) -> List[Dict]:
        """Service for fetching all whiskeys.

        Raises:
            Exception: Whiskeys was not found.

        Returns:
            List[Dict]: Array of JSON objects of the found whiskeys.
        """        
        query_result = self._whiskey_repository.get_whiskeys()
        
        if not query_result:
            raise Exception("whiskeys not found")
        
        found_whiskeys = map(self._to_json, query_result)
        
        return list(found_whiskeys)
    
    def create_whiskey(self, entity_id: str, whiskey: dict) -> Dict:
        """Service for creating a new whiskey.
        
        Whiskey will have the PK as fk of an entity id.
        
        Validates the whiskey input.

        Args:
            entity_id (str): Entity id.
            whiskey (dict): Request body with the needed fields.

        Returns:
            Dict: JSON object of the newly created whiskey.
        """        
        NewWhiskeySchema().load(whiskey)
        
        query_result = self._whiskey_repository.create_whiskey(entity_id, whiskey)
        
        new_whiskey = self._to_json(query_result)
        
        return new_whiskey
    
    def update_whiskey(self, id: str, updates: dict) -> Dict:
        """Service for updating the description of a whiskey.
        
        Validates the update input.

        Args:
            id (str): Entity id.
            updates (dict): Request body that contains the description field.

        Returns:
            Dict: JSON object of the updated whiskey.
        """        
        UpdatedWhiskeySchema().load(updates)
        
        query_result = self._whiskey_repository.update_whiskey(id, updates)
        
        updated_whiskey = self._to_json(query_result)
        
        return updated_whiskey
    
    def delete_whiskey(self, id: str) -> Dict:
        """Service for deleting a whiskey

        Args:
            id (str): Entity id.

        Returns:
            Dict: JSON object of the deleted whiskey.
        """        
        query_result = self._whiskey_repository.delete_whiskey(id)
        
        deleted_whiskey = self._to_json(query_result)
        
        return deleted_whiskey
    
whiskey_service = WhiskeyService()