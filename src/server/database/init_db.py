from app import bcrypt
import psycopg2

import models
from config import DB_HOST, DB_NAME, DB_USER, DB_PASSWORD

conn = psycopg2.connect(
    host = DB_HOST,
    database = DB_NAME,
    user = DB_USER,
    password = DB_PASSWORD
)

cur = conn.cursor()

cur.execute(models.DROP_TABLES)
cur.execute(models.CREATE_USERS)

cur.execute(
    "INSERT INTO Users (username, password_hash, admin) VALUES (%s, %s, %s);",
    ( "henelius", bcrypt.generate_password_hash(DB_PASSWORD).decode("utf8"), True )
)

conn.commit()

cur.close()
conn.close()