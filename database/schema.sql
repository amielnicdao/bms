DROP DATABASE IF EXISTS bmsDB;
CREATE DATABASE bmsDB;
USE bmsDB;
CREATE TABLE checkInTable
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    purpose varchar(255) NULL,
    seshTime timestamp default CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE membersTable
(
    id int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    profilePic varchar(400) NULL,
    phoneNum BIGINT NOT NULL,
    bday date NOT NULL,
    address varchar(255) NOT NULL,
    emergName varchar(255),
    ePhoneNum BIGINT NULL,
    uId varchar(100) NOT NULL,
    isTrainer boolean default '0',
    PRIMARY KEY (id)
);
CREATE TABLE classesTable
(
    id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    className varchar(255) NOT NULL,
    classType varchar(255) NOT NULL,
    assignedTrainer varchar(255) NOT NULL,
    classSize int NOT NULL
);

