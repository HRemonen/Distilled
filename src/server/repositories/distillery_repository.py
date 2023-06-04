from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from db import db
from app import app

class DistilleryRepository:
    def __init__(self, db=db):
        self._db = db
        
    def get_distillery(self, id: int) -> Row:
        distillery_input = {
            "id": id,
        }
        sql = """
            SELECT *
            FROM distilleries
            WHERE id=:id
        """
        
        return self._db.session.execute(text(sql), distillery_input).fetchone() 
        
    def create_distillery(self, distillery) -> None:
        coordinates = distillery["location"]
        
        distillery_input = {
            "name": distillery["name"],
            "location": f"({coordinates[0]}, {coordinates[1]})",
            "country": distillery["country"],
            "year_established": None if not distillery["year_established"] else distillery["year_established"],
            "website": None if not distillery["website"] else distillery["website"],
        }
        sql = """
            INSERT INTO distilleries (
                name,
                location,
                country,
                year_established,
                website
            )
            VALUES (
                :name,
                :location,
                :country,
                :year_established,
                :website
            )
        """

        self._db.session.execute(text(sql), distillery_input)
        self._db.session.commit()
        
distillery_repository = DistilleryRepository()