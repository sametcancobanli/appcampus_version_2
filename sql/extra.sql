SELECT
    UX.notification_id,
    UX.sender_id , UX.receiver_id,
    UX.type, UX.content_id, UX.creation_time,
    comments.c_text as text,
	user_1.name as sender_name, user_1.surname as sender_surname,
    RX.total_reaction as total_reaction
FROM notification AS UX

INNER JOIN
    (
        SELECT
            MAX(notification_id) AS maxNotificationID
        FROM notification
        GROUP BY content_id, type
    ) IUX
    ON UX.notification_id = IUX.maxNotificationID
    
INNER JOIN
    (
        SELECT
            COUNT(content_id) AS total_reaction, content_id, type
        FROM notification
        GROUP BY content_id, type
    ) RX
    ON UX.content_id = RX.content_id
    
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

WHERE UX.receiver_id = 4
GROUP BY notification_id
ORDER BY UX.creation_time DESC

