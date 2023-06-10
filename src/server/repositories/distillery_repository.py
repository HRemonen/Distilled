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
            SELECT 
                d.id,
                d.name,
                d.location,
                d.country,
                d.year_established,
                d.website,
                r.avg_rating,
                ARRAY_AGG(c.comment) AS comments
            FROM 
                distilleries AS d
            LEFT JOIN (
                SELECT
                    entity_id,
                    AVG(rating) AS avg_rating
                FROM
                    ratings
                GROUP BY
                    entity_id
            ) AS r ON d.id = r.entity_id
            LEFT JOIN 
                comments AS c ON d.id = c.entity_id
            WHERE d.id = :id AND d.deleted_at IS NULL
            GROUP BY
                d.id, r.avg_rating
        """
        
        return self._db.session.execute(text(sql), distillery_input).fetchone()
    
    def get_distilleries(self):
        sql = """
            SELECT *
            FROM distilleries
            WHERE deleted_at IS NULL
            ORDER BY name ASC
        """
        
        return self._db.session.execute(text(sql)).fetchall()
        
    def create_distillery(self, distillery: dict) -> Row:
        coordinates = distillery["location"]
        
        entity = self._entity_repository.create_entity()
        
        distillery_input = {
            "id": entity.id,
            "name": distillery["name"],
            "location": f"({coordinates[0]}, {coordinates[1]})",
            "country": distillery["country"],
            "year_established": None if not distillery["year_established"] else distillery["year_established"],
            "website": None if not distillery["website"] else distillery["website"],
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
    
    def update_distillery_website(self, id: str, updates: dict) -> Row:
        update_input = {
            "id": id,
            "website": updates["website"]
        }
        sql = """
            UPDATE distilleries
            SET 
                website = :website,
                updated_at = CURRENT_TIMESTAMP(0)
            WHERE id = :id AND deleted_at IS NULL
            RETURNING *
        """
        
        result = self._db.session.execute(text(sql), update_input)
        self._db.session.commit()
        
        return result.fetchone()
    
    def delete_distillery(self, id: str) -> Row:  
        delete_input = {
            "id": id,
        }
        sql = """
            UPDATE distilleries
            SET deleted_at = CURRENT_TIMESTAMP(0)
            WHERE id = :id AND deleted_at IS NULL
            RETURNING *
        """
        
        result = self._db.session.execute(text(sql), delete_input)
        self._db.session.commit()
        
        return result.fetchone()
        
        
distillery_repository = DistilleryRepository()