from sqlalchemy.engine.result import Row
from sqlalchemy.sql import text

from app import app
from db import db
from repositories.entity_repository import entity_repository

class WhiskeyRepository:
    def __init__(self, db=db):
        self._db = db
        self._entity_repository = entity_repository

whiskey_distillery = WhiskeyRepository