<script>
 import OrderList from '../view/orders/list.vue'
 import OrderSearch from '../view/orders/search.vue'
 export default{
  data() {
    return {
     orderName:'OrderList',
     cssPath:0
    }
   },
   components:{
     OrderList,
     OrderSearch
   },
   created() {

   },
   mounted() {
    this.$nextTick(()=>{
     this.getSeesion()
     this.svaeCss(this.cssPath)
    })
     
   },
   methods:{
     gotoCom(route,e) {
       this.orderName = route
       window.sessionStorage.setItem('OrderPath',route)
       window.sessionStorage.setItem('cssorderPath',e.currentTarget.id)
       this.svaeCss(e.currentTarget.id)
     },
     svaeCss(index) {
      const arr = this.$refs.select.children
       for(let i =0 ;i<arr.length;i++) {
        arr[i].className = ''
       }
       console.log(Number.parseInt(index));
       arr[Number.parseInt(index)].className = 'sk'
     },
     getSeesion () {
      if(window.sessionStorage.getItem('OrderPath')) {
        this.orderName = window.sessionStorage.getItem('OrderPath')
      }
      if(window.sessionStorage.getItem("cssorderPath")) {
        this.cssPath = window.sessionStorage.getItem("cssorderPath")
      }
     }
   }
 }
 </script>
<template>
 <div class="content">
  <div class="title" ref="select">
   <div @click="gotoCom('OrderList',$event)" class="sk" id="0">订单列表</div>
   <div @click="gotoCom('OrderSearch',$event)" id="1">订单搜索</div>
  </div>
  <keep-alive>
   <component :is="orderName" style="margin: 0px 10px;"></component>
  </keep-alive>
</div>
</template>
<style scoped lang="less">
 .content {
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 2px;
  .title {
   display: flex;
   justify-content: left;
   z-index: 2;
   div {
    padding: 10px;
    cursor: default;
    user-select: none
   }
  }
  .sk {
   background-color: rgba(64,158,255,1);
   box-shadow: 1px 1px gainsboro;
   color: white;
   transition: all 0.2s;
  }
 }
</style>