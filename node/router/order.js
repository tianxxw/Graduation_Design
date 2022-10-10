const express = require('express')
    //创建路由对象
const router = express.Router()
    //创建路由对象的实例
const orderHandler = require('../router_headler/order')

router.post('/postOrder', orderHandler.postOrder)
    //提交订单
router.get('/getOrder',orderHandler.getOrder)
    //获取订单
router.get('/getInOrder',orderHandler.getINOrder)
    //获取发货状态订单
router.get('/searchOrder',orderHandler.searchOrder)
    //搜索订单
router.get('/getInOrder2',orderHandler.updataeOrder2)
    //查发货单
router.get('/getInOrder3',orderHandler.updataeOrder3)    
    //确认收货
module.exports = router
    //将路由对象共享出去