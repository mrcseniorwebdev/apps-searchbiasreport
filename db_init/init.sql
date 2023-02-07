create user IF NOT EXISTS 'user'@'%' identified by 'pass';
grant all privileges on *.* to 'user'@'%' with grant option;
flush privileges;
create database if not exists searchbiasreport;
use searchbiasreport;

create table if not exists users (
    uid int NOT NULL AUTO_INCREMENT,
    gid varchar(255),
    email varchar(255),
    name varchar(255),
    picture varchar(255),
    PRIMARY KEY (uid)
);
create table if not exists campaigns (
    cid int NOT NULL AUTO_INCREMENT,
    cname varchar(255) NOT NULL,
    link text,
    PRIMARY KEY (cid)
);
create table if not exists jobs (
    jid int NOT NULL AUTO_INCREMENT,
    cid int NOT NULL,
    query text NOT NULL,
    siteurl text NOT NULL,
    completed int NOT NULL,
    PRIMARY KEY (jid)
);

-- INSERT INTO users (email) VALUES ('jjones@mrc.org');