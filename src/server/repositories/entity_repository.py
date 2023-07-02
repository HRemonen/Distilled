from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from db import db


class EntityRepository:
    def __init__(self, db=db):
        self._db = db

    def create_entity(self, id) -> Row:
        """Create a new entity to the database.

        Args:
            id (UUID): Id (PK) of the entity.

        Returns:
            Row: Returning the newly created entity.
        """
        entity_input = {"id": id}

        sql = """
            INSERT INTO entities (
                id
            ) 
            VALUES (
                :id
            )
            RETURNING 
                id
        """

        result = self._db.session.execute(text(sql), entity_input)
        self._db.session.commit()

        return result.fetchone()

    def comment_entity(self, id: str, user_id: str, comment: dict) -> Row:
        """Give a comment to certain entity

        Args:
            id (str): Entity id or for example the id distillery.
            user_id (str): User id.
            comment (dict): Given comment.

        Returns:
            Row: Returning the newly created comment object.
        """
        comment_input = {
            "user_id": user_id,
            "entity_id": id,
            "comment": comment["comment"],
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
        """Give a rating to certain entity

        Args:
            id (str): Entity id or for example the id distillery.
            user_id (str): User id.
            rating (dict): Given rating, must be in range on 0 - 5.

        Returns:
            Row: Returning the newly created rating object.
        """
        rating_input = {"user_id": user_id, "entity_id": id, "rating": rating["rating"]}
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

    def get_entity_reviews(self, id: str) -> Row:
        """Get reviews (rating and comment by username) of a certain entity.
        Review is an JSONB object of
        {
            username,
            rating,
            comment,
            rating.created_at
        }

        Comment can be null, but the rating is used as the main element of the query
        and comments and users are joined to the rating table.

        Args:
            id (str): Entity id or for example the id distillery.

        Returns:
            Row: All found Rows mathing the query.
        """
        review_input = {"id": id}
        sql = """
            SELECT
                r.id AS rating_id,
                u.username AS username,
                r.rating AS rating,
                r.created_at AS created_at,
                c.comment AS comment
            FROM
                Ratings r
                LEFT JOIN 
                    Users u ON r.user_id = u.id
                LEFT JOIN 
                    Comments c ON r.entity_id = c.entity_id AND r.user_id = c.user_id
            WHERE
                r.entity_id = :id
            ORDER BY
                u.username
        """

        result = self._db.session.execute(text(sql), review_input)

        return result.fetchall()


entity_repository = EntityRepository()
