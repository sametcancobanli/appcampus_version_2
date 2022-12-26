
INSERT INTO `uni_media`.`user` (`user_id`, `mail`, `password`, `name`, `surname`, `school`, `department`, `entry_year`, `about`, `isConfirmed`, `creation_time`) VALUES ('1', 'mail1', '123456', 'samet', 'çoban', 'itü', 'computer', '2017', 'GM1', '1', '2022-12-25 14:26:18');
INSERT INTO `uni_media`.`user` (`user_id`, `mail`, `password`, `name`, `surname`, `school`, `department`, `entry_year`, `about`, `isConfirmed`, `creation_time`) VALUES ('2', 'mail2', '123456', 'yiğit', 'yilmaz', 'itü', 'computer', '2017', 'GM2', '1', '2022-12-25 14:26:19');
INSERT INTO `uni_media`.`user` (`user_id`, `mail`, `password`, `name`, `surname`, `school`, `department`, `entry_year`, `about`, `isConfirmed`, `creation_time`) VALUES ('3', 'mail3', '123456', 'enes', 'şaşmaz', 'itü', 'computer', '2017', 'GM3', '1', '2022-12-25 14:26:20');

INSERT INTO `uni_media`.`post` (`post_id`, `user_id`, `category_id`, `p_text`, `p_vote`, `creation_time`) VALUES ('1', '1', '1', 'post1', '0', '2022-12-25 14:29:17');
INSERT INTO `uni_media`.`post` (`post_id`, `user_id`, `category_id`, `p_text`, `p_vote`, `creation_time`) VALUES ('2', '2', '1', 'post2', '0', '2022-12-25 14:29:18');
INSERT INTO `uni_media`.`post` (`post_id`, `user_id`, `category_id`, `p_text`, `p_vote`, `creation_time`) VALUES ('3', '3', '1', 'post3', '0', '2022-12-25 14:29:19');
