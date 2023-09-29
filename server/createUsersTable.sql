-- SQLite
-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

-- Insert some default values
INSERT INTO users (id, name, email, password)
VALUES
    (1, 'John', 'John@mail.com', '$2b$10$OEGDTjSQLOH9UoLz5.diI.sMSuTkKYwhZLn4k980VjSNPbMRVek9a'),
    (2, 'Jane Smith', 'Jane@mail.com', '$2b$10$SjG64zy2c3jo58kZgOiruO6LhXS6.CmIkgzz42knGQn2HC3Zz8S3u');
