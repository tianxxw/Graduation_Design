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

 Date: 05/10/2022 15:02:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for commodity
-- ----------------------------
DROP TABLE IF EXISTS `commodity`;
CREATE TABLE `commodity`  (
  `commodity_id` int NOT NULL AUTO_INCREMENT,
  `commodity_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `commodity_price` float(10, 2) NOT NULL,
  `commodity_imgurl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`commodity_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commodity
-- ----------------------------
INSERT INTO `commodity` VALUES (11, '味全鲜牛乳950ml*12瓶牛乳鲜奶茶原料鲜牛奶', 200.00, 'https://gd2.alicdn.com/imgextra/i1/4271878048/O1CN014blO7O29K2Esd3wL5_!!4271878048.jpg_400x400.jpg');
INSERT INTO `commodity` VALUES (12, 'a2澳洲原装进口全脂牛奶1瓶牛乳鲜奶茶原料鲜牛奶', 69.90, 'https://img.alicdn.com/imgextra/i3/2208626058094/O1CN01B9CGqi29f6WTedj3v_!!0-item_pic.jpg_430x430q90.jpg');
INSERT INTO `commodity` VALUES (13, '天润新疆巴氏鲜奶杀菌鲜牛乳低温纯牛奶245g', 39.90, 'https://gw.alicdn.com/imgextra/i3/2208005074767/O1CN01y9z5Lw1l5KolyLQBY_!!0-item_pic.jpg_Q75.jpg_.webp');
INSERT INTO `commodity` VALUES (14, '蒙牛每日鲜语全脂4.0g蛋白低温儿童牛奶鲜奶新鲜原味250ml', 8.00, 'https://gd1.alicdn.com/imgextra/i1/4271878048/O1CN01yqqev529K29iCSwRv_!!4271878048.jpg_400x400.jpg');
INSERT INTO `commodity` VALUES (15, '朝日唯品牛乳950ml牛乳鲜奶茶原料鲜牛奶', 40.00, 'https://gw.alicdn.com/bao/uploaded/i4/2212199795324/O1CN012udJmg1pCRQIU981W_!!2212199795324.jpg_Q75.jpg_.webp');
INSERT INTO `commodity` VALUES (16, '新希望今日鲜奶铺1瓶牛乳鲜奶茶原料鲜牛奶', 94.00, 'https://gw.alicdn.com/imgextra/i3/2212533895420/O1CN011M1cFk1puPSOC3otM_!!2212533895420.jpg_Q75.jpg_.webp');
INSERT INTO `commodity` VALUES (17, '好一多纯鲜奶200ml低温酸牛奶风味发酵乳酸牛奶', 6.00, 'https://gw.alicdn.com/imgextra/i4/2208304222993/O1CN01QbnTpq1XyqBrMLmWt_!!2208304222993.jpg_Q75.jpg_.webp');
INSERT INTO `commodity` VALUES (18, '和润家庭装酸奶草莓果粒低温酸牛奶风味发酵乳酸牛奶大瓶装', 78.00, 'https://gw.alicdn.com/imgextra/i3/2200681112040/O1CN01gzPS9x1QwMktL2M0Q_!!2200681112040.jpg_Q75.jpg_.webp');
INSERT INTO `commodity` VALUES (19, '石埠草莓味乳酸菌饮品牛奶125mlX7包X3提', 45.80, 'https://gw.alicdn.com/imgextra/i3/2212937173981/O1CN0192LMgc1fHLWG10Kb4_!!0-item_pic.jpg_Q75.jpg_.webp');
INSERT INTO `commodity` VALUES (20, '蒙牛纯牛奶牛乳鲜奶茶原料鲜牛奶', 69.90, 'https://gw.alicdn.com/imgextra/O1CNA1tRMZFi1zd8gGppJbh_!!2201511986736-0-psf.jpg_Q75.jpg_.webp');
INSERT INTO `commodity` VALUES (26, '乌拉圭conaprole科拿全脂牛奶1L*12/箱进口纯牛奶早餐奶', 149.00, 'https://img.alicdn.com/imgextra/i1/2549841410/O1CN01omKWMX1MHp2kTn0wn_!!2549841410.jpg_430x430q90.jpg');
INSERT INTO `commodity` VALUES (27, '君乐宝旗舰店简醇0添加蔗糖简醇高端小白瓶酸牛奶8瓶230g', 89.90, 'https://gw.alicdn.com/imgextra/i1/2771741191/O1CN01bXsnyY1KfWUmC1AnP_!!0-item_pic.jpg_Q75.jpg_.webp');

SET FOREIGN_KEY_CHECKS = 1;
