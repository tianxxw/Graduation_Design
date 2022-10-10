/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : my_bs

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 05/10/2022 15:03:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order_good
-- ----------------------------
DROP TABLE IF EXISTS `order_good`;
CREATE TABLE `order_good`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NULL DEFAULT NULL,
  `good_id` int NULL DEFAULT NULL,
  `number` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 168 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_good
-- ----------------------------
INSERT INTO `order_good` VALUES (143, 130, 20, 9);
INSERT INTO `order_good` VALUES (144, 130, 16, 1);
INSERT INTO `order_good` VALUES (145, 130, 26, 1);
INSERT INTO `order_good` VALUES (146, 130, 27, 1);
INSERT INTO `order_good` VALUES (147, 131, 14, 1);
INSERT INTO `order_good` VALUES (148, 131, 16, 1);
INSERT INTO `order_good` VALUES (149, 132, 27, 1);
INSERT INTO `order_good` VALUES (150, 132, 26, 1);
INSERT INTO `order_good` VALUES (151, 133, 13, 1);
INSERT INTO `order_good` VALUES (152, 134, 19, 1);
INSERT INTO `order_good` VALUES (153, 134, 27, 7);
INSERT INTO `order_good` VALUES (154, 134, 26, 1);
INSERT INTO `order_good` VALUES (155, 135, 17, 2);
INSERT INTO `order_good` VALUES (156, 136, 18, 1);
INSERT INTO `order_good` VALUES (157, 137, 18, 1);
INSERT INTO `order_good` VALUES (158, 137, 20, 1);
INSERT INTO `order_good` VALUES (159, 138, 20, 1);
INSERT INTO `order_good` VALUES (160, 139, 14, 1);
INSERT INTO `order_good` VALUES (161, 140, 17, 1);
INSERT INTO `order_good` VALUES (162, 140, 13, 1);
INSERT INTO `order_good` VALUES (163, 141, 12, 1);
INSERT INTO `order_good` VALUES (164, 142, 27, 1);
INSERT INTO `order_good` VALUES (165, 143, 18, 1);
INSERT INTO `order_good` VALUES (166, 144, 18, 1);
INSERT INTO `order_good` VALUES (167, 145, 19, 1);
INSERT INTO `order_good` VALUES (168, 146, 12, 1);

SET FOREIGN_KEY_CHECKS = 1;
