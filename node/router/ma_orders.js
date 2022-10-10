const express = require('express')
    //创建路由对象
const router = express.Router()
    //创建路由对象的实例
const ma_orders = require('../router_headler/order')

router.get('/orders', ma_orders.allOrder)
    //获取所有商品
router.post('/search', ma_orders.searchOrder)

router.post('/updateSh',ma_orders.updataeOrder1)
module.exports = router
    //将路由对象共享出去