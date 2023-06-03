
DROP_TABLES = """
    DROP TABLE IF EXISTS Users CASCADE
"""

CREATE_USERS = """
    CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE CHECK(username IS NOT NULL AND length(username) > 7),
        password TEXT NOT NULL,
        admin BOOLEAN default false,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""

CREATE_DISTILLERIES="""
    CREATE TABLE Distilleries (
        id INT PRIMARY KEY,
        name VARCHAR(50) NOT NULL ,
        location GEOMETRY NOT NULL ,
        country VARCHAR(50) NOT NULL ,
        year_established INT,
        website VARCHAR(100),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""

CREATE_WHISKEYS="""
    CREATE TABLE Whiskeys (
        id INT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        distillery_id INT NOT NULL,
        type VARCHAR(50) NOT NULL,
        age INT NOT NULL,
        description TEXT,
        FOREIGN KEY (distillery_id) REFERENCES Distilleries(id),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""

CREATE_RATINGS="""
    CREATE TABLE Ratings (
        id INT PRIMARY KEY,
        user_id INT NOT NULL,
        whiskey_id INT NOT NULL,
        rating INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (whiskey_id) REFERENCES Whiskeys(id),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""

CREATE_COMMENTS="""
    CREATE TABLE Comments (
        id INT PRIMARY KEY,
        user_id INT NOT NULL,
        whiskey_id INT NOT NULL,
        comment TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (whiskey_id) REFERENCES Whiskeys(id)
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
    )
"""