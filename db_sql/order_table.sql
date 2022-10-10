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

 Date: 05/10/2022 15:03:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order_table
-- ----------------------------
DROP TABLE IF EXISTS `order_table`;
CREATE TABLE `order_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `order_num` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `price` double NOT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `tel_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `province_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `county_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `street_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail_info_new` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `national_code` int NULL DEFAULT NULL,
  `postal_code` int NULL DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `state` int NULL DEFAULT NULL,
  `instate` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 146 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_table
-- ----------------------------
INSERT INTO `order_table` VALUES (130, '9G3737KB7INL430202240000933', '4', 8, 962, '2022-09-30 00:40:33', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 1, 0);
INSERT INTO `order_table` VALUES (131, '2XD5IF293AD4Y6GB20220030594009', '2', 8, 102, '2022-09-30 00:40:59', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 0, 0);
INSERT INTO `order_table` VALUES (132, '4C472J27X09202230240043', '2', 8, 238.9, '2022-09-30 00:43:24', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 0, 0);
INSERT INTO `order_table` VALUES (133, 'WB2UV9NZ5K45502022093000', '1', 8, 39.9, '2022-09-30 00:45:50', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 1, 0);
INSERT INTO `order_table` VALUES (134, 'R2P68BQQ872400514609202230', '3', 13, 824.1, '2022-09-30 00:46:51', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 1, 0);
INSERT INTO `order_table` VALUES (135, 'V7G27E420220700094730', '1', 13, 12, '2022-09-30 00:47:07', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 0, 0);
INSERT INTO `order_table` VALUES (136, '8I6386UO65WNBG1K57092022004730', '1', 14, 78, '2022-09-30 00:47:57', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 1, 0);
INSERT INTO `order_table` VALUES (137, '16TIIXO920220948301300', '2', 14, 147.9, '2022-09-30 00:48:13', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 1, 0);
INSERT INTO `order_table` VALUES (138, '9C9632530322022480009', '1', 14, 69.9, '2022-09-30 00:48:32', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 0, 1);
INSERT INTO `order_table` VALUES (139, '5D9BWS5849K12V55000920225030', '1', 15, 8, '2022-09-30 00:50:55', '020-81167888', '广东省', '广州市', '海珠区', NULL, NULL, 510000, 510000, '张三', 1, 0);
INSERT INTO `order_table` VALUES (140, '457Y4Q9KS82Y830094112202209', '2', 8, 45.9, '2022-09-30 12:41:09', '18722995677', '贵州省', '安顺市', '西秀区', '西航街道', '安顺学院', 520402, 561000, '张任涛', 1, 0);
INSERT INTO `order_table` VALUES (143, 'OK3K9LEMN2FM2FN20221413093005', '1', 8, 78, '2022-09-30 13:14:05', '18722995677', '贵州省', '安顺市', '西秀区', '西航街道', '安顺学院', 520402, 561000, '张任涛', 2, 1);
INSERT INTO `order_table` VALUES (144, '33RX69M5413091530312022', '1', 8, 78, '2022-09-30 13:15:31', '18722995677', '贵州省', '安顺市', '西秀区', '西航街道', '安顺学院', 520402, 561000, '张任涛', 2, 1);
INSERT INTO `order_table` VALUES (145, 'ALOA7O86R20223057161309', '1', 8, 45.8, '2022-09-30 13:16:57', '18722995677', '贵州省', '安顺市', '西秀区', '西航街道', '安顺学院', 520402, 561000, '张任涛', 2, 1);
INSERT INTO `order_table` VALUES (146, 'K68HG3333609202218273016', '1', 8, 69.9, '2022-09-30 16:18:27', '15512563654', '天津市', '天津市', '和平区', '劝业场街道', '斤斤计较', 120101, 300041, '杨龙', 1, 0);

SET FOREIGN_KEY_CHECKS = 1;
