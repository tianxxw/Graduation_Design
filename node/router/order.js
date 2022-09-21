const express = require('express')
    //创建路由对象
const router = express.Router()
    //创建路由对象的实例
const orderHandler = require('../router_headler/order')

router.post('/postOrder', orderHandler.postOrder)
    //提交订单
router.get('/getOrder',orderHandler.getOrder)
    //获取订单
router.get('/searchOrder',orderHandler.searchOrder)
    //搜索订单
module.exports = router
    //将路由对象共享出去