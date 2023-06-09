from sqlalchemy.engine.result import Row

from werkzeug.exceptions import Unauthorized

from entities.whiskey_entity import NewWhiskeySchema
from entities.whiskey_entity import UpdatedWhiskeySchema
from repositories.whiskey_repository import whiskey_repository
from services.user_service import user_service

class WhiskeyService:
    def __init__(self, whiskey_repository=whiskey_repository) -> None:
        self._whiskey_repository = whiskey_repository
        
    def _to_json(self, query_result: Row) -> dict:
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
    
    def get_whiskey(self, id: str) -> Row:
        query_result = self._whiskey_repository.get_whiskey(id)
        
        if not query_result: return None
        
        found_whiskey = self._to_json(query_result)
        
        return found_whiskey
    
    def get_whiskeys_by_country_iso(self, country_iso: str):        
        query_result = self._whiskey_repository.get_whiskeys_by_country_iso(country_iso)
        
        if not query_result: return None
        
        found_whiskey = self._to_json(query_result)
        
        return found_whiskey
    
    def get_whiskeys(self):
        query_result = self._whiskey_repository.get_whiskeys()
        
        if not query_result: return None
        
        found_whiskeys = map(self._to_json, query_result)
        
        return list(found_whiskeys)
    
    def create_whiskey(self, whiskey: dict) -> Row:
        if not user_service.is_admin(): 
            raise Unauthorized("You don't have permission to create new whiskeys")
        
        NewWhiskeySchema().load(whiskey)
        
        query_result = self._whiskey_repository.create_whiskey(whiskey)
        
        new_whiskey = self._to_json(query_result)
        
        return new_whiskey
    
    def update_whiskey_description(self, id: str, updates: dict) -> Row:
        if not user_service.is_admin():
            raise Unauthorized("You don't have permission to update whiskeys")
        
        UpdatedWhiskeySchema().load(updates)
        
        query_result = self._whiskey_repository.update_whiskey_description(id, updates)
        
        updated_whiskey = self._to_json(query_result)
        
        return updated_whiskey
    
    def delete_whiskey(self, id: str) -> Row:
        if not user_service.is_admin():
            raise Unauthorized("You don't have permission to delete whiskeys")
        
        query_result = self._whiskey_repository.delete_whiskey(id)
        
        deleted_whiskey = self._to_json(query_result)
        
        return deleted_whiskey
    
whiskey_service = WhiskeyService()