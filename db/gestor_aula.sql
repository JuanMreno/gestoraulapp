/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80000
Source Host           : 127.0.0.1:3306
Source Database       : gestor_aula

Target Server Type    : MYSQL
Target Server Version : 80000
File Encoding         : 65001

Date: 2016-11-20 21:01:49
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_params
-- ----------------------------
INSERT INTO `app_params` VALUES ('1', 'SCHOOL_NAME', 'Instituto', 'EDITABLE', '2016-11-03 21:26:09', '2016-11-14 23:02:21');
INSERT INTO `app_params` VALUES ('2', 'COUNTRY', 'Colombia', 'EDITABLE', '2016-11-13 21:15:46', '2016-11-14 23:03:11');
INSERT INTO `app_params` VALUES ('3', 'CITY', 'Pereira', 'EDITABLE', '2016-11-13 21:15:55', '2016-11-14 23:03:11');
INSERT INTO `app_params` VALUES ('4', 'LICENSE', 'F45D-C3D5-DF48-RE78', 'EDITABLE', '2016-11-13 21:16:01', '2016-11-14 23:03:41');
INSERT INTO `app_params` VALUES ('5', 'RANK_SEND_ENABLED', '1', 'EDITABLE', '2016-11-13 21:16:24', '2016-11-14 23:15:56');
INSERT INTO `app_params` VALUES ('6', 'SERVER_NAME', 'Servidor', 'FIX', '2016-11-14 22:13:35', '2016-11-14 22:52:11');
INSERT INTO `app_params` VALUES ('7', 'SERVER_IP', '192.168.0.10', 'FIX', '2016-11-14 22:13:41', '2016-11-14 22:52:15');
INSERT INTO `app_params` VALUES ('8', 'LICENSE_PERIOD', '14/11/2016 - 31/12/2017', 'FIX', '2016-11-14 22:15:14', '2016-11-14 22:52:15');
INSERT INTO `app_params` VALUES ('9', 'DEVICE_NAME', 'Servidor', 'FIX', '2016-11-14 22:15:21', '2016-11-14 22:52:16');
INSERT INTO `app_params` VALUES ('10', 'LICENSE_NUM_USERS', '10', 'FIX', '2016-11-14 22:15:42', '2016-11-14 22:52:16');

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class_group
-- ----------------------------
INSERT INTO `class_group` VALUES ('1', '7-A', '2016-10-29 14:53:36', '2016-11-08 15:05:07');
INSERT INTO `class_group` VALUES ('2', '8-B', '2016-10-29 14:53:39', '2016-11-20 14:23:09');
INSERT INTO `class_group` VALUES ('3', '8-C', '2016-10-29 14:53:42', '2016-11-20 14:23:02');
INSERT INTO `class_group` VALUES ('4', '9-A', '2016-10-29 14:53:45', '2016-11-08 15:04:24');
INSERT INTO `class_group` VALUES ('5', '9-B', '2016-10-29 14:53:48', '2016-11-08 15:04:27');
INSERT INTO `class_group` VALUES ('6', '9-C', '2016-10-29 14:53:51', '2016-11-08 15:04:32');
INSERT INTO `class_group` VALUES ('7', '10-A', '2016-10-29 14:53:53', '2016-11-08 15:04:36');
INSERT INTO `class_group` VALUES ('8', '10-B', '2016-10-29 14:53:56', '2016-11-08 15:04:38');
INSERT INTO `class_group` VALUES ('9', '11-A', '2016-10-29 14:53:58', '2016-11-08 15:04:42');
INSERT INTO `class_group` VALUES ('10', '11-B', '2016-11-08 09:12:17', '2016-11-08 15:04:44');
INSERT INTO `class_group` VALUES ('11', '11-C', '2016-11-08 14:48:56', '2016-11-08 15:04:48');

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of laboratories_users
-- ----------------------------
INSERT INTO `laboratories_users` VALUES ('27', '1', '8', '1', '2016-11-17 09:02:58', '1', '00:12:50', 'reports/27_F001.xlsx', null, '3.5', '3.5', null, '2016-11-17 09:02:58', '2016-11-19 13:01:57');
INSERT INTO `laboratories_users` VALUES ('28', '1', '9', '1', '2016-11-17 09:14:10', '1', '00:15:10', 'reports/28_F002.xlsx', null, '4', '4', null, '2016-11-17 09:14:10', '2016-11-19 13:01:47');
INSERT INTO `laboratories_users` VALUES ('29', '1', '10', '1', '2016-11-17 20:22:22', null, null, 'reports/29_F003.pdf', null, '3', '3', null, '2016-11-17 20:22:22', '2016-11-19 15:52:15');
INSERT INTO `laboratories_users` VALUES ('30', '1', '11', '1', '2016-11-18 07:26:32', null, null, 'reports/30_F004.csv', null, null, null, null, '2016-11-18 07:26:32', '2016-11-18 07:26:32');
INSERT INTO `laboratories_users` VALUES ('31', '1', '12', '1', '2016-11-18 07:28:23', null, null, 'reports/31_F005.pdf', null, null, null, null, '2016-11-18 07:28:23', '2016-11-18 07:28:23');

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
) ENGINE=InnoDB AUTO_INCREMENT=373 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of laboratory
-- ----------------------------
INSERT INTO `laboratory` VALUES ('4', 'Q004', '2', '1', 'Dosiluciones', 'Compuestos', '2016-10-29 15:00:39', '2016-11-13 20:32:55');
INSERT INTO `laboratory` VALUES ('5', 'Q005', '2', '2', 'Índice de PH', 'Compuestos', '2016-10-29 15:00:49', '2016-11-13 20:32:55');
INSERT INTO `laboratory` VALUES ('6', 'Q006', '2', '2', 'Calidad del agua', 'Compuestos', '2016-10-29 15:00:53', '2016-11-13 20:32:55');
INSERT INTO `laboratory` VALUES ('7', 'Q007', '2', '2', 'Calorimetría', 'Compuestos', '2016-10-29 15:00:58', '2016-11-13 20:32:55');
INSERT INTO `laboratory` VALUES ('8', 'F001', '1', '1', 'Relación potencial', 'Mecanica', '2016-10-29 15:02:22', '2016-11-13 20:32:31');
INSERT INTO `laboratory` VALUES ('9', 'F002', '1', '1', 'Relación exponencial', 'Mecanica  compuestos fluidos', '2016-10-29 15:02:35', '2016-11-19 16:28:37');
INSERT INTO `laboratory` VALUES ('10', 'F003', '1', '1', 'Movimiento uniforme', 'Mecanica', '2016-10-29 15:02:45', '2016-11-13 20:32:31');
INSERT INTO `laboratory` VALUES ('11', 'F004', '1', '2', 'Movimiento parabólico', 'Mecanica', '2016-10-29 15:02:53', '2016-11-13 20:32:31');
INSERT INTO `laboratory` VALUES ('12', 'F005', '1', '2', 'MAS', 'Mecanica', '2016-10-29 15:02:57', '2016-11-13 20:32:31');
INSERT INTO `laboratory` VALUES ('13', 'F006', '1', '2', 'Péndulo simple', 'Mecanica', '2016-10-29 15:03:01', '2016-11-13 20:32:31');
INSERT INTO `laboratory` VALUES ('14', 'F007', '1', '2', 'Péndulo físico', 'Mecanica', '2016-10-29 15:03:11', '2016-11-13 20:32:31');

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
INSERT INTO `lessons` VALUES ('1', '1', 'Unidad 1', '2016-10-29 14:56:00', '2016-10-29 14:56:00');
INSERT INTO `lessons` VALUES ('2', '1', 'Unidad 2', '2016-10-29 14:56:12', '2016-10-29 14:56:44');
INSERT INTO `lessons` VALUES ('3', '1', 'Unidad 3', '2016-10-29 14:56:15', '2016-10-29 14:56:45');
INSERT INTO `lessons` VALUES ('4', '1', 'Unidad 4', '2016-10-29 14:56:16', '2016-10-29 14:56:45');
INSERT INTO `lessons` VALUES ('5', '1', 'Unidad 5', '2016-10-29 14:56:27', '2016-10-29 14:56:45');
INSERT INTO `lessons` VALUES ('6', '2', 'Unidad 1', '2016-10-29 14:56:30', '2016-10-29 14:56:48');
INSERT INTO `lessons` VALUES ('7', '2', 'Unidad 2', '2016-10-29 14:56:30', '2016-10-29 14:56:48');
INSERT INTO `lessons` VALUES ('8', '2', 'Unidad 3', '2016-10-29 14:56:30', '2016-10-29 14:56:48');
INSERT INTO `lessons` VALUES ('9', '2', 'Unidad 4', '2016-10-29 14:56:30', '2016-10-29 14:56:48');
INSERT INTO `lessons` VALUES ('10', '2', 'Unidad 5', '2016-10-29 14:56:30', '2016-10-29 14:56:48');
INSERT INTO `lessons` VALUES ('11', '3', 'Unidad 1', '2016-10-29 14:56:31', '2016-10-29 14:56:51');
INSERT INTO `lessons` VALUES ('12', '3', 'Unidad 2', '2016-10-29 14:56:31', '2016-10-29 14:56:51');
INSERT INTO `lessons` VALUES ('13', '3', 'Unidad 3', '2016-10-29 14:56:31', '2016-10-29 14:56:51');
INSERT INTO `lessons` VALUES ('14', '3', 'Unidad 4', '2016-10-29 14:56:31', '2016-10-29 14:56:51');
INSERT INTO `lessons` VALUES ('15', '3', 'Unidad 5', '2016-10-29 14:56:31', '2016-10-29 14:56:51');
INSERT INTO `lessons` VALUES ('16', '4', 'Unidad 1', '2016-10-29 14:56:32', '2016-10-29 14:56:55');
INSERT INTO `lessons` VALUES ('17', '4', 'Unidad 2', '2016-10-29 14:56:32', '2016-10-29 14:56:55');
INSERT INTO `lessons` VALUES ('18', '4', 'Unidad 3', '2016-10-29 14:56:32', '2016-10-29 14:56:55');
INSERT INTO `lessons` VALUES ('19', '4', 'Unidad 4', '2016-10-29 14:56:32', '2016-10-29 14:56:55');
INSERT INTO `lessons` VALUES ('20', '4', 'Unidad 5', '2016-10-29 14:56:32', '2016-10-29 14:56:55');
INSERT INTO `lessons` VALUES ('21', '5', 'Unidad 1', '2016-10-29 14:57:03', '2016-10-29 14:57:08');
INSERT INTO `lessons` VALUES ('22', '5', 'Unidad 2', '2016-10-29 14:57:03', '2016-10-29 14:57:09');
INSERT INTO `lessons` VALUES ('23', '5', 'Unidad 3', '2016-10-29 14:57:03', '2016-10-29 14:57:09');
INSERT INTO `lessons` VALUES ('24', '5', 'Unidad 4', '2016-10-29 14:57:03', '2016-10-29 14:57:09');
INSERT INTO `lessons` VALUES ('25', '5', 'Unidad 5', '2016-10-29 14:57:03', '2016-10-29 14:57:09');
INSERT INTO `lessons` VALUES ('26', '6', 'Unidad 1', '2016-10-29 14:57:05', '2016-10-29 14:57:11');
INSERT INTO `lessons` VALUES ('27', '6', 'Unidad 2', '2016-10-29 14:57:05', '2016-10-29 14:57:11');
INSERT INTO `lessons` VALUES ('28', '6', 'Unidad 3', '2016-10-29 14:57:05', '2016-10-29 14:57:11');
INSERT INTO `lessons` VALUES ('29', '6', 'Unidad 4', '2016-10-29 14:57:05', '2016-10-29 14:57:11');
INSERT INTO `lessons` VALUES ('30', '6', 'Unidad 5', '2016-10-29 14:57:05', '2016-10-29 14:57:11');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of messages_all
-- ----------------------------
INSERT INTO `messages_all` VALUES ('3', 'dfsdf', 'dsfsdf', '2', '2016-11-06 20:24:29', '2016-11-06 20:24:29');
INSERT INTO `messages_all` VALUES ('4', 'Hola', 'Buenos días.', '2', '2016-11-15 17:31:29', '2016-11-15 17:31:29');

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
INSERT INTO `ranking` VALUES ('1', '1', '52.3', '56', '32', '62', '2016-10-30 12:39:18', '2016-10-30 12:40:19');
INSERT INTO `ranking` VALUES ('2', '3', '15.2', '15.6', '45.3', '75', '2016-10-30 12:39:19', '2016-10-30 12:40:21');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subjects
-- ----------------------------
INSERT INTO `subjects` VALUES ('1', 'Física', '2016-10-29 14:54:12', '2016-11-08 15:03:42');
INSERT INTO `subjects` VALUES ('2', 'Química', '2016-10-29 14:54:19', '2016-11-08 15:02:34');
INSERT INTO `subjects` VALUES ('3', 'Mecánica', '2016-10-29 14:55:09', '2016-11-08 15:02:34');
INSERT INTO `subjects` VALUES ('4', 'Electrónica', '2016-10-29 14:55:14', '2016-11-08 15:02:34');
INSERT INTO `subjects` VALUES ('5', 'Control', '2016-10-29 14:55:17', '2016-11-08 15:02:34');
INSERT INTO `subjects` VALUES ('6', 'Metalmecánica', '2016-10-29 14:55:42', '2016-11-08 15:02:34');
INSERT INTO `subjects` VALUES ('9', 'Óptica', '2016-11-08 09:41:54', '2016-11-08 15:02:34');

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subjects_class_groups
-- ----------------------------
INSERT INTO `subjects_class_groups` VALUES ('3', '3', '1', '2016-10-30 14:30:37', '2016-10-30 14:30:44');
INSERT INTO `subjects_class_groups` VALUES ('4', '4', '1', '2016-10-30 14:30:38', '2016-10-30 14:30:44');
INSERT INTO `subjects_class_groups` VALUES ('5', '5', '1', '2016-10-30 14:30:39', '2016-10-30 14:30:44');
INSERT INTO `subjects_class_groups` VALUES ('6', '6', '1', '2016-10-30 14:30:40', '2016-10-30 14:30:44');
INSERT INTO `subjects_class_groups` VALUES ('11', '1', '2', '2016-10-30 14:30:55', '2016-11-05 17:21:21');
INSERT INTO `subjects_class_groups` VALUES ('12', '2', '2', '2016-10-30 14:30:56', '2016-11-05 17:21:21');
INSERT INTO `subjects_class_groups` VALUES ('13', '3', '2', '2016-10-30 14:30:56', '2016-11-05 17:21:21');
INSERT INTO `subjects_class_groups` VALUES ('14', '4', '2', '2016-10-30 14:30:57', '2016-11-05 17:21:21');
INSERT INTO `subjects_class_groups` VALUES ('15', '3', '4', '2016-10-30 14:31:05', '2016-10-30 14:31:11');
INSERT INTO `subjects_class_groups` VALUES ('16', '4', '4', '2016-10-30 14:31:06', '2016-10-30 14:31:11');
INSERT INTO `subjects_class_groups` VALUES ('17', '5', '4', '2016-10-30 14:31:06', '2016-10-30 14:31:12');
INSERT INTO `subjects_class_groups` VALUES ('18', '6', '4', '2016-10-30 14:31:07', '2016-10-30 14:31:12');
INSERT INTO `subjects_class_groups` VALUES ('20', '9', '1', '2016-11-08 15:20:16', '2016-11-08 15:20:16');
INSERT INTO `subjects_class_groups` VALUES ('21', '2', '1', '2016-11-10 18:44:34', '2016-11-10 18:44:34');
INSERT INTO `subjects_class_groups` VALUES ('22', '1', '1', '2016-11-10 18:44:37', '2016-11-10 18:44:37');
INSERT INTO `subjects_class_groups` VALUES ('23', '1', '3', '2016-11-14 21:45:37', '2016-11-14 21:45:37');
INSERT INTO `subjects_class_groups` VALUES ('24', '2', '3', '2016-11-14 21:45:41', '2016-11-14 21:45:41');

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
INSERT INTO `temp_users` VALUES ('ESTUDIANTE', 'est2', 'est', 'Andrés', 'Orozco', '8-C');
INSERT INTO `temp_users` VALUES ('ESTUDIANTE', 'est1', 'est', 'Carlos', 'García', '8-B');
INSERT INTO `temp_users` VALUES ('ESTUDIANTE', 'est3', 'est', 'Cesar', 'Mora', '8-C');
INSERT INTO `temp_users` VALUES ('ESTUDIANTE', 'est4', 'est', 'Felipe', 'Perez', '8-C');
INSERT INTO `temp_users` VALUES ('PROFESOR', 'pro1', 'pro', 'Mateo', 'Perez', '-');
INSERT INTO `temp_users` VALUES ('PROFESOR', 'pro2', 'pro', 'Sergio', 'Perez', '-');
INSERT INTO `temp_users` VALUES ('PROFESOR', 'pro3', 'pro', 'Victor', 'Vélez', '-');

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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'juan', '363b122c528f54df4a0446b6bab05515', 'Juan Camilo', 'Moreno Ruiz', '4', '2016-10-29 14:52:18', '2016-11-15 17:01:23');
INSERT INTO `users` VALUES ('2', 'o', '363b122c528f54df4a0446b6bab05515', 'Andrés', 'Diaz', '3', '2016-10-29 14:52:43', '2016-11-15 16:21:11');
INSERT INTO `users` VALUES ('3', 'm', '363b122c528f54df4a0446b6bab05515', 'Manuel', 'Moreno', '4', '2016-10-30 12:39:08', '2016-10-30 12:39:08');
INSERT INTO `users` VALUES ('4', 'c', '81dc9bdb52d04dc20036dbd8313ed055', 'Carlos Antonio', 'Molares', '4', '2016-11-03 06:54:40', '2016-11-13 15:30:18');
INSERT INTO `users` VALUES ('5', 'd', '363b122c528f54df4a0446b6bab05515', 'Daniel', 'Velez', '4', '2016-11-03 21:54:46', '2016-11-13 18:27:01');
INSERT INTO `users` VALUES ('6', 'david05', 'e10adc3949ba59abbe56e057f20f883e', 'David', 'Diaz', '3', '2016-11-06 11:27:49', '2016-11-14 12:15:22');
INSERT INTO `users` VALUES ('7', 'admin', '363b122c528f54df4a0446b6bab05515', 'Juan', 'Moreno', '2', '2016-11-08 07:59:19', '2016-11-08 07:59:32');
INSERT INTO `users` VALUES ('19', 'sadmin', '363b122c528f54df4a0446b6bab05515', 'Jhonatan', 'Garcia', '1', '2016-11-14 15:46:36', '2016-11-14 23:36:56');
INSERT INTO `users` VALUES ('20', 'jarango', '202cb962ac59075b964b07152d234b70', 'Johan', 'Arango', '3', '2016-11-15 17:47:09', '2016-11-15 17:47:40');

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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_class_groups
-- ----------------------------
INSERT INTO `users_class_groups` VALUES ('21', '3', '1', '2016-10-30 15:26:24', '2016-10-30 15:26:31');
INSERT INTO `users_class_groups` VALUES ('41', '2', '3', '2016-11-06 19:13:45', '2016-11-06 19:13:45');
INSERT INTO `users_class_groups` VALUES ('60', '4', '7', '2016-11-13 15:27:38', '2016-11-13 15:27:38');
INSERT INTO `users_class_groups` VALUES ('61', '6', '1', '2016-11-13 15:29:52', '2016-11-13 15:29:52');
INSERT INTO `users_class_groups` VALUES ('63', '6', '2', '2016-11-13 15:33:32', '2016-11-13 15:33:32');
INSERT INTO `users_class_groups` VALUES ('71', '6', '4', '2016-11-14 11:38:35', '2016-11-14 11:38:35');
INSERT INTO `users_class_groups` VALUES ('74', '2', '4', '2016-11-14 20:22:21', '2016-11-14 20:22:21');
INSERT INTO `users_class_groups` VALUES ('77', '5', '3', '2016-11-14 21:58:30', '2016-11-14 21:58:30');
INSERT INTO `users_class_groups` VALUES ('78', '2', '11', '2016-11-14 22:08:58', '2016-11-14 22:08:58');
INSERT INTO `users_class_groups` VALUES ('79', '2', '7', '2016-11-15 17:22:28', '2016-11-15 17:22:28');
INSERT INTO `users_class_groups` VALUES ('82', '20', '5', '2016-11-15 17:47:48', '2016-11-15 17:47:48');
INSERT INTO `users_class_groups` VALUES ('84', '20', '4', '2016-11-15 17:47:59', '2016-11-15 17:47:59');
INSERT INTO `users_class_groups` VALUES ('85', '20', '2', '2016-11-15 17:48:17', '2016-11-15 17:48:17');
INSERT INTO `users_class_groups` VALUES ('87', '1', '2', '2016-11-17 09:02:37', '2016-11-17 09:02:37');
INSERT INTO `users_class_groups` VALUES ('89', '2', '2', '2016-11-18 06:43:32', '2016-11-18 06:43:32');
INSERT INTO `users_class_groups` VALUES ('90', '2', '1', '2016-11-18 07:02:31', '2016-11-18 07:02:31');

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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_group_subjects
-- ----------------------------
INSERT INTO `user_group_subjects` VALUES ('15', '61', '4', '2016-11-14 13:42:54', '2016-11-14 13:42:54');
INSERT INTO `user_group_subjects` VALUES ('16', '61', '6', '2016-11-14 13:42:57', '2016-11-14 13:42:57');
INSERT INTO `user_group_subjects` VALUES ('17', '61', '15', '2016-11-14 13:45:06', '2016-11-14 13:45:06');
INSERT INTO `user_group_subjects` VALUES ('20', '41', '16', '2016-11-14 13:47:28', '2016-11-14 13:47:28');
INSERT INTO `user_group_subjects` VALUES ('26', '71', '22', '2016-11-14 14:01:29', '2016-11-14 14:01:29');
INSERT INTO `user_group_subjects` VALUES ('28', '41', '18', '2016-11-14 14:02:03', '2016-11-14 14:02:03');
INSERT INTO `user_group_subjects` VALUES ('33', '41', '21', '2016-11-14 14:11:36', '2016-11-14 14:11:36');
INSERT INTO `user_group_subjects` VALUES ('35', '41', '5', '2016-11-14 14:11:47', '2016-11-14 14:11:47');
INSERT INTO `user_group_subjects` VALUES ('46', '41', '24', '2016-11-14 21:46:00', '2016-11-14 21:46:00');
INSERT INTO `user_group_subjects` VALUES ('51', '85', '14', '2016-11-15 17:48:34', '2016-11-15 17:48:34');
INSERT INTO `user_group_subjects` VALUES ('52', '41', '23', '2016-11-18 06:39:55', '2016-11-18 06:39:55');
INSERT INTO `user_group_subjects` VALUES ('53', '90', '3', '2016-11-18 07:12:19', '2016-11-18 07:12:19');
INSERT INTO `user_group_subjects` VALUES ('54', '90', '20', '2016-11-18 07:12:21', '2016-11-18 07:12:21');
INSERT INTO `user_group_subjects` VALUES ('55', '89', '12', '2016-11-18 07:12:53', '2016-11-18 07:12:53');
INSERT INTO `user_group_subjects` VALUES ('56', '89', '11', '2016-11-18 07:14:15', '2016-11-18 07:14:15');

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
			u.pass = pass
	);

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
		(SELECT @rownum:=0) r, rankingTable rt
	ORDER BY
		rankScore DESC;

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
		(SELECT @rownum:=0) r, rankingTable rt
	ORDER BY
		rankScore DESC;

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
		CASE WHEN lDeliv IS NULL THEN '' ELSE ROUND(lDeliv,1) END as lDeliv,
		CASE WHEN lTime IS NULL THEN '' ELSE ROUND(lTime,1) END as lTime,
		CASE WHEN prform IS NULL THEN '' ELSE ROUND(prform,1) END as prform,
		CASE WHEN tmeAvg IS NULL THEN '' ELSE ROUND(tmeAvg,1) END as tmeAvg,
		CASE WHEN rnkScore IS NULL THEN '' ELSE ROUND(rnkScore,1) END as rnkScore
	FROM
		(SELECT @rownum:=0) r, rankingTable rt
	ORDER BY
		rankScore DESC;

	DROP TABLE IF EXISTS rankingTable;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for get_rank_school_copy
-- ----------------------------
DROP PROCEDURE IF EXISTS `get_rank_school_copy`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_rank_school_copy`()
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE usrId INT DEFAULT NULL;
	DECLARE userName VARCHAR(100) DEFAULT NULL;

	DECLARE finalAvg DOUBLE DEFAULT NULL;
	DECLARE labDeliv DOUBLE DEFAULT NULL;
	DECLARE lScore DOUBLE DEFAULT NULL;
	DECLARE tScore DOUBLE DEFAULT NULL;
	DECLARE fScore DOUBLE DEFAULT NULL;

	DECLARE maxTime DOUBLE DEFAULT NULL;
	DECLARE minTime DOUBLE DEFAULT NULL;

	DECLARE totalRows DOUBLE DEFAULT NULL;

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
		qualScore double,
		labScore double,
		timeScore double,
		totalScore double
	); 

	SELECT
		MAX(TIME_TO_SEC(lu.delivery_time)),
		MIN(TIME_TO_SEC(lu.delivery_time))
	INTO maxTime, minTime
	FROM
		laboratories_users lu
	INNER JOIN users u ON lu.user_id = u.id
	WHERE
		u.rols_id = 4;

	OPEN cur1;

	read_loop: LOOP
    FETCH cur1 INTO usrId, userName;
    IF done THEN
      LEAVE read_loop;
    END IF;

		SELECT
			AVG(lu.final_score), AVG(TIME_TO_SEC(lu.delivery_time)), COUNT(lu.final_score)
		INTO finalAvg, tScore, labDeliv
		FROM
			laboratories_users lu
		WHERE
			lu.user_id = usrId;
		
		IF finalAvg IS NOT NULL
		THEN
			SET lScore = (50 / labDeliv) + ( (finalAvg * 50) / 5 );
			SET finalAvg = (finalAvg / 5) * 100;
			SET tScore = ( 1 - ( ( tScore - minTime ) / ( maxTime - minTime ) ) ) * 100;

			SET fScore = (finalAvg + finalAvg + finalAvg)/3;
			INSERT INTO
				rankingTable (userId, userName, qualScore, labScore, timeScore, totalScore)
			SELECT usrId, userName, finalAvg, lScore, tScore, fScore;
		ELSE
			INSERT INTO
				rankingTable (userId, userName, qualScore, labScore, timeScore, totalScore)
			SELECT usrId, userName, NULL, NULL, NULL, NULL;	
		END IF;
  END LOOP;

  CLOSE cur1;

	SELECT
		@rownum:=@rownum+1 AS rank,
		rt.userId as user_id,
		rt.userName as `name`,
		CASE WHEN qualScore IS NULL THEN '' ELSE ROUND(qualScore,1) END as lab_qual_score,
		CASE WHEN labScore IS NULL THEN '' ELSE ROUND(labScore,1) END as lab_num_score,
		CASE WHEN timeScore IS NULL THEN '' ELSE ROUND(timeScore,1) END as tab_t_wasted_score,
		CASE WHEN totalScore IS NULL THEN '' ELSE ROUND(totalScore,1) END as total_score
	FROM
		(SELECT @rownum:=0) r, rankingTable rt
	ORDER BY
		totalScore DESC;

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
	#Routine body goes here...
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
