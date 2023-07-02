from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from db import db


class WhiskeyRepository:
    def __init__(self, db=db):
        self._db = db

    def get_whiskey(self, id: str) -> Row:
        """Fetches a certain whiskey from the database by given entity ID.

        Args:
            id (str): Entity id.

        Returns:
            Row: Returning the found whiskey object.
        """
        whiskey_input = {"id": id}
        sql = """
            SELECT 
                w.id,
                w.name,
                w.distillery_id,
                w.type,
                w.age,
                w.description,
                d.name AS distillery_name,
                d.country AS distillery_country
            FROM 
                whiskeys AS w
            LEFT JOIN
                distilleries as d ON w.distillery_id = d.id
            WHERE 
                w.id = :id AND w.deleted_at IS NULL
            GROUP BY 
                w.id, d.name, d.country
        """

        return self._db.session.execute(text(sql), whiskey_input).fetchone()

    def get_whiskeys_by_distillery(self, distillery_id: str) -> Row:
        """Fetches whiskeys by a distillery id from the database.

        Args:
            distillery_id (str): Entity id.

        Returns:
            Row: Returning the found whiskey objects.
        """
        whiskey_input = {"distillery_id": distillery_id}
        sql = """
            SELECT 
                w.id,
                w.name,
                w.distillery_id,
                w.type,
                w.age,
                w.description
            FROM 
                whiskeys AS w
            WHERE 
                w.distillery_id = :distillery_id AND w.deleted_at IS NULL
            ORDER BY 
                name ASC
        """

        return self._db.session.execute(text(sql), whiskey_input).fetchall()

    def get_whiskeys(self) -> Row:
        """Fetches whiskeys from the database.

        Returns:
            Row: Returning the found whiskey objects.
        """
        sql = """
            SELECT 
                w.id,
                w.name,
                w.distillery_id,
                w.type,
                w.age,
                w.description
            FROM 
                whiskeys AS w
            WHERE 
                deleted_at IS NULL
            ORDER BY 
                name ASC
        """

        return self._db.session.execute(text(sql)).fetchall()

    def create_whiskey(self, entity_id: str, whiskey: dict) -> Row:
        """Inserts into the database a new whiskeys for a given entity ID.

        Args:
            entity_id (str): Entity id.
            whiskey (dict): Whiskey input values.

        Returns:
            Row: Returning the newly created whiskey object.
        """
        whiskey_input = {
            "id": entity_id,
            "name": whiskey["name"],
            "distillery_id": whiskey["distillery_id"],
            "type": whiskey["type"],
            "age": whiskey["age"],
            "description": None
            if not whiskey["description"]
            else whiskey["description"],
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

    def update_whiskey(self, id: str, updates: dict) -> Row:
        """Updates a certain whiskey description by entity id.

        Args:
            id (str): Entity id.
            updates (dict): Description to update.

        Returns:
            Row: Returning the updated whiskey object.
        """
        update_input = {
            "id": id,
            "name": updates["name"],
            "type": updates["type"],
            "age": updates["age"],
            "description": updates["description"],
        }
        sql = """
            UPDATE 
                whiskeys
            SET
                name = :name,
                type = :type,
                age = :age,
                description = :description,
                updated_at = CURRENT_TIMESTAMP(0)
            WHERE 
                id = :id AND deleted_at IS NULL
            RETURNING *
        """

        result = self._db.session.execute(text(sql), update_input)
        self._db.session.commit()

        return result.fetchone()

    def delete_whiskey(self, id: str) -> Row:
        """Deletes a certain whiskey by entity id.

        Works as a soft delete, so only the deleted_at field is updated to contain the date of the deletion.
        The information still remains in the database for further access.

        Args:
            id (str): Entity id.

        Returns:
            Row: Returning the deleted whiskey object.
        """
        delete_input = {
            "id": id,
        }
        sql = """
            UPDATE 
                whiskeys
            SET 
                deleted_at = CURRENT_TIMESTAMP(0)
            WHERE 
                id = :id AND deleted_at IS NULL
            RETURNING *
        """

        result = self._db.session.execute(text(sql), delete_input)
        self._db.session.commit()

        return result.fetchone()


whiskey_repository = WhiskeyRepository()
