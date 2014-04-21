-- Create access users
GRANT SELECT, INSERT, UPDATE, DELETE, EVENT, EXECUTE ON quorum.* TO 'node'@'localhost' IDENTIFIED BY 'guest';