const db = require("../db");
function deletegood(data,res) {
  return new Promise((resolve,reject)=>{
    let sql = 'delete from shop_good where good_id in '
    let $fh = '( '
    const len = data.length -1
    for(let i = 0;i<data.length;i++) {
       if(i == len) {
        $fh = $fh + '? )'
       }else {
        $fh = $fh + '?' + ','
       }
    }
    sql = sql + $fh
    db.query(sql,data,(err,results)=>{
      if(err) {
        return res.cc(err)
      }
      res.send({
        status:200,
        message:'移除商品成功！'
      })
    })
  })
} 


function getinfo(sql,info,res,resSend = false) {
  return new Promise((resolve,reject)=>{
    db.query(sql,info,(err,result)=>{
     if(err) {
       return res.cc(err)
     }
     if(result.length == 0) {
       return res.cc(err)
     }
     if(resSend) {
      res.send({
        status:200,
        message:'success',
        result
      })
     }
    resolve(result)
    })
  })
}

function time (fn) {
  return fn < 10? '0'+ fn : fn
 }

function arrData(result2,list) {
  let list2 = list
  return new Promise((resolve,reject)=>{
    let arr = []
    list2.map((item,index)=>{
      arr = [...arr,null,result2[result2.length-1].id,item.commodity_id,item.number]
    })
    resolve(arr)
  })
}

function resultSort(result,res) {
   return new Promise((resolve,reject)=>{
    let arr = []
    let data = []
    result.map((item,index)=>{
      let i = arr.indexOf(item.order_number)
      item.good_id = []
      let k = {}
      k['number'] = item.number
      k['commodity_id']=item.commodity_id
      k['commodity_name']=item.commodity_name
      k['commodity_price']=item.commodity_price
      k['commodity_imgurl']=item.commodity_imgurl
      delete item.number
      delete item.commodity_id
      delete item.commodity_name
      delete item.commodity_price
      delete item.commodity_imgurl
      if(i == -1) {
        item.good_id.push(k)
        data = [...data,item]
        arr = [...arr,item.order_number]
      }else {
        for(let j =0;j<data.length;j++) {
          if(data[j].order_number==item.order_number) {
            data[j].good_id.push(k)
          }
        }
      }
    })
    // resolve(data)
    res.send({
      result:data
    })
   })
}

module.exports = {
  deletegood,
  getinfo,
  time,
  arrData,
  resultSort
}
