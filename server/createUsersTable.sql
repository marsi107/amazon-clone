-- SQLite
-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert some default values
INSERT INTO users (name, email, password)
VALUES
    ('John', 'John@mail.com', '$2b$10$OEGDTjSQLOH9UoLz5.diI.sMSuTkKYwhZLn4k980VjSNPbMRVek9a'),
    ('Jane Smith', 'Jane@mail.com', '$2b$10$SjG64zy2c3jo58kZgOiruO6LhXS6.CmIkgzz42knGQn2HC3Zz8S3u');

-- DROP TABLE IF EXISTS users;


INSERT INTO users (name, email, password)
VALUES ('test1', 'testInsert1', 't1');