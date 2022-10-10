<script>
  import { Search } from '@element-plus/icons-vue'
  export default{
    data(){
     return {
       restaurants:[],
       state:'',
       timeout:null,
       data1:[],
       data2:[],
   //----------------------------------------
       count:0,
       data:[],
       busy:false,
       page:1,
       search_contain:'',
       option:'users_number',
       state:'-1',
       users:'',
       more:false,
       users:''
     }
    },
    components:{
     Search
    },
    setup() {
     
    },
    created() {
     // this.getYiEnData()
    },
    mounted() {
 
    },
    methods:{
     searchMovie(dataName) {
     // this.$router.push('/moviecontain')
     // this.$store.commit('getDataName',dataName)
     // window.sessionStorage.setItem('QjMovieName',dataName)
     // window.sessionStorage.setItem('path','list/info')
   },
   async Searchusers(){
     console.log(1111);
     this.users = ''
     this.page = 1
     const data = await this.$http({
       method:'post',
       url:'/mausers/search',
       headers:{
        authorization:window.sessionStorage.getItem('token')
       },
       data:{
         id:this.search_contain,
         page:this.page * 10 
       }
     })
     console.log(data);
     let arr = data.data.data
     this.users = arr
     this.page = 2,
     this.busy = false
     this.more = false
     ElMessage({
         message: '内容搜索成功',
         type: 'success',
         grouping:true,
         duration:3000
       })
     console.log(arr);
   },
   async load() {
     this.busy = true
     setTimeout(()=>{
       this.busy = false
     },2000)
     if(this.page > 1 && !this.more) {
       console.log('kkk');
       this.busy = false
       const data = await this.$http({
         method:'post',
         url:'/mausers/search',
         headers:{
          authorization:window.sessionStorage.getItem('token')
         },
         data:{
           id:this.search_contain,
           page:this.page * 10 
         }
       })
       if(this.users.length == data.data.data.length) {
         this.more = true
       }else {
         this.page ++
         this.users = data.data.data
       }
      //  ElMessage({
      //    message: '数据加载成功',
      //    type: 'success',
      //    grouping:true,
      //    duration:3000
      //  })
       this.busy = true
     }
     if(this.more) {
       this.$refs.None.style.display = 'block'
      //  ElMessage({
      //    message: '没有更多数据了',
      //    type: 'warning',
      //    grouping:true,
      //    duration:3000
      //  })
     }
   }
   }
  }
 </script>
 <template>
   <div id="card">
     <div class="search_content">
       <el-radio-group v-model="option">
         <el-radio-button label="users_number">用户id</el-radio-button>
       </el-radio-group>
       <el-input type="text" v-model="search_contain"  placeholder="请输入想要搜索的内容" @keyup.enter.native="Searchusers" />
       <el-button icon="" type="primary" @click="Searchusers">
         <el-icon><Search /></el-icon>
       </el-button>
     </div>
     <div>
     <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
       <li v-for="i in users" :key="i" class="infinite-list-item">
        <div class="info">
          <el-image
          style="width: 60px; height: 60px; margin:10px;busers-radius: 5px;"
          :src="i.avatar"
          :initial-index="0"
          fit="cover"
          />
         <div style="width: 70px;" >id：{{i.id}}</div>
         <div style="width: 450px;" >用户名：{{i.name}}</div>
         <div style="width:120px" >性别：{{i.sex}}</div>
         <div style="width:120px" >登录次数：{{i.login_num}}</div>
        </div>
       </li>
       <div class="None" ref="None">
         No more
       </div>
     </ul>
   </div>
 </div>
 </template>
 <style scoped lang="less">
   .search_content {
     display: flex;
     justify-content: left;
     margin: 10px auto;
     .el-radio-group {
       margin-right: 10px;
     }
   }
   .el-input {
     width: 400px;
   }
   .el-button {
     width: 100px
   }
   .el-icon {
     width: 20px;
     height: 20px;
     svg {
       width: 20px;
       height: 20px;
     }
   }
   .infinite-list {
     height: 460px;
     padding: 0;
     margin: 0;
     list-style: none;
   }
   .infinite-list .infinite-list-item {
     display: flex;
     align-items: center;
     justify-content: left;
     height: 80px;
     background: var(--el-color-primary-light-9);
     margin: 10px;
     color: black;
   }
   .infinite-list .infinite-list-item + .list-item {
     margin-top: 10px;
   }
   .None {
     text-align: center;
     height: 200px;
     line-height: 200px;
     display: none;
     cursor: default;
     user-select: none
   }
   .info {
     display: flex;
     justify-content: space-between;
   }
   .info div {
    display: block;
    height: 80px;
    line-height: 80px;
   }
   .goods {
     flex: 1;
     height: 200px;
     overflow: hidden;
     background: var(--el-color-primary-light-9);
     margin-right: 10px;
   }
   .scrollbar-flex-content {
     height: 160px;
     width: 99%;
     display: flex;
   }
   .title {
     height: 20px;
     line-height: 20px;
     margin: 5px;
   }
   .scrollbar-demo-item {
     flex-shrink: 0;
     display: flex;
     width: 320px;
     height: 150px;
     text-align: center;
     border-radius: 4px;
     margin: 5px 10px;
     background: white;
   }
   .shangping {
     margin: 5px;
   }
   .wenzi {
     width: 160px;
     text-align: left;
   }
   .el-scrollbar {
     height: 170px;
   }
   .demo-image__error .image-slot {
     font-size: 30px;
   }
   .demo-image__error .image-slot .el-icon {
     font-size: 30px;
   }
    .el-image {
     width: 100%;
     height: 60px;
     margin-top: 10px;
   }
 </style>