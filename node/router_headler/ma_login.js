const {getinfo} = require("../router_function/index")
const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')
exports.login = async (req,res)=>{
  console.log(req.query);
  const sql = 'select * from ma_user where ma_username = ?'
  const sql1 = 'update ma_user set login_num = ? where ma_username = ?'
  const data = await getinfo(sql,[req.query.username],res)
  const user = {...data[0]}
  let title = ''
  if(req.query.password == data[0].ma_password) {
    title = '登录成功'
    const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
    await getinfo(sql1,[Number.parseInt(data[0].login_num) + 1,req.query.username],res)
    res.send({
      message:title,
      data,
      token:'Bearer ' +tokenStr
    })
  }else {
    title = '账号或密码输入错误'
    res.send({
      message:title,
    })
  }
}
exports.register = async (req,res)=>{
  const userinfo = req.body
  console.log(1);
  if(!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不能为空！' })
  }
  const sql1 = 'select * from ma_user where username =?'
  //判断用户名是否被占用
  const sql2 = 'insert into ma_user set ?'
  //插入新用户
  await getinfo(sql1,[userinfo.username],res)
}
