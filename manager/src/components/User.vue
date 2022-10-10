<script>
 import updateUserinfoVue from '../view/users/updateUserinfo.vue';
 import userSearchVue from '../view/users/userSearch.vue';
 export default{
   data() {
    return {
      userName:'updateUserinfoVue',
      userPath:0
    }
   },
   components:{
    updateUserinfoVue,
    userSearchVue
   },
   created() {

   },
   mounted() {
    this.$nextTick(()=>{
     this.getSeesion()
     this.svaeCss(this.userPath)
    })
   },
   methods:{
     gotoCom(route,e) {
       this.userName= route
       window.sessionStorage.setItem('UserPath',route)
       window.sessionStorage.setItem('userlistPath',e.currentTarget.id)
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
      if(window.sessionStorage.getItem('UserPath')) {
        this.orderName = window.sessionStorage.getItem('UserPath')
      }
      if(window.sessionStorage.getItem("userlistPath")) {
        this.cssPath = window.sessionStorage.getItem("userlistPath")
      }
     }
   }
 }
 </script>
<template>
 <div class="content">
  <div class="title" ref="select">
   <div @click="gotoCom('updateUserinfoVue',$event)" class="sk" id="0">用户列表</div>
   <div @click="gotoCom('userSearchVue',$event)" id="1">查找用户</div>
  </div>
  <keep-alive>
   <component :is="userName" style="margin: 0px 10px;"></component>
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