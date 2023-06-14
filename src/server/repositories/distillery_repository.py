from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from db import db

class DistilleryRepository:
    def __init__(self, db=db):
        self._db = db
        
    def get_distillery(self, id: str) -> Row:
        """Fetches a certain distillery from the database by given entity ID.

        Args:
            id (str): Entity id.

        Returns:
            Row: Returning the found distillery object.
        """        
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
                (
                    SELECT 
                        JSONB_OBJECT_AGG (rating, count) 
                    FROM (
                        SELECT 
                            rating,
                            COUNT(*) as count
                        FROM 
                            ratings 
                        WHERE 
                            entity_id = d.id
                        GROUP BY 
                            rating
                    ) AS subquery
                ) AS rating_counts
            FROM 
                distilleries AS d
            WHERE 
                d.id = :id AND d.deleted_at IS NULL
            GROUP BY
                d.id
        """
        
        return self._db.session.execute(text(sql), distillery_input).fetchone()
    
    def get_distilleries(self):
        """Fetches all distilleries from the database.

        Returns:
            _type_: Returning the found distillery objects.
        """        
        sql = """
            SELECT *
            FROM distilleries
            WHERE deleted_at IS NULL
            ORDER BY name ASC
        """
        
        return self._db.session.execute(text(sql)).fetchall()
        
    def create_distillery(self, entity_id: str, distillery: dict) -> Row:
        """Inserts into the database a new distillery for a given entity ID.

        Args:
            entity_id (str): Entity ID.
            distillery (dict): Distillery input values.

        Returns:
            Row: Returning the newly created distillery object.
        """        
        coordinates = distillery["location"]
        
        distillery_input = {
            "id": entity_id,
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
        """Updates a certain distillery website by entity id.

        Args:
            id (str): Entity id.
            updates (dict): Website to update.

        Returns:
            Row: Returning the updated distillery object.
        """        
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
        """Deletes a certain distillery by entity id.

        Works as a soft delete, so only the deleted_at field is updated to contain the date of the deletion.
        The information still remains in the database for further access.
        
        Args:
            id (str): Entity id.

        Returns:
            Row: Updated information of the distillery.
        """        
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