
CREATE_USERS = """
    CREATE TABLE IF NOT EXISTS Users (
        id UUID PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(8) DEFAULT 'user',
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        deleted_at TIMESTAMP DEFAULT null
    )
"""

CREATE_ENTITIES = """
    CREATE TABLE IF NOT EXISTS Entities (
        id UUID PRIMARY KEY,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        deleted_at TIMESTAMP DEFAULT null
    )
"""

CREATE_RATINGS="""
    CREATE TABLE IF NOT EXISTS Ratings (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        entity_id UUID NOT NULL ,
        rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
        
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (entity_id) REFERENCES Entities(id),
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        deleted_at TIMESTAMP DEFAULT null
    )
"""

CREATE_COMMENTS="""
    CREATE TABLE IF NOT EXISTS Comments (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        entity_id UUID NOT NULL ,
        comment TEXT NOT NULL,
        
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (entity_id) REFERENCES Entities(id),
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        deleted_at TIMESTAMP DEFAULT null
    )
"""

CREATE_DISTILLERIES="""
    CREATE TABLE IF NOT EXISTS Distilleries (
        id UUID PRIMARY KEY REFERENCES Entities(id),
        name VARCHAR(50) NOT NULL,
        location POINT NOT NULL,
        country VARCHAR(5) NOT NULL,
        year_established INT,
        website VARCHAR(100),
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        deleted_at TIMESTAMP DEFAULT null
    )
"""

CREATE_WHISKEYS="""
    CREATE TABLE IF NOT EXISTS Whiskeys (
        id UUID PRIMARY KEY REFERENCES Entities,
        name VARCHAR(50) NOT NULL,
        distillery_id UUID NOT NULL,
        type VARCHAR(50) NOT NULL,
        age INT NOT NULL CHECK (age >= 0),
        description TEXT,
        
        FOREIGN KEY (distillery_id) REFERENCES Distilleries(id),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
        deleted_at TIMESTAMP DEFAULT null
    )
"""