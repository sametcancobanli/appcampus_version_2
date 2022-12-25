SET FOREIGN_KEY_CHECKS=0;
SET FOREIGN_KEY_CHECKS=1;

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


SELECT
    UM.message_id,
    UM.sender_id , UM.receiver_id,
    UM.m_text, UM.creation_time,
	CASE WHEN UM.sender_id != 1 THEN CONCAT(user_1.name , " " , user_1.surname)
		 WHEN UM.receiver_id != 1 THEN CONCAT(user_2.name ," ", user_2.surname)
         ELSE NULL END as sender_username,
	CASE WHEN UM.sender_id != 1 THEN user_1.photo
		 WHEN UM.receiver_id != 1 THEN user_2.photo
         ELSE NULL END as sender_photo

FROM message AS UM

INNER JOIN
    (
        SELECT
            MAX(message_id) AS maxMessageID
        FROM message
        GROUP BY IF(sender_id > receiver_id, sender_id, receiver_id),
                 IF(receiver_id > sender_id, receiver_id, sender_id)
    ) IUM
    ON UM.message_id = IUM.maxMessageID
    
INNER JOIN 
	(
		SELECT 
			user_id, name, surname, photo
            FROM user
	) user_1
    ON UM.sender_id = user_1.user_id
    
INNER JOIN 
	(
		SELECT 
			user_id, name, surname, photo
            FROM user
	) user_2
    ON UM.receiver_id = user_2.user_id

WHERE UM.sender_id = 1 OR UM.receiver_id = 1
ORDER BY UM.creation_time DESC;

------------------------------------------------------------

SELECT
    UX.notification_id,
    UX.sender_id , UX.receiver_id,
    UX.type, UX.post_id, UX.creation_time,
    comments.c_text as text,
	user_1.name as sender_name, user_1.surname as sender_surname,
    RX.total_reaction as total_reaction
FROM notification AS UX

INNER JOIN
    (
        SELECT
            MAX(notification_id) AS maxNotificationID
        FROM notification
        GROUP BY post_id, type
    ) IUX
    ON UX.notification_id = IUX.maxNotificationID
    
INNER JOIN
    (
        SELECT
            COUNT(post_id) AS total_reaction, post_id, type
        FROM notification
        GROUP BY post_id, type
    ) RX
    ON UX.post_id = RX.post_id
    
INNER JOIN 
	(
		SELECT 
			user_id, name, surname
            FROM user
	) user_1
ON UX.sender_id = user_1.user_id 

INNER JOIN 
	(
		SELECT 
			c_text
            FROM comment
	) comments
	ON RX.type = 'comment'

WHERE UX.receiver_id = 3
GROUP BY notification_id
ORDER BY UX.creation_time DESC;


INSERT INTO `uni_media`.`user` (`user_id`, `mail`, `password`, `name`, `surname`, `school`, `department`, `entry_year`, `about`, `isConfirmed`, `creation_time`) VALUES ('1', 'mail1', '123456', 'samet', 'çoban', 'itü', 'computer', '2017', 'GM1', '1', '2022-12-25 14:26:18');
INSERT INTO `uni_media`.`user` (`user_id`, `mail`, `password`, `name`, `surname`, `school`, `department`, `entry_year`, `about`, `isConfirmed`, `creation_time`) VALUES ('2', 'mail2', '123456', 'yiğit', 'yilmaz', 'itü', 'computer', '2017', 'GM2', '1', '2022-12-25 14:26:19');
INSERT INTO `uni_media`.`user` (`user_id`, `mail`, `password`, `name`, `surname`, `school`, `department`, `entry_year`, `about`, `isConfirmed`, `creation_time`) VALUES ('3', 'mail3', '123456', 'enes', 'şaşmaz', 'itü', 'computer', '2017', 'GM3', '1', '2022-12-25 14:26:20');

INSERT INTO `uni_media`.`post` (`post_id`, `user_id`, `category_id`, `p_text`, `p_vote`, `creation_time`) VALUES ('1', '1', '1', 'post1', '0', '2022-12-25 14:29:17');
INSERT INTO `uni_media`.`post` (`post_id`, `user_id`, `category_id`, `p_text`, `p_vote`, `creation_time`) VALUES ('2', '2', '1', 'post2', '0', '2022-12-25 14:29:18');
INSERT INTO `uni_media`.`post` (`post_id`, `user_id`, `category_id`, `p_text`, `p_vote`, `creation_time`) VALUES ('3', '3', '1', 'post3', '0', '2022-12-25 14:29:19');

