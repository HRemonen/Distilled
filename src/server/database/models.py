
DROP_TABLES = """
    DROP TABLE IF EXISTS Users CASCADE
"""

CREATE_USERS = """
    CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(8) DEFAULT 'user',
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""

CREATE_DISTILLERIES="""
    CREATE TABLE IF NOT EXISTS Distilleries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        location GEOMETRY NOT NULL,
        country VARCHAR(50) NOT NULL,
        year_established INT,
        website VARCHAR(100),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""

CREATE_WHISKEYS="""
    CREATE TABLE IF NOT EXISTS Whiskeys (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        distillery_id INT NOT NULL,
        type VARCHAR(50) NOT NULL,
        age INT NOT NULL CHECK (age >= 0),
        description TEXT,
        FOREIGN KEY (distillery_id) REFERENCES Distilleries(id),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""

CREATE_RATINGS="""
    CREATE TABLE IF NOT EXISTS Ratings (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        whiskey_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (whiskey_id) REFERENCES Whiskeys(id),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""

CREATE_COMMENTS="""
    CREATE TABLE IF NOT EXISTS Comments (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        whiskey_id INT NOT NULL,
        comment TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (whiskey_id) REFERENCES Whiskeys(id)
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""