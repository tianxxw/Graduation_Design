const db = require('../db/index')
const { getinfo } = require("../router_function/index")
exports.allUser = async (req,res)=>{
 const sql = 'select * from user'
 await getinfo(sql,[],res,1)
}
exports.updataInfo = async (req,res) => {
 console.log(req.body);
 const sql = 'update ma_user set ma_nickname = ?, ma_password = ?, ma_avatar = ? where ma_username = ?'
 await getinfo(sql,[req.body.ma_nickname,req.body.ma_password,req.body.dialogImageUrl,req.body.ma_username],res,1)
}
exports.maUser = async (req,res)=>{
 const sql = 'select * from ma_user'
 await getinfo(sql,[],res,1)
}
exports.search = async (req,res) =>{
 console.log(req.body);
 const sql = 'select id,open_id,avatar,name,sex,login_num from user where id like ? limit 0,?'
 const data = await getinfo(sql,['%'+req.body.id+'%',req.body.page],res)
 console.log(data);
 res.send({
  data
 })
}