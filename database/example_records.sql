CREATE TABLE EXAMPLE_RECORDS (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

INSERT INTO EXAMPLE_RECORDS (name, description)
VALUES ('Sample Entry', 'This is a test entry for validation purposes.');