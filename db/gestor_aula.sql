/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80000
Source Host           : 127.0.0.1:3306
Source Database       : gestor_aula

Target Server Type    : MYSQL
Target Server Version : 80000
File Encoding         : 65001

Date: 2016-12-15 22:09:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for app_params
-- ----------------------------
DROP TABLE IF EXISTS `app_params`;
CREATE TABLE `app_params` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_params
-- ----------------------------
INSERT INTO `app_params` VALUES ('1', 'SCHOOL_NAME', null, 'EDITABLE', '2016-11-03 21:26:09', '2016-12-15 22:00:30');
INSERT INTO `app_params` VALUES ('2', 'COUNTRY', null, 'EDITABLE', '2016-11-13 21:15:46', '2016-12-15 22:00:32');
INSERT INTO `app_params` VALUES ('3', 'CITY', null, 'EDITABLE', '2016-11-13 21:15:55', '2016-12-15 22:00:34');
INSERT INTO `app_params` VALUES ('4', 'LICENSE', null, 'EDITABLE', '2016-11-13 21:16:01', '2016-12-15 22:00:37');
INSERT INTO `app_params` VALUES ('5', 'RANK_SEND_ENABLED', '1', 'EDITABLE', '2016-11-13 21:16:24', '2016-11-14 23:15:56');
INSERT INTO `app_params` VALUES ('6', 'SERVER_NAME', null, 'FIX', '2016-11-14 22:13:35', '2016-12-15 22:00:45');
INSERT INTO `app_params` VALUES ('7', 'SERVER_IP', null, 'FIX', '2016-11-14 22:13:41', '2016-12-15 22:09:09');
INSERT INTO `app_params` VALUES ('8', 'LICENSE_PERIOD', null, 'FIX', '2016-11-14 22:15:14', '2016-12-15 22:00:48');
INSERT INTO `app_params` VALUES ('9', 'DEVICE_NAME', null, 'FIX', '2016-11-14 22:15:21', '2016-12-15 22:00:49');
INSERT INTO `app_params` VALUES ('10', 'LICENSE_NUM_USERS', null, 'FIX', '2016-11-14 22:15:42', '2016-12-15 22:00:52');
INSERT INTO `app_params` VALUES ('11', 'LICENSE_STATE', '1', 'FIX', '2016-12-08 13:14:37', '2016-12-15 22:08:05');
INSERT INTO `app_params` VALUES ('12', 'OFFLINE_ATTEMPTS', null, 'FIX', '2016-12-08 13:42:30', '2016-12-15 22:09:11');
INSERT INTO `app_params` VALUES ('13', 'SERVER_MAC', null, 'FIX', '2016-12-09 15:28:29', '2016-12-15 22:09:07');
INSERT INTO `app_params` VALUES ('14', 'SCHOOL_ID', null, 'FIX', '2016-12-10 17:31:57', '2016-12-15 22:01:26');

-- ----------------------------
-- Table structure for class_group
-- ----------------------------
DROP TABLE IF EXISTS `class_group`;
CREATE TABLE `class_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class_group
-- ----------------------------

-- ----------------------------
-- Table structure for laboratories_users
-- ----------------------------
DROP TABLE IF EXISTS `laboratories_users`;
CREATE TABLE `laboratories_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `laboratory_id` int(11) DEFAULT NULL,
  `state` int(1) DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `attempts` int(11) DEFAULT NULL,
  `delivery_time` time DEFAULT NULL,
  `report_url` varchar(255) DEFAULT NULL,
  `app_score` double DEFAULT NULL,
  `teacher_score` double DEFAULT NULL,
  `final_score` double DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `laboratory_id` (`laboratory_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `laboratories_users_ibfk_1` FOREIGN KEY (`laboratory_id`) REFERENCES `laboratory` (`id`),
  CONSTRAINT `laboratories_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of laboratories_users
-- ----------------------------

-- ----------------------------
-- Table structure for laboratory
-- ----------------------------
DROP TABLE IF EXISTS `laboratory`;
CREATE TABLE `laboratory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lab_code` varchar(255) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lesson_name` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `lesson_id` (`lesson_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `laboratory_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=688 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of laboratory
-- ----------------------------

-- ----------------------------
-- Table structure for lessons
-- ----------------------------
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lessons
-- ----------------------------

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_class_groups_id` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_class_groups_id` (`user_class_groups_id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_class_groups_id`) REFERENCES `users_class_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of messages
-- ----------------------------

-- ----------------------------
-- Table structure for messages_all
-- ----------------------------
DROP TABLE IF EXISTS `messages_all`;
CREATE TABLE `messages_all` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `messages_all_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of messages_all
-- ----------------------------

-- ----------------------------
-- Table structure for ranking
-- ----------------------------
DROP TABLE IF EXISTS `ranking`;
CREATE TABLE `ranking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `lab_qual_score` double DEFAULT NULL,
  `lab_num_score` double DEFAULT NULL,
  `tab_t_wasted_score` double DEFAULT NULL,
  `total_score` double DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ranking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ranking
-- ----------------------------

-- ----------------------------
-- Table structure for rols
-- ----------------------------
DROP TABLE IF EXISTS `rols`;
CREATE TABLE `rols` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(255) DEFAULT NULL,
  `rol_name` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rols
-- ----------------------------
INSERT INTO `rols` VALUES ('1', 'sad-rol', 'S-Administrador', '2016-10-29 14:45:10', '2016-10-29 14:50:25');
INSERT INTO `rols` VALUES ('2', 'adm-rol', 'Administrador', '2016-10-29 14:50:48', '2016-10-29 14:50:48');
INSERT INTO `rols` VALUES ('3', 'pro-rol', 'Profesor', '2016-10-29 14:51:01', '2016-10-29 14:51:01');
INSERT INTO `rols` VALUES ('4', 'est-rol', 'Estudiante', '2016-10-29 14:51:06', '2016-10-29 14:51:06');

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `class_group_id` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of students
-- ----------------------------

-- ----------------------------
-- Table structure for subjects
-- ----------------------------
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subjects
-- ----------------------------

-- ----------------------------
-- Table structure for subjects_class_groups
-- ----------------------------
DROP TABLE IF EXISTS `subjects_class_groups`;
CREATE TABLE `subjects_class_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjects_id` int(11) DEFAULT NULL,
  `class_group_id` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `subjects_id` (`subjects_id`),
  KEY `class_group_id` (`class_group_id`),
  CONSTRAINT `subjects_class_groups_ibfk_1` FOREIGN KEY (`subjects_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `subjects_class_groups_ibfk_2` FOREIGN KEY (`class_group_id`) REFERENCES `class_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subjects_class_groups
-- ----------------------------

-- ----------------------------
-- Table structure for temp_labs
-- ----------------------------
DROP TABLE IF EXISTS `temp_labs`;
CREATE TABLE `temp_labs` (
  `subName` varchar(255) DEFAULT NULL,
  `lessonName` varchar(255) DEFAULT NULL,
  `labCode` varchar(255) DEFAULT NULL,
  `labName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of temp_labs
-- ----------------------------

-- ----------------------------
-- Table structure for temp_users
-- ----------------------------
DROP TABLE IF EXISTS `temp_users`;
CREATE TABLE `temp_users` (
  `userType` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userLastName` varchar(255) DEFAULT NULL,
  `group` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of temp_users
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `rols_id` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `rols_id` (`rols_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rols_id`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for users_class_groups
-- ----------------------------
DROP TABLE IF EXISTS `users_class_groups`;
CREATE TABLE `users_class_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) DEFAULT NULL,
  `class_group_id` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `students_id` (`users_id`),
  KEY `class_group_id` (`class_group_id`),
  CONSTRAINT `users_class_groups_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_class_groups_ibfk_2` FOREIGN KEY (`class_group_id`) REFERENCES `class_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_class_groups
-- ----------------------------

-- ----------------------------
-- Table structure for user_group_subjects
-- ----------------------------
DROP TABLE IF EXISTS `user_group_subjects`;
CREATE TABLE `user_group_subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ucg_id` int(11) DEFAULT NULL,
  `sc_id` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ucg_id` (`ucg_id`),
  KEY `sc_id` (`sc_id`),
  CONSTRAINT `user_group_subjects_ibfk_1` FOREIGN KEY (`ucg_id`) REFERENCES `users_class_groups` (`id`),
  CONSTRAINT `user_group_subjects_ibfk_2` FOREIGN KEY (`sc_id`) REFERENCES `subjects_class_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_group_subjects
-- ----------------------------

-- ----------------------------
-- Procedure structure for app_edit
-- ----------------------------
DROP PROCEDURE IF EXISTS `app_edit`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `app_edit`(IN `schoolName` varchar(100), IN `country` varchar(100), IN `city` varchar(100), IN `license` varchar(100), IN `rank` varchar(100))
BEGIN
	UPDATE
		app_params
	SET
		`value` = schoolName
	WHERE
		`name` = 'SCHOOL_NAME';

	UPDATE
		app_params
	SET
		`value` = country
	WHERE
		`name` = 'COUNTRY';

	UPDATE
		app_params
	SET
		`value` = city
	WHERE
		`name` = 'CITY';

	UPDATE
		app_params
	SET
		`value` = license
	WHERE
		`name` = 'LICENSE';

	UPDATE
		app_params
	SET
		`value` = rank
	WHERE
		`name` = 'RANK_SEND_ENABLED';
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for decrease_attempts
-- ----------------------------
DROP PROCEDURE IF EXISTS `decrease_attempts`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `decrease_attempts`()
BEGIN
	DECLARE attempts DOUBLE DEFAULT NULL;

	SET attempts = 
		(
			SELECT
				`value`
			FROM
				app_params
			WHERE
				`name` = 'OFFLINE_ATTEMPTS'
		);

	UPDATE
		app_params
	SET
		`value` = CAST(attempts AS DECIMAL) - 1
	WHERE
		`name` = 'OFFLINE_ATTEMPTS';
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for external_get_lab
-- ----------------------------
DROP PROCEDURE IF EXISTS `external_get_lab`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `external_get_lab`(IN `userName` varchar(100),IN `labCode` varchar(100))
BEGIN
	SET @labState = NULL, @labName = NULL;
	SET @labId = NULL, @studentId = NULL; 
	SET @labId = (
		SELECT
			l.id
		FROM
			laboratory l
		WHERE
			l.lab_code = labCode
	);

	SET @studentId = (
		SELECT
			u.id
		FROM
			users u
		WHERE
			u.`user` = userName 
	);

	IF @labId IS NOT NULL 
	THEN
		IF @studentId IS NOT NULL 
		THEN
			IF EXISTS (
				SELECT
					uc.class_group_id
				FROM
					users_class_groups uc
				INNER JOIN class_group cg ON uc.class_group_id = cg.id 
				INNER JOIN subjects_class_groups sc ON cg.id = sc.class_group_id 
				INNER JOIN subjects sj ON sc.subjects_id = sj.id
				INNER JOIN laboratory l ON sj.id = l.subject_id
				WHERE
					uc.users_id = @studentId AND
					l.id = @labId
			)
			THEN
				SELECT 
					l.`name`,
					CASE WHEN lu.state IS NULL THEN '0' ELSE lu.state END as lab_state
				INTO
					@labName,
					@labState
				FROM	
					laboratory l
				LEFT JOIN (
					SELECT
						*
					FROM
						laboratories_users
					WHERE
						user_id = @studentId
				) lu ON l.id = lu.laboratory_id
				WHERE
					l.id = @labId;

				SELECT 'true' as state, 'STATUS_OK' as res_code, @labName as lab_name, @labState as lab_state;
			ELSE
				SELECT 'true' as state, 'LAB_NOT_ASSIGNED' as res_code;
			END IF;
		ELSE
			SELECT 'true' as state, 'USER_NOT_FOUND' as res_code;
		END IF;
	ELSE
		SELECT 'true' as state, 'LAB_CODE_NOT_FOUND' as res_code;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for external_login
-- ----------------------------
DROP PROCEDURE IF EXISTS `external_login`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `external_login`(IN `usr` varchar(100),IN `pass` varchar(100))
BEGIN
	SET @classGroup = NULL;
	SET @schoolName = (
		SELECT
			p.`value`
		FROM
			app_params p
		WHERE
			p.`name` = 'SCHOOL_NAME'
	);

	SET @userId = (
		SELECT
			u.id
		FROM
			users u
		WHERE
			u.`user` = usr AND
			u.pass = pass AND
			u.rols_id = 4
	);

	SET @licenseState = (  			   
		SELECT     
			 `value`     
		FROM  		   
			app_params     
		WHERE  			   
			 `name` = 'LICENSE_STATE'     
	);

	SET @offlineAttempts = (     
		SELECT     
			 `value`     
		FROM     
			app_params     
		WHERE     
			 `name` = 'OFFLINE_ATTEMPTS'     
	);

	IF ( @licenseState = '0' AND CAST(@offlineAttempts AS DECIMAL) > 0 )
	THEN
		IF @userId IS NOT NULL
		THEN 
			SET @classGroup = (
				SELECT
					cg.`name`
				FROM
					users u
				INNER JOIN users_class_groups uc ON u.id = uc.users_id
				INNER JOIN class_group cg ON uc.class_group_id = cg.id
				WHERE
					u.`user` = usr AND
					u.pass = pass
			);

			IF @classGroup IS NOT NULL
			THEN
				SELECT
					'true' as state,
					'LOGIN_OK' as res_code,
					u.`name`,
					u.last_name,
					cg.`name` as class_group,
					@schoolName as school_name
				FROM
					users u
				INNER JOIN users_class_groups uc ON u.id = uc.users_id
				INNER JOIN class_group cg ON uc.class_group_id = cg.id
				WHERE
					u.`user` = usr AND
					u.pass = pass;
			ELSE
				SELECT 'true' as state, 'LAB_NOT_ASSIGNED' as res_code;	
			END IF;
		ELSE
			SELECT 'true' as state, 'INVALID_USER_PASS' as res_code;	
		END IF;
	ELSE
		SELECT 'true' as state, 'LICENSE_EXPIRED' as res_code;	
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for external_put_lab
-- ----------------------------
DROP PROCEDURE IF EXISTS `external_put_lab`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `external_put_lab`(IN userName VARCHAR(100), IN labCode VARCHAR(100), IN attempts VARCHAR(100), IN delivery_date VARCHAR(100), 
		IN delivery_time VARCHAR(100), IN app_score VARCHAR(100), IN fileExt VARCHAR(100))
BEGIN
	SET @labUserId = NULL, @labState = NULL;
	SET @studentId = NULL, @labCode = NULL; 
	SET @labId = (
		SELECT
			l.id
		FROM
			laboratory l
		WHERE
			l.lab_code = labCode
	);

	SET @studentId = (
		SELECT
			u.id
		FROM
			users u
		WHERE
			u.`user` = userName 
	);

	SET @licenseState = (  			   
		SELECT     
			 `value`     
		FROM  		   
			app_params     
		WHERE  			   
			 `name` = 'LICENSE_STATE'     
	);

	SET @offlineAttempts = (     
		SELECT     
			 `value`     
		FROM     
			app_params     
		WHERE     
			 `name` = 'OFFLINE_ATTEMPTS'     
	);

	IF ( @licenseState = '0' AND CAST(@offlineAttempts AS DECIMAL) > 0 )
	THEN
		IF @labId IS NOT NULL 
		THEN
			IF @studentId IS NOT NULL 
			THEN
				IF EXISTS (
					SELECT
						uc.class_group_id
					FROM
						users_class_groups uc
					INNER JOIN class_group cg ON uc.class_group_id = cg.id 
					INNER JOIN subjects_class_groups sc ON cg.id = sc.class_group_id 
					INNER JOIN subjects sj ON sc.subjects_id = sj.id
					INNER JOIN laboratory l ON sj.id = l.subject_id
					WHERE
						uc.users_id = @studentId AND
						l.id = @labId
				)
				THEN
					SELECT lu.id, lu.state
					INTO @labUserId, @labState
					FROM
						laboratories_users lu
					WHERE
						lu.laboratory_id = @labId AND
						lu.user_id = @studentId;

					IF( (@labState IS NULL) OR ( (@labState IS NOT NULL) && @labState = '0')  )
					THEN
						SELECT 
							l.lab_code
						INTO
							@labCode
						FROM
							laboratory l
						WHERE
							l.id = @labId;

						IF @labUserId IS NULL
						THEN
							INSERT INTO
								laboratories_users
							(
								user_id,
								laboratory_id,
								state,
								delivery_date,
								attempts,
								delivery_time,
								app_score
							)
							VALUES
							(
								@studentId,
								@labId,
								"1",
								delivery_date,
								attempts,
								delivery_time,
								app_score
							);
							SELECT 'true' as state, 'LAB_INSERTED' as res_code;	
							SET @labUserId = LAST_INSERT_ID();
							SELECT @labUserId as labUserId;


							UPDATE 
								laboratories_users
							SET
								report_url = CONCAT('reports/' , @labUserId , '_' , @labCode , fileExt )
							WHERE
								id = @labUserId;
						ELSE
							UPDATE laboratories_users lu
							SET
								lu.state = "1",
								lu.delivery_date = delivery_date,
								lu.report_url = CONCAT('reports/' , @labUserId , '_' , @labCode , fileExt ),
								lu.attempts = attempts,
								lu.delivery_time = delivery_time,
								lu.app_score = app_score
							WHERE
								lu.id = @labUserId;
							SELECT 'true' as state, 'LAB_UPDATED' as res_code;	
							SELECT @labUserId as labUserId;
						END IF;
					ELSE
						SELECT 'true' as state, 'LAB_DELIVERED' as res_code;
					END IF;
				ELSE
					SELECT 'true' as state, 'LAB_NOT_ASSIGNED' as res_code;
				END IF;
			ELSE
				SELECT 'true' as state, 'USER_NOT_FOUND' as res_code;
			END IF;
		ELSE
			SELECT 'true' as state, 'LAB_NOT_FOUND' as res_code;
		END IF;
	ELSE
		SELECT 'true' as state, 'LICENSE_EXPIRED' as res_code;
	END IF;

		
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for get_ranking_params
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_ranking_params`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_ranking_params`()
BEGIN
	SELECT
		(
			SELECT
				`value`
			FROM
				app_params
			WHERE
				`name` = 'LICENSE_STATE'
		) as license,
		(
			SELECT
				`value`
			FROM
				app_params
			WHERE
				`name` = 'RANK_SEND_ENABLED'
		) as rank_enabled,
		(
			SELECT
				`value`
			FROM
				app_params
			WHERE
				`name` = 'SCHOOL_NAME'
		) as schoolName,
		(
			SELECT
				`value`
			FROM
				app_params
			WHERE
				`name` = 'COUNTRY'
		) as country,
		(
			SELECT
				`value`
			FROM
				app_params
			WHERE
				`name` = 'CITY'
		) as city,
		(
			SELECT
				CASE WHEN `value` IS NULL THEN -1 ELSE `value` END
			FROM
				app_params
			WHERE
				`name` = 'SCHOOL_ID'
		) as schoolId;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for get_rank_grp_by_grp
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_rank_grp_by_grp`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_rank_grp_by_grp`(IN `groupId` int)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE usrId INT DEFAULT NULL;
	DECLARE userName VARCHAR(100) DEFAULT NULL;

	DECLARE labScore DOUBLE DEFAULT NULL;
	DECLARE labDeliv DOUBLE DEFAULT NULL;
	DECLARE labTime DOUBLE DEFAULT NULL;

	DECLARE perform DOUBLE DEFAULT NULL;
	DECLARE timeAvg DOUBLE DEFAULT NULL;
	DECLARE rankScore DOUBLE DEFAULT NULL;

	DECLARE cur1 CURSOR FOR (
		SELECT
			u.id,
			CONCAT(u.`name`,' ',u.last_name) as userName
		FROM
			users u
		INNER JOIN users_class_groups uc ON u.id = uc.users_id
		WHERE
			uc.class_group_id = groupId AND
			u.rols_id = 4
	);
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	DROP TABLE IF EXISTS rankingTable;
	CREATE TEMPORARY TABLE rankingTable (
		userId int, 
		userName varchar(100), 
		lScore double,
		lDeliv double,
		lTime double,
		prform double,
		tmeAvg double,
		rnkScore double
	); 

	OPEN cur1;

	read_loop: LOOP
    FETCH cur1 INTO usrId, userName;
    IF done THEN
      LEAVE read_loop;
    END IF;

		SET labScore = NULL;
		SET labTime = NULL;
		SET labDeliv = NULL;

		SELECT
			(SUM(lu.final_score) * 20), (TIME_TO_SEC(lu.delivery_time) / 60), COUNT(lu.final_score)
		INTO labScore, labTime, labDeliv
		FROM
			laboratories_users lu
		WHERE
			lu.user_id = usrId;
		
		IF labScore IS NOT NULL AND labTime IS NOT NULL
		THEN
			SET perform = labScore / labDeliv;
			SET timeAvg = labTime / labDeliv;
			SET rankScore = labScore * ( perform + (labDeliv / timeAvg) );

			INSERT INTO
				rankingTable (userId, userName, lScore, lDeliv, lTime, prform, tmeAvg, rnkScore)
			SELECT usrId, userName, labScore, labDeliv, labTime, perform, timeAvg, rankScore;
		ELSE
			INSERT INTO
				rankingTable (userId, userName, lScore, lDeliv, lTime, prform, tmeAvg, rnkScore)
			SELECT usrId, userName, NULL, NULL, NULL, NULL, NULL, NULL;		
		END IF;
  END LOOP;

  CLOSE cur1;

	SELECT
		@rownum:=@rownum+1 AS rank,
		rt.userId as user_id,
		rt.userName as `name`,
		CASE WHEN lScore IS NULL THEN '' ELSE ROUND(lScore,1) END as lScore,
		CASE WHEN lDeliv IS NULL THEN '' ELSE ROUND(lDeliv,1) END as lDeliv,
		CASE WHEN lTime IS NULL THEN '' ELSE ROUND(lTime,1) END as lTime,
		CASE WHEN prform IS NULL THEN '' ELSE ROUND(prform,1) END as prform,
		CASE WHEN tmeAvg IS NULL THEN '' ELSE ROUND(tmeAvg,1) END as tmeAvg,
		CASE WHEN rnkScore IS NULL THEN '' ELSE ROUND(rnkScore,1) END as rnkScore
	FROM
		(SELECT @rownum:=0) r, (SELECT * FROM rankingTable ORDER BY rnkScore DESC) rt;

	DROP TABLE IF EXISTS rankingTable;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for get_rank_grp_by_stud
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_rank_grp_by_stud`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_rank_grp_by_stud`(IN `userId` int)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE usrId INT DEFAULT NULL;
	DECLARE userName VARCHAR(100) DEFAULT NULL;
	DECLARE groupId INT DEFAULT NULL;

	DECLARE labScore DOUBLE DEFAULT NULL;
	DECLARE labDeliv DOUBLE DEFAULT NULL;
	DECLARE labTime DOUBLE DEFAULT NULL;

	DECLARE perform DOUBLE DEFAULT NULL;
	DECLARE timeAvg DOUBLE DEFAULT NULL;
	DECLARE rankScore DOUBLE DEFAULT NULL;

	DECLARE cur1 CURSOR FOR (
		SELECT
			u.id,
			CONCAT(u.`name`,' ',u.last_name) as userName
		FROM
			users u
		INNER JOIN users_class_groups uc ON u.id = uc.users_id
		WHERE
			uc.class_group_id = 
			(
				SELECT
					uc.class_group_id
				FROM
					users_class_groups uc 
				INNER JOIN users u ON uc.users_id = u.id
				WHERE
					u.id = userId
			)AND
			u.rols_id = 4
	);
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	DROP TABLE IF EXISTS rankingTable;
	CREATE TEMPORARY TABLE rankingTable (
		userId int, 
		userName varchar(100), 
		lScore double,
		lDeliv double,
		lTime double,
		prform double,
		tmeAvg double,
		rnkScore double
	); 
	
	SET groupId = 
		(
			SELECT
				uc.class_group_id
			FROM
				users_class_groups uc 
			INNER JOIN users u ON uc.users_id = u.id
			WHERE
				u.id = userId
		);

	OPEN cur1;

	read_loop: LOOP
    FETCH cur1 INTO usrId, userName;
    IF done THEN
      LEAVE read_loop;
    END IF;

		SET labScore = NULL;
		SET labTime = NULL;
		SET labDeliv = NULL;

		SELECT
			(SUM(lu.final_score) * 20), (TIME_TO_SEC(lu.delivery_time) / 60), COUNT(lu.final_score)
		INTO labScore, labTime, labDeliv
		FROM
			laboratories_users lu
		WHERE
			lu.user_id = usrId;
		
		IF labScore IS NOT NULL AND labTime IS NOT NULL
		THEN
			SET perform = labScore / labDeliv;
			SET timeAvg = labTime / labDeliv;
			SET rankScore = labScore * ( perform + (labDeliv / timeAvg) );

			INSERT INTO
				rankingTable (userId, userName, lScore, lDeliv, lTime, prform, tmeAvg, rnkScore)
			SELECT usrId, userName, labScore, labDeliv, labTime, perform, timeAvg, rankScore;
		ELSE
			INSERT INTO
				rankingTable (userId, userName, lScore, lDeliv, lTime, prform, tmeAvg, rnkScore)
			SELECT usrId, userName, NULL, NULL, NULL, NULL, NULL, NULL;		
		END IF;
  END LOOP;

  CLOSE cur1;

	SELECT
		@rownum:=@rownum+1 AS rank,
		rt.userId as user_id,
		rt.userName as `name`,
		CASE WHEN lScore IS NULL THEN '' ELSE ROUND(lScore,1) END as lScore,
		CASE WHEN lDeliv IS NULL THEN '' ELSE ROUND(lDeliv,1) END as lDeliv,
		CASE WHEN lTime IS NULL THEN '' ELSE ROUND(lTime,1) END as lTime,
		CASE WHEN prform IS NULL THEN '' ELSE ROUND(prform,1) END as prform,
		CASE WHEN tmeAvg IS NULL THEN '' ELSE ROUND(tmeAvg,1) END as tmeAvg,
		CASE WHEN rnkScore IS NULL THEN '' ELSE ROUND(rnkScore,1) END as rnkScore
	FROM
		(SELECT @rownum:=0) r, (SELECT * FROM rankingTable ORDER BY rnkScore DESC) rt;

	DROP TABLE IF EXISTS rankingTable;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for get_rank_school
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_rank_school`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_rank_school`()
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE usrId INT DEFAULT NULL;
	DECLARE userName VARCHAR(100) DEFAULT NULL;

	DECLARE labScore DOUBLE DEFAULT NULL;
	DECLARE labDeliv DOUBLE DEFAULT NULL;
	DECLARE labTime DOUBLE DEFAULT NULL;

	DECLARE perform DOUBLE DEFAULT NULL;
	DECLARE timeAvg DOUBLE DEFAULT NULL;
	DECLARE rankScore DOUBLE DEFAULT NULL;

	DECLARE cur1 CURSOR FOR (
		SELECT
			u.id,
			CONCAT(u.`name`,' ',u.last_name) as userName
		FROM
			users u
		WHERE
			u.rols_id = 4
	);
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	DROP TABLE IF EXISTS rankingTable;
	CREATE TEMPORARY TABLE rankingTable (
		userId int, 
		userName varchar(100), 
		lScore double,
		lDeliv double,
		lTime double,
		prform double,
		tmeAvg double,
		rnkScore double
	); 

	OPEN cur1;
	read_loop: LOOP
    FETCH cur1 INTO usrId, userName;
    IF done THEN
      LEAVE read_loop;
    END IF;

		SET labScore = NULL;
		SET labTime = NULL;
		SET labDeliv = NULL;

		SELECT
			(SUM(lu.final_score) * 20), (TIME_TO_SEC(lu.delivery_time) / 60), COUNT(lu.final_score)
		INTO labScore, labTime, labDeliv
		FROM
			laboratories_users lu
		WHERE
			lu.user_id = usrId;
		
		IF labScore IS NOT NULL AND labTime IS NOT NULL
		THEN
			SET perform = labScore / labDeliv;
			SET timeAvg = labTime / labDeliv;
			SET rankScore = labScore * ( perform + (labDeliv / timeAvg) );

			INSERT INTO
				rankingTable (userId, userName, lScore, lDeliv, lTime, prform, tmeAvg, rnkScore)
			SELECT usrId, userName, labScore, labDeliv, labTime, perform, timeAvg, rankScore;
		ELSE
			INSERT INTO
				rankingTable (userId, userName, lScore, lDeliv, lTime, prform, tmeAvg, rnkScore)
			SELECT usrId, userName, NULL, NULL, NULL, NULL, NULL, NULL;		
		END IF;
  END LOOP;

  CLOSE cur1;

	SELECT
		@rownum:=@rownum+1 AS rank,
		rt.userId as user_id,
		rt.userName as `name`,
		CASE WHEN lScore IS NULL THEN '' ELSE ROUND(lScore,1) END as lScore,
		CASE WHEN lDeliv IS NULL THEN '' ELSE ROUND(lDeliv,0) END as lDeliv,
		CASE WHEN lTime IS NULL THEN '' ELSE ROUND(lTime,1) END as lTime,
		CASE WHEN prform IS NULL THEN '' ELSE ROUND(prform,1) END as prform,
		CASE WHEN tmeAvg IS NULL THEN '' ELSE ROUND(tmeAvg,1) END as tmeAvg,
		CASE WHEN rnkScore IS NULL THEN '' ELSE ROUND(rnkScore,0) END as rnkScore
	FROM
		(SELECT @rownum:=0) r, (SELECT * FROM rankingTable ORDER BY rnkScore DESC) rt;

	DROP TABLE IF EXISTS rankingTable;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for get_rank_school_report
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_rank_school_report`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_rank_school_report`()
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE usrId INT DEFAULT NULL;
	DECLARE userName VARCHAR(100) DEFAULT NULL;
	DECLARE userLastName VARCHAR(100) DEFAULT NULL;
	DECLARE classGroup VARCHAR(100) DEFAULT NULL;

	DECLARE labScore DOUBLE DEFAULT NULL;
	DECLARE labDeliv DOUBLE DEFAULT NULL;
	DECLARE labTime DOUBLE DEFAULT NULL;

	DECLARE perform DOUBLE DEFAULT NULL;
	DECLARE timeAvg DOUBLE DEFAULT NULL;
	DECLARE rankScore DOUBLE DEFAULT NULL;

	DECLARE cur1 CURSOR FOR (
		SELECT
			u.id,
			u.`name` as userName,
			u.last_name as userName,
			cg.`name` as classGroup
		FROM
			users u
		INNER JOIN users_class_groups ucg ON u.id = ucg.users_id
		INNER JOIN class_group cg ON ucg.class_group_id = cg.id
		WHERE
			u.rols_id = 4
	);
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	DROP TABLE IF EXISTS rankingTable;
	CREATE TEMPORARY TABLE rankingTable (
		userId int, 
		userName varchar(100), 
		userLastName varchar(100), 
		classGroup varchar(100), 
		lScore double,
		lDeliv double,
		lTime double,
		prform double,
		tmeAvg double,
		rnkScore double
	); 

	OPEN cur1;
	read_loop: LOOP
    FETCH cur1 INTO usrId, userName, userLastName, classGroup;
    IF done THEN
      LEAVE read_loop;
    END IF;

		SET labScore = NULL;
		SET labTime = NULL;
		SET labDeliv = NULL;

		SELECT
			(SUM(lu.final_score) * 20), (TIME_TO_SEC(lu.delivery_time) / 60), COUNT(lu.final_score)
		INTO labScore, labTime, labDeliv
		FROM
			laboratories_users lu
		WHERE
			lu.user_id = usrId;
		
		IF labScore IS NOT NULL AND labTime IS NOT NULL
		THEN
			SET perform = labScore / labDeliv;
			SET timeAvg = labTime / labDeliv;
			SET rankScore = labScore * ( perform + (labDeliv / timeAvg) );

			INSERT INTO
				rankingTable (userId, userName, userLastName, classGroup, lScore, lDeliv, lTime, prform, tmeAvg, rnkScore)
			SELECT usrId, userName, userLastName, classGroup, labScore, labDeliv, labTime, perform, timeAvg, rankScore;
		ELSE
			INSERT INTO
				rankingTable (userId, userName, userLastName, classGroup, lScore, lDeliv, lTime, prform, tmeAvg, rnkScore)
			SELECT usrId, userName, userLastName, classGroup, NULL, NULL, NULL, NULL, NULL, NULL;		
		END IF;
  END LOOP;

  CLOSE cur1;

	SELECT
		@rownum:=@rownum+1 AS rank,
		rt.userId as id,
		rt.userName as `name`,
		rt.userLastName as last_name,
		rt.classGroup as class_group,
		CASE WHEN lDeliv IS NULL THEN '' ELSE ROUND(lDeliv,0) END as labsDelivery,
		CASE WHEN rnkScore IS NULL THEN '' ELSE ROUND(rnkScore,0) END as score
	FROM
		(SELECT @rownum:=0) r, (SELECT * FROM rankingTable ORDER BY rnkScore DESC) rt;

	DROP TABLE IF EXISTS rankingTable;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for groups_asign_user
-- ----------------------------
DROP PROCEDURE IF EXISTS `groups_asign_user`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `groups_asign_user`(IN `userId` int,IN `groupId` int)
BEGIN
	#Routine body goes here...
	DELETE FROM
		messages_all
	WHERE
		user_id = userId;

	DELETE
		m.*
	FROM
		messages m
	INNER JOIN users_class_groups ucg ON ucg.id = m.user_class_groups_id
	WHERE
		ucg.users_id = userId AND
		ucg.class_group_id = groupId;

	DELETE 
		ugs.*
	FROM
		user_group_subjects ugs
	INNER JOIN users_class_groups ucg ON ucg.id = ugs.ucg_id
	WHERE
		ucg.users_id = userId AND
		ucg.class_group_id = groupId;

	DELETE 
	FROM
		users_class_groups
	WHERE
		users_id = userId AND
		class_group_id = groupId;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for groups_edit
-- ----------------------------
DROP PROCEDURE IF EXISTS `groups_edit`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `groups_edit`(IN `groupId` int,IN `groupName` varchar(100))
BEGIN
	IF (
		NOT EXISTS (
			SELECT
				id 
			FROM
				class_group
			WHERE
				`name` = groupName
		)
	)
	THEN
		UPDATE
			class_group
		SET
			`name` = groupName
		WHERE
			id = groupId;
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for groups_insert
-- ----------------------------
DROP PROCEDURE IF EXISTS `groups_insert`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `groups_insert`(IN `groupName` varchar(100))
BEGIN
	IF (
		NOT EXISTS (
			SELECT
				id 
			FROM
				class_group
			WHERE
				`name` = groupName
		)
	)
	THEN
		INSERT INTO
			class_group
		(
			`name`
		)
		VALUES
		(
			groupName
		);
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for laboratories_create
-- ----------------------------
DROP PROCEDURE IF EXISTS `laboratories_create`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `laboratories_create`(IN `subjectId` int,IN `labName` varchar(100),IN `lesson` varchar(100),IN `labCode` varchar(100))
BEGIN
	#Routine body goes here...
	IF (
		NOT EXISTS (
			SELECT
				id 
			FROM
				laboratory
			WHERE
				`name` = labName AND
				subject_id = subjectId
		) AND
		NOT EXISTS (
			SELECT
				id 
			FROM
				laboratory
			WHERE
				lab_code = labCode
		)
	)
	THEN
		INSERT INTO
			laboratory
		(
			lab_code,
			subject_id,
			`name`,
			lesson_name
		)
		VALUES
		(
			labCode,
			subjectId,
			labName,
			lesson
		);
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for laboratories_delete
-- ----------------------------
DROP PROCEDURE IF EXISTS `laboratories_delete`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `laboratories_delete`(IN `labId` int)
BEGIN
	DELETE FROM
		laboratories_users
	WHERE
		laboratory_id = labId;

	DELETE FROM
		laboratory
	WHERE
		id = labId;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for laboratories_edit
-- ----------------------------
DROP PROCEDURE IF EXISTS `laboratories_edit`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `laboratories_edit`(IN `labId` int, IN `subjectId` int,IN `labName` varchar(100),IN `lesson` varchar(100),IN `labCode` varchar(100))
BEGIN
	#Routine body goes here...
	IF (
		NOT EXISTS (
			SELECT
				id 
			FROM
				laboratory
			WHERE
				`name` = labName AND
				subject_id = subjectId AND
				id <> labId
		) AND
		NOT EXISTS (
			SELECT
				id 
			FROM
				laboratory
			WHERE
				lab_code = labCode AND
				id <> labId
		)
	)
	THEN
		UPDATE
			laboratory
		SET
			`name` = labName,
			lab_code = labCode,
			lesson_name = lesson
		WHERE
			id = labId;
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for laboratories_validate
-- ----------------------------
DROP PROCEDURE IF EXISTS `laboratories_validate`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `laboratories_validate`(IN `labName` varchar(100),IN `lesson` varchar(100),IN `subName` varchar(100),IN `labCode` varchar(100))
BEGIN
	#Routine body goes here...
	IF (
		NOT EXISTS (
			SELECT
				l.id 
			FROM
				laboratory l
			INNER JOIN subjects s ON l.subject_id = s.id 
			WHERE
				l.`name` = labName AND
				s.`name` = subName
		) AND
		NOT EXISTS (
			SELECT
				id 
			FROM
				laboratory
			WHERE
				lab_code = labCode
		)
	)
	THEN
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for license_activate
-- ----------------------------
DROP PROCEDURE IF EXISTS `license_activate`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `license_activate`(IN `licenseNum` varchar(100),IN `state` varchar(100),IN `offlineAttempts` varchar(100))
BEGIN
	UPDATE
		app_params
	SET
		`value` = licenseNum
	WHERE
		`name` = 'LICENSE';

	UPDATE
		app_params
	SET
		`value` = state
	WHERE
		`name` = 'LICENSE_STATE';

	UPDATE
		app_params
	SET
		`value` = offlineAttempts
	WHERE
		`name` = 'OFFLINE_ATTEMPTS';
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for students_put_lab
-- ----------------------------
DROP PROCEDURE IF EXISTS `students_put_lab`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `students_put_lab`(IN `labUserId` int, IN `fileExt` varchar(100), IN `userId` varchar(100), IN `labId` varchar(100))
BEGIN
	SET @labCode = NULL;
	SET @labUserId = NULL;

	SELECT
		l.lab_code
	INTO
		@labCode
	FROM
		laboratory l
	WHERE
		l.id = labId;

	IF(labUserId IS NOT NULL)
	THEN
		IF(
			NOT EXISTS (
				SELECT
					*
				FROM
					laboratories_users lu
				WHERE
					lu.id = labUserId AND
					lu.state = '1'
			)
		)
		THEN
			UPDATE
				laboratories_users lu
			SET
				lu.state = '1',
				lu.delivery_date = NOW(),
				lu.report_url = CONCAT('reports/', labUserId, '_', @labCode, fileExt),
				lu.attempts = NULL,
				lu.delivery_time = NULL,
				lu.teacher_score = NULL,
				lu.app_score = NULL,
				lu.comments = NULL
			WHERE
				lu.id = labUserId;

			SELECT 'true' as state, 'LAB_UPDATED' as res_code, @labCode as lab_code, labUserId as lab_user_id;
		ELSE
			SELECT 'true' as state, 'LAB_DELIVERED' as res_code;
		END IF;
	ELSE
		INSERT INTO
			laboratories_users
		(
			user_id,
			laboratory_id,
			state,
			delivery_date
		)
		VALUES
		(
			userId,
			labId,
			1,
			NOW()
		);

		SET @labUserId = LAST_INSERT_ID();

		UPDATE 
			laboratories_users
		SET
			report_url = CONCAT('reports/' , @labUserId , '_' , @labCode , fileExt )
		WHERE
			id = @labUserId;
		SELECT 'true' as state, 'LAB_INSERTED' as res_code, @labCode as lab_code, LAST_INSERT_ID() as lab_user_id;
	END IF;
	

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for subjects_delete
-- ----------------------------
DROP PROCEDURE IF EXISTS `subjects_delete`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subjects_delete`(IN `subjectId` int)
BEGIN
	# LESSONS
	DELETE
		le.*
	FROM
		lessons le
	WHERE
		subject_id = subjectId;

	# GROUPS
	DELETE  
		ugs.* 
	FROM 
		user_group_subjects ugs 
	INNER JOIN subjects_class_groups scg ON ugs.sc_id = scg.id 
	WHERE 
		scg.subjects_id = subjectId;

	DELETE FROM
		subjects_class_groups
	WHERE
		subjects_id = subjectId;

	# LABORATORIES
	DELETE  
		lu.* 
	FROM 
		laboratories_users lu 
	INNER JOIN laboratory l ON lu.laboratory_id = l.id
	WHERE
		l.subject_id = subjectId;

	DELETE FROM
		laboratory
	WHERE
		subject_id = subjectId;

	# SUBJECT
	DELETE FROM
		subjects
	WHERE
		id = subjectId;
	
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for subjects_d_grp_sub
-- ----------------------------
DROP PROCEDURE IF EXISTS `subjects_d_grp_sub`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subjects_d_grp_sub`(IN `groupId` int,IN `subId` int)
BEGIN
	DELETE  
		ugs.* 
	FROM 
		user_group_subjects ugs 
	INNER JOIN subjects_class_groups scg ON ugs.sc_id = scg.id 
	WHERE 
		scg.subjects_id = subId AND 
		scg.class_group_id = groupId; 
	DELETE FROM 
		subjects_class_groups 
	WHERE 
		class_group_id = groupId AND 
		subjects_id = subId;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for subjects_edit
-- ----------------------------
DROP PROCEDURE IF EXISTS `subjects_edit`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subjects_edit`(IN `SubId` varchar(100),IN `subName` varchar(100))
BEGIN
	IF (
		NOT EXISTS (
			SELECT
				id 
			FROM
				subjects
			WHERE
				`name` = subName
		)
	)
	THEN
		UPDATE
			subjects
		SET
			`name` = subName
		WHERE
			id = SubId;
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for subjects_insert
-- ----------------------------
DROP PROCEDURE IF EXISTS `subjects_insert`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subjects_insert`(IN `subName` varchar(100))
BEGIN
	#Routine body goes here...
	
	IF (
		NOT EXISTS (
			SELECT
				id 
			FROM
				subjects
			WHERE
				`name` = subName
		)
	)
	THEN
		INSERT INTO
			subjects
		(
			`name`
		)
		VALUES
		(
			subName
		);
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for uploads_labs
-- ----------------------------
DROP PROCEDURE IF EXISTS `uploads_labs`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uploads_labs`()
BEGIN
	DECLARE suName VARCHAR(100) DEFAULT NULL;
	DECLARE leName VARCHAR(100) DEFAULT NULL;
	DECLARE laCode VARCHAR(100) DEFAULT NULL;
	DECLARE laName VARCHAR(100) DEFAULT NULL;

	DECLARE dataOk INT DEFAULT 1;

	DECLARE suId INT DEFAULT NULL;

	DECLARE cur1 CURSOR FOR ( SELECT * FROM temp_labs );
	DECLARE cur2 CURSOR FOR ( SELECT * FROM temp_labs );

	# FORMAT VALIDATE
	SET @materia = NULL, 
			@unidad = NULL, 
			@codigo = NULL, 
			@nombrePrac = NULL;

	SELECT 
		subName,
		lessonName,
		labCode,
		labName
	INTO
		@materia, @unidad, @codigo, @nombrePrac
	FROM
		temp_labs
	LIMIT 1;

	IF(
		@materia = '﻿MATERIA' AND
		@unidad = 'UNIDAD' AND
		@codigo = 'CODIGO' AND
		@nombrePrac = 'NOMBRE DE LA PRACTICA'
	)
	THEN
		DELETE FROM
			temp_labs
		LIMIT 1;

		OPEN cur1;
		BEGIN
			DECLARE exit_flag INT DEFAULT 0;
			DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;

			read_loop: LOOP
				FETCH cur1 INTO suName, leName, laCode, laName;
				IF exit_flag THEN
					LEAVE read_loop;
				END IF;

				SET suId = (
					SELECT
						s.id
					FROM
						subjects s
					WHERE
						`name` = suName
				);

				IF( suId IS NULL)
				THEN
					SET dataOk = 0;
					LEAVE read_loop;
				END IF;

				IF (
					EXISTS (
						SELECT
							id 
						FROM
							laboratory
						WHERE
							`name` = laName AND
							subject_id = suId
					) OR
					EXISTS (
						SELECT
							l.id 
						FROM
							laboratory l
						WHERE
							l.lab_code = laCode
					)
				)
				THEN
					SET dataOk = 0;
					LEAVE read_loop;
				END IF;
			END LOOP;
		END;

		CLOSE cur1;
		IF(dataOk = 1)
		THEN
			OPEN cur2;
			BEGIN
				DECLARE exit_flag INT DEFAULT 0;
				DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;

				read_loop_2: LOOP
					FETCH cur2 INTO suName, leName, laCode, laName;
					IF exit_flag THEN
						LEAVE read_loop_2;
					END IF;

					SET suId = (
						SELECT
							s.id
						FROM
							subjects s
						WHERE
							`name` = suName
					);

					INSERT INTO
						laboratory
					(
						lab_code,
						subject_id,
						`name`,
						lesson_name
					)
					VALUES
					(
						laCode,
						suId,
						laName,
						leName
					);
				END LOOP;
			END;
			CLOSE cur2;

			DELETE FROM temp_labs;
			SELECT 'true' as state, 'QUERY_OK' as res_code;
		ELSE
			SELECT 'true' as state, 'WRONG_DATA' as res_code;
		END IF;
	ELSE
		SELECT 'true' as state, 'WRONG_DATA' as res_code;
	END IF;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for uploads_users
-- ----------------------------
DROP PROCEDURE IF EXISTS `uploads_users`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uploads_users`()
BEGIN
	DECLARE uType VARCHAR(100) DEFAULT NULL;
	DECLARE usr VARCHAR(100) DEFAULT NULL;
	DECLARE pss VARCHAR(100) DEFAULT NULL;
	DECLARE usrName VARCHAR(100) DEFAULT NULL;
	DECLARE usrLastName VARCHAR(100) DEFAULT NULL;
	DECLARE uGroup VARCHAR(100) DEFAULT NULL;

	DECLARE dataOk INT DEFAULT 1;

	DECLARE gId INT DEFAULT NULL;

	DECLARE cur1 CURSOR FOR ( SELECT * FROM temp_users );
	DECLARE cur2 CURSOR FOR ( SELECT * FROM temp_users );

	# FORMAT VALIDATE
	SET @tipo = NULL, 
			@usuario = NULL, 
			@contras = NULL, 
			@nombre = NULL, 
			@apellido = NULL, 
			@grupo = NULL;

	SELECT 
		*
	INTO
		@tipo, @usuario, @contras, @nombre, @apellido, @grupo
	FROM
		temp_users
	LIMIT 1;
					
	IF(
		@tipo = 'TIPO' AND
		@usuario = 'USUARIO' AND
		@contras = 'CONTRASEÑA' AND
		@nombre = 'NOMBRE' AND
		@apellido = 'APELLIDO' AND
		@grupo = 'GRUPO'
	)
	THEN
		DELETE FROM
			temp_users
		LIMIT 1;
		
		OPEN cur1;
		BEGIN
			DECLARE exit_flag INT DEFAULT 0;
			DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;

			read_loop: LOOP
				FETCH cur1 INTO uType, usr, pss, usrName, usrLastName, uGroup;
				IF exit_flag THEN
					LEAVE read_loop;
				END IF;

				SET gId = (
					SELECT
						cg.id
					FROM
						class_group cg
					WHERE
						cg.`name` = uGroup
				);

				IF( gId IS NULL AND uType = 'ESTUDIANTE')
				THEN
					SET dataOk = 0;	
					SELECT 'GROUP', uGroup;
					LEAVE read_loop;
				END IF;

				IF (
					EXISTS (
						SELECT
							id 
						FROM
							users
						WHERE
							`name` = usrName AND
							last_name = usrLastName
					) OR
					EXISTS (
						SELECT
							id 
						FROM
							users
						WHERE
							`user` = usr
					)
				)
				THEN
					SET dataOk = 0;
					SELECT 'USER';
					LEAVE read_loop;
				END IF;
			END LOOP;
		END;
		CLOSE cur1;

		IF(dataOk = 1)
		THEN
			OPEN cur2;
			BEGIN
				DECLARE exit_flag INT DEFAULT 0;
				DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;

				read_loop_2: LOOP
					FETCH cur2 INTO uType, usr, pss, usrName, usrLastName, uGroup;
					IF exit_flag THEN
						LEAVE read_loop_2;
					END IF;

					SET gId = (
						SELECT
							cg.id
						FROM
							class_group cg
						WHERE
							cg.`name` = uGroup
					);

					IF( gId IS NOT NULL AND uType = 'ESTUDIANTE')
					THEN
						INSERT INTO
							users
						(
							`user`,
							pass,
							`name`,
							last_name,
							rols_id						
						)
						VALUES
						(
							usr,
							MD5(pss),
							usrName,
							usrLastName,
							4
						);

						SET @userId = LAST_INSERT_ID();
						INSERT INTO
							users_class_groups
						(
							users_id,
							class_group_id
						)
						VALUES
						(
							@userId,
							gId
						);
					ELSE
						INSERT INTO
							users
						(
							`user`,
							pass,
							`name`,
							last_name,
							rols_id						
						)
						VALUES
						(
							usr,
							MD5(pss),
							usrName,
							usrLastName,
							3
						);
					END IF;
					
				END LOOP;
			END;
			CLOSE cur2;

			DELETE FROM temp_labs;
			SELECT 'true' as state, 'QUERY_OK' as res_code;
		ELSE
			SELECT 'true' as state, 'WRONG_DATA' as res_code;
		END IF;
	ELSE
		SELECT 'true' as state, 'WRONG_DATA' as res_code;
	END IF;

	

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for users_assign_stud
-- ----------------------------
DROP PROCEDURE IF EXISTS `users_assign_stud`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_assign_stud`(IN `studId` int,IN `groupId` int)
BEGIN
	SET @ugId = NULL;
	SET @groupId = NULL;

	SELECT
		uc.id,
		uc.class_group_id
	INTO @ugId, @groupId
	FROM
		users_class_groups uc
	WHERE
		uc.users_id = studId;

	IF (@ugId IS NOT NULL AND @groupId <> groupId)
	THEN
		DELETE FROM
			laboratories_users
		WHERE
			user_id = studId;

		DELETE FROM
			messages
		WHERE
			user_class_groups_id = @ugId;

		DELETE FROM
			user_group_subjects
		WHERE
			ucg_id = @ugId;

		DELETE FROM
			users_class_groups
		WHERE
			id = @ugId;
	END IF;

	IF(@groupId <> groupId OR @groupId IS NULL)
	THEN
		IF(
			NOT EXISTS(
				SELECT 
					*
				FROM
					users_class_groups uc
				WHERE
					uc.users_id = studId AND
					uc.class_group_id = groupId
			)
		)
		THEN
			INSERT INTO
				users_class_groups
			(
				users_id,
				class_group_id
			)
			VALUES
			(
				studId,
				groupId
			);
			SELECT 'true' as state;
		ELSE
			SELECT 'true' as state;
		END IF;
	ELSE
		SELECT 'true' as state;
	END IF; 
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for users_edit
-- ----------------------------
DROP PROCEDURE IF EXISTS `users_edit`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_edit`(IN `userId` int,IN `userName` varchar(100),IN `lastName` varchar(100))
BEGIN
	IF (
		NOT EXISTS (
			SELECT
				id 
			FROM
				users
			WHERE
				`name` = userName AND
				last_name = lastName
		)
	)
	THEN
		UPDATE
			users
		SET
			`name` = userName,
			last_name = lastName
		WHERE
			id = userId;
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for users_insert
-- ----------------------------
DROP PROCEDURE IF EXISTS `users_insert`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `users_insert`(IN `userName` varchar(100),IN `lastName` varchar(100),IN `rolId` varchar(100))
BEGIN
	IF (
		NOT EXISTS (
			SELECT
				id 
			FROM
				users
			WHERE
				`name` = userName AND
				last_name = lastName
		)
	)
	THEN
		INSERT INTO
			users
		(
			`name`,
			last_name,
			rols_id
		)
		VALUES
		(
			userName,
			lastName,
			rolId
		);
		SELECT 'OK' as state;
	ELSE
		SELECT 'REPEATED' as state;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for user_delete
-- ----------------------------
DROP PROCEDURE IF EXISTS `user_delete`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_delete`(IN `userId` int)
BEGIN
		#RANKING
		DELETE FROM
			ranking
		WHERE
			user_id = userId;

		#MESSAGES_ALL
		DELETE FROM
			messages_all
		WHERE
			user_id = userId;

		#LABORATORIES_USERS
		DELETE FROM
			laboratories_users
		WHERE
			user_id = userId;

		#MESSAGES
		DELETE 
			m.*
		FROM
			messages m
		INNER JOIN users_class_groups ucg ON m.user_class_groups_id = ucg.id 
		WHERE
			ucg.users_id = userId;

		#USERS_CLASS_GROUPS
		DELETE 
			us.*
		FROM
			user_group_subjects us
		INNER JOIN users_class_groups ucg ON us.ucg_id = ucg.id 
		WHERE
			ucg.users_id = userId;

		DELETE FROM
			users_class_groups
		WHERE
			users_id = userId;
		#----------------------------------

		# USERS
		DELETE FROM
			users
		WHERE
			id = userId;

END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `final_score_insert`;
DELIMITER ;;
CREATE TRIGGER `final_score_insert` BEFORE INSERT ON `laboratories_users` FOR EACH ROW BEGIN
	CASE 
		WHEN NEW.app_score IS NOT NULL AND NEW.teacher_score IS NOT NULL
			THEN
				SET NEW.final_score = (NEW.app_score + NEW.teacher_score) / 2;
			
		WHEN NEW.app_score IS NOT NULL AND NEW.teacher_score IS NULL
			THEN
				SET NEW.final_score = NEW.app_score;
			
		WHEN NEW.app_score IS NULL AND NEW.teacher_score IS NOT NULL
			THEN
				SET NEW.final_score = NEW.teacher_score;
			
		ELSE
				SET NEW.final_score = NULL;
			
	END CASE;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `final_score_update`;
DELIMITER ;;
CREATE TRIGGER `final_score_update` BEFORE UPDATE ON `laboratories_users` FOR EACH ROW BEGIN
	CASE 
		WHEN NEW.app_score IS NOT NULL AND NEW.teacher_score IS NOT NULL
			THEN
				SET NEW.final_score = (NEW.app_score + NEW.teacher_score) / 2;
			
		WHEN NEW.app_score IS NOT NULL AND NEW.teacher_score IS NULL
			THEN
				SET NEW.final_score = NEW.app_score;
			
		WHEN NEW.app_score IS NULL AND NEW.teacher_score IS NOT NULL
			THEN
				SET NEW.final_score = NEW.teacher_score;
			
		ELSE
				SET NEW.final_score = NULL;
			
	END CASE;
END
;;
DELIMITER ;
