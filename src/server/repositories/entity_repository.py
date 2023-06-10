from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from db import db

class EntityRepository:
    def __init__(self, db=db):
        self._db = db
    
    def create_entity(self, id) -> Row:
        entity_input = {
            "id": id
        }
        
        sql = """
            INSERT INTO entities (id) 
            VALUES (:id)
            RETURNING id
        """
        
        result = self._db.session.execute(text(sql), entity_input)
        self._db.session.commit()
        
        return result.fetchone()
    
    def comment_entity(self, id: str, user_id: str, comment: dict) -> Row:
        comment_input = {
            "user_id": user_id,
            "entity_id": id,
            "comment": comment["comment"]
        }
        sql = """
         INSERT INTO comments(
             user_id,
             entity_id,
             comment
         )
        VALUES (
            :user_id,
            :entity_id,
            :comment
        )
        RETURNING *
        """
        
        result = self._db.session.execute(text(sql), comment_input)
        self._db.session.commit()
        
        return result.fetchone()
    
    def rate_entity(self, id: str, user_id: str, rating: dict) -> Row:
        rating_input = {
            "user_id": user_id,
            "entity_id": id,
            "rating": rating["rating"]
        }
        sql = """
         INSERT INTO ratings(
             user_id,
             entity_id,
             rating
         )
        VALUES (
            :user_id,
            :entity_id,
            :rating
        )
        RETURNING *
        """
        
        result = self._db.session.execute(text(sql), rating_input)
        self._db.session.commit()
        
        return result.fetchone()
        
entity_repository = EntityRepository()