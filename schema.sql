DROP DATABASE IF EXISTS micro_db;

CREATE DATABASE micro_db;
USE micro_db;

CREATE TABLE stories (
  id INT NOT NULL AUTO_INCREMENT,
  mainText VARCHAR(2860) NOT NULL,
  recentText VARCHAR(280) NOT NULL,
  mature boolean,
  storyCount INTEGER NOT NULL,
  completionTime DATETIME,
  PRIMARY KEY (id)
);
