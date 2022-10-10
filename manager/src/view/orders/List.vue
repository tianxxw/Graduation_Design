<script>
  import { Edit } from '@element-plus/icons-vue'
 export default{
   data() {
    return {
     orders:'',
     pageSize:12,
    small:false,
    disabled:false,
    background:true,
    currentPage:1,
    total:'',
    details:'',
    dialogVisible:false
    }
   },
   components() {
    Edit
   },
   created() {
    this.getOrder()
   },
   mounted() {
      let contain = this.$refs.body
      let viewHeight = document.documentElement.clientHeight
      console.log(viewHeight-220);
      let height = parseInt((viewHeight - 180)/54)
      this.pageSize = height
      window.addEventListener('resize',this.resize)
      setInterval(()=>{
        this.getOrder2()
      },3000)
   },
   methods:{
    async updataButton(order_number) {
      console.log(order_number);
      const data = await this.$http({
        method:'post',
        url:'/maorders/updateSh',
        headers:{
          authorization:window.sessionStorage.getItem('token')
        },
        data:{
          order_number
        }
      })
      this.getOrder2()
      ElMessage({
        message: '发货成功',
        type: 'success',
        grouping:true,
        duration:3000
      })
      },
    async resize() {
      let contain = this.$refs.body
      let viewHeight = document.documentElement.clientHeight
      console.log(viewHeight-220);
      let height = parseInt((viewHeight - 180)/54)
      this.pageSize = height
    },
    async getOrder2() {
      const data = await this.$http({
        method:'get',
        url:'/maorders/orders',
        headers:{
          authorization:window.sessionStorage.getItem('token')
        }
      })
      let arr = data.data.result
      console.log(arr);
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
      this.orders = arr.reverse()
      this.total = arr.length
    },
    async getOrder() {
      const data = await this.$http({
        method:'get',
        url:'/maorders/orders',
        headers:{
          authorization:window.sessionStorage.getItem('token')
        }
      })
      let arr = data.data.result
      console.log(arr);
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
      this.orders = arr.reverse()
      this.total = arr.length
    },
    viewDetails (row,column,event) {
        console.log(row); 
        this.details = row
        this.dialogVisible = true
    }
  }
 }
 </script>
<template>
  <div ref="body">
    <el-table :data="orders.slice((currentPage-1)*pageSize,currentPage*pageSize)" border @row-click="viewDetails" >
      <el-table-column prop="order_number" label="订单号" width="300" />
      <el-table-column prop="user_id" label="下单人id" width="90" />
      <el-table-column prop="price" label="订单金额" width="90" />
      <el-table-column class="position" prop="position" label="收货地址" />
      <el-table-column prop="username" label="收货人" width="70" />
      <!-- <el-table-column prop="tel_number" label="电话" width="130" /> -->
      <el-table-column prop="create_time" label="下单时间" width="170" />
      <el-table-column prop="state" label="订单状态" width="90" >
      </el-table-column>
      <el-table-column prop="instate" label="发货状态" width="90" >
        <template #default="row1">
          <el-row>
             {{row1.row.instate == 0 ? '未发货' : '已发货'}}
          </el-row>
         </template>
      </el-table-column>
      <el-table-column prop="order_number instate" label="操作" width="110" >
        <template #default="button">
         <el-row>
          <el-button icon="" :disabled="button.row.instate" type="success" @click.stop="updataButton(button.row.order_number)">
            {{button.row.instate == 0 ? '确认收货' : '已发货'}}
          </el-button>
         </el-row>
        </template>
       </el-table-column>
     </el-table>
     <el-pagination 
      background 
      layout="total, prev, pager, next, jumper" 
      :total="total"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :small="small"
      :disabled="disabled"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      />
      <el-dialog
      v-model="dialogVisible"
      title="订单详情"
      width="1000px"
      center="true"
      align-center="true"
      :before-close="handleClose"
    >
      <div class="dialog">
        <div class="left">
          <div>订单号：{{details.order_number}}</div>
          <div>商品数量：{{details.order_num}}件</div>
          <div>订单金额：{{details.price}}元</div>
          <div>收货地址：{{details.position}}</div>
          <div>收货人：{{details.username}}</div>
          <div>电话：{{details.tel_number}}</div>
          <div>邮编地址：{{details.postal_code}}</div>
          <div>下单时间：{{details.create_time}}</div>
          <div>订单状态：{{details.state}}</div>
        </div>
        <el-scrollbar height="270px" class="right">
          <div>商品列表</div>
          <div v-for="item in details.good_id" class="right_content">
            <div class="demo-image__preview">
              <el-image
              style="width: 110px; height: 110px; margin:5px;border-radius: 5px;"
              :src="item.commodity_imgurl"
              :preview-src-list="[item.commodity_imgurl]"
              :initial-index="0"
              fit="cover"
              />
            </div>
            <div class="wenzi">
              <div class="sp_name" :title="item.commodity_name" >商品名称：{{item.commodity_name}}</div>
              <div>商品单价：{{item.commodity_price}}</div>
              <div>商品数量：{{item.number}}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <template #footer>
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
  .el-table {
    margin: 10px auto;
   }
  .el-pagination {
   position: absolute;
   bottom: 30px;
  }
  .dialog {
    display: flex;
    .left {
      width: 500px;
      height: 270px;
      div {
        height: 30px;
        line-height: 30px;
      }
    }
    .right {
      flex: 1;
      height: 270px;
      .right_content {
        display: flex;
      }
    }
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
  .wenzi {
    height: 30px;
    line-height: 30px;
    width: 320px;
    .sp_name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
  }
  .el-button {
    height: 30px;
    width: 100px;
  }

</style>