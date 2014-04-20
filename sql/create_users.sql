-- Create access users
DROP USER 'node'@'localhost';
CREATE USER 'node'@'localhost' IDENTIFIED BY 'guest';
GRANT SELECT, INSERT, UPDATE, DELETE, EVENT, EXECUTE ON quorum.* TO 'node'@'localhost';