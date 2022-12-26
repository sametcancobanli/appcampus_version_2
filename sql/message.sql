SELECT UM.message_id, UM.sender_id , UM.receiver_id, UM.m_text, UM.creation_time, 

CASE WHEN UM.sender_id != '" + decoded.user_id + "' THEN CONCAT(user_1.name , ' ' , user_1.surname) 
	 WHEN UM.receiver_id != '" + decoded.user_id + "' THEN CONCAT(user_2.name ,' ', user_2.surname) 
	 ELSE NULL END as sender_username,
CASE WHEN UM.sender_id != '" + decoded.user_id + "' THEN user_1.photo 
	 WHEN UM.receiver_id != '" + decoded.user_id + "' THEN user_2.photo 
	 ELSE NULL END as sender_photo 
     
     FROM message AS UM INNER JOIN( SELECT MAX(message_id) AS maxMessageID FROM message 
     GROUP BY IF(sender_id > receiver_id, sender_id, receiver_id), 
			  IF(receiver_id > sender_id, receiver_id, sender_id) ) IUM 
              ON UM.message_id = IUM.maxMessageID 
              
	 INNER JOIN ( SELECT user_id, name, surname, photo FROM user ) user_1 
     ON UM.sender_id = user_1.user_id 
     
     INNER JOIN  ( SELECT  user_id, name, surname, photo FROM user ) user_2 
     ON UM.receiver_id = user_2.user_id 
     
     WHERE UM.sender_id = '" + decoded.user_id + "' OR UM.receiver_id = '" + decoded.user_id + "' ORDER BY UM.creation_time DESC;