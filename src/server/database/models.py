
DROP_TABLES = """
    DROP TABLE IF EXISTS Users CASCADE
"""

CREATE_USERS = """
    CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE CHECK(username IS NOT NULL AND length(username) > 7),
        password TEXT NOT NULL CHECK(password IS NOT NULL AND length(password) > 8),
        admin BOOLEAN default false,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""