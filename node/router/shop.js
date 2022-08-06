const express = require('express')
//创建路由对象
const router = express.Router()
//创建路由对象的实例
const userShop = require('../router_headler/shop')
router.post('/shop1',userShop.shop1)
router.get('/shop2',userShop.shop2)
router.post('/shop3',userShop.shop3)
router.post('/deleteShopGoods',userShop.deleteShopGoods)
module.exports = router