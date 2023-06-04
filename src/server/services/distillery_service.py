from ast import literal_eval

from entities.distillery_entity import NewDistillerySchema
from repositories.distillery_repository import distillery_repository

class DistilleryService:
    def __init__(self, distillery_repository=distillery_repository) -> None:
        self._distillery_repository = distillery_repository
    
    def get_distillery(self, id: int):
        query_result = self._distillery_repository.get_distillery(id)
        
        found_distillery = {
            "id": query_result[0],
            "name": query_result[1],
            "location": literal_eval(query_result[2]),
            "country": query_result[3],
            "year_established": query_result[4],
            "website": query_result[5]
        }
        
        if not found_distillery: return None
        
        return found_distillery
    
    def create_distillery(self, distillery):
        new_distillery = NewDistillerySchema().load(distillery)
        self._distillery_repository.create_distillery(distillery)
        
        return new_distillery
    
distillery_service = DistilleryService()