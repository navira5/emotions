CREATE DATABASE tones;

USE tones;

CREATE TABLE tones (
  id int AUTO_INCREMENT NOT NULL,
  entry LONGTEXT NOT NULL,
  anger int NOT NULL,
  fear int NOT NULL,
  joy int NOT NULL,
  sadness int NOT NULL,
  analytical int NOT NULL,
  confident int NOT NULL,
  tentative int NOT NULL,
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables

deadline date NOT NULL,

 .*/


