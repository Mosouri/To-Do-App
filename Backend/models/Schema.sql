CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        country VARCHAR(255),
        is_deleted SMALLINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    tasks (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        due_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    categories (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL
    );

CREATE TABLE
    labels (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (id) ON DELETE CASCADE,
        name VARCHAR(50) NOT NULL
    );