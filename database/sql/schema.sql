DROP DATABASE IF EXISTS movielist;
CREATE DATABASE IF NOT EXISTS movielist;
USE movielist;


CREATE TABLE IF NOT EXISTS movies( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    title  VARCHAR(100) NOT NULL, 
    description VARCHAR(1024)  NULL, 
    release_date DATE, 
    vote_average DECIMAL(7, 2), 
    vote_count INT(7),
    watched TINYINT(1)
);
