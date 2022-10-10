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

 Date: 05/10/2022 15:03:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for shop_good
-- ----------------------------
DROP TABLE IF EXISTS `shop_good`;
CREATE TABLE `shop_good`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `shop_cart_id` int NULL DEFAULT NULL,
  `good_id` int NULL DEFAULT NULL,
  `number` int NULL DEFAULT NULL,
  `price` double NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 504 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_good
-- ----------------------------
INSERT INTO `shop_good` VALUES (503, 356, 20, 1, 69.9);

SET FOREIGN_KEY_CHECKS = 1;
