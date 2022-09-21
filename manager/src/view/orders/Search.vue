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
      option:'order_number',
      state:'-1',
      order:'',
      more:false
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
  async SearchOrder(){
    console.log(1111);
    this.order = ''
    this.page = 1
    const data = await this.$http({
      method:'post',
      url:'/maorders/search',
      headers:{
       authorization:window.sessionStorage.getItem('token')
      },
      data:{
        option:this.option,
        state:this.state,
        search_contain:this.search_contain,
        page:this.page * 10 
      }
    })
    console.log(data);
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
     }
    this.order = arr
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
        url:'/maorders/search',
        headers:{
         authorization:window.sessionStorage.getItem('token')
        },
        data:{
          option:this.option,
          state:this.state,
          search_contain:this.search_contain,
          page:this.page * 10 
        }
      })
      if(this.order.length == data.data.result.length) {
        this.more = true
      }else {
        this.page ++
        this.order = data.data.result
      }
      ElMessage({
        message: '数据加载成功',
        type: 'success',
        grouping:true,
        duration:3000
      })
      this.busy = true
    }
    if(this.more) {
      this.$refs.None.style.display = 'block'
      ElMessage({
        message: '没有更多数据了',
        type: 'warning',
        grouping:true,
        duration:3000
      })
    }
  }
  }
 }
</script>
<template>
  <div id="card">
    <div class="search_content">
      <el-radio-group v-model="option">
        <el-radio-button label="order_number">订单编号</el-radio-button>
        <el-radio-button label="tel_number">收货人电话</el-radio-button>
      </el-radio-group>
      <el-input type="text" v-model="search_contain"  placeholder="请输入想要搜索的内容" @keyup.enter.native="SearchOrder" />
      <el-button icon="" type="primary" @click="SearchOrder">
        <el-icon><Search /></el-icon>
      </el-button>
    </div>
    <el-radio-group v-model="state" >
      <el-radio label="-1">全部</el-radio>
      <el-radio label="0" >待付款</el-radio>
      <el-radio label="1" >已下单</el-radio>
      <el-radio label="2" >待收货</el-radio>
    </el-radio-group>
    <div>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <li v-for="i in order" :key="i" class="infinite-list-item">
       <div class="info">
        <div>订单编号：{{i.order_number}}</div>
        <div>订单金额：{{i.price}}元</div>
        <div>收货地址：{{i.position}}</div>
        <div>商品数量：{{i.order_num}}件</div>
        <div>收货人：{{i.username}}</div>
        <div>电话：{{i.tel_number}}</div>
        <div>邮编地址：{{i.postal_code}}</div>
        <div>下单时间：{{i.create_time}}</div>
        <div>订单状态：{{i.state}}</div>
       </div>
       <div class="goods">
        <div class="title">商品列表</div>
        <el-scrollbar>
          <div class="scrollbar-flex-content">
            <p v-for="item in i.good_id" :key="item" class="scrollbar-demo-item">
              <div class="shangping">
                <div class="wenzi">商品名称：{{item.commodity_name}}</div>
                <div class="wenzi">商品单价：{{item.commodity_price}}元</div>
                <div class="wenzi">商品数量：{{item.number}}件</div>
              </div>
              <div class="demo-image__preview">
                <el-image
                style="width: 140px; height: 140px; margin:5px;border-radius: 5px;"
                :src="item.commodity_imgurl"
                :preview-src-list="[item.commodity_imgurl]"
                :initial-index="0"
                fit="cover"
                />
              </div>
            </p>
          </div>
        </el-scrollbar>
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
    justify-content: center;
    height: 200px;
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
    padding: 8px;
    width: 450px;
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
  .demo-image__error .el-image {
    width: 100%;
    height: 140px;
  }
</style>