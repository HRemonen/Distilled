from sqlalchemy.engine.result import Row
from ast import literal_eval

from werkzeug.exceptions import Unauthorized

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