SET FOREIGN_KEY_CHECKS=0;
SET FOREIGN_KEY_CHECKS=1;
FLUSH PRIVILEGES;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'penguen123';

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE DATABASE IF NOT EXISTS `uni_media` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `uni_media`;

CREATE TABLE string_map (
	language_text VARCHAR(50),
    key_text VARCHAR(50),
    text VARCHAR(50),
    CONSTRAINT map UNIQUE (language_text,key_text)
);

CREATE TABLE notification (
    notification_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    type VARCHAR(20),
    post_id INT NOT NULL,
    react_id INT,
    creation_time TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

CREATE TABLE message (
    message_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    m_text TEXT,
    creation_time TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE user (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mail VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    school VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    entry_year VARCHAR(20) NOT NULL,
    about VARCHAR(200),
    isConfirmed INT NOT NULL DEFAULT(0),
    photo LONGTEXT,
    creation_time TIMESTAMP
);

CREATE TABLE category (
    category_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL
);

CREATE TABLE post (
	post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    p_text VARCHAR(140) NOT NULL,
    p_vote INT NOT NULL,
    creation_time TIMESTAMP,
    photo LONGTEXT,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

CREATE TABLE comment (
    comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    c_text VARCHAR(140) NOT NULL,
    creation_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE
);

CREATE TABLE vote (
	vote_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    creation_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE,
	CONSTRAINT likes UNIQUE (user_id,post_id)
);
