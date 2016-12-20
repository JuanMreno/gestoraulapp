
SET FOREIGN_KEY_CHECKS=0;
SET NAMES 'utf8' COLLATE 'utf8_general_ci';

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
INSERT INTO `app_params` VALUES ('1', 'SCHOOL_NAME', null, 'EDITABLE', '2016-11-03 21:26:09', '2016-12-18 00:27:49');
INSERT INTO `app_params` VALUES ('2', 'COUNTRY', null, 'EDITABLE', '2016-11-13 21:15:46', '2016-12-18 00:27:51');
INSERT INTO `app_params` VALUES ('3', 'CITY', null, 'EDITABLE', '2016-11-13 21:15:55', '2016-12-18 00:27:51');
INSERT INTO `app_params` VALUES ('4', 'LICENSE', null, 'EDITABLE', '2016-11-13 21:16:01', '2016-12-18 00:27:52');
INSERT INTO `app_params` VALUES ('5', 'RANK_SEND_ENABLED', '1', 'EDITABLE', '2016-11-13 21:16:24', '2016-11-14 23:15:56');
INSERT INTO `app_params` VALUES ('6', 'SERVER_NAME', null, 'FIX', '2016-11-14 22:13:35', '2016-12-15 22:00:45');
INSERT INTO `app_params` VALUES ('7', 'SERVER_IP', null, 'FIX', '2016-11-14 22:13:41', '2016-12-18 00:27:54');
INSERT INTO `app_params` VALUES ('8', 'LICENSE_PERIOD', null, 'FIX', '2016-11-14 22:15:14', '2016-12-15 22:00:48');
INSERT INTO `app_params` VALUES ('9', 'DEVICE_NAME', null, 'FIX', '2016-11-14 22:15:21', '2016-12-15 22:00:49');
INSERT INTO `app_params` VALUES ('10', 'LICENSE_NUM_USERS', null, 'FIX', '2016-11-14 22:15:42', '2016-12-15 22:00:52');
INSERT INTO `app_params` VALUES ('11', 'LICENSE_STATE', '2', 'FIX', '2016-12-08 13:14:37', '2016-12-18 00:27:56');
INSERT INTO `app_params` VALUES ('12', 'OFFLINE_ATTEMPTS', '0', 'FIX', '2016-12-08 13:42:30', '2016-12-17 13:38:37');
INSERT INTO `app_params` VALUES ('13', 'SERVER_MAC', null, 'FIX', '2016-12-09 15:28:29', '2016-12-18 00:27:58');
INSERT INTO `app_params` VALUES ('14', 'SCHOOL_ID', null, 'FIX', '2016-12-10 17:31:57', '2016-12-18 00:28:00');

-- ----------------------------
-- Table structure for cities
-- ----------------------------
DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=995 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cities
-- ----------------------------
INSERT INTO `cities` VALUES ('1', '1', 'Abejorral', '2016-12-16 15:02:16', '2016-12-16 16:44:31');
INSERT INTO `cities` VALUES ('2', '1', 'Abrego', '2016-12-16 15:02:16', '2016-12-16 16:44:35');
INSERT INTO `cities` VALUES ('3', '1', 'Abriaqui', '2016-12-16 15:02:16', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('4', '1', 'Acacias', '2016-12-16 15:02:16', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('5', '1', 'Acandí', '2016-12-16 15:02:16', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('6', '1', 'Acevedo', '2016-12-16 15:02:16', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('7', '1', 'Achí', '2016-12-16 15:02:16', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('8', '1', 'Agrado', '2016-12-16 15:02:16', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('9', '1', 'Agua de Dios', '2016-12-16 15:02:17', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('10', '1', 'Aguachica', '2016-12-16 15:02:17', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('11', '1', 'Aguada', '2016-12-16 15:02:17', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('12', '1', 'Aguadas', '2016-12-16 15:02:17', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('13', '1', 'Aguazul', '2016-12-16 15:02:17', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('14', '1', 'Agustín Codazzi', '2016-12-16 15:02:17', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('15', '1', 'Aipe', '2016-12-16 15:02:17', '2016-12-16 16:44:36');
INSERT INTO `cities` VALUES ('16', '1', 'Albán', '2016-12-16 15:02:17', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('17', '1', 'Albán (San José)', '2016-12-16 15:02:17', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('18', '1', 'Albania', '2016-12-16 15:02:17', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('19', '1', 'Alcalá', '2016-12-16 15:02:17', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('20', '1', 'Aldana', '2016-12-16 15:02:18', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('21', '1', 'Alejandría', '2016-12-16 15:02:18', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('22', '1', 'Algeciras', '2016-12-16 15:02:18', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('23', '1', 'Almaguer', '2016-12-16 15:02:18', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('24', '1', 'Almeida', '2016-12-16 15:02:18', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('25', '1', 'Alpujarra', '2016-12-16 15:02:18', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('26', '1', 'Altamira', '2016-12-16 15:02:18', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('27', '1', 'Alto Baudó (Pie de Pato)', '2016-12-16 15:02:18', '2016-12-16 16:44:37');
INSERT INTO `cities` VALUES ('28', '1', 'Altos del Rosario', '2016-12-16 15:02:18', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('29', '1', 'Alvarado', '2016-12-16 15:02:18', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('30', '1', 'Amagá', '2016-12-16 15:02:18', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('31', '1', 'Amalfi', '2016-12-16 15:02:18', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('32', '1', 'Ambalema', '2016-12-16 15:02:18', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('33', '1', 'Anapoima', '2016-12-16 15:02:18', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('34', '1', 'Ancuyá', '2016-12-16 15:02:18', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('35', '1', 'Andalucía', '2016-12-16 15:02:18', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('36', '1', 'Andes', '2016-12-16 15:02:19', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('37', '1', 'Angelópolis', '2016-12-16 15:02:19', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('38', '1', 'Angostura', '2016-12-16 15:02:19', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('39', '1', 'Anolaima', '2016-12-16 15:02:19', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('40', '1', 'Anorí', '2016-12-16 15:02:19', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('41', '1', 'Anserma', '2016-12-16 15:02:19', '2016-12-16 16:44:38');
INSERT INTO `cities` VALUES ('42', '1', 'Ansermanuevo', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('43', '1', 'Antioquia', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('44', '1', 'Anzá', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('45', '1', 'Anzóategui', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('46', '1', 'Apartadó', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('47', '1', 'Apía', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('48', '1', 'Aquitania', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('49', '1', 'Aracataca', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('50', '1', 'Aranzazu', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('51', '1', 'Aratoca', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('52', '1', 'Arauca', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('53', '1', 'Arauquita', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('54', '1', 'Arbeláez', '2016-12-16 15:02:19', '2016-12-16 16:44:39');
INSERT INTO `cities` VALUES ('55', '1', 'Arboleda (Berruecos)', '2016-12-16 15:02:19', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('56', '1', 'Arboledas', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('57', '1', 'Arboletes', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('58', '1', 'Arcabuco', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('59', '1', 'Arenal', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('60', '1', 'Argelia', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('61', '1', 'Ariguaní (El Difícil)', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('62', '1', 'Arjona', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('63', '1', 'Armenia', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('64', '1', 'Armero (Guayabal)', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('65', '1', 'Arroyohondo', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('66', '1', 'Astrea', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('67', '1', 'Ataco', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('68', '1', 'Atrato (Yuto)', '2016-12-16 15:02:20', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('69', '1', 'Ayapel', '2016-12-16 15:02:21', '2016-12-16 16:44:40');
INSERT INTO `cities` VALUES ('70', '1', 'Bagadó', '2016-12-16 15:02:21', '2016-12-16 16:44:41');
INSERT INTO `cities` VALUES ('71', '1', 'Bahía Solano (Mútis)', '2016-12-16 15:02:21', '2016-12-16 16:44:41');
INSERT INTO `cities` VALUES ('72', '1', 'Bajo Baudó (Pizarro)', '2016-12-16 15:02:21', '2016-12-16 16:44:41');
INSERT INTO `cities` VALUES ('73', '1', 'Balboa', '2016-12-16 15:02:21', '2016-12-16 16:44:41');
INSERT INTO `cities` VALUES ('74', '1', 'Baranoa', '2016-12-16 15:02:21', '2016-12-16 16:44:41');
INSERT INTO `cities` VALUES ('75', '1', 'Baraya', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('76', '1', 'Barbacoas', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('77', '1', 'Barbosa', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('78', '1', 'Barichara', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('79', '1', 'Barranca de Upía', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('80', '1', 'Barrancabermeja', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('81', '1', 'Barrancas', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('82', '1', 'Barranco de Loba', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('83', '1', 'Barranquilla', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('84', '1', 'Becerril', '2016-12-16 15:02:21', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('85', '1', 'Belalcázar', '2016-12-16 15:02:22', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('86', '1', 'Belén', '2016-12-16 15:02:22', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('87', '1', 'Belén de los Andaquíes', '2016-12-16 15:02:22', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('88', '1', 'Belén de Umbría', '2016-12-16 15:02:22', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('89', '1', 'Bello', '2016-12-16 15:02:22', '2016-12-16 16:44:42');
INSERT INTO `cities` VALUES ('90', '1', 'Belmira', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('91', '1', 'Beltrán', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('92', '1', 'Berbeo', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('93', '1', 'Betania', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('94', '1', 'Beteitiva', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('95', '1', 'Betulia', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('96', '1', 'Bituima', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('97', '1', 'Boavita', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('98', '1', 'Bochalema', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('99', '1', 'Bojacá', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('100', '1', 'Bojayá (Bellavista)', '2016-12-16 15:02:22', '2016-12-16 16:44:43');
INSERT INTO `cities` VALUES ('101', '1', 'Bolívar', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('102', '1', 'Bosconia', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('103', '1', 'Boyacá', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('104', '1', 'Briseño', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('105', '1', 'Bucaramanga', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('106', '1', 'Bucarasica', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('107', '1', 'Buenaventura', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('108', '1', 'Buenavista', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('109', '1', 'Buenos Aires', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('110', '1', 'Buesaco', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('111', '1', 'Buga', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('112', '1', 'Bugalagrande', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('113', '1', 'Buriticá', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('114', '1', 'Busbanzá', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('115', '1', 'Cabrera', '2016-12-16 15:02:23', '2016-12-16 16:44:44');
INSERT INTO `cities` VALUES ('116', '1', 'Cabuyaro', '2016-12-16 15:02:23', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('117', '1', 'Cáceres', '2016-12-16 15:02:23', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('118', '1', 'Cachipay', '2016-12-16 15:02:23', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('119', '1', 'Cáchira', '2016-12-16 15:02:23', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('120', '1', 'Cácota', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('121', '1', 'Caicedo', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('122', '1', 'Caicedonia', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('123', '1', 'Caimito', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('124', '1', 'Cajamarca', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('125', '1', 'Cajibío', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('126', '1', 'Cajicá', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('127', '1', 'Calamar', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('128', '1', 'Calarcá', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('129', '1', 'Caldas', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('130', '1', 'Caldono', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('131', '1', 'Cali', '2016-12-16 15:02:24', '2016-12-16 16:44:45');
INSERT INTO `cities` VALUES ('132', '1', 'California', '2016-12-16 15:02:24', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('133', '1', 'Calima (Darién)', '2016-12-16 15:02:24', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('134', '1', 'Caloto', '2016-12-16 15:02:24', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('135', '1', 'Campamento', '2016-12-16 15:02:24', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('136', '1', 'Campo de la Cruz', '2016-12-16 15:02:24', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('137', '1', 'Campoalegre', '2016-12-16 15:02:24', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('138', '1', 'Campohermoso', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('139', '1', 'Canalete', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('140', '1', 'Candelaria', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('141', '1', 'Cantagallo', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('142', '1', 'Cantón de San Pablo', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('143', '1', 'Cañasgordas', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('144', '1', 'Caparrapí', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('145', '1', 'Capitanejo', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('146', '1', 'Cáqueza', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('147', '1', 'Caracolí', '2016-12-16 15:02:25', '2016-12-16 16:44:46');
INSERT INTO `cities` VALUES ('148', '1', 'Caramanta', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('149', '1', 'Carcasí', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('150', '1', 'Carepa', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('151', '1', 'Carmen de Apicalá', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('152', '1', 'Carmen de Carupa', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('153', '1', 'Carmen de Viboral', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('154', '1', 'Carolina', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('155', '1', 'Cartagena', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('156', '1', 'Cartagena del Chairá', '2016-12-16 15:02:25', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('157', '1', 'Cartago', '2016-12-16 15:02:26', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('158', '1', 'Carurú', '2016-12-16 15:02:26', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('159', '1', 'Casabianca', '2016-12-16 15:02:26', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('160', '1', 'Castilla la Nueva', '2016-12-16 15:02:26', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('161', '1', 'Caucasia', '2016-12-16 15:02:26', '2016-12-16 16:44:47');
INSERT INTO `cities` VALUES ('162', '1', 'Cepitá', '2016-12-16 15:02:26', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('163', '1', 'Cereté', '2016-12-16 15:02:26', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('164', '1', 'Cerinza', '2016-12-16 15:02:26', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('165', '1', 'Cerrito', '2016-12-16 15:02:26', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('166', '1', 'Cerro San Antonio', '2016-12-16 15:02:26', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('167', '1', 'Chachagüi', '2016-12-16 15:02:26', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('168', '1', 'Chaguaní', '2016-12-16 15:02:26', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('169', '1', 'Chalán', '2016-12-16 15:02:27', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('170', '1', 'Chameza', '2016-12-16 15:02:27', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('171', '1', 'Chaparral', '2016-12-16 15:02:27', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('172', '1', 'Charalá', '2016-12-16 15:02:27', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('173', '1', 'Charta', '2016-12-16 15:02:27', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('174', '1', 'Chía', '2016-12-16 15:02:27', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('175', '1', 'Chigorodó', '2016-12-16 15:02:27', '2016-12-16 16:44:48');
INSERT INTO `cities` VALUES ('176', '1', 'Chima', '2016-12-16 15:02:27', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('177', '1', 'Chimichagua', '2016-12-16 15:02:27', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('178', '1', 'Chinácota', '2016-12-16 15:02:27', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('179', '1', 'Chinavita', '2016-12-16 15:02:27', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('180', '1', 'Chinchina', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('181', '1', 'Chinú', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('182', '1', 'Chipaque', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('183', '1', 'Chipatá', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('184', '1', 'Chiquinquirá', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('185', '1', 'Chíquiza', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('186', '1', 'Chiriguaná', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('187', '1', 'Chiscas', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('188', '1', 'Chita', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('189', '1', 'Chitagá', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('190', '1', 'Chitaranque', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('191', '1', 'Chivatá', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('192', '1', 'Chivolo', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('193', '1', 'Chivor', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('194', '1', 'Choachí', '2016-12-16 15:02:28', '2016-12-16 16:44:49');
INSERT INTO `cities` VALUES ('195', '1', 'Chocontá', '2016-12-16 15:02:28', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('196', '1', 'Cicuto', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('197', '1', 'Ciénaga', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('198', '1', 'Ciénaga de Oro', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('199', '1', 'Cimitarra', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('200', '1', 'Circasia', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('201', '1', 'Cisneros', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('202', '1', 'Clemencia', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('203', '1', 'Cocorná', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('204', '1', 'Coello', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('205', '1', 'Cogua', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('206', '1', 'Colombia', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('207', '1', 'Colón', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('208', '1', 'Colón (Génova)', '2016-12-16 15:02:29', '2016-12-16 16:44:50');
INSERT INTO `cities` VALUES ('209', '1', 'Coloso (Ricaurte)', '2016-12-16 15:02:29', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('210', '1', 'Cómbita', '2016-12-16 15:02:29', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('211', '1', 'Concepción', '2016-12-16 15:02:29', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('212', '1', 'Concordia', '2016-12-16 15:02:29', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('213', '1', 'Condoto', '2016-12-16 15:02:29', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('214', '1', 'Confines', '2016-12-16 15:02:29', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('215', '1', 'Consacá', '2016-12-16 15:02:29', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('216', '1', 'Contadero', '2016-12-16 15:02:30', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('217', '1', 'Contratación', '2016-12-16 15:02:30', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('218', '1', 'Convención', '2016-12-16 15:02:30', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('219', '1', 'Copacabana', '2016-12-16 15:02:30', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('220', '1', 'Coper', '2016-12-16 15:02:30', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('221', '1', 'Córdoba', '2016-12-16 15:02:30', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('222', '1', 'Corinto', '2016-12-16 15:02:30', '2016-12-16 16:44:51');
INSERT INTO `cities` VALUES ('223', '1', 'Coromoro', '2016-12-16 15:02:30', '2016-12-16 16:44:52');
INSERT INTO `cities` VALUES ('224', '1', 'Corozal', '2016-12-16 15:02:30', '2016-12-16 16:44:52');
INSERT INTO `cities` VALUES ('225', '1', 'Corrales', '2016-12-16 15:02:30', '2016-12-16 16:44:52');
INSERT INTO `cities` VALUES ('226', '1', 'Cota', '2016-12-16 15:02:30', '2016-12-16 16:44:52');
INSERT INTO `cities` VALUES ('227', '1', 'Cotorra', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('228', '1', 'Covarachia', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('229', '1', 'Coyaima', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('230', '1', 'Cravo Norte', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('231', '1', 'Cuaspud (Carlosama)', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('232', '1', 'Cubar', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('233', '1', 'Cubarral', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('234', '1', 'Cucaita', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('235', '1', 'Cucunubá', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('236', '1', 'Cúcuta', '2016-12-16 15:02:30', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('237', '1', 'Cucutilla', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('238', '1', 'Cuitiva', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('239', '1', 'Cumaral', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('240', '1', 'Cumaribo', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('241', '1', 'Cumbal', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('242', '1', 'Cumbitará', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('243', '1', 'Cunday', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('244', '1', 'Curillo', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('245', '1', 'Curití', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('246', '1', 'Curumaní', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('247', '1', 'Dabeiba', '2016-12-16 15:02:31', '2016-12-16 16:44:53');
INSERT INTO `cities` VALUES ('248', '1', 'Dagua', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('249', '1', 'Dibulla', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('250', '1', 'Distracción', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('251', '1', 'Dolores', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('252', '1', 'Don Matías', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('253', '1', 'Dos Quebradas', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('254', '1', 'Duitama', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('255', '1', 'Durania', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('256', '1', 'Ebéjico', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('257', '1', 'El Águila', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('258', '1', 'El Bagre', '2016-12-16 15:02:31', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('259', '1', 'El Banco', '2016-12-16 15:02:32', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('260', '1', 'El Cairo', '2016-12-16 15:02:32', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('261', '1', 'El Calvario', '2016-12-16 15:02:32', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('262', '1', 'El Carmen', '2016-12-16 15:02:32', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('263', '1', 'El Carmen de Bolívar', '2016-12-16 15:02:32', '2016-12-16 16:44:54');
INSERT INTO `cities` VALUES ('264', '1', 'El Castillo', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('265', '1', 'El Cerrito', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('266', '1', 'El Charco', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('267', '1', 'El Cocuy', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('268', '1', 'El Colegio', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('269', '1', 'El Copey', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('270', '1', 'El Doncello', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('271', '1', 'El Dorado', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('272', '1', 'El Dovio', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('273', '1', 'El Espino', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('274', '1', 'El Guacamayo', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('275', '1', 'El Guamo', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('276', '1', 'El Litoral de San Juan', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('277', '1', 'El Molino', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('278', '1', 'El Paso', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('279', '1', 'El Paujil', '2016-12-16 15:02:32', '2016-12-16 16:44:55');
INSERT INTO `cities` VALUES ('280', '1', 'El Peñón', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('281', '1', 'El Piñón', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('282', '1', 'El Playón', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('283', '1', 'El Retén', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('284', '1', 'El Retorno', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('285', '1', 'El Rosal', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('286', '1', 'El Rosario', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('287', '1', 'El Tablón', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('288', '1', 'El Tambo', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('289', '1', 'El Tarra', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('290', '1', 'El Zulia', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('291', '1', 'Elías', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('292', '1', 'Encino', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('293', '1', 'Enciso', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('294', '1', 'Entrerríos', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('295', '1', 'Envigado', '2016-12-16 15:02:33', '2016-12-16 16:44:56');
INSERT INTO `cities` VALUES ('296', '1', 'Espinal', '2016-12-16 15:02:33', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('297', '1', 'Facatativá', '2016-12-16 15:02:33', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('298', '1', 'Falán', '2016-12-16 15:02:33', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('299', '1', 'Filadelfia', '2016-12-16 15:02:33', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('300', '1', 'Filandia', '2016-12-16 15:02:33', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('301', '1', 'Firavitoba', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('302', '1', 'Flandes', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('303', '1', 'Florencia', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('304', '1', 'Floresta', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('305', '1', 'Florián', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('306', '1', 'Florida', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('307', '1', 'Floridablanca', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('308', '1', 'Fómeque', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('309', '1', 'Fonseca', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('310', '1', 'Fortul', '2016-12-16 15:02:34', '2016-12-16 16:44:57');
INSERT INTO `cities` VALUES ('311', '1', 'Fosca', '2016-12-16 15:02:34', '2016-12-16 16:44:58');
INSERT INTO `cities` VALUES ('312', '1', 'Francisco Pizarro', '2016-12-16 15:02:34', '2016-12-16 16:44:58');
INSERT INTO `cities` VALUES ('313', '1', 'Fredonia', '2016-12-16 15:02:34', '2016-12-16 16:44:58');
INSERT INTO `cities` VALUES ('314', '1', 'Fresno', '2016-12-16 15:02:34', '2016-12-16 16:44:58');
INSERT INTO `cities` VALUES ('315', '1', 'Frontino', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('316', '1', 'Fuente de Oro', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('317', '1', 'Fundación', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('318', '1', 'Funes', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('319', '1', 'Funza', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('320', '1', 'Fúquene', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('321', '1', 'Fusagasugá', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('322', '1', 'Gachalá', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('323', '1', 'Gachancipá', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('324', '1', 'Gachantivá', '2016-12-16 15:02:34', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('325', '1', 'Gachetá', '2016-12-16 15:02:35', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('326', '1', 'Galán', '2016-12-16 15:02:35', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('327', '1', 'Galapa', '2016-12-16 15:02:35', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('328', '1', 'Galeras (Nueva Granada)', '2016-12-16 15:02:35', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('329', '1', 'Gama', '2016-12-16 15:02:35', '2016-12-16 16:44:59');
INSERT INTO `cities` VALUES ('330', '1', 'Gamarra', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('331', '1', 'Gámbita', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('332', '1', 'Gámeza', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('333', '1', 'Garagoa', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('334', '1', 'Garzón', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('335', '1', 'Génova', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('336', '1', 'Gigante', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('337', '1', 'Ginebra', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('338', '1', 'Giraldo', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('339', '1', 'Girardot', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('340', '1', 'Girardota', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('341', '1', 'Girón', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('342', '1', 'Gómez Plata', '2016-12-16 15:02:35', '2016-12-16 16:45:00');
INSERT INTO `cities` VALUES ('343', '1', 'González', '2016-12-16 15:02:35', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('344', '1', 'Gramalote', '2016-12-16 15:02:35', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('345', '1', 'Granada', '2016-12-16 15:02:35', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('346', '1', 'Guaca', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('347', '1', 'Guacamayas', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('348', '1', 'Guacarí', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('349', '1', 'Guachetá', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('350', '1', 'Guachucal', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('351', '1', 'Guadalupe', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('352', '1', 'Guaduas', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('353', '1', 'Guaitarilla', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('354', '1', 'Gualmatán', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('355', '1', 'Guamal', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('356', '1', 'Guamo', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('357', '1', 'Guapi', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('358', '1', 'Guapotá', '2016-12-16 15:02:36', '2016-12-16 16:45:01');
INSERT INTO `cities` VALUES ('359', '1', 'Guarandá', '2016-12-16 15:02:36', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('360', '1', 'Guarne', '2016-12-16 15:02:36', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('361', '1', 'Guasca', '2016-12-16 15:02:36', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('362', '1', 'Guatapé', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('363', '1', 'Guataquí', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('364', '1', 'Guatavita', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('365', '1', 'Guateque', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('366', '1', 'Guática', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('367', '1', 'Guavata', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('368', '1', 'Guayabal de Síquima', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('369', '1', 'Guayabetal', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('370', '1', 'Guayatá', '2016-12-16 15:02:37', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('371', '1', 'Guepsa', '2016-12-16 15:02:38', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('372', '1', 'Guicán', '2016-12-16 15:02:38', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('373', '1', 'Gutiérrez', '2016-12-16 15:02:38', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('374', '1', 'Hacarí', '2016-12-16 15:02:38', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('375', '1', 'Hatillo de Loba', '2016-12-16 15:02:38', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('376', '1', 'Hato', '2016-12-16 15:02:38', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('377', '1', 'Hato Corozal', '2016-12-16 15:02:38', '2016-12-16 16:45:02');
INSERT INTO `cities` VALUES ('378', '1', 'Hatonuevo', '2016-12-16 15:02:38', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('379', '1', 'Heliconia', '2016-12-16 15:02:38', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('380', '1', 'Herrán', '2016-12-16 15:02:38', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('381', '1', 'Herveo', '2016-12-16 15:02:38', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('382', '1', 'Hispania', '2016-12-16 15:02:38', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('383', '1', 'Hobo', '2016-12-16 15:02:38', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('384', '1', 'Honda', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('385', '1', 'Ibagué', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('386', '1', 'Icononzo', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('387', '1', 'Iles', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('388', '1', 'Imúes', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('389', '1', 'Inzá', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('390', '1', 'Ipiales', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('391', '1', 'Iquira', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('392', '1', 'Isnos', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('393', '1', 'Itagüí', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('394', '1', 'Itsmina', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('395', '1', 'Ituango', '2016-12-16 15:02:39', '2016-12-16 16:45:03');
INSERT INTO `cities` VALUES ('396', '1', 'Iza', '2016-12-16 15:02:39', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('397', '1', 'Jambaló', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('398', '1', 'Jamundí', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('399', '1', 'Jardín', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('400', '1', 'Jenesano', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('401', '1', 'Jericó', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('402', '1', 'Jerusalén', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('403', '1', 'Jesús María', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('404', '1', 'Jordán', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('405', '1', 'Juan de Acosta', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('406', '1', 'Junín', '2016-12-16 15:02:40', '2016-12-16 16:45:04');
INSERT INTO `cities` VALUES ('407', '1', 'Juradó', '2016-12-16 15:02:40', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('408', '1', 'La Apartada (Frontera)', '2016-12-16 15:02:40', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('409', '1', 'La Argentina', '2016-12-16 15:02:40', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('410', '1', 'La Belleza', '2016-12-16 15:02:40', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('411', '1', 'La Calera', '2016-12-16 15:02:40', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('412', '1', 'La Capilla', '2016-12-16 15:02:40', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('413', '1', 'La Ceja', '2016-12-16 15:02:40', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('414', '1', 'La Celia', '2016-12-16 15:02:40', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('415', '1', 'La Cruz', '2016-12-16 15:02:41', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('416', '1', 'La Cumbre', '2016-12-16 15:02:41', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('417', '1', 'La Dorada', '2016-12-16 15:02:41', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('418', '1', 'La Esperanza', '2016-12-16 15:02:41', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('419', '1', 'La Estrella', '2016-12-16 15:02:41', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('420', '1', 'La Florida', '2016-12-16 15:02:41', '2016-12-16 16:45:05');
INSERT INTO `cities` VALUES ('421', '1', 'La Gloria', '2016-12-16 15:02:41', '2016-12-16 16:45:06');
INSERT INTO `cities` VALUES ('422', '1', 'La Jagua de Ibirico', '2016-12-16 15:02:41', '2016-12-16 16:45:06');
INSERT INTO `cities` VALUES ('423', '1', 'La Llanada', '2016-12-16 15:02:41', '2016-12-16 16:45:06');
INSERT INTO `cities` VALUES ('424', '1', 'La Macarena', '2016-12-16 15:02:41', '2016-12-16 16:45:06');
INSERT INTO `cities` VALUES ('425', '1', 'La Merced', '2016-12-16 15:02:41', '2016-12-16 16:45:06');
INSERT INTO `cities` VALUES ('426', '1', 'La Mesa', '2016-12-16 15:02:41', '2016-12-16 16:45:06');
INSERT INTO `cities` VALUES ('427', '1', 'La Montañita', '2016-12-16 15:02:41', '2016-12-16 16:45:06');
INSERT INTO `cities` VALUES ('428', '1', 'La Palma', '2016-12-16 15:02:41', '2016-12-16 16:45:06');
INSERT INTO `cities` VALUES ('429', '1', 'La Paz', '2016-12-16 15:02:41', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('430', '1', 'La Paz (Robles)', '2016-12-16 15:02:41', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('431', '1', 'La Peña', '2016-12-16 15:02:41', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('432', '1', 'La Pintada', '2016-12-16 15:02:41', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('433', '1', 'La Plata', '2016-12-16 15:02:41', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('434', '1', 'La Playa', '2016-12-16 15:02:41', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('435', '1', 'La Primavera', '2016-12-16 15:02:41', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('436', '1', 'La Salina', '2016-12-16 15:02:41', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('437', '1', 'La Sierra', '2016-12-16 15:02:42', '2016-12-16 16:45:07');
INSERT INTO `cities` VALUES ('438', '1', 'La Tebaida', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('439', '1', 'La Tola', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('440', '1', 'La Ubita', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('441', '1', 'La Unión', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('442', '1', 'La Uribe', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('443', '1', 'La Vega', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('444', '1', 'La Victoria', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('445', '1', 'La Virginia', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('446', '1', 'Labateca', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('447', '1', 'Labranzagrande', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('448', '1', 'Landázuri', '2016-12-16 15:02:42', '2016-12-16 16:45:08');
INSERT INTO `cities` VALUES ('449', '1', 'Lebrija', '2016-12-16 15:02:42', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('450', '1', 'Leiva', '2016-12-16 15:02:42', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('451', '1', 'Lejanías', '2016-12-16 15:02:42', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('452', '1', 'Lenguazaque', '2016-12-16 15:02:43', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('453', '1', 'Lérida', '2016-12-16 15:02:43', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('454', '1', 'Leticia', '2016-12-16 15:02:43', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('455', '1', 'Líbano', '2016-12-16 15:02:43', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('456', '1', 'Liborina', '2016-12-16 15:02:43', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('457', '1', 'Linares', '2016-12-16 15:02:43', '2016-12-16 16:45:09');
INSERT INTO `cities` VALUES ('458', '1', 'Lloró', '2016-12-16 15:02:43', '2016-12-16 16:45:10');
INSERT INTO `cities` VALUES ('459', '1', 'López (Micay)', '2016-12-16 15:02:43', '2016-12-16 16:45:10');
INSERT INTO `cities` VALUES ('460', '1', 'Lorica', '2016-12-16 15:02:43', '2016-12-16 16:45:10');
INSERT INTO `cities` VALUES ('461', '1', 'Los Andes (Sotomayor)', '2016-12-16 15:02:43', '2016-12-16 16:45:10');
INSERT INTO `cities` VALUES ('462', '1', 'Los Córdobas', '2016-12-16 15:02:43', '2016-12-16 16:45:10');
INSERT INTO `cities` VALUES ('463', '1', 'Los Palmitos', '2016-12-16 15:02:43', '2016-12-16 16:45:10');
INSERT INTO `cities` VALUES ('464', '1', 'Los Patios', '2016-12-16 15:02:43', '2016-12-16 16:45:10');
INSERT INTO `cities` VALUES ('465', '1', 'Los Santos', '2016-12-16 15:02:43', '2016-12-16 16:45:10');
INSERT INTO `cities` VALUES ('466', '1', 'Lourdes', '2016-12-16 15:02:43', '2016-12-16 16:45:11');
INSERT INTO `cities` VALUES ('467', '1', 'Luruaco', '2016-12-16 15:02:43', '2016-12-16 16:45:11');
INSERT INTO `cities` VALUES ('468', '1', 'Macanal', '2016-12-16 15:02:43', '2016-12-16 16:45:11');
INSERT INTO `cities` VALUES ('469', '1', 'Macaravita', '2016-12-16 15:02:43', '2016-12-16 16:45:11');
INSERT INTO `cities` VALUES ('470', '1', 'Maceo', '2016-12-16 15:02:43', '2016-12-16 16:45:11');
INSERT INTO `cities` VALUES ('471', '1', 'Machetá', '2016-12-16 15:02:43', '2016-12-16 16:45:11');
INSERT INTO `cities` VALUES ('472', '1', 'Madrid', '2016-12-16 15:02:44', '2016-12-16 16:45:11');
INSERT INTO `cities` VALUES ('473', '1', 'Magangue', '2016-12-16 15:02:44', '2016-12-16 16:45:12');
INSERT INTO `cities` VALUES ('474', '1', 'Magüí (Payán)', '2016-12-16 15:02:44', '2016-12-16 16:45:12');
INSERT INTO `cities` VALUES ('475', '1', 'Mahates', '2016-12-16 15:02:44', '2016-12-16 16:45:12');
INSERT INTO `cities` VALUES ('476', '1', 'Maicao', '2016-12-16 15:02:44', '2016-12-16 16:45:12');
INSERT INTO `cities` VALUES ('477', '1', 'Majagual', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('478', '1', 'Málaga', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('479', '1', 'Malambo', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('480', '1', 'Mallama (Piedrancha)', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('481', '1', 'Manatí', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('482', '1', 'Manaure', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('483', '1', 'Manaure Balcón Cesar', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('484', '1', 'Maní', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('485', '1', 'Manizales', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('486', '1', 'Manta', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('487', '1', 'Manzanares', '2016-12-16 15:02:44', '2016-12-16 16:45:13');
INSERT INTO `cities` VALUES ('488', '1', 'Mapiripán', '2016-12-16 15:02:44', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('489', '1', 'Margarita', '2016-12-16 15:02:44', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('490', '1', 'María la Baja', '2016-12-16 15:02:44', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('491', '1', 'Marinilla', '2016-12-16 15:02:44', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('492', '1', 'Maripí', '2016-12-16 15:02:44', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('493', '1', 'Mariquita', '2016-12-16 15:02:45', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('494', '1', 'Marmato', '2016-12-16 15:02:45', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('495', '1', 'Marquetalia', '2016-12-16 15:02:45', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('496', '1', 'Marsella', '2016-12-16 15:02:45', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('497', '1', 'Marulanda', '2016-12-16 15:02:45', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('498', '1', 'Matanza', '2016-12-16 15:02:45', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('499', '1', 'Medellín', '2016-12-16 15:02:45', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('500', '1', 'Medina', '2016-12-16 15:02:45', '2016-12-16 16:45:14');
INSERT INTO `cities` VALUES ('501', '1', 'Melgar', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('502', '1', 'Mercaderes', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('503', '1', 'Mesetas', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('504', '1', 'Milán', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('505', '1', 'Miraflores', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('506', '1', 'Miranda', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('507', '1', 'Mistrató', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('508', '1', 'Mitú', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('509', '1', 'Mocoa', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('510', '1', 'Mogotes', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('511', '1', 'Molagavita', '2016-12-16 15:02:45', '2016-12-16 16:45:15');
INSERT INTO `cities` VALUES ('512', '1', 'Momil', '2016-12-16 15:02:45', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('513', '1', 'Mompós', '2016-12-16 15:02:45', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('514', '1', 'Mongua', '2016-12-16 15:02:45', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('515', '1', 'Monguí', '2016-12-16 15:02:45', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('516', '1', 'Moniquirá', '2016-12-16 15:02:46', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('517', '1', 'Monitos', '2016-12-16 15:02:46', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('518', '1', 'Montebello', '2016-12-16 15:02:46', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('519', '1', 'Montecristo', '2016-12-16 15:02:46', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('520', '1', 'Montelíbano', '2016-12-16 15:02:46', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('521', '1', 'Montenegro', '2016-12-16 15:02:46', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('522', '1', 'Montería', '2016-12-16 15:02:46', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('523', '1', 'Monterrey', '2016-12-16 15:02:46', '2016-12-16 16:45:16');
INSERT INTO `cities` VALUES ('524', '1', 'Morales', '2016-12-16 15:02:46', '2016-12-16 16:45:17');
INSERT INTO `cities` VALUES ('525', '1', 'Morelia', '2016-12-16 15:02:46', '2016-12-16 16:45:17');
INSERT INTO `cities` VALUES ('526', '1', 'Morroa', '2016-12-16 15:02:46', '2016-12-16 16:45:17');
INSERT INTO `cities` VALUES ('527', '1', 'Mosquera', '2016-12-16 15:02:46', '2016-12-16 16:45:17');
INSERT INTO `cities` VALUES ('528', '1', 'Motavita', '2016-12-16 15:02:46', '2016-12-16 16:45:17');
INSERT INTO `cities` VALUES ('529', '1', 'Murillo', '2016-12-16 15:02:46', '2016-12-16 16:45:17');
INSERT INTO `cities` VALUES ('530', '1', 'Murindó', '2016-12-16 15:02:46', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('531', '1', 'Mutatá', '2016-12-16 15:02:46', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('532', '1', 'Mutiscua', '2016-12-16 15:02:46', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('533', '1', 'Muzo', '2016-12-16 15:02:46', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('534', '1', 'Nariño', '2016-12-16 15:02:46', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('535', '1', 'Nátaga', '2016-12-16 15:02:46', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('536', '1', 'Natagaima', '2016-12-16 15:02:46', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('537', '1', 'Nechí', '2016-12-16 15:02:47', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('538', '1', 'Necoclí', '2016-12-16 15:02:47', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('539', '1', 'Neira', '2016-12-16 15:02:47', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('540', '1', 'Neiva', '2016-12-16 15:02:47', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('541', '1', 'Nemocón', '2016-12-16 15:02:47', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('542', '1', 'Nilo', '2016-12-16 15:02:47', '2016-12-16 16:45:18');
INSERT INTO `cities` VALUES ('543', '1', 'Nimaima', '2016-12-16 15:02:47', '2016-12-16 16:45:19');
INSERT INTO `cities` VALUES ('544', '1', 'Nobsa', '2016-12-16 15:02:47', '2016-12-16 16:45:19');
INSERT INTO `cities` VALUES ('545', '1', 'Nocaima', '2016-12-16 15:02:47', '2016-12-16 16:45:19');
INSERT INTO `cities` VALUES ('546', '1', 'Nóvita', '2016-12-16 15:02:47', '2016-12-16 16:45:19');
INSERT INTO `cities` VALUES ('547', '1', 'Nuevo Colón', '2016-12-16 15:02:47', '2016-12-16 16:45:19');
INSERT INTO `cities` VALUES ('548', '1', 'Nunchía', '2016-12-16 15:02:47', '2016-12-16 16:45:19');
INSERT INTO `cities` VALUES ('549', '1', 'Nuquí', '2016-12-16 15:02:48', '2016-12-16 16:45:19');
INSERT INTO `cities` VALUES ('550', '1', 'Obando', '2016-12-16 15:02:48', '2016-12-16 16:45:19');
INSERT INTO `cities` VALUES ('551', '1', 'Ocamonte', '2016-12-16 15:02:48', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('552', '1', 'Ocaña', '2016-12-16 15:02:48', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('553', '1', 'Oiba', '2016-12-16 15:02:48', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('554', '1', 'Oicatá', '2016-12-16 15:02:48', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('555', '1', 'Olaya', '2016-12-16 15:02:48', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('556', '1', 'Onzága', '2016-12-16 15:02:48', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('557', '1', 'Oporapa', '2016-12-16 15:02:48', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('558', '1', 'Orito', '2016-12-16 15:02:49', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('559', '1', 'Orocué', '2016-12-16 15:02:49', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('560', '1', 'Ortega', '2016-12-16 15:02:49', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('561', '1', 'Ospina', '2016-12-16 15:02:49', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('562', '1', 'Otanche', '2016-12-16 15:02:49', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('563', '1', 'Ovejas', '2016-12-16 15:02:49', '2016-12-16 16:45:20');
INSERT INTO `cities` VALUES ('564', '1', 'Pachavita', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('565', '1', 'Pacho', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('566', '1', 'Pácora', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('567', '1', 'Padilla', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('568', '1', 'Páez', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('569', '1', 'Páez (Belalcazar)', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('570', '1', 'Paicol', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('571', '1', 'Pailitas', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('572', '1', 'Paime', '2016-12-16 15:02:49', '2016-12-16 16:45:21');
INSERT INTO `cities` VALUES ('573', '1', 'Paipa', '2016-12-16 15:02:49', '2016-12-16 16:45:22');
INSERT INTO `cities` VALUES ('574', '1', 'Pajarito', '2016-12-16 15:02:49', '2016-12-16 16:45:22');
INSERT INTO `cities` VALUES ('575', '1', 'Palermo', '2016-12-16 15:02:49', '2016-12-16 16:45:22');
INSERT INTO `cities` VALUES ('576', '1', 'Palestina', '2016-12-16 15:02:49', '2016-12-16 16:45:22');
INSERT INTO `cities` VALUES ('577', '1', 'Palmar', '2016-12-16 15:02:49', '2016-12-16 16:45:22');
INSERT INTO `cities` VALUES ('578', '1', 'Palmar de Varela', '2016-12-16 15:02:49', '2016-12-16 16:45:22');
INSERT INTO `cities` VALUES ('579', '1', 'Palmas del Socorro', '2016-12-16 15:02:49', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('580', '1', 'Palmira', '2016-12-16 15:02:50', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('581', '1', 'Palmito', '2016-12-16 15:02:50', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('582', '1', 'Palocabildo', '2016-12-16 15:02:50', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('583', '1', 'Pamplona', '2016-12-16 15:02:50', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('584', '1', 'Pamplonita', '2016-12-16 15:02:50', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('585', '1', 'Pandi', '2016-12-16 15:02:50', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('586', '1', 'Panqueba', '2016-12-16 15:02:50', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('587', '1', 'Páramo', '2016-12-16 15:02:50', '2016-12-16 16:45:23');
INSERT INTO `cities` VALUES ('588', '1', 'Paratebueno', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('589', '1', 'Pasca', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('590', '1', 'Pasto', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('591', '1', 'Patía (El Bordo)', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('592', '1', 'Pauna', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('593', '1', 'Paya', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('594', '1', 'Paz de Ariporo', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('595', '1', 'Paz de Río', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('596', '1', 'Pedraza', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('597', '1', 'Pelaya', '2016-12-16 15:02:50', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('598', '1', 'Pensilvania', '2016-12-16 15:02:51', '2016-12-16 16:45:24');
INSERT INTO `cities` VALUES ('599', '1', 'Peñol', '2016-12-16 15:02:51', '2016-12-16 16:45:25');
INSERT INTO `cities` VALUES ('600', '1', 'Peque', '2016-12-16 15:02:51', '2016-12-16 16:45:25');
INSERT INTO `cities` VALUES ('601', '1', 'Pereira', '2016-12-16 15:02:51', '2016-12-16 16:45:25');
INSERT INTO `cities` VALUES ('602', '1', 'Pesca', '2016-12-16 15:02:51', '2016-12-16 16:45:25');
INSERT INTO `cities` VALUES ('603', '1', 'Piamonte', '2016-12-16 15:02:51', '2016-12-16 16:45:25');
INSERT INTO `cities` VALUES ('604', '1', 'Pie de Cuesta', '2016-12-16 15:02:51', '2016-12-16 16:45:25');
INSERT INTO `cities` VALUES ('605', '1', 'Piedras', '2016-12-16 15:02:51', '2016-12-16 16:45:25');
INSERT INTO `cities` VALUES ('606', '1', 'Piendamó', '2016-12-16 15:02:51', '2016-12-16 16:45:26');
INSERT INTO `cities` VALUES ('607', '1', 'Pijao', '2016-12-16 15:02:51', '2016-12-16 16:45:26');
INSERT INTO `cities` VALUES ('608', '1', 'Pijiño del Carmen', '2016-12-16 15:02:51', '2016-12-16 16:45:26');
INSERT INTO `cities` VALUES ('609', '1', 'Pinchote', '2016-12-16 15:02:52', '2016-12-16 16:45:26');
INSERT INTO `cities` VALUES ('610', '1', 'Pinillos', '2016-12-16 15:02:52', '2016-12-16 16:45:26');
INSERT INTO `cities` VALUES ('611', '1', 'Piojó', '2016-12-16 15:02:52', '2016-12-16 16:45:26');
INSERT INTO `cities` VALUES ('612', '1', 'Pisva', '2016-12-16 15:02:52', '2016-12-16 16:45:26');
INSERT INTO `cities` VALUES ('613', '1', 'Pital', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('614', '1', 'Pitalito', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('615', '1', 'Pivijay', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('616', '1', 'Planadas', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('617', '1', 'Planeta Rica', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('618', '1', 'Plato', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('619', '1', 'Policarpa', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('620', '1', 'Polonuevo', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('621', '1', 'Ponedera', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('622', '1', 'Popayán', '2016-12-16 15:02:52', '2016-12-16 16:45:27');
INSERT INTO `cities` VALUES ('623', '1', 'Pore', '2016-12-16 15:02:52', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('624', '1', 'Potosí', '2016-12-16 15:02:52', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('625', '1', 'Pradera', '2016-12-16 15:02:52', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('626', '1', 'Prado', '2016-12-16 15:02:52', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('627', '1', 'Providencia', '2016-12-16 15:02:53', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('628', '1', 'Publoviejo', '2016-12-16 15:02:53', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('629', '1', 'Pueblo Bello', '2016-12-16 15:02:53', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('630', '1', 'Pueblo Nuevo', '2016-12-16 15:02:53', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('631', '1', 'Pueblo Rico', '2016-12-16 15:02:53', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('632', '1', 'Pueblorrico', '2016-12-16 15:02:53', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('633', '1', 'Puente Nacional', '2016-12-16 15:02:53', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('634', '1', 'Puerres', '2016-12-16 15:02:53', '2016-12-16 16:45:28');
INSERT INTO `cities` VALUES ('635', '1', 'Puerto Asís', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('636', '1', 'Puerto Berrío', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('637', '1', 'Puerto Boyacá', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('638', '1', 'Puerto Caicedo', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('639', '1', 'Puerto Carreño', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('640', '1', 'Puerto Colombia', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('641', '1', 'Puerto Concordia', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('642', '1', 'Puerto Escondido', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('643', '1', 'Puerto Gaitán', '2016-12-16 15:02:53', '2016-12-16 16:45:29');
INSERT INTO `cities` VALUES ('644', '1', 'Puerto Guzmán', '2016-12-16 15:02:53', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('645', '1', 'Puerto Inírida', '2016-12-16 15:02:53', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('646', '1', 'Puerto Leguízamo', '2016-12-16 15:02:53', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('647', '1', 'Puerto Libertador', '2016-12-16 15:02:54', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('648', '1', 'Puerto Lleras', '2016-12-16 15:02:54', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('649', '1', 'Puerto López', '2016-12-16 15:02:54', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('650', '1', 'Puerto Nare', '2016-12-16 15:02:54', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('651', '1', 'Puerto Nariño', '2016-12-16 15:02:54', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('652', '1', 'Puerto Parra', '2016-12-16 15:02:54', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('653', '1', 'Puerto Rico', '2016-12-16 15:02:54', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('654', '1', 'Puerto Rondón', '2016-12-16 15:02:54', '2016-12-16 16:45:30');
INSERT INTO `cities` VALUES ('655', '1', 'Puerto Salgar', '2016-12-16 15:02:54', '2016-12-16 16:45:31');
INSERT INTO `cities` VALUES ('656', '1', 'Puerto Santander', '2016-12-16 15:02:54', '2016-12-16 16:45:31');
INSERT INTO `cities` VALUES ('657', '1', 'Puerto Tejada', '2016-12-16 15:02:54', '2016-12-16 16:45:31');
INSERT INTO `cities` VALUES ('658', '1', 'Puerto Triunfo', '2016-12-16 15:02:55', '2016-12-16 16:45:31');
INSERT INTO `cities` VALUES ('659', '1', 'Puerto Wilches', '2016-12-16 15:02:55', '2016-12-16 16:45:31');
INSERT INTO `cities` VALUES ('660', '1', 'Pulí', '2016-12-16 15:02:55', '2016-12-16 16:45:31');
INSERT INTO `cities` VALUES ('661', '1', 'Pupiales', '2016-12-16 15:02:55', '2016-12-16 16:45:31');
INSERT INTO `cities` VALUES ('662', '1', 'Puracé (Coconuco)', '2016-12-16 15:02:55', '2016-12-16 16:45:31');
INSERT INTO `cities` VALUES ('663', '1', 'Purificación', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('664', '1', 'Purísima', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('665', '1', 'Quebradanegra', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('666', '1', 'Quetame', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('667', '1', 'Quibdó', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('668', '1', 'Quimbaya', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('669', '1', 'Quinchia', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('670', '1', 'Quípama', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('671', '1', 'Quipile', '2016-12-16 15:02:55', '2016-12-16 16:45:32');
INSERT INTO `cities` VALUES ('672', '1', 'Rafael', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('673', '1', 'Ragonvalia', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('674', '1', 'Ramiquirí', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('675', '1', 'Ráquira', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('676', '1', 'Recetor', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('677', '1', 'Regidor', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('678', '1', 'Remedios', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('679', '1', 'Remolino', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('680', '1', 'Repelón', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('681', '1', 'Restrepo', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('682', '1', 'Retiro', '2016-12-16 15:02:56', '2016-12-16 16:45:33');
INSERT INTO `cities` VALUES ('683', '1', 'Ricaurte', '2016-12-16 15:02:56', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('684', '1', 'Río de Oro', '2016-12-16 15:02:56', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('685', '1', 'Río Viejo', '2016-12-16 15:02:56', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('686', '1', 'Rioblanco', '2016-12-16 15:02:56', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('687', '1', 'Riofrío', '2016-12-16 15:02:56', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('688', '1', 'Riohacha', '2016-12-16 15:02:57', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('689', '1', 'Rionegro', '2016-12-16 15:02:57', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('690', '1', 'Riosucio', '2016-12-16 15:02:57', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('691', '1', 'Risaralda', '2016-12-16 15:02:57', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('692', '1', 'Rivera', '2016-12-16 15:02:57', '2016-12-16 16:45:34');
INSERT INTO `cities` VALUES ('693', '1', 'Roberto Payán (San José)', '2016-12-16 15:02:57', '2016-12-16 16:45:35');
INSERT INTO `cities` VALUES ('694', '1', 'Roldanillo', '2016-12-16 15:02:57', '2016-12-16 16:45:35');
INSERT INTO `cities` VALUES ('695', '1', 'Roncesvalles', '2016-12-16 15:02:57', '2016-12-16 16:45:35');
INSERT INTO `cities` VALUES ('696', '1', 'Rondón', '2016-12-16 15:02:57', '2016-12-16 16:45:35');
INSERT INTO `cities` VALUES ('697', '1', 'Rosas', '2016-12-16 15:02:57', '2016-12-16 16:45:35');
INSERT INTO `cities` VALUES ('698', '1', 'Rovira', '2016-12-16 15:02:57', '2016-12-16 16:45:35');
INSERT INTO `cities` VALUES ('699', '1', 'Sabalarga', '2016-12-16 15:02:57', '2016-12-16 16:45:35');
INSERT INTO `cities` VALUES ('700', '1', 'Sabana de Torres', '2016-12-16 15:02:57', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('701', '1', 'Sabanagrande', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('702', '1', 'Sabanalarga', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('703', '1', 'Sabaneta', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('704', '1', 'Saboyá', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('705', '1', 'Sácama', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('706', '1', 'Sáchica', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('707', '1', 'Sahagún', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('708', '1', 'Saladoblanco', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('709', '1', 'Salamina', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('710', '1', 'Salazar', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('711', '1', 'Saldaña', '2016-12-16 15:02:58', '2016-12-16 16:45:36');
INSERT INTO `cities` VALUES ('712', '1', 'Salento', '2016-12-16 15:02:58', '2016-12-16 16:45:37');
INSERT INTO `cities` VALUES ('713', '1', 'Salgar', '2016-12-16 15:02:58', '2016-12-16 16:45:37');
INSERT INTO `cities` VALUES ('714', '1', 'Samacá', '2016-12-16 15:02:58', '2016-12-16 16:45:37');
INSERT INTO `cities` VALUES ('715', '1', 'Samaná', '2016-12-16 15:02:59', '2016-12-16 16:45:37');
INSERT INTO `cities` VALUES ('716', '1', 'Samaniego', '2016-12-16 15:02:59', '2016-12-16 16:45:37');
INSERT INTO `cities` VALUES ('717', '1', 'Sampués', '2016-12-16 15:02:59', '2016-12-16 16:45:37');
INSERT INTO `cities` VALUES ('718', '1', 'San Agustín', '2016-12-16 15:02:59', '2016-12-16 16:45:37');
INSERT INTO `cities` VALUES ('719', '1', 'San Alberto', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('720', '1', 'San Andrés', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('721', '1', 'San Andrés Sotavento', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('722', '1', 'San Antero', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('723', '1', 'San Antonio', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('724', '1', 'San Antonio de Tequendama', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('725', '1', 'San Benito', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('726', '1', 'San Benito Abad', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('727', '1', 'San Bernardo', '2016-12-16 15:02:59', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('728', '1', 'San Bernardo del Viento', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('729', '1', 'San Calixto', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('730', '1', 'San Carlos', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('731', '1', 'San Carlos de Guaroa', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('732', '1', 'San Cayetano', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('733', '1', 'San Cristóbal', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('734', '1', 'San Diego', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('735', '1', 'San Eduardo', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('736', '1', 'San Estanislao', '2016-12-16 15:03:00', '2016-12-16 16:45:38');
INSERT INTO `cities` VALUES ('737', '1', 'San Fernando', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('738', '1', 'San Francisco', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('739', '1', 'San Gil', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('740', '1', 'San Jacinto', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('741', '1', 'San Jacinto del Cauca', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('742', '1', 'San Jerónimo', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('743', '1', 'San Joaquín', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('744', '1', 'San José', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('745', '1', 'San José de Miranda', '2016-12-16 15:03:00', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('746', '1', 'San José de Montaña', '2016-12-16 15:03:01', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('747', '1', 'San José de Pare', '2016-12-16 15:03:01', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('748', '1', 'San José del Fragua', '2016-12-16 15:03:01', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('749', '1', 'San José del Guaviare', '2016-12-16 15:03:01', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('750', '1', 'San José del Palmar', '2016-12-16 15:03:01', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('751', '1', 'San Juan de Arama', '2016-12-16 15:03:01', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('752', '1', 'San Juan de Betulia', '2016-12-16 15:03:01', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('753', '1', 'San Juan de Rioseco', '2016-12-16 15:03:01', '2016-12-16 16:45:39');
INSERT INTO `cities` VALUES ('754', '1', 'San Juan de Urabá', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('755', '1', 'San Juan del Cesar', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('756', '1', 'San Juan Nepomuceno', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('757', '1', 'San Juanito', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('758', '1', 'San Lorenzo', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('759', '1', 'San Luis', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('760', '1', 'San Luis de Gaceno', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('761', '1', 'San Luis de Palenque', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('762', '1', 'San Marcos', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('763', '1', 'San Martín', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('764', '1', 'San Martín de Loba', '2016-12-16 15:03:01', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('765', '1', 'San Mateo', '2016-12-16 15:03:02', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('766', '1', 'San Miguel', '2016-12-16 15:03:02', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('767', '1', 'San Miguel de Sema', '2016-12-16 15:03:02', '2016-12-16 16:45:40');
INSERT INTO `cities` VALUES ('768', '1', 'San Onofre', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('769', '1', 'San Pablo', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('770', '1', 'San Pablo de Borbur', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('771', '1', 'San Pedro', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('772', '1', 'San Pedro de Cartago', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('773', '1', 'San Pedro de Urabá', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('774', '1', 'San Pelayo', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('775', '1', 'San Rafael', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('776', '1', 'San Roque', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('777', '1', 'San Sebastián', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('778', '1', 'San Sebastián de Buuenavista', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('779', '1', 'San Vicente', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('780', '1', 'San Vicente de Chucurí', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('781', '1', 'San Vicente del Caguán', '2016-12-16 15:03:02', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('782', '1', 'San Zenón', '2016-12-16 15:03:03', '2016-12-16 16:45:41');
INSERT INTO `cities` VALUES ('783', '1', 'Sandoná', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('784', '1', 'Santa Ana', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('785', '1', 'Santa Bárbara', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('786', '1', 'Santa Bárbara (Iscuandé)', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('787', '1', 'Santa Catalina', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('788', '1', 'Santa Cruz (Guachávez)', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('789', '1', 'Santa Helena del Opón', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('790', '1', 'Santa Isabel', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('791', '1', 'Santa Lucía', '2016-12-16 15:03:03', '2016-12-16 16:45:42');
INSERT INTO `cities` VALUES ('792', '1', 'Santa María', '2016-12-16 15:03:03', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('793', '1', 'Santa Marta', '2016-12-16 15:03:03', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('794', '1', 'Santa Rosa', '2016-12-16 15:03:03', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('795', '1', 'Santa Rosa de Cabal', '2016-12-16 15:03:03', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('796', '1', 'Santa Rosa de Osos', '2016-12-16 15:03:03', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('797', '1', 'Santa Rosa de Viterbo', '2016-12-16 15:03:03', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('798', '1', 'Santa Rosa del Sur', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('799', '1', 'Santa Rosalia', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('800', '1', 'Santa Sofía', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('801', '1', 'Bogotá', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('802', '1', 'Santana', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('803', '1', 'Santander de Quilichao', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('804', '1', 'Santiago', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('805', '1', 'Santo Domingo', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('806', '1', 'Santo Tomás', '2016-12-16 15:03:04', '2016-12-16 16:45:43');
INSERT INTO `cities` VALUES ('807', '1', 'Santuario', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('808', '1', 'Sapuyés', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('809', '1', 'Saravena', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('810', '1', 'Sardinata', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('811', '1', 'Sasaima', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('812', '1', 'Sativanorte', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('813', '1', 'Sativasur', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('814', '1', 'Segovia', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('815', '1', 'Sesquilé', '2016-12-16 15:03:05', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('816', '1', 'Sevilla', '2016-12-16 15:03:06', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('817', '1', 'Siachoque', '2016-12-16 15:03:06', '2016-12-16 16:45:44');
INSERT INTO `cities` VALUES ('818', '1', 'Sibate', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('819', '1', 'Sibundoy', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('820', '1', 'Silos', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('821', '1', 'Silvania', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('822', '1', 'Silvia', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('823', '1', 'Simacota', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('824', '1', 'Simijaca', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('825', '1', 'Simití', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('826', '1', 'Sincé', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('827', '1', 'Sincelejo', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('828', '1', 'Sipí', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('829', '1', 'Sitionuevo', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('830', '1', 'Soacha', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('831', '1', 'Soatá', '2016-12-16 15:03:06', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('832', '1', 'Socha', '2016-12-16 15:03:07', '2016-12-16 16:45:45');
INSERT INTO `cities` VALUES ('833', '1', 'Socorro', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('834', '1', 'Socotá', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('835', '1', 'Sogamoso', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('836', '1', 'Solano', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('837', '1', 'Soledad', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('838', '1', 'Solita', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('839', '1', 'Somondoco', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('840', '1', 'Sonsón', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('841', '1', 'Sopetrán', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('842', '1', 'Soplaviento', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('843', '1', 'Sopó', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('844', '1', 'Sora', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('845', '1', 'Soracá', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('846', '1', 'Sotaquirá', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('847', '1', 'Sotará (Paispamba)', '2016-12-16 15:03:07', '2016-12-16 16:45:46');
INSERT INTO `cities` VALUES ('848', '1', 'Suaita', '2016-12-16 15:03:07', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('849', '1', 'Suán', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('850', '1', 'Suárez', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('851', '1', 'Suazá', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('852', '1', 'Subachoque', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('853', '1', 'Sucre', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('854', '1', 'Suesca', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('855', '1', 'Supatá', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('856', '1', 'Supía', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('857', '1', 'Suratá', '2016-12-16 15:03:08', '2016-12-16 16:45:47');
INSERT INTO `cities` VALUES ('858', '1', 'Susa', '2016-12-16 15:03:08', '2016-12-16 16:45:48');
INSERT INTO `cities` VALUES ('859', '1', 'Susacón', '2016-12-16 15:03:08', '2016-12-16 16:45:48');
INSERT INTO `cities` VALUES ('860', '1', 'Sutamarchán', '2016-12-16 15:03:08', '2016-12-16 16:45:48');
INSERT INTO `cities` VALUES ('861', '1', 'Sutatausa', '2016-12-16 15:03:08', '2016-12-16 16:45:48');
INSERT INTO `cities` VALUES ('862', '1', 'Sutatenza', '2016-12-16 15:03:08', '2016-12-16 16:45:48');
INSERT INTO `cities` VALUES ('863', '1', 'Tabio', '2016-12-16 15:03:08', '2016-12-16 16:45:48');
INSERT INTO `cities` VALUES ('864', '1', 'Tadó', '2016-12-16 15:03:08', '2016-12-16 16:45:48');
INSERT INTO `cities` VALUES ('865', '1', 'Talaigua Nuevo', '2016-12-16 15:03:08', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('866', '1', 'Tamalameque', '2016-12-16 15:03:08', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('867', '1', 'Támara', '2016-12-16 15:03:09', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('868', '1', 'Tame', '2016-12-16 15:03:09', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('869', '1', 'Támesis', '2016-12-16 15:03:09', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('870', '1', 'Taminango', '2016-12-16 15:03:09', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('871', '1', 'Tangua', '2016-12-16 15:03:09', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('872', '1', 'Tarazá', '2016-12-16 15:03:09', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('873', '1', 'Tarqui', '2016-12-16 15:03:09', '2016-12-16 16:45:49');
INSERT INTO `cities` VALUES ('874', '1', 'Tarso', '2016-12-16 15:03:09', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('875', '1', 'Tasco', '2016-12-16 15:03:09', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('876', '1', 'Tatamá', '2016-12-16 15:03:09', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('877', '1', 'Tauramena', '2016-12-16 15:03:09', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('878', '1', 'Tausa', '2016-12-16 15:03:09', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('879', '1', 'Tello', '2016-12-16 15:03:09', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('880', '1', 'Tena', '2016-12-16 15:03:09', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('881', '1', 'Tenerife', '2016-12-16 15:03:09', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('882', '1', 'Tenjo', '2016-12-16 15:03:10', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('883', '1', 'Tenza', '2016-12-16 15:03:10', '2016-12-16 16:45:50');
INSERT INTO `cities` VALUES ('884', '1', 'Teorama', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('885', '1', 'Teruel', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('886', '1', 'Tesalia', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('887', '1', 'Tibacuy', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('888', '1', 'Tibaná', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('889', '1', 'Tibasosa', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('890', '1', 'Tibiritá', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('891', '1', 'Tibú', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('892', '1', 'Tierralta', '2016-12-16 15:03:10', '2016-12-16 16:45:51');
INSERT INTO `cities` VALUES ('893', '1', 'Timaná', '2016-12-16 15:03:10', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('894', '1', 'Timbío', '2016-12-16 15:03:10', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('895', '1', 'Timbiquí', '2016-12-16 15:03:10', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('896', '1', 'Tinjacá', '2016-12-16 15:03:11', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('897', '1', 'Tipacoque', '2016-12-16 15:03:11', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('898', '1', 'Tiquisio (Puerto Rico)', '2016-12-16 15:03:11', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('899', '1', 'Titiribí', '2016-12-16 15:03:11', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('900', '1', 'Toca', '2016-12-16 15:03:11', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('901', '1', 'Tocaima', '2016-12-16 15:03:11', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('902', '1', 'Tocancipá', '2016-12-16 15:03:12', '2016-12-16 16:45:52');
INSERT INTO `cities` VALUES ('903', '1', 'Toguí', '2016-12-16 15:03:12', '2016-12-16 16:45:53');
INSERT INTO `cities` VALUES ('904', '1', 'Toledo', '2016-12-16 15:03:12', '2016-12-16 16:45:53');
INSERT INTO `cities` VALUES ('905', '1', 'Tolú', '2016-12-16 15:03:12', '2016-12-16 16:45:53');
INSERT INTO `cities` VALUES ('906', '1', 'Toluviejo', '2016-12-16 15:03:13', '2016-12-16 16:45:53');
INSERT INTO `cities` VALUES ('907', '1', 'Tona', '2016-12-16 15:03:13', '2016-12-16 16:45:53');
INSERT INTO `cities` VALUES ('908', '1', 'Tópaga', '2016-12-16 15:03:13', '2016-12-16 16:45:53');
INSERT INTO `cities` VALUES ('909', '1', 'Topaipí', '2016-12-16 15:03:13', '2016-12-16 16:45:53');
INSERT INTO `cities` VALUES ('910', '1', 'Toribío', '2016-12-16 15:03:13', '2016-12-16 16:45:54');
INSERT INTO `cities` VALUES ('911', '1', 'Toro', '2016-12-16 15:03:13', '2016-12-16 16:45:54');
INSERT INTO `cities` VALUES ('912', '1', 'Tota', '2016-12-16 15:03:13', '2016-12-16 16:45:54');
INSERT INTO `cities` VALUES ('913', '1', 'Totoro', '2016-12-16 15:03:13', '2016-12-16 16:45:54');
INSERT INTO `cities` VALUES ('914', '1', 'Trinidad', '2016-12-16 15:03:13', '2016-12-16 16:45:54');
INSERT INTO `cities` VALUES ('915', '1', 'Trujillo', '2016-12-16 15:03:13', '2016-12-16 16:45:54');
INSERT INTO `cities` VALUES ('916', '1', 'Tubará', '2016-12-16 15:03:14', '2016-12-16 16:45:54');
INSERT INTO `cities` VALUES ('917', '1', 'Tuluá', '2016-12-16 15:03:14', '2016-12-16 16:45:55');
INSERT INTO `cities` VALUES ('918', '1', 'Tumaco', '2016-12-16 15:03:14', '2016-12-16 16:45:55');
INSERT INTO `cities` VALUES ('919', '1', 'Tunja', '2016-12-16 15:03:14', '2016-12-16 16:45:55');
INSERT INTO `cities` VALUES ('920', '1', 'Tunungua', '2016-12-16 15:03:14', '2016-12-16 16:45:55');
INSERT INTO `cities` VALUES ('921', '1', 'Túquerres', '2016-12-16 15:03:14', '2016-12-16 16:45:55');
INSERT INTO `cities` VALUES ('922', '1', 'Turbaco', '2016-12-16 15:03:14', '2016-12-16 16:45:55');
INSERT INTO `cities` VALUES ('923', '1', 'Turbaná', '2016-12-16 15:03:14', '2016-12-16 16:45:55');
INSERT INTO `cities` VALUES ('924', '1', 'Turbo', '2016-12-16 15:03:14', '2016-12-16 16:45:55');
INSERT INTO `cities` VALUES ('925', '1', 'Turmequé', '2016-12-16 15:03:14', '2016-12-16 16:45:56');
INSERT INTO `cities` VALUES ('926', '1', 'Tuta', '2016-12-16 15:03:14', '2016-12-16 16:45:56');
INSERT INTO `cities` VALUES ('927', '1', 'Tutazá', '2016-12-16 15:03:14', '2016-12-16 16:45:56');
INSERT INTO `cities` VALUES ('928', '1', 'Ubalá', '2016-12-16 15:03:15', '2016-12-16 16:45:56');
INSERT INTO `cities` VALUES ('929', '1', 'Ubaque', '2016-12-16 15:03:15', '2016-12-16 16:45:56');
INSERT INTO `cities` VALUES ('930', '1', 'Ubaté', '2016-12-16 15:03:15', '2016-12-16 16:45:56');
INSERT INTO `cities` VALUES ('931', '1', 'Ulloa', '2016-12-16 15:03:15', '2016-12-16 16:45:57');
INSERT INTO `cities` VALUES ('932', '1', 'Úmbita', '2016-12-16 15:03:15', '2016-12-16 16:45:57');
INSERT INTO `cities` VALUES ('933', '1', 'Une', '2016-12-16 15:03:15', '2016-12-16 16:45:57');
INSERT INTO `cities` VALUES ('934', '1', 'Unguía', '2016-12-16 15:03:15', '2016-12-16 16:45:57');
INSERT INTO `cities` VALUES ('935', '1', 'Uramita', '2016-12-16 15:03:15', '2016-12-16 16:45:57');
INSERT INTO `cities` VALUES ('936', '1', 'Uribía', '2016-12-16 15:03:15', '2016-12-16 16:45:57');
INSERT INTO `cities` VALUES ('937', '1', 'Urrao', '2016-12-16 15:03:15', '2016-12-16 16:45:57');
INSERT INTO `cities` VALUES ('938', '1', 'Urumita', '2016-12-16 15:03:15', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('939', '1', 'Usiacurí', '2016-12-16 15:03:15', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('940', '1', 'Útica', '2016-12-16 15:03:15', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('941', '1', 'Valdivia', '2016-12-16 15:03:15', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('942', '1', 'Valencia', '2016-12-16 15:03:15', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('943', '1', 'Valle de San José', '2016-12-16 15:03:16', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('944', '1', 'Valle de San Juan', '2016-12-16 15:03:16', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('945', '1', 'Valledupar', '2016-12-16 15:03:16', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('946', '1', 'Valparaíso', '2016-12-16 15:03:16', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('947', '1', 'Vegachí', '2016-12-16 15:03:16', '2016-12-16 16:45:58');
INSERT INTO `cities` VALUES ('948', '1', 'Vélez', '2016-12-16 15:03:16', '2016-12-16 16:45:59');
INSERT INTO `cities` VALUES ('949', '1', 'Venadillo', '2016-12-16 15:03:16', '2016-12-16 16:45:59');
INSERT INTO `cities` VALUES ('950', '1', 'Venecia', '2016-12-16 15:03:16', '2016-12-16 16:45:59');
INSERT INTO `cities` VALUES ('951', '1', 'Venecia (Ospina Pérez)', '2016-12-16 15:03:16', '2016-12-16 16:45:59');
INSERT INTO `cities` VALUES ('952', '1', 'Ventaquemada', '2016-12-16 15:03:16', '2016-12-16 16:46:00');
INSERT INTO `cities` VALUES ('953', '1', 'Vergara', '2016-12-16 15:03:16', '2016-12-16 16:46:00');
INSERT INTO `cities` VALUES ('954', '1', 'Versalles', '2016-12-16 15:03:16', '2016-12-16 16:46:00');
INSERT INTO `cities` VALUES ('955', '1', 'Vetas', '2016-12-16 15:03:16', '2016-12-16 16:46:00');
INSERT INTO `cities` VALUES ('956', '1', 'Vianí', '2016-12-16 15:03:16', '2016-12-16 16:46:00');
INSERT INTO `cities` VALUES ('957', '1', 'Victoria', '2016-12-16 15:03:16', '2016-12-16 16:46:01');
INSERT INTO `cities` VALUES ('958', '1', 'Vigía del Fuerte', '2016-12-16 15:03:17', '2016-12-16 16:46:01');
INSERT INTO `cities` VALUES ('959', '1', 'Vijes', '2016-12-16 15:03:17', '2016-12-16 16:46:01');
INSERT INTO `cities` VALUES ('960', '1', 'Villa de Leyva', '2016-12-16 15:03:17', '2016-12-16 16:46:01');
INSERT INTO `cities` VALUES ('961', '1', 'Villa del Rosario', '2016-12-16 15:03:17', '2016-12-16 16:46:01');
INSERT INTO `cities` VALUES ('962', '1', 'Villa Gamuez (La Hormiga)', '2016-12-16 15:03:17', '2016-12-16 16:46:02');
INSERT INTO `cities` VALUES ('963', '1', 'Villa Garzón', '2016-12-16 15:03:17', '2016-12-16 16:46:02');
INSERT INTO `cities` VALUES ('964', '1', 'Villacaro', '2016-12-16 15:03:17', '2016-12-16 16:46:02');
INSERT INTO `cities` VALUES ('965', '1', 'Villagómez', '2016-12-16 15:03:17', '2016-12-16 16:46:02');
INSERT INTO `cities` VALUES ('966', '1', 'Villahermosa', '2016-12-16 15:03:17', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('967', '1', 'Villamaría', '2016-12-16 15:03:17', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('968', '1', 'Villanueva', '2016-12-16 15:03:17', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('969', '1', 'Villapinzón', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('970', '1', 'Villarrica', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('971', '1', 'Villavicencio', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('972', '1', 'Villavieja', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('973', '1', 'Villeta', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('974', '1', 'Viotá', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('975', '1', 'Viracachá', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('976', '1', 'Vistahermosa', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('977', '1', 'Viterbo', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('978', '1', 'Yacopí', '2016-12-16 15:03:18', '2016-12-16 16:46:03');
INSERT INTO `cities` VALUES ('979', '1', 'Yacuanquer', '2016-12-16 15:03:18', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('980', '1', 'Yaguará', '2016-12-16 15:03:18', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('981', '1', 'Yalí', '2016-12-16 15:03:18', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('982', '1', 'Yarumal', '2016-12-16 15:03:18', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('983', '1', 'Yolombó', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('984', '1', 'Yondó (Casabe)', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('985', '1', 'Yopal', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('986', '1', 'Yotoco', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('987', '1', 'Yumbo', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('988', '1', 'Zambrano', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('989', '1', 'Zapatoca', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('990', '1', 'Zaragoza', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('991', '1', 'Zarzal', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('992', '1', 'Zetaquirá', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('993', '1', 'Zipacón', '2016-12-16 15:03:19', '2016-12-16 16:46:04');
INSERT INTO `cities` VALUES ('994', '1', 'Zipaquirá', '2016-12-16 15:03:19', '2016-12-16 16:46:04');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class_group
-- ----------------------------

-- ----------------------------
-- Table structure for countries
-- ----------------------------
DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of countries
-- ----------------------------
INSERT INTO `countries` VALUES ('1', 'Colombia', '2016-12-16 16:44:17', '2016-12-16 16:44:17');

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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=1168 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of laboratory
-- ----------------------------
INSERT INTO `laboratory` VALUES ('1034', 'FISVEC003', '22', null, 'Clases de vectores', 'Magnitudes y unidades', '2016-12-17 12:16:37', '2016-12-17 12:16:37');
INSERT INTO `laboratory` VALUES ('1035', 'FISVEC001', '22', null, 'Suma de vectores - Rescate en altamar', 'Magnitudes y unidades', '2016-12-17 12:16:37', '2016-12-17 12:16:37');
INSERT INTO `laboratory` VALUES ('1036', 'FISVEC002', '22', null, 'Resta de vectores - Fuerzas en un puente', 'Magnitudes y unidades', '2016-12-17 12:16:37', '2016-12-17 12:16:37');
INSERT INTO `laboratory` VALUES ('1037', 'FISMRU003', '22', null, 'Gráficas de posición contra tiempo', 'Cinemática', '2016-12-17 12:16:37', '2016-12-17 12:16:37');
INSERT INTO `laboratory` VALUES ('1038', 'FISMRU004', '22', null, 'Gráficas de velocidad contra tiempo', 'Cinemática', '2016-12-17 12:16:37', '2016-12-17 12:16:37');
INSERT INTO `laboratory` VALUES ('1039', 'FISMRU001', '22', null, 'Movimiento rectilíneo uniforme M.R.U', 'Cinemática', '2016-12-17 12:16:37', '2016-12-17 12:16:37');
INSERT INTO `laboratory` VALUES ('1040', 'FISMRU002', '22', null, 'Movimiento rectilíneo uniformemente acelerado M.R.U.A', 'Cinemática', '2016-12-17 12:16:37', '2016-12-17 12:16:37');
INSERT INTO `laboratory` VALUES ('1041', 'FISS3D004', '22', null, 'Movimiento en el plano', 'Cinemática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1042', 'FISS3D001', '22', null, 'Tiro parabólico - Reto lanzamiento baloncesto', 'Cinemática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1043', 'FISVEC004', '22', null, 'Resultante de dos fuerzas', 'Dinámica y estática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1044', 'FISMRU005', '22', null, 'Fuerza de fricción', 'Dinámica y estática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1045', 'FISNEW001', '22', null, 'Comprobación segunda ley de Newton - Desplazamiento de un móvil.', 'Dinámica y estática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1046', 'FISNEW002', '22', null, 'Segunda ley de Newton - Elevando una carga', 'Dinámica y estática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1047', 'FISEQU003', '22', null, 'La carreta como máquina simple', 'Dinámica y estática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1048', 'FISEQU001', '22', null, 'Momento de una fuerza', 'Dinámica y estática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1049', 'FISEQU002', '22', null, 'Equilibrio', 'Dinámica y estática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1050', 'FISNEW003', '22', null, 'Gravedad', 'Dinámica y estática', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1051', 'FISTEP002', '22', null, 'Trabajo y potencia en un elevador de carga', 'Trabajo energía y potencia', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1052', 'FISTEP003', '22', null, 'Trabajo energía y potencia en una montaña rusa', 'Trabajo energía y potencia', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1053', 'FISTEP001', '22', null, 'Fuentes y transformaciones de la energía', 'Trabajo energía y potencia', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1054', 'FISS3D005', '22', null, 'Principio de Pascal', 'Fluidos', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1055', 'FISS3D002', '22', null, 'Prensa hidráhulica', 'Fluidos', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1056', 'FISTER001', '22', null, 'Escalas de temperatura', 'Termodinámica', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1057', 'FISTER002', '22', null, 'Calor específico y capacidad térmica', 'Termodinámica', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1058', 'FISTER003', '22', null, 'Calor latente', 'Termodinámica', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1059', 'FISS3D006', '22', null, 'La energía en el movimiento armónico simple', 'Movimiento armónico simple', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1060', 'FISS3D007', '22', null, 'Leyes del péndulo simple', 'Movimiento armónico simple', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1061', 'FISS3D003', '22', null, 'Movimiento pendular - Reto reloj de péndulo', 'Movimiento armónico simple', '2016-12-17 12:16:38', '2016-12-17 12:16:38');
INSERT INTO `laboratory` VALUES ('1062', 'FISOND001', '22', null, 'Produciendo una onda de radio (Ondas electromagnéticas)', 'Ondas', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1063', 'FISOND002', '22', null, 'Ondas de sonido (Ondas mecánicas)', 'Ondas', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1064', 'FISOND003', '22', null, 'Espectro electromagnético', 'Ondas', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1065', 'FISOND004', '22', null, 'Luz visible', 'Óptica', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1066', 'FISOPT001', '22', null, 'Dispersión y síntesis de la luz', 'Óptica', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1067', 'FISOPT002', '22', null, 'Espejo cóncavo', 'Óptica', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1068', 'FISOPT004', '22', null, 'Espejos esféricos', 'Óptica', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1069', 'FISOPT003', '22', null, 'Lente convergente', 'Óptica', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1070', 'FISOPT005', '22', null, 'Lentes', 'Óptica', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1071', 'FISELE004', '22', null, 'Magnitudes eléctricas', 'Electricidad y electromagnetismo', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1072', 'FISELE001', '22', null, 'Circuito serie', 'Electricidad y electromagnetismo', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1073', 'FISELE002', '22', null, 'Circuito paralelo', 'Electricidad y electromagnetismo', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1074', 'FISELE003', '22', null, 'Circuito mixto', 'Electricidad y electromagnetismo', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1075', 'FISELE005', '22', null, 'Resistencia equivalente', 'Electricidad y electromagnetismo', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1076', 'FISELE006', '22', null, 'Ley de los voltajes', 'Electricidad y electromagnetismo', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1077', 'FISELE007', '22', null, 'Ley de las corrientes', 'Electricidad y electromagnetismo', '2016-12-17 12:16:39', '2016-12-17 12:16:39');
INSERT INTO `laboratory` VALUES ('1078', 'QUIDEN001', '21', null, 'Determinacion de densidad de solidos', 'La materia', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1079', 'QUIDEN002', '21', null, 'Determinación de densidad de liquidos', 'La materia', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1080', 'QUIMEZ001', '21', null, 'Destilación', 'La materia', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1081', 'QUIMEZ002', '21', null, 'Decantación', 'La materia', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1082', 'QUIMEZ003', '21', null, 'Filtración', 'La materia', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1083', 'QUIMEZ004', '21', null, 'Evaporación', 'La materia', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1084', 'QUIEQU001', '21', null, 'Estudio de equilibrio ion cromato-ion dicromato', 'Reacciones químicas', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1085', 'QUIEQU002', '21', null, 'Estudio de equilibrio efecto ino común', 'Reacciones químicas', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1086', 'QUIEQU003', '21', null, 'Desplazamiento de ácidos y bases débiles', 'Reacciones químicas', '2016-12-17 12:16:46', '2016-12-17 12:16:46');
INSERT INTO `laboratory` VALUES ('1087', 'QUIEQU004', '21', null, 'Precipitación y disolución de hidróxilos metálicos', 'Reacciones químicas', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1088', 'QUIEQU005', '21', null, 'Equilibrio de iones complejos', 'Reacciones químicas', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1089', 'QUIEQU006', '21', null, 'Equilibrio de iones complejos. Influencia de la temperatura.', 'Reacciones químicas', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1090', 'QUITIT001', '21', null, 'Titulación por métodos clásicos (volumétricos)', 'Soluciones', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1091', 'QUITIT002', '21', null, 'Titulación por métodos potenciométricos', 'Soluciones', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1092', 'QUIEQU007', '21', null, 'Medición de pH', 'Soluciones', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1093', 'QUICAL001', '21', null, 'Medida de la capacidad calorífica de un calorímetro', 'Soluciones', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1094', 'QUICAL002', '21', null, 'Medida del calor lantente de fusión del hielo', 'Soluciones', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1095', 'QUICAL003', '21', null, 'Medida aproximada de la entalpía de una reacción de neutralización ácido- base', 'Soluciones', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1096', 'QUICAL004', '21', null, 'Medida de calor específico de metales', 'Soluciones', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1097', 'QUICAL005', '21', null, 'Determinación del equivalente mecánico de calor', 'Soluciones', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1098', 'QUIGAS001', '21', null, 'Ley de Boyle - Mariotte', 'Gases', '2016-12-17 12:16:47', '2016-12-17 12:16:47');
INSERT INTO `laboratory` VALUES ('1099', 'QUIGAS002', '21', null, 'Ley de Gay-Lussac', 'Gases', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1100', 'QUIGAS003', '21', null, 'Ley de las presiones parciales de Dalton', 'Gases', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1101', 'QUIGAS004', '21', null, 'Ley de Charles', 'Gases', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1102', 'QUIALC001', '21', null, 'Síntesis de metano', 'El carbono', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1103', 'QUIALC002', '21', null, 'Síntesis de ciclopropano', 'Cicloalcanos, alquenos y alquinos', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1104', 'QUIALC003', '21', null, 'Síntesis de etileno', 'Cicloalcanos, alquenos y alquinos', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1105', 'QUIALC004', '21', null, 'Síntesis de acetileno', 'Cicloalcanos, alquenos y alquinos', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1106', 'QUIALH001', '21', null, 'Síntesis de alcohol bencílico', 'Alcoholes, aldehídos y cetonas', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1107', 'QUIS3D001', '21', null, 'Fermentador', 'Alcoholes, aldehídos y cetonas', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1108', 'QUIS3D002', '21', null, 'Destilador', 'Alcoholes, aldehídos y cetonas', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1109', 'QUIALH002', '21', null, 'Síntesis de aldehídos', 'Alcoholes, aldehídos y cetonas', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1110', 'QUIALH003', '21', null, 'Síntesis de ciclohexanona', 'Alcoholes, aldehídos y cetonas', '2016-12-17 12:16:48', '2016-12-17 12:16:48');
INSERT INTO `laboratory` VALUES ('1111', 'QUIALH004', '21', null, 'Síntesis de ácido acético', 'Ácidos carboxílicos, haluros de acilo, anhídridos, ésteres y amidas', '2016-12-17 12:16:49', '2016-12-17 12:16:49');
INSERT INTO `laboratory` VALUES ('1112', 'QUIACI001', '21', null, 'Síntesis de anhídrido propiónico (propanóico)', 'Ácidos carboxílicos, haluros de acilo, anhídridos, ésteres y amidas', '2016-12-17 12:16:49', '2016-12-17 12:16:49');
INSERT INTO `laboratory` VALUES ('1113', 'QUIACI002', '21', null, 'Síntesis de benzoato de metilo', 'Ácidos carboxílicos, haluros de acilo, anhídridos, ésteres y amidas', '2016-12-17 12:16:49', '2016-12-17 12:16:49');
INSERT INTO `laboratory` VALUES ('1114', 'QUIACI003', '21', null, 'Síntesis de N-etil - 4 - Toluamida', 'Ácidos carboxílicos, haluros de acilo, anhídridos, ésteres y amidas', '2016-12-17 12:16:49', '2016-12-17 12:16:49');
INSERT INTO `laboratory` VALUES ('1115', 'QUIACI004', '21', null, 'Síntensis de 2-etilhexanonitrilo', 'Nitrilos, éteres, benceno y aminas', '2016-12-17 12:16:49', '2016-12-17 12:16:49');
INSERT INTO `laboratory` VALUES ('1116', 'QUIACI005', '21', null, 'Síntensis de 4-nitroanilina', 'Nitrilos, éteres, benceno y aminas', '2016-12-17 12:16:49', '2016-12-17 12:16:49');
INSERT INTO `laboratory` VALUES ('1117', 'QUIS3D003', '21', null, 'Síntesis de aminoácidos', 'Compuestos de interés biológico', '2016-12-17 12:16:49', '2016-12-17 12:16:49');
INSERT INTO `laboratory` VALUES ('1118', 'CIEECO001', '23', null, 'Tipos de ecosistemas', 'Ecosistemas', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1119', 'CIEECO002', '23', null, 'Cadenas tróficas', 'Ecosistemas', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1120', 'CIEECO003', '23', null, 'Equilibrio de un ecosistema', 'Ecosistemas', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1121', 'CIEECO004', '23', null, 'Factores ambientales de un ecosistema', 'Ecosistemas', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1122', 'CIECEL001', '23', null, 'Tipos de células', 'Origen y clasificación de los seres vivos', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1123', 'CIES3D001', '23', null, 'Morfología celular', 'Origen y clasificación de los seres vivos', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1124', 'CIECEL002', '23', null, 'Metabolismo celular', 'Origen y clasificación de los seres vivos', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1125', 'CIEECO005', '23', null, 'Clasificación de los seres vivos', 'Origen y clasificación de los seres vivos', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1126', 'CIECEL003', '23', null, 'Células y tejidos', 'Origen y clasificación de los seres vivos', '2016-12-17 12:16:58', '2016-12-17 12:16:58');
INSERT INTO `laboratory` VALUES ('1127', 'CIES3D002', '23', null, 'Histología básica de tejidos', 'Origen y clasificación de los seres vivos', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1128', 'CIEFDQ001', '23', null, 'Instrumetación y elementos volumétricos', 'La materia', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1129', 'CIEFDQ005', '23', null, 'Propiedades de la materia', 'La materia', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1130', 'CIEFDQ004', '23', null, 'Estados de la materia', 'La materia', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1131', 'CIEFDQ002', '23', null, 'Mezclas', 'La materia', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1132', 'CIEFDQ003', '23', null, 'Solubilidad', 'La materia', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1133', 'CIEUNI001', '23', null, 'Componentes y astros del univero', 'Sistema planetario', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1134', 'CIEUNI002', '23', null, 'Sistema solar', 'Sistema planetario', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1135', 'CIEUNI003', '23', null, 'El día, la noche y las estaciones terretres', 'Sistema planetario', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1136', 'CIEUNI004', '23', null, 'Planetas y satélites', 'Sistema planetario', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1137', 'CIESUE001', '23', null, 'Caracterización de los suelos', 'La Tierra', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1138', 'CIESUE002', '23', null, 'Contaminación en suelos', 'La Tierra', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1139', 'CIESUE003', '23', null, 'Identifiación de tipos de suelos por granulometría', 'La Tierra', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1140', 'CIES3D003', '23', null, 'Magnitudes eléctricas', 'Electricidad y magnetismo', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1141', 'CIES3D004', '23', null, 'Análsis fisiológico de especies comunes en la biotecnología', 'Taxonomía y funciones biológicas\r\r\r\r\r\r', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1142', 'CIEFOT001', '23', null, 'Componentes generales de la fotosíntesis', 'Taxonomía y funciones biológicas\r\r\r\r\r\r', '2016-12-17 12:16:59', '2016-12-17 12:16:59');
INSERT INTO `laboratory` VALUES ('1143', 'CIEFOT002', '23', null, 'Efecto de la luz en el proceso fotosintético', 'Taxonomía y funciones biológicas\r\r\r\r\r\r', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1144', 'CIEFOT003', '23', null, 'Factores que afectan la fotosíntesis', 'Taxonomía y funciones biológicas\r\r\r\r\r\r', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1145', 'CIEFSV002', '23', null, 'Influencia de variable física en los procesos biotecnológicos', 'Taxonomía y funciones biológicas\r\r\r\r\r\r', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1146', 'CIEFSV003', '23', null, 'Análisis de producción de metabolitos en las etapas de la vida de un microorganismo', 'Taxonomía y funciones biológicas\r\r\r\r\r\r', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1147', 'CIEFSV001', '23', null, 'Diseño de una fermentación', 'Taxonomía y funciones biológicas\r\r\r\r\r\r', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1148', 'CIEFDQ007', '23', null, 'Enlaces químicos', 'Fundamentos de la química general', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1149', 'CIEFDQ006', '23', null, 'Reacciones químicas', 'Fundamentos de la química general', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1150', 'CIES3D005', '23', null, 'Principio de Arquímides', 'Fluidos y gases', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1151', 'CIEGEN001', '23', null, 'Genética mendeliana', 'Genética', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1152', 'CIEGEN002', '23', null, 'Árboles genealógicos', 'Genética', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1153', 'CIEGEN003', '23', null, 'Rh y grupos sanguíneos', 'Genética', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1154', 'CIESCH001', '23', null, 'Sistema nervioso', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1155', 'CIESCH002', '23', null, 'Medición de factores y estímulos del cuerpo humano', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1156', 'CIESCH003', '23', null, 'Sistema endocrino', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1157', 'CIESCH004', '23', null, 'Sistema circulatorio', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1158', 'CIESCH005', '23', null, 'Medición y análisis de la presión arterial', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1159', 'CIESCH006', '23', null, 'Sistema respiratorio', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1160', 'CIESCH007', '23', null, 'Medición y análisis de la capacidad respiratoria', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1161', 'CIESCH008', '23', null, 'Sistema digestivo', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1162', 'CIESCH009', '23', null, 'Comportamiento de los alimentos en la digestión', 'Sistemas del cuerpo humano y fisiología al servicio de la salud', '2016-12-17 12:17:00', '2016-12-17 12:17:00');
INSERT INTO `laboratory` VALUES ('1163', 'CIEGEN004', '23', null, 'Replicación del ADN', 'Soluciones y fundamentos de la química orgánica', '2016-12-17 12:17:01', '2016-12-17 12:17:01');
INSERT INTO `laboratory` VALUES ('1164', 'CIEGEN005', '23', null, 'Errores genéticos comunes', 'Soluciones y fundamentos de la química orgánica', '2016-12-17 12:17:01', '2016-12-17 12:17:01');
INSERT INTO `laboratory` VALUES ('1165', 'CIEOND001', '23', null, 'Tipos y características de las ondas', 'Trabajo, calor y ondas', '2016-12-17 12:17:01', '2016-12-17 12:17:01');
INSERT INTO `laboratory` VALUES ('1166', 'CIEOND002', '23', null, 'Medios de propagación', 'Trabajo, calor y ondas', '2016-12-17 12:17:01', '2016-12-17 12:17:01');
INSERT INTO `laboratory` VALUES ('1167', 'CIEOND003', '23', null, '\"La luz, fenómenos ópticos\"', 'Trabajo, calor y ondas', '2016-12-17 12:17:01', '2016-12-17 12:17:01');

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subjects
-- ----------------------------
INSERT INTO `subjects` VALUES ('21', 'Química', '2016-12-17 12:16:14', '2016-12-17 12:16:14');
INSERT INTO `subjects` VALUES ('22', 'Física', '2016-12-17 12:16:20', '2016-12-17 12:16:20');
INSERT INTO `subjects` VALUES ('23', 'Ciencias naturales', '2016-12-17 12:16:29', '2016-12-17 12:16:29');

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

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
INSERT INTO `temp_users` VALUES ('ESTUDIANTE', 'est2', 'est', 'Andrés', 'Morales', '8-B');
INSERT INTO `temp_users` VALUES ('ESTUDIANTE', 'est1', 'est', 'Carlos', 'Marín', '8-C');
INSERT INTO `temp_users` VALUES ('ESTUDIANTE', 'est3', 'est', 'Cesar', 'Restrepo', '8-B');
INSERT INTO `temp_users` VALUES ('ESTUDIANTE', 'est4', 'est', 'Felipe', 'Morales', '8-C');
INSERT INTO `temp_users` VALUES ('PROFESOR', 'pro1', 'pro', 'Mateo', 'Marín', '8-B');
INSERT INTO `temp_users` VALUES ('PROFESOR', 'pro2', 'pro', 'Sergio', 'Restrepo', '8-C');
INSERT INTO `temp_users` VALUES ('PROFESOR', 'pro3', 'pro', 'Victor', 'Morales', '8-B');

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
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('96', 'admin', 'b89c40cd946865aa3b6571fd4087b4ae', 'Administrador', '', '2', '2016-12-15 23:19:18', '2016-12-17 11:29:12');
INSERT INTO `users` VALUES ('97', 'sadmin', '5484233337d402e20ee2dda92b1be4da', 'Super administrador', '', '1', '2016-12-15 23:19:22', '2016-12-17 11:29:12');

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
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

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

  DECLARE materia VARCHAR(100) DEFAULT NULL;
  DECLARE unidad VARCHAR(100) DEFAULT NULL;
  DECLARE codigo VARCHAR(100) DEFAULT NULL;
  DECLARE nombrePrac VARCHAR(100) DEFAULT NULL;

  DECLARE dataOk INT DEFAULT 1;

  DECLARE suId INT DEFAULT NULL;

  DECLARE cur1 CURSOR FOR ( SELECT * FROM temp_labs );
  DECLARE cur2 CURSOR FOR ( SELECT * FROM temp_labs );

  
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
    materia, unidad, codigo, nombrePrac
  FROM
    temp_labs
  LIMIT 1;
      
  IF(
    INSTR(materia, 'MATERIA') AND
    INSTR(unidad, 'UNIDAD') AND
    INSTR(codigo, 'CODIGO') AND
    INSTR(nombrePrac, 'NOMBRE DE LA PRACTICA')
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

  DECLARE tipo VARCHAR(100) DEFAULT NULL;
  DECLARE usuario VARCHAR(100) DEFAULT NULL;
  DECLARE contras VARCHAR(100) DEFAULT NULL;
  DECLARE nombre VARCHAR(100) DEFAULT NULL;
  DECLARE apellido VARCHAR(100) DEFAULT NULL;
  DECLARE grupo VARCHAR(100) DEFAULT NULL;

  DECLARE dataOk INT DEFAULT 1;

  DECLARE gId INT DEFAULT NULL;

  DECLARE cur1 CURSOR FOR ( SELECT * FROM temp_users );
  DECLARE cur2 CURSOR FOR ( SELECT * FROM temp_users );

  SELECT 
    *
  INTO
    tipo, usuario, contras, nombre, apellido, grupo
  FROM
    temp_users
  LIMIT 1;
          
  IF(
    INSTR(tipo, 'TIPO') AND
    INSTR(usuario, 'USUARIO') AND
    INSTR(contras, 'CONTRASEÑA') AND
    INSTR(nombre, 'NOMBRE') AND
    INSTR(apellido, 'APELLIDO') AND
    INSTR(grupo, 'GRUPO')
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
