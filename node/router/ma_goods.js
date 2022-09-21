const express = require('express')
    //创建路由对象
const router = express.Router()
    //创建路由对象的实例
const ma_goods = require('../router_headler/good')

router.get('/good1', ma_goods.good1)
    //获取商品
router.get('/good2',ma_goods.good2)
    //根据商品id，获取商品信息
router.post('/good3',ma_goods.good3)
    //修改商品信息
router.post('/good4',ma_goods.good4)
    //删除商品信息
router.post('/good5',ma_goods.good5)
module.exports = router
    //将路由对象共享出去