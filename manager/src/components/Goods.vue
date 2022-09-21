<script>
 import Sale from '../view/goods/Sale.vue'
 import Sales from '../view/goods/Sales.vue'
 import Addsp from '../view/goods/Addsp.vue'
 export default{
   data() {
    return {
     comName:'Sale',
     cssPath:0
    }
   },
   components:{
    Sale,
    Sales,
    Addsp
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
      console.log(e.currentTarget.id);
       this.comName = route
       window.sessionStorage.setItem('GoodPath',route)
       window.sessionStorage.setItem('cssPath',e.currentTarget.id)
      //  const arr = this.$refs.select.children
      //  console.log(arr);
      //  for(let i =0 ;i<arr.length;i++) {
      //   arr[i].className = ''
      //  }
      //  console.log(Number.parseInt(e.currentTarget.id));
      //  arr[Number.parseInt(e.currentTarget.id)].className = 'sk'
       this.svaeCss(e.currentTarget.id)
     },
     svaeCss(index) {
      const arr = this.$refs.select.children
       for(let i =0 ;i<arr.length;i++) {
        arr[i].className = ''
       }
       console.log(Number.parseInt(index));
       arr[Number.parseInt(index)].className = "sk"
     },
     getSeesion () {
      if(window.sessionStorage.getItem('GoodPath')) {
        this.comName = window.sessionStorage.getItem('GoodPath')
      }
      if(window.sessionStorage.getItem("cssPath")) {
        this.cssPath = window.sessionStorage.getItem("cssPath")
      }
     }
   }
 }
 </script>
<template>
 <div class="content">
   <div class="title" ref="select">
    <div @click="gotoCom('Sale',$event)" class="sk" id="0">在售商品</div>
    <div @click="gotoCom('Sales',$event)" id="1">商品搜索</div>
    <div @click="gotoCom('Addsp',$event)" id="2">添加商品</div>
   </div>
   <keep-alive>
    <component :is="comName" style="margin: 0px 10px;"></component>
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
    user-select: none;
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