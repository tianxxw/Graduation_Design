const express = require('express')
    //创建路由对象
const router = express.Router()
    //创建路由对象的实例
const userHandler = require('../router_headler/order')

router.post('/gitorder', userHandler.gitorder)
    //提交订单
module.exports = router
    //将路由对象共享出去