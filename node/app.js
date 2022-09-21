const express = require('express');
const axios = require('axios')
const config = require('./config')
const moment = require('moment')
//导入express模块
const userRouter = require('./router/user.js')
    // 导入路由模块
const goods = require('./router/good')
const shops = require('./router/shop')
const orders = require('./router/order')
const ma_login = require('./router/ma_login')
const ma_goods = require('./router/ma_goods')
const upload = require('./router/uploadGoodImg')
const ma_orders = require('./router/ma_orders')
const ma_users = require('./router/ma_user')
const socket = require('socket.io')
const joi = require('joi')
    //导入验证规则的模块
    //导入token配置文件
const expressJWT = require('express-jwt')
    // 导入解析token的中间件,一定要在路由之前配置
const cors = require('cors');
const { jwtSecretKey } = require('./config');
    // 导入cors中间件
const app = express();
// 创建express服务器的实例
// const userinfoRouter = require('./router/userinfo')
    //注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use(cors())
    // 将cors注册为全局中间件
app.use(express.json())
    // 配置解析json格式的表单数据中间件
app.use(express.urlencoded({ extended: false }))
//配置解析 application/x-www-form-urlencoded格式的表单数据中间件
app.use((req, res, next) => {
    //   响应数据的中间件
    res.cc = function(err, status = 1) {
        res.send({
            status,
            // 状态，status = 0为成功；status = 1为失败;默认将status的值设置为1，方便处理失败的情况
            message: err instanceof Error ? err.message : err
            //状态描述，判断err是错误对象还是字符串
        })
    }
    next()
})
// 为了优化res.send()代码，这个全局中间件，一定要在所有路由之前
// app.use(expressJWT({secret:config.jwtSecretKey
// }.unless({
//     path:[/^\/login\//]
// })))
app.use(expressJWT({secret:config.jwtSecretKey}).unless({
    path:[/^\/ma\//,/^\/api\//,/^\/img\//,/^\//]
}))
// app.use('/login', userRouter)
// app.use('/api', goods)
// app.use('/api', shops)
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/login\//] }))
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
        // 不允许连续两次调用res.cc()
        //验证失败导致的错误
    }
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败!')
        // 身份认证失败导致的错误
    }
    res.cc(err)
        // 未知错误
})
//定义错误级别的中间件
app.use(express.static("goods_img"))
app.use('/api', userRouter)
app.use('/api', goods)
app.use('/api', shops)
app.use('/api',orders)
app.use('/ma',ma_login)
app.use('/magoods',ma_goods)
app.use('/img',upload)
app.use('/maorders',ma_orders)
app.use('/mausers',ma_users)
const server = app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})
// 调用app.listen方法,指定端口创建服务器

const io = socket(server,{ cors:true });
//设置socket.io
let chatList = []
io.on('connection',(socket)=>{
    console.log('实现socket连接');
    socket.emit('fresh-message',chatList);
    socket.on('send-message',(user,message)=>{
        const createTime = moment().format('YYYY-MM-DD HH:mm:ss');
        chatList.push({
            user,
            message,
            createTime,
        });
        socket.emit('fresh-message',chatList)
    })
})