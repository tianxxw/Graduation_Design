function deletegood(data) {
 let sql = 'delete shop,shop_good from shop left join shop_good on shop.id = shop_good.shop_cart_id where shop_good.shop_cart_id in '
 let $fh = '( '
 const len = data.length -1
 for(let i = 0;i<data.length;i++) {
   console.log(i);
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
}

exports.deletegood 