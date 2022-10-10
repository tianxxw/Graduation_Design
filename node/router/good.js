const express = require('express')
    //创建路由对象
const router = express.Router()
    //创建路由对象的实例
const userHandler = require('../router_headler/good')

router.get('/good1', userHandler.good1)
    //获取商品
router.get('/good2',userHandler.good2)
    //根据商品id，获取商品信息
router.post('/search',userHandler.search)
    //根据商品名搜索商品
module.exports = router
    //将路由对象共享出去