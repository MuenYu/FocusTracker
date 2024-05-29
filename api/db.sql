DROP DATABASE if exists focustracker;
CREATE DATABASE focustracker;
USE focustracker;

create table users
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL
);

