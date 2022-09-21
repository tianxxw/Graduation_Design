const fs = require("fs")
const path = require("path")
const db = require('../db/index')
exports.upload = (req,res)=>{
 console.log(req.file);
 try{
  const old = req.file.path
  const name = req.file.path + path.parse(req.file.originalname).ext
  fs.renameSync(old,name)
  res.send({
   status:{
    code:200,
    message:"上传成功"
   },
   data:{
    fileUrl:`http://127.0.0.1:3007/${path.parse(name).base}`
   }
  })
 } catch(e) {
  console.log(e);
  console.log(2);
  res.send({
   code:500,
   message:"上传失败"
  })
 }
}
exports.download = (req,res)=>{
 res.download('goods_img/'+req.params.fileName)
}