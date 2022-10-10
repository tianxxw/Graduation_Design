const express = require('express')
    //创建路由对象
const router = express.Router()
    //创建路由对象的实例
const ma_user = require('../router_headler/ma_user')

router.get('/users', ma_user.allUser)
    //获取所有用户
router.post('/updataInfo', ma_user.updataInfo)
    //修改用户信息
router.get('/mauser',ma_user.maUser)
    //获取所有管理员
router.post('/search',ma_user.search)
    //搜索用户
module.exports = router
    //将路由对象共享出去