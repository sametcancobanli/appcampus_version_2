ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'penguen123';​

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE DATABASE IF NOT EXISTS `uni_media` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `uni_media`;

CREATE TABLE notification (
    notification_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    type VARCHAR(20),
    content_id INT NOT NULL,
    creation_time TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES post(post_id) ON DELETE CASCADE
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



SELECT
    UM.message_id,
    UM.sender_id , UM.receiver_id,
    UM.m_text, UM.creation_time,
	user_1.name as sender_name, user_1.surname as sender_surname,
    user_2.name as receiver_name, user_2.surname as receiver_surname
FROM message AS UM

INNER JOIN
    (
        SELECT
            MAX(message_id) AS maxMessageID
        FROM message
        GROUP BY sender_id, receiver_id
    ) IUM
    ON UM.message_id = IUM.maxMessageID
    
INNER JOIN 
	(
		SELECT 
			user_id, name, surname
            FROM user
	) user_1
    ON UM.sender_id = user_1.user_id 
    
INNER JOIN 
	(
		SELECT 
			user_id, name, surname
            FROM user
	) user_2
    ON UM.receiver_id = user_2.user_id 


WHERE UM.sender_id = 4 OR UM.receiver_id = 4
GROUP BY UM.sender_id, UM.receiver_id
ORDER BY UM.creation_time DESC
