-- DROP DATABASE IF EXISTS test_db;
-- CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user(
  id int PRIMARY KEY auto_increment, 
  username varchar (25) UNIQUE NOT NULL, 
  password char (60) NOT NULL, 
  first_name varchar (50) NOT NULL, 
  last_name varchar (50) NOT NULL, 
  email varchar (100) UNIQUE NOT NULL, 
  age int (11) DEFAULT 0
);
