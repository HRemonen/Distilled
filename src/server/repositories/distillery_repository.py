from sqlalchemy.engine.result import Row

from sqlalchemy.sql import text

from db import db

class DistilleryRepository:
    def __init__(self, db=db):
        self._db = db
        
    def get_distillery(self, id: str) -> Row:
        sql = """
            SELECT *
            FROM distilleries
            WHERE distilleries.id=:id
        """
        
        return self._db.session.execute(text(sql), id).fetchone() 
        
    def create_distillery(self, distillery) -> None:
        distillery_input = {
            "name": distillery["name"],
            "location": distillery["location"],
            "country": distillery["contry"],
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