from ast import literal_eval

from werkzeug.exceptions import Unauthorized

from entities.distillery_entity import NewDistillerySchema
from repositories.distillery_repository import distillery_repository
from services.user_service import user_service

from app import app

class DistilleryService:
    def __init__(self, distillery_repository=distillery_repository) -> None:
        self._distillery_repository = distillery_repository
        
    def _to_json(self, query_result):
        """Generate JSON format entity for the query result
        that is type of Row from the database

        Args:
            query_result (sqlalchemy.engine.result.Row): SQLAlchemy Row datatype

        Returns:
            json: JSON result from the SQLAlchemy Row
        """
        return {
            "id": query_result[0],
            "name": query_result[1],
            "location": literal_eval(query_result[2]),
            "country": query_result[3],
            "year_established": query_result[4],
            "website": query_result[5]
        }
    
    def get_distillery(self, id: str):
        query_result = self._distillery_repository.get_distillery(id)
        
        if not query_result: return None
        
        app.logger.info(query_result)
        
        found_distillery = self._to_json(query_result)
                
        return found_distillery
    
    def get_distilleries(self):
        query_result = self._distillery_repository.get_distilleries()
        
        if not query_result: return None
        
        found_distilleries = map(self._to_json, query_result)
                
        return list(found_distilleries)
    
    def create_distillery(self, distillery):
        if not user_service.is_admin(): 
            raise Unauthorized("You don't have permission to create new distilleries")
        
        NewDistillerySchema().load(distillery)
        
        query_result = self._distillery_repository.create_distillery(distillery)
        
        new_distillery = self._to_json(query_result)
        
        return new_distillery
    
distillery_service = DistilleryService()