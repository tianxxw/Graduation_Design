const db = require("../db");
const {deletegood} = require("../router_function/index")
exports.gitorder = (req,res)=>{
  let info = req.body.info,list = req.body.list, state = req.body.state, price = req.body.allprice, session_key = req.body.session_key
  let get_time = new Date();
  let y = time(get_time.getFullYear())
  let m = time(get_time.getMonth()+1)
  let d = time(get_time.getDate())
  let h = time(get_time.getHours())
  let min = time(get_time.getMinutes())
  let s = time(get_time.getSeconds())
  let times = y+ '-' + m + '-' + d + ' ' + h + ':' + min +':' + s
  const sql0 = 'select id from user where session_key = ?'
  const sql1 = 'insert into order_table (id,order_id,order_number,user_id,price,create_time,tel_number,province_name,city_name,county_name,street_name,detail_info_new,national_code,postal_code,username,state) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);' 
  const sql2 = 'select id from order_table where user_id = ?'
  let sql3 = 'insert into order_good (id,order_id,good_id) values'
  const sql4 = ''
  let $k = ' (?,?,?)'
   //null,order_id,good_id
  for(let i =0 ;i<list.length;i++) {
    list.length>0 && i < list.length -1 ? sql3 = sql3 + $k + ',' : sql3 = sql3 + $k
  }
  db.query(sql0,JSON.parse(session_key),(err,result)=>{
   if(err) {
    return res.cc(err)
   }
   if(result.length == 0) {
    return res.cc(err)
   }
   else {
    let charlength = Math.floor(Math.random()*10)+7
    let order_id = ''
    let arrtime = [d,m,y,s,h,min]
    for(let i= 0;i<charlength;i++) {
      let arrzifu = Math.floor(Math.random()*100)%2==0? String.fromCharCode((Math.floor(Math.random()*26) + 65)): Math.ceil((Math.random()*9))
      order_id = order_id + arrzifu
    } 
    while(arrtime.length > 0) {
      let i = arrtime[Math.floor(Math.random()*arrtime.length)]
      order_id = order_id + i
      arrtime.splice(arrtime.indexOf(i),1)
    }
     db.query(sql1,[null,order_id,list.length,result[0].id,price,times,info.telNumber,info.provinceName,info.cityName,info.countyName,info.streetName,info.detailInfoNew == undefined ? null : info.detailInfoNew,info.nationalCode == undefined ? null : info.nationalCode,info.postalCode,info.userName,state],(err1,result1)=>{

      if(err1) {
        
       return res.cc(err1)
      }else {
  
       db.query(sql2,result[0].id,(err2,result2)=>{
     
        if(err2) {
          return res.cc(err2)
        }
        if(result2.length==0) {
          return res.cc(err2)
        }else {
          let arr = []
          list.map((item,index)=>{
            arr = [...arr,null,result2[result2.length-1].id,item.commodity_id]
          })
          db.query(sql3,arr,(err3,result3)=>{
            if(err3) {
              return res.cc(err3)
            }else {
              let arrid = []
              list.forEach((item,index)=>{
                arrid = [...arrid,item.good_id]
              })
              deletegood(arrid,res)
            }
          })
        }
       })      
      }
     })
            
   }
  })
}




function ak() {
 return new Promise((resolve,reject)=>{

 })
}







function time (fn) {
 return fn < 10? '0'+ fn : fn
}