const axios = require("axios")
const APPID = 'wx3e3e98f07ee2ec7c'
const db = require('../db/index')
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

