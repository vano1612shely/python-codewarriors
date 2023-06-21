CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    role VARCHAR(255) DEFAULT 'user',
    points INTEGER DEFAULT 0,
    fights INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    difficulty_level INTEGER,
    points INTEGER
);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  task_id INT,
  params JSONB,
  result JSONB,
  FOREIGN KEY (task_id)
    REFERENCES tasks (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);