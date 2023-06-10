from sqlalchemy.engine.result import Row
from ast import literal_eval

from werkzeug.exceptions import Unauthorized

from entities.distillery_entity import NewDistillerySchema
from entities.distillery_entity import UpdatedDistillerySchema
from repositories.distillery_repository import distillery_repository
from services.user_service import user_service

class DistilleryService:
    def __init__(self, distillery_repository=distillery_repository) -> None:
        self._distillery_repository = distillery_repository
        
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
            "location": literal_eval(query_result.location),
            "country": query_result.country,
            "year_established": query_result.year_established,
            "website": query_result.website
        }

        if hasattr(query_result, 'avg_rating'):
            json_object["rating"] = query_result.avg_rating
        
        if hasattr(query_result, 'comments'):
            json_object["comments"] = query_result.comments

        return json_object
    
    def get_distillery(self, id: str):
        query_result = self._distillery_repository.get_distillery(id)
        
        if not query_result:
            raise Exception("distillery not found")
        
        found_distillery = self._to_json(query_result)
                
        return found_distillery
    
    def get_distilleries(self):
        query_result = self._distillery_repository.get_distilleries()
        
        if not query_result:
            raise Exception("distilleries not found")
        
        found_distilleries = map(self._to_json, query_result)
                
        return list(found_distilleries)
    
    def create_distillery(self, distillery: dict):
        if not user_service.is_admin(): 
            raise Unauthorized("You don't have permission to create new distilleries")
        
        NewDistillerySchema().load(distillery)
        
        query_result = self._distillery_repository.create_distillery(distillery)
        
        new_distillery = self._to_json(query_result)
        
        return new_distillery
    
    def update_distillery_website(self, id: str, updates: dict):
        if not user_service.is_admin():
            raise Unauthorized("You don't have permission to update distilleries")
        
        UpdatedDistillerySchema().load(updates)
        
        query_result = self._distillery_repository.update_distillery_website(id, updates)
        
        updated_distillery = self._to_json(query_result)
        
        return updated_distillery
    
    def delete_distillery(self, id: str):
        if not user_service.is_admin():
            raise Unauthorized("You don't have permission to delete distilleries")
        
        query_result = self._distillery_repository.delete_distillery(id)
        
        deleted_distillery = self._to_json(query_result)
        
        return deleted_distillery
    
distillery_service = DistilleryService()