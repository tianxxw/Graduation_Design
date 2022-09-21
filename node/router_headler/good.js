const axios = require("axios")
const APPID = 'wx3e3e98f07ee2ec7c'
const db = require('../db/index')
const { getinfo } = require("../router_function")
exports.good1 =(req,res) => {
   const sql = 'select * from commodity'
   db.query(sql,(err,results)=>{
    if(err) {
     return res.cc(err)
    }
    res.send({
     status:0,
     message:'获取数据成功',
     data:results
    })
   })
}
exports.good2 =(req,res) => {
   const sql = 'select * from commodity where commodity_id = ?'
   console.log(req.query.id);
   db.query(sql,[req.query.id],(err,data)=>{
    if(err) {
     return res.cc(err)
    }
    res.send({
     status:0,
     message:'获取数据成功',
     data
    })
   })
}
exports.good3= async (req,res)=>{
   const sql = 'update commodity set commodity_name = ?,commodity_price = ?,commodity_imgurl = ? where commodity_id = ?'
   console.log(req.body);
   await getinfo(sql,[req.body.commodity_name,req.body.commodity_price,req.body.dialogImageUrl,req.body.commodity_id],res)
   res.send({
      message:'商品修改成功'
   })
}
exports.good4 = async (req,res)=>{
   console.log(req.body);
   const sql = 'delete from commodity where commodity_id = ?'
   const data = await getinfo(sql,[req.body.id],res)
   res.send({
      message:'商品删除成功'
   })
}
exports.good5 = async (req,res)=>{
   console.log(req.body);
   const sql = 'insert into commodity (commodity_id,commodity_name,commodity_price,commodity_imgurl) values (?,?,?,?)'
   const data = await getinfo(sql,[null,req.body.commodity_name,req.body.commodity_price,req.body.dialogImageUrl],res)
   res.send({
      message:'商品添加成功'
   })
}


