/*
Navicat MySQL Data Transfer

Source Server         : MySQL-Server
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : todo

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-06-08 10:18:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `customerStripeId` varchar(255) DEFAULT NULL,
  `clientSecret` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('1', '2020-06-01 10:22:20', '0', 'user test', 'test@test.com', null, null);
INSERT INTO `customer` VALUES ('7', '2020-06-08 00:43:47', '0', 'Gung Surya Mahendra', 'gng_surya@yahoo.com', 'cus_HQIBiqzo85LuHy', '');

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `todo` varchar(255) DEFAULT NULL,
  `userId` bigint(20) unsigned DEFAULT NULL,
  `completed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `todo_userid_foreign` (`userId`),
  CONSTRAINT `todo_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of todo
-- ----------------------------
INSERT INTO `todo` VALUES ('1', '2020-05-03 23:20:29', '1', 'Buy some milks', '1', '0');
INSERT INTO `todo` VALUES ('2', '2020-05-04 00:58:30', '0', 'Buy some tissue', '2', '0');
INSERT INTO `todo` VALUES ('3', '2020-05-04 01:00:34', '0', 'Buy some papers', '2', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '2020-05-02 21:46:46', '0', 'john.doe@gmail.com', '$2b$10$K0S2T9evJoxI2fcoqIQ3YOwDMmQG7/EEZyY1KcY7TjwXcoIh2EXN2', 'John Unknown Doe', 'Admin');
INSERT INTO `user` VALUES ('2', '2020-05-03 23:24:12', '0', 'maha.gung.surya@gmail.com', '$2b$10$J7ftIf5JpMe3lLNXPfU8xuNfXCyY/suZcF95yfNNN7hPaDeWs0a0a', 'Gung Surya', 'User');
INSERT INTO `user` VALUES ('3', '2020-05-03 23:25:13', '1', 'dodea@gmail.com', '$2b$10$UAWDbNQzMGByHCpK8hSXE.98o/4K5sP/k05B8yxH/p5SVZZjcqvFS', 'dode', 'User');
INSERT INTO `user` VALUES ('6', '2020-06-01 10:40:03', '0', 'dodea@gmail.com', '$2b$10$Bvq7O3EwED85ybg6cyxp7OKNNgWBWFQ60SpA8Rj9sS74e191KgMyG', 'dode', 'User');

-- ----------------------------
-- Table structure for _knex_migrations
-- ----------------------------
DROP TABLE IF EXISTS `_knex_migrations`;
CREATE TABLE `_knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _knex_migrations
-- ----------------------------
INSERT INTO `_knex_migrations` VALUES ('1', 'v1.0.0.ts', '1', '2020-05-02 21:37:13');

-- ----------------------------
-- Table structure for _knex_migrations_lock
-- ----------------------------
DROP TABLE IF EXISTS `_knex_migrations_lock`;
CREATE TABLE `_knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _knex_migrations_lock
-- ----------------------------
INSERT INTO `_knex_migrations_lock` VALUES ('1', '0');
