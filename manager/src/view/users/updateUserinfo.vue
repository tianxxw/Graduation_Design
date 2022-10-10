<script>
  export default{
    data() {
     return {
      users:'',
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
    created() {
     this.getOrder()
    },
    mounted() {
      let contain = this.$refs.body
      let viewHeight = document.documentElement.clientHeight
      console.log(viewHeight-220);
      let height = parseInt((viewHeight - 180)/75)
      this.pageSize = height
      window.addEventListener('resize',this.resize)
    },
    methods:{
      async resize() {
      let contain = this.$refs.body
      let viewHeight = document.documentElement.clientHeight
      console.log(viewHeight-220);
      let height = parseInt((viewHeight - 180)/75)
      this.pageSize = height
    },
     async getOrder() {
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
       }
       this.users = arr
       this.total = arr.length
       ElMessage({
         message: '数据获取成功',
         type: 'success',
         grouping:true,
         duration:3000
       })
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
     <el-table :data="users.slice((currentPage-1)*pageSize,currentPage*pageSize)" border @row-click="viewDetails" >
       <el-table-column prop="id" label="用户ID" width="130" />
       <el-table-column prop="name" label="用户名" width="300" />
       <el-table-column prop="avatar" label="头像" width="70">
        <template #default="avatar">
          <div style="height:50px;margin:0px auto;">
           <img :src="avatar.row.avatar" min-width="50" height="50" style="display:block;margin:0px auto;">
          </div>
         </template>
       </el-table-column>
       <el-table-column prop="sex" label="性别" width="100" />
       <el-table-column prop="open_id" label="身份码" />
       <el-table-column prop="login_num" label="登录次数" width="100" />
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
 </style>