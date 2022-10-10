const db = require("../db");
const axios = require("axios")
const {deletegood,getinfo,time,arrData,resultSort} = require("../router_function/index")
exports.postOrder = async (req,res)=>{
  let info = req.body.info,
  list = req.body.list, 
  state = req.body.state, 
  price = req.body.allprice, 
  session_key = req.body.session_key
  //客户端传入的数据
  let get_time = new Date();
  let y = time(get_time.getFullYear())
  let m = time(get_time.getMonth()+1)
  let d = time(get_time.getDate())
  let h = time(get_time.getHours())
  let min = time(get_time.getMinutes())
  let s = time(get_time.getSeconds())
  let times = y+ '-' + m + '-' + d + ' ' + h + ':' + min +':' + s
  //订单生成时间
  const sql0 = 'select id from user where session_key = ?'
  const sql1 = 'insert into order_table (id,order_number,order_num,user_id,price,create_time,tel_number,province_name,city_name,county_name,street_name,detail_info_new,national_code,postal_code,username,state,instate) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);' 
  const sql2 = 'select id from order_table where user_id = ?'
  //sql语句
  let sql3 = 'insert into order_good (id,order_id,good_id,number) values'
  let $k = ' (?,?,?,?)'
   //null,order_id,good_id,number
  for(let i =0 ;i<list.length;i++) {
    list.length>0 && i < list.length -1 ? sql3 = sql3 + $k + ',' : sql3 = sql3 + $k
  }
  //sql3和$k根据商品数量拼接成真正的sql语句
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
  //订单编号随机生成
  let arrid = []
  list.forEach((item,index)=>{
    arrid = [...arrid,item.good_id]
  })
  //需要从购物车中删除的商品
  const result =  await getinfo(sql0,JSON.parse(session_key),res);
  console.log('-------------------------------------------------------');
  console.log(order_id,list.length,result[0].id,price,times,info.telNumber,info.provinceName,info.cityName,info.countyName,info.streetName,info.detailInfoNew,info.nationalCode,info.postalCode,info.userName,state);
  await getinfo(sql1,[null,order_id,list.length,result[0].id,price,times,info.telNumber,info.provinceName,info.cityName,info.countyName,info.streetName,info.detailInfoNew == undefined ? null : info.detailInfoNew,info.nationalCode == undefined ? null : info.nationalCode,info.postalCode,info.userName,state,0],res)
  const result2 = await getinfo(sql2,result[0].id,res);
  const arrdata = await arrData(result2,list);
  console.log(arrdata);
  await getinfo(sql3,arrdata,res)
  await deletegood(arrid,res)
  //订单提交完成
}
//提交订单
exports.getOrder = async (req,res)=>{
  const sql1 = 'select * from user where session_key = ?'
  const sql2 = 'select * from order_table inner join order_good og on order_table.id = og.order_id inner join commodity on og.good_id = commodity.commodity_id where order_table.user_id = ? && order_table.state = ?'
  const info =  await getinfo(sql1,JSON.parse(req.query.session_key),res);
  const result = await getinfo(sql2,[info[0].id,parseInt(req.query.state)],res);
  await resultSort(result,res)
}
//客户获取订单
exports.getINOrder = async (req,res)=>{
  const sql1 = 'select * from user where session_key = ?'
  const sql2 = 'select * from order_table inner join order_good og on order_table.id = og.order_id inner join commodity on og.good_id = commodity.commodity_id where order_table.user_id = ? && order_table.instate = ? && order_table.state = ?'
  const info =  await getinfo(sql1,JSON.parse(req.query.session_key),res);
  const result = await getinfo(sql2,[info[0].id,parseInt(req.query.instate),parseInt(req.query.state)],res);
  await resultSort(result,res)
}
//发货状态订单
exports.allOrder = async (req,res)=>{
  console.log(req.body);
  const sql = 'select * from order_table inner join order_good og on order_table.id = og.order_id inner join commodity on og.good_id = commodity.commodity_id'
  const data = await getinfo(sql,[null],res)
  await resultSort(data,res)
}
//管理员获取订单
exports.searchOrder = async (req,res)=>{
  console.log(req.body);
  const sql1 = 'select * from order_table inner join order_good og on order_table.id = og.order_id inner join commodity on og.good_id = commodity.commodity_id where state = ? && order_number like ? limit 0,?'
  const sql2 = 'select * from order_table inner join order_good og on order_table.id = og.order_id inner join commodity on og.good_id = commodity.commodity_id where state = ? && tel_number like ? limit 0,?'
  const sql0 = 'select * from order_table inner join order_good og on order_table.id = og.order_id inner join commodity on og.good_id = commodity.commodity_id order by order_table.id DESC limit 0,?'
  let sql = ''
  let data =''
  if(req.body.state != '-1') {
    if(req.body.option == 'order_number') {
      sql = sql1
    }
    if(req.body.option == 'tel_number') {
      sql = sql2
    }
    data = await getinfo(sql,[req.body.state,'%' + req.body.search_contain + '%',Number.parseInt(req.body.page)],res)
  }else {
    sql = sql0
    data = await getinfo(sql,[Number.parseInt(req.body.page)],res)
  }
  await resultSort(data,res)
}
//搜索订单
exports.orderDetails = async (req,res) => {
  const sql = 'select * from order_table inner join order_good og on order_table.id = og.order_id inner join commodity on og.good_id = commodity.commodity_id where order_table.id = ？'
}
exports.updataeOrder1 = async (req,res) => {
  const sql = 'update order_table set instate = 1 where order_number = ?'
  const data = await getinfo(sql,[req.body.order_number],res)
  res.send({
    message:'修改成功'
  })
}
exports.updataeOrder2 = async (req,res) => {
  const sql1 = 'select * from user where session_key = ?'
  const sql2 = 'select * from order_table inner join order_good og on order_table.id = og.order_id inner join commodity on og.good_id = commodity.commodity_id where order_table.user_id = ? && order_table.instate = ?'
  const info =  await getinfo(sql1,JSON.parse(req.query.session_key),res);
  const result = await getinfo(sql2,[info[0].id,parseInt(req.query.instate)],res);
  await resultSort(result,res)
}
exports.updataeOrder3 = async (req,res) => {
  console.log(req.query);
  const sql = 'update order_table set state = 2 where order_number = ?'
  await getinfo(sql,req.query.order_number,res);
  res.send({
    message:'收货成功'
  })
}
//查看订单详情


