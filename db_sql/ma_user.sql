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

 Date: 05/10/2022 15:02:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ma_user
-- ----------------------------
DROP TABLE IF EXISTS `ma_user`;
CREATE TABLE `ma_user`  (
  `ma_id` int NOT NULL AUTO_INCREMENT,
  `ma_username` int NOT NULL,
  `ma_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ma_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ma_nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `login_num` int NULL DEFAULT NULL,
  PRIMARY KEY (`ma_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ma_user
-- ----------------------------
INSERT INTO `ma_user` VALUES (1, 1730370006, '123456', 'http://127.0.0.1:3007/51d411abb592ae5f.jpg', '雨饰', 51);
INSERT INTO `ma_user` VALUES (2, 320439448, '123456', 'http://127.0.0.1:3007/8308e8806e3463375ebe693550bb9f75.jpg', '尚气', 50);

SET FOREIGN_KEY_CHECKS = 1;
