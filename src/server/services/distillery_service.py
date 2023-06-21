from typing import List, Dict
from sqlalchemy.engine.result import Row
from ast import literal_eval

from validators.distillery_validators import NewDistillerySchema
from validators.distillery_validators import UpdatedDistillerySchema
from repositories.distillery_repository import distillery_repository


class DistilleryService:
    def __init__(self, distillery_repository=distillery_repository) -> None:
        self._distillery_repository = distillery_repository

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
            "location": literal_eval(query_result.location),
            "country": query_result.country,
            "year_established": query_result.year_established,
            "website": query_result.website,
        }

        if hasattr(query_result, "rating_counts"):
            json_object["rating"] = query_result.rating_counts

        if hasattr(query_result, "reviews"):
            json_object["reviews"] = query_result.reviews

        return json_object

    def get_distillery(self, id: str) -> Dict:
        """Service for fetching a distillery by id.

        Args:
            id (str): Entity id.

        Raises:
            Exception: Distillery was not found.

        Returns:
            Dict: JSON object of the found distillery.
        """
        query_result = self._distillery_repository.get_distillery(id)

        if not query_result:
            raise Exception("distillery not found")

        found_distillery = self._to_json(query_result)

        return found_distillery

    def get_distilleries(self) -> List[Dict]:
        """Service for fetching all distilleries.

        Raises:
            Exception: Distilleries was not found.

        Returns:
            List[Dict]: Array of JSON objects of the found distilleries.
        """
        query_result = self._distillery_repository.get_distilleries()

        if not query_result:
            raise Exception("distilleries not found")

        found_distilleries = map(self._to_json, query_result)

        return list(found_distilleries)

    def create_distillery(self, entity_id: str, distillery: dict) -> Dict:
        """Service for creating a new distillery.

        Distillery will have the PK as fk of an entity id.

        Validates the distillery input.

        Args:
            entity_id (str): Entity id.
            distillery (dict): Request body with the needed fields.

        Returns:
            Dict: JSON object of the newly created distillery.
        """
        NewDistillerySchema().load(distillery)

        query_result = self._distillery_repository.create_distillery(
            entity_id, distillery
        )

        new_distillery = self._to_json(query_result)

        return new_distillery

    def update_distillery(self, id: str, updates: dict) -> Dict:
        """Service for updating a distillery information.

        Validates the update input.

        Args:
            id (str): Entity id.
            updates (dict): Request body that contains the updated data fields.

        Returns:
            Dict: JSON object of the updated distillery.
        """
        UpdatedDistillerySchema().load(updates)

        query_result = self._distillery_repository.update_distillery(id, updates)

        updated_distillery = self._to_json(query_result)

        return updated_distillery

    def delete_distillery(self, id: str) -> Dict:
        """Service for deleting a distillery.

        Args:
            id (str): Entity id.

        Returns:
            Dict: JSON object of the deleted distillery.
        """
        query_result = self._distillery_repository.delete_distillery(id)

        deleted_distillery = self._to_json(query_result)

        return deleted_distillery


distillery_service = DistilleryService()
