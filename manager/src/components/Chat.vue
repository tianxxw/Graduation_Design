<script>
 import chatVue from '../view/chat/chat.vue'
 export default{
   data() {
    return {
      userName:'chatVue',
      userPath:0
    }
   },
   components:{
     chatVue
   },
   created() {

   },
   mounted() {
    
   },
   methods:{

   }
 }
 </script>
<template>
 <div class="content">
  <div class="title" ref="select">
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
 }
</style>