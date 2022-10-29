ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'penguen123';​

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE DATABASE IF NOT EXISTS `uni_media` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `uni_media`;

CREATE TABLE user (
    user_id INT NOT NULL PRIMARY KEY,
    mail VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    school VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    class VARCHAR(20) NOT NULL,
    about VARCHAR(200)
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
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

CREATE TABLE comment (
    comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    c_text VARCHAR(140) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

CREATE TABLE vote (
	vote_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);
