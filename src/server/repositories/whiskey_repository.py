from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from app import app
from db import db
from repositories.entity_repository import entity_repository

class WhiskeyRepository:
    def __init__(self, db=db):
        self._db = db
        self._entity_repository = entity_repository
        
    def get_whiskey(self, id: str) -> Row:
        whiskey_input = {
            "id": id
        }
        sql = """
            SELECT 
                w.id,
                w.name,
                w.type,
                w.age,
                w.description,
                d.name,
                d.country
            FROM whiskeys AS w
            LEFT JOIN
                distilleries as d ON w.distillery_id = d.id
            WHERE id = :id AND d.deleted_at IS NULL
            GROUP BY d.name
        """
        
        return self._db.session.execute(text(sql), whiskey_input).fetchone()
    
    def get_whiskeys_by_country_iso(self, country_iso: str):        
        whiskey_input = {
            "country": country_iso
        }
        sql = """
            SELECT *
            FROM whiskeys
            WHERE country = :country
            ORDER BY name ASC
        """
        
        return self._db.session.execute(text(sql), whiskey_input).fetchall()
    
    def get_whiskeys(self):
        sql = """
            SELECT *
            FROM whiskeys
            WHERE deleted_at IS NULL
            ORDER BY name ASC
        """
        
        return self._db.session.execute(text(sql)).fetchall()
    
    def create_whiskey(self, whiskey: dict) -> Row:
        entity = self._entity_repository.create_entity()
        
        whiskey_input = {
            "id": entity.id,
            "name": whiskey["name"],
            "distillery_id": whiskey["distillery_id"],
            "type": whiskey["type"],
            "age": whiskey["age"],
            "description": None if not whiskey["description"] else whiskey["description"],
        }
        sql = """
            INSERT INTO whiskeys (
                id,
                name,
                distillery_id,
                type,
                age,
                description
            )
            VALUES (
                :id,
                :name,
                :distillery_id,
                :type,
                :age,
                :description
            )
            RETURNING *
        """
        
        result = self._db.session.execute(text(sql), whiskey_input)
        self._db.session.commit()
        
        return result.fetchone()
    
    def update_whiskey_description(self, id: str, updates: dict) -> Row:
        update_input = {
            "id": id,
            "description": updates["description"]    
        }
        sql = """
            UPDATE whiskeys
            SET
                description = :description,
                updated_at = CURRENT_TIMESTAMP(0)
            WHERE id = :id AND deleted_at IS NULL
            RETURNING *
        """
        
        result = self._db.session.execute(text(sql), update_input)
        self._db.session.commit()
        
        return result.fetchone()
    
    def delete_whiskey(self, id: str) -> Row:
        delete_input = {
            "id": id,
        }
        sql = """
            UPDATE whiskeys
            SET deleted_at = CURRENT_TIMESTAMP(0)
            WHERE id = :id AND deleted_at IS NULL
            RETURNING *
        """
        
        result = self._db.session.execute(text(sql), delete_input)
        self._db.session.commit()
        
        return result.fetchone()

whiskey_distillery = WhiskeyRepository