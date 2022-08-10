const axios = require("axios")
const {deletegood} = require("../router_function/index")
const { query } = require("../db/index")
const APPID = 'wx3e3e98f07ee2ec7c'
const SECRET = '76c22e19e133803d8499398627a9b9a4'
const db = require('../db/index')
exports.shop1 = (req,res)=>{
  //post req.body
  // req.body中数据有：
  // 商品id：commodity_id
  const sql1 = 'select * from user where session_key = ?'
  //sql1查用户id  result1.id
  const sql2 = 'select * from shop_good inner join shop on shop.id=shop_good.shop_cart_id inner join commodity on commodity.commodity_id=shop_good.good_id where commodity_id = ?'
  //sql2查用户购物车中是否有该商品,
  // 没有走sql3->sql4->sql5
  // 有就 走 sql6
  const sql21 = 'select * from shop where user_id = ?'
  const sql3 = 'insert into shop value(?,?)'
  //sql3更新购物车信息
  const sql4 = 'select id from shop where user_id = ?'
  //sql4查购物车id
  const sql5 = 'insert into shop_good value(?,?,?,?,?)'
  //sql5向shop_good插入数据
  const sql6 = 'update shop_good inner join shop on shop_cart_id = shop.id set number = ?, price = ? where shop_cart_id = ?'
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
    db.query(sql2,req.body.commodity_id,(err2,result2)=>{
      // console.log(2);
      if(err2) {
        return res.cc(err2)
      }
      if(result2.length == 0) {
        db.query(sql21,result1[0].id,(err21,result21)=>{
          if(err21) {
            return res.cc(err21)
          }
          if(result21.length == 0) {
            db.query(sql3,[null,result1[0].id],(err3,result3)=>{
              if(err3) {
                return res.cc(err3)
              }
            })
          }
          db.query(sql4,result1[0].id,(err4,result4)=>{
            // console.log(result4);
            if(err4) {
              return res.cc(err4)
            }
            if(result4.length >= 1) {
              // console.log(5);
              db.query(sql5,[null,result4[result4.length-1].id,req.body.commodity_id,req.body.num,req.body.commodity_price * req.body.num],(err5,result5)=>{
                if(err5) {
                  return res.cc(err5)
                }
                res.send({
                  status:200,
                  message:'加入购物车成功'
                })
              })
            }
          })
        })
      }
      else {
        // console.log('result2:'+ result2[0].number)
        // console.log(JSON.stringify(result2));
        let count = result2
        // console.log(count[count.length - 1].shop_cart_id);
        // console.log(count[count.length - 1].number);
        // console.log(count[count.length -1].shop_cart_id);
        // console.log(parseFloat((count[count.length -1].price +req.body.commodity_price).toFixed(1)));
        // console.log(req.body);
        db.query(sql6,[count[count.length - 1].number + req.body.num,parseFloat((count[count.length -1].price +req.body.commodity_price).toFixed(1)),count[count.length -1].shop_cart_id],(err6,result6)=>{
          if(err6) {
            return res.cc(err6)
          }
          res.send({
            status:200,
            message:'修改购物车内容成功'
          })
        })
      }
    })
  })
  // db.query(sql1,)
}
exports.shop2 = (req,res)=>{
  //get req.query
  // console.log(req.query);
  const sql1 = 'select * from user where session_key = ?'
  const sql2 = 'select * from shop inner join shop_good on shop.id=shop_good.shop_cart_id inner join commodity on commodity.commodity_id=shop_good.good_id where user_id = ?'
  db.query(sql1,JSON.parse(req.query.session_key),(err1,results1)=>{
   if(err1) {
    return res.cc(err1)
   }
   if(results1.length !== 0) {
     db.query(sql2,results1[0].id,(err2,results2)=>{
      // console.log("results2:"+results2);
      // let data = JSON.stringify(results2)
      // console.log(data);
      if(err2) {
        return res.cc(err2)
      }
      if(results2.length == 0) {
        return res.cc('获取失败!')
      }
      else {
        res.send({
          status:200,
          data:results2,
          message:'获取购物车列表成功!'
        })
      }
     })
   }
   else {
    return res.cc('获取数据失败！')
   }
  })
}
exports.shop3 = (req,res)=>{
  // console.log(req.body.number);
  // console.log(req.body.shop_cart_id);
  console.log(req.body);
  const sql1 = 'update shop_good set number = ?, price = ? where id = ?'
  db.query(sql1,[req.body.number,parseFloat((req.body.number * req.body.price).toFixed(1)),req.body.id],(err1,result1)=>{
    if(err1) {
      return res.cc(err1)
    }
    else {
      res.send({
        status:200,
        message:'数据更新成功!'
      })
    }
  })
}
exports.deleteShopGoods = (req,res)=>{
   deletegood(req.body.id,res)
}
// function deletegood(data,res) {
//   // let sql = 'delete shop,shop_good from shop left join shop_good on shop.id = shop_good.shop_cart_id where shop_good.shop_cart_id in '
//   let sql = 'delete from shop_good where good_id in '
//   let $fh = '( '
//   const len = data.length -1
//   for(let i = 0;i<data.length;i++) {
//     console.log(i);
//      if(i == len) {
//       $fh = $fh + '? )'
//      }else {
//       $fh = $fh + '?' + ','
//      }
//   }
//   sql = sql + $fh
//   db.query(sql,data,(err,results)=>{
//     if(err) {
//       return res.cc(err)
//     }
//     res.send({
//       status:200,
//       message:'移除商品成功！'
//     })
//   })
// } 

















