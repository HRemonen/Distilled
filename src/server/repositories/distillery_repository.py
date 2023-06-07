from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from app import app
from db import db
from repositories.entity_repository import entity_repository

class DistilleryRepository:
    def __init__(self, db=db):
        self._db = db
        self._entity_repository = entity_repository
        
    def get_distillery(self, id: str) -> Row:
        distillery_input = {
            "id": id,
        }
        sql = """
            SELECT *
            FROM distilleries
            WHERE id=:id
        """
        
        return self._db.session.execute(text(sql), distillery_input).fetchone()
    
    def get_distilleries(self):
        sql = """
            SELECT *
            FROM distilleries
            ORDER BY distilleries.name ASC
        """
        
        return self._db.session.execute(text(sql)).fetchall()
        
    def create_distillery(self, distillery) -> Row:
        coordinates = distillery["location"]
        
        entity = self._entity_repository.create_entity()
        
        distillery_input = {
            "id": entity[0],
            "name": distillery["name"],
            "location": f"({coordinates[0]}, {coordinates[1]})",
            "country": distillery["country"],
            "year_established": '' if not distillery["year_established"] else distillery["year_established"],
            "website": '' if not distillery["website"] else distillery["website"],
        }
        sql = """
            INSERT INTO distilleries (
                id,
                name,
                location,
                country,
                year_established,
                website
            )
            VALUES (
                :id,
                :name,
                :location,
                :country,
                :year_established,
                :website
            )
            RETURNING *
        """

        result = self._db.session.execute(text(sql), distillery_input)
        self._db.session.commit()
        
        return result.fetchone()
        
distillery_repository = DistilleryRepository()