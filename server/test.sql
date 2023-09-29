-- Create a new SQLite database (if it doesn't already exist)
--CREATE DATABASE IF NOT EXISTS my_database;

-- Use the newly created database
--USE my_database;

-- Define a SQL command to create a simple "test" table
CREATE TABLE IF NOT EXISTS test (
    id INTEGER PRIMARY KEY,
    name TEXT,
    val TEXT UNIQUE
);

-- Insert data into the "tets" table (optional)
INSERT INTO test (name, val) VALUES ('John Doe', 'fwjnkmwdkwm');
