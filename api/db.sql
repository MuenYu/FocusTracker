DROP DATABASE if exists focustracker;
CREATE DATABASE focustracker;
USE focustracker;

create table users
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL
);

create table records
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    task        VARCHAR(255) NOT NULL,
    duration    INT NOT NULL,
    timestamp   DateTime NOT NULL,
    owner       INT NOT NULL,
    FOREIGN KEY (owner) REFERENCES users (id)
);

# demo data
INSERT INTO users values(1,'q','8e35c2cd3bf6641bdb0e2050b76932cbb2e6034a0ddacc1d9bea82a6ba57f7cf');