from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from uuid import uuid4

from db import db

class EntityRepository:
    def __init__(self, db=db):
        self._db = db
    
    def create_entity(self) -> Row:
        id = uuid4()
        
        sql = """
            INSERT INTO entities (id) 
            VALUES (:id)
            RETURNING id
        """
        
        result = self._db.session.execute(text(sql), { "id": id })
        self._db.session.commit()
        
        return result.fetchone()
        
entity_repository = EntityRepository()