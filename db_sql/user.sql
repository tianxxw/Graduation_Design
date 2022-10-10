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

 Date: 05/10/2022 15:03:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `session_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sex` int NULL DEFAULT NULL,
  `login_num` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (8, 'oteXw5c_Li1stQklGdxc8TM_rsus', 'K9a+5g6xdhNiUDopoKWz6w==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5c_Li1stQklGdxc8TM_rsus', 0, 92);
INSERT INTO `user` VALUES (9, 'oteXw5ffWhaTarPo6alAlQWGlIy8', '0N3l6SMI3Qex+brHowMyHA==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5ffWhaTarPo6alAlQWGlIy8', 0, 0);
INSERT INTO `user` VALUES (10, 'oteXw5R28yVtFT2FTidQM5HD9hcY', 'obnNb2MonNU8grU/lGh1+A==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5R28yVtFT2FTidQM5HD9hcY', 0, 0);
INSERT INTO `user` VALUES (11, 'oteXw5eETs89Z0K1SHXTyqIpdPZ8', 'GhhfQX5zdQIA0s3vFqAocA==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5eETs89Z0K1SHXTyqIpdPZ8', 0, 0);
INSERT INTO `user` VALUES (12, 'oteXw5WNJbXtacQoky6X1tZIzlkk', 'oNye4XUY+7YIK28DwTDqXg==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5WNJbXtacQoky6X1tZIzlkk', 0, 0);
INSERT INTO `user` VALUES (13, 'oteXw5RIF_JK9DgAmnEVzelj6hUQ', '4llUYwUPdyQdn0DRHUC4cw==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5RIF_JK9DgAmnEVzelj6hUQ', 0, 0);
INSERT INTO `user` VALUES (14, 'oteXw5U8ME8MeGA1-cmqlAfW0dBU', 'UHmOTExBFD0l3kSuTvSO9g==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5U8ME8MeGA1-cmqlAfW0dBU', 0, 0);
INSERT INTO `user` VALUES (15, 'oteXw5Yhm0IEeUQS9o54mYhaCefc', '9sSqUWECtkkPCMUXn8VGKA==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5Yhm0IEeUQS9o54mYhaCefc', 0, 0);
INSERT INTO `user` VALUES (16, 'oteXw5SKS-cRxNSduX5OKSsi1P8w', 'Tv9Sb0iMJH7FzAGWidkytw==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5SKS-cRxNSduX5OKSsi1P8w', 0, 0);
INSERT INTO `user` VALUES (17, 'oteXw5c2zeUM0Cipc7orN_PYf10E', 'fR0DkDureLJjJqk0RsKmhg==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5c2zeUM0Cipc7orN_PYf10E', 0, 0);
INSERT INTO `user` VALUES (18, 'oteXw5a6ebWDoGxGsyTxokR_z8LM', 'whDSSDiqD6Dp8vKNx0YoxQ==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5a6ebWDoGxGsyTxokR_z8LM', 0, 0);
INSERT INTO `user` VALUES (19, 'oteXw5bZp28UYfX4eC9ptDY54rmw', 'tRIgYBm0A+KmCUxn0UU9cw==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5bZp28UYfX4eC9ptDY54rmw', 0, 0);
INSERT INTO `user` VALUES (20, 'oteXw5SnV6OE8meci9o2CNWXRpas', 'eRYZkhVwVM3avZSAJUDHlg==', 'http://127.0.0.1:3007/20190901144310.jpg', '微信用户oteXw5SnV6OE8meci9o2CNWXRpas', 0, 0);

SET FOREIGN_KEY_CHECKS = 1;
