SELECT
    UX.notification_id,
    UX.sender_id , UX.receiver_id,
    UX.type, UX.post_id, UX.creation_time,
    CASE WHEN UX.type = 'comment' THEN comments.c_text
		 WHEN UX.type = 'like' THEN posts.p_text
         ELSE NULL END as text,
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
ON UX.post_id = RX.post_id AND UX.type = RX.type
    
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
			p_text
            FROM post
	) posts
    
INNER JOIN 
	(
		SELECT 
			c_text
            FROM comment
	) comments

WHERE UX.receiver_id = 3
GROUP BY notification_id
ORDER BY UX.creation_time DESC;