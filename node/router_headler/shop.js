const axios = require("axios")
const APPID = 'wx3e3e98f07ee2ec7c'
const SECRET = '76c22e19e133803d8499398627a9b9a4'
const db = require('../db/index')
exports.shop1 = (req,res)=>{
  // req.body中数据有：
  // 商品id：commodity_id
  // 
  const sql1 = 'select * from user where session_key = ?'
  //sql1查用户id  result1.id
  const sql2 = 'select id,user_id,number,price from shop where user_id = ?'
  //sql2查用户购物车中是否有该商品,
  // 没有走sql3->sql4->sql5
  // 有就 走 sql6
  const sql3 = 'insert into shop value(?,?,?,?)'
  //sql3更新购物车信息
  const sql4 = 'select id from shop where user_id = ?'
  //sql4查购物车id
  const sql5 = 'insert into shop_good value(?,?,?)'
  //sql5向shop_good插入数据
  const sql6 = 'update shop set number = ?, price = ? where user_id = ?'
  //更新购物车信息
  db.query(sql1,JSON.parse(req.body.session_key),(err1,result1)=>{
    if(err1) {
      return res.cc(err1)
    }
    if(result1.length == 0) {
      return res.send({
        status:401,
        message:'身份无效请重新登录!'
      })
    }
    db.query(sql2,result1[0].id,(err2,result2)=>{
      console.log(2);
      console.log(result2);
      if(err2) {
        return res.cc(err2)
      }
      if(result2.length == 0) {
        db.query(sql3,[null,result1[0].id,req.body.num,req.body.commodity_price * req.body.num],(err3,result3)=>{
          console.log(3);
          if(err3) {
            return res.cc(err)
          }
          db.query(sql4,result1[0].id,(err4,result4)=>{
            console.log(4);
            console.log(result4);
            if(err4) {
              return res.cc(err4)
            }
            if(result4.length == 1) {
              console.log(5);
              for(i = 0;i<req.body.num;i++) {
                db.query(sql5,[null,result4[0].id,req.body.commodity_id],(err5,result5)=>{
                  if(err5) {
                    return res.cc(err4)
                  }
                })
              }
            }
            res.send({
              status:200,
              message:'加入购物车成功'
            })
          })
        })
      }
      else {
        db.query(sql6,[result2[0].number+req.body.num,parseFloat((result2[0].price + req.body.commodity_price * req.body.num).toFixed(1)),result1[0].id],(err6,result6)=>{
          console.log(6);
          if(err6) {
            return res.cc(err6)
          }
          db.query(sql4,result1[0].id,(err4,result4)=>{
            console.log(4);
            console.log(result4);
            if(err4) {
              return res.cc(err4)
            }
            if(result4.length == 1) {
              console.log(5);       
                for(let i = 0;i < req.body.num; i++) {
                  db.query(sql5,[null,result4[0].id,req.body.commodity_id],(err5,result5)=>{
                    if(err5) {
                      return res.cc(err5)
                    }
                  })
                }
            }
            res.send({
              status:200,
              message:'加入购物车成功'
            })
          })
        })
      }
    })
  })
  // db.query(sql1,)
}
exports.shop2 = (req,res)=>{

}