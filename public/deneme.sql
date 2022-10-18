SELECT * FROM uni_media.user;
SELECT * FROM uni_media.post;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'penguen123';​

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

CREATE TABLE post (
    user_id INT NOT NULL,
    post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    p_text VARCHAR(140) NOT NULL,
    p_area VARCHAR(50) NOT NULL,
    p_vote INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE comment (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    c_text VARCHAR(140) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

CREATE TABLE vote (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);
