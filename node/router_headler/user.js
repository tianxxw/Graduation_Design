/**
 * 
   在这里定义和用户相关的路由处理函数，供/router/user.js模块进行调用
 */
const axios = require("axios")
const APPID = 'wx3e3e98f07ee2ec7c'
const SECRET = '76c22e19e133803d8499398627a9b9a4'
const info = { avatar:'http://127.0.0.1:3007/20190901144310.jpg',name:'微信用户'}
const db = require('../db/index')
   //导入数据库操作模块
exports.login = (req, res) => {
      console.log(req.body);
       const sql0 = `select avatar,name,id,login_num from user where open_id = ?`
       const sql1 = `insert into user value(?,?,?,?,?,?,?)`
       const sql2 = 'update user set session_key = ?,login_num = ? where id = ?'
       const code = req.body.code
       axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`,)
       .then(function(response) {
        console.log(response.data.session_key);
        db.query(sql0,response.data.openid,(err0,results0)=>{
        console.log(results0,err0);
         if(err0) {
          return res.cc(err0)
         }
         if(results0.length == 0) {
          db.query(sql1,[null,response.data.openid,response.data.session_key,info.avatar,info.name+response.data.openid,0,0],(err1,results1)=>{
           console.log(results1);
           if(err1) {
            return res.cc(err1)
           }
            db.query(sql0,response.data.openid,(err2,results2)=>{
              if(err2) {
                return res.cc()
              }
              if(results2.length == 0 ){
                return res.cc()
              }
              res.send({
                status:201,
                message:'创建用户并登录成功！',
                info:results2,
                session_key:response.data.session_key
              })
            })          
         })
         }
         else {
          console.log(results0[0]);
          db.query(sql2,[response.data.session_key,Number.parseInt(results0[0].login_num)+1,results0[0].id],(err2,results2)=>{
          if(err2) {
            return res.cc(err2)
          }
          })
          res.send({
            status:200,
            message:'登录成功！',
            info:results0,
            session_key:response.data.session_key
          }) 
         }
        })
       })
   }


