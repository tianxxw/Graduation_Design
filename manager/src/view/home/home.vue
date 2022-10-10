<script>
 import {Plus} from '@element-plus/icons-vue'
 export default{
   data() {
    return {
     info:'',
     size:150,
     shape:'square',
     goods:'',
     orders:'',
     users:'',
     mauser:'',
     vistor:0,
     money:0
    }
   },
   components:{
     Plus
   },
   created() {

   },
   mounted() {
    this.getGoods()
    this.getOrders()
    this.getUsers()
    this.getManger()
    this.info = JSON.parse(window.sessionStorage.getItem('info'))
   },
   methods:{
    async getGoods() {
     const arr = await this.$http({
      method:'get',
      url:'/magoods/good1',
      headers:{
        authorization:window.sessionStorage.getItem('token')
      }
     })
     this.goods = arr.data.data
    },
    async getOrders() {
     const data = await this.$http({
        method:'get',
        url:'/maorders/orders',
        headers:{
          authorization:window.sessionStorage.getItem('token')
        }
      })
      let arr = data.data.result
      for(let i = 0;i<arr.length;i++) {
        arr[i]['position'] = (arr[i].province_name == null ? '' : arr[i].province_name) + (arr[i].city_name == null ? '' : arr[i].city_name) + (arr[i].county_name == null ? '' : arr[i].county_name) + (arr[i].street_name == null ? '' : arr[i].street_name) + (arr[i].detail_info_new == null ? '' : arr[i].detail_info_new)
        arr[i].create_time = arr[i].create_time.slice(0,19)
        arr[i].create_time = arr[i].create_time.replace(/T/,' ')
        if(arr[i].state == 0) {
          arr[i].state = '待付款'
        }else if(arr[i].state == 1) {
          arr[i].state = '已下单'
        }else {
          arr[i].state = '已收货'
        }
        this.money = parseFloat((this.money + arr[i].price).toFixed(2))

      }
      this.orders = arr
    },
    async getUsers() {
     const data = await this.$http({
         method:'get',
         url:'/mausers/users',
         headers:{
           authorization:window.sessionStorage.getItem('token')
         }
       })
       let arr = data.data.result
       for(let i = 0;i<arr.length;i++) {
         if(arr[i].sex == 0) {
           arr[i].sex = '暂无资料'
         }else if(arr[i].sex == 1) {
           arr[i].sex = '男'
         }else {
           arr[i].sex = '女'
         }
         this.vistor += Number.parseInt(arr[i].login_num)
       }
       this.users = arr
    },
    async getManger() {
     const arr = await this.$http({
        method:'get',
         url:'/mausers/mauser',
         headers:{
           authorization:window.sessionStorage.getItem('token')
         }
     })
     console.log(arr);
     this.mauser = arr.data.result
    }
   }
 }
 </script>
<template>
 <div>
  <div class="top">
   <div class="top_left">
    <el-avatar :size="size" :src="info.ma_avatar" class="avatar_img" :shape="shape" @mouseenter="showAvatar" @mouseleave="closeAvatar" />
    <div>账号：{{info.ma_username}}</div>
    <div>用户名：{{info.ma_nickname}}</div>
    <div>登录次数：{{info.login_num}}</div>
    <div></div>
   </div>
   <div class="top_right">
     <div class="right_content" @click="this.$router.push('/order')">
      <div style="width: 100px; height: 150px;background-color: salmon;">
       <div class="title">订单量</div>
       <el-image style="width: 60px; height: 90px" src="http://127.0.0.1:3007/order_num.png" fit="contain" />
      </div>
      <div class="text">
       <div>{{orders.length}}单</div>
      </div>
     </div>
     <div class="right_content" @click="this.$router.push('/user')">
      <div style="width: 100px; height: 150px;background-color:rgba(0,122,204);">
       <div class="title">用户数</div>
       <el-image style="width: 60px; height: 90px" src="http://127.0.0.1:3007/user_num.png" fit="contain" />
      </div>
      <div class="text">{{users.length}}名</div>
     </div>
     <div class="right_content" @click="this.$router.push('/goods')" >
      <div style="width: 100px; height: 150px;background-color:rgba(250,195,38);">
       <div class="title">商品数</div>
       <el-image style="width: 60px; height: 90px" src="http://127.0.0.1:3007/good_num.png" fit="contain" />
      </div>
      <div class="text">{{goods.length}}件</div>
     </div>
     <div class="right_content">
      <div style="width: 100px; height: 150px;background-color:rgba(41,184,183)">
       <div class="title">访问次数</div>
       <el-image style="width: 60px; height: 90px" src="http://127.0.0.1:3007/visitor_num.png" fit="contain" />
      </div>
      <div class="text">{{vistor}}次</div>
     </div>
     <div class="right_content">
      <div style="width: 100px; height: 150px;background-color: salmon;">
       <div class="title">交易额</div>
       <el-image style="width: 60px; height: 90px" src="http://127.0.0.1:3007/money_num.png" fit="contain" />
      </div>
      <div class="text">{{money}}元</div>
     </div>
     <div class="right_content">
      <div style="width: 100px; height: 150px;background-color:rgba(0,122,204);">
       <div class="title">管理员</div>
       <el-image style="width: 60px; height: 90px" src="http://127.0.0.1:3007/manger_num.png" fit="contain" />
      </div>
      <div class="text">{{mauser.length}}名</div>
     </div>
     <div class="right_content">
      <div style="width: 100px; height: 150px;background-color:rgba(250,195,38);">
       <div class="title">查找量</div>
       <el-image style="width: 60px; height: 90px" src="http://127.0.0.1:3007/search.png" fit="contain" />
      </div>
      <div class="text">暂无资料</div>
     </div>
     <div class="right_content">
      <div style="width: 100px; height: 150px;background-color:rgba(41,184,183)">
        <div class="title">聊天记录</div>
       <el-image style="width: 60px; height: 90px" src="http://127.0.0.1:3007/chatRecord.png" fit="contain" />
      </div>
      <div class="text">暂无资料</div>
     </div>
   </div>
  </div>
  <div class="bottom">
   <div id="bottom_left">

   </div>
   <div id="bottom_right">

   </div>
  </div>
 </div>
</template>
<style scoped lang="less">
 .top {
  display: flex;
  justify-content: center;
  height: 100%;
  .avatar_img {
   width: 200px;
   height: 200px;
   margin: 20px 20px 10px 20px;
 }
 .top_left div {
  margin: 10px 20px;
 }
 .top_right {
  flex: 1;
  display: grid;
  margin: 10px;
  grid-template-columns: 24% 24% 24% 24%;
  grid-gap: 10px;
  grid-template-rows: 150px 150px;
  .right_content{
   display: flex;
   background-color:rgba(212,248,255);
   .text {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    flex: 1;
    text-align: center;
   }
  }
 }
}
.title {
 height: 40px;
 line-height: 40px;
 text-align: center;
 color: white;
}
.el-image {
 margin-top: 0px;
 margin-left: 20px;
}
</style>