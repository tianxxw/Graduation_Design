<script>
import { Delete,Edit,Search,Plus } from '@element-plus/icons-vue'
 export default{
   data() {
    return {
      allow:'',
      goods:'',
      pageSize:7,
      small:false,
      disabled:false,
      background:true,
      currentPage:1,
      total:'',
      dialogVisible1:false,
      dialogVisible2:false,
      dialogImageUrl:'',
      removeData:'',
      dialogVisible3:false,
      index:'',
      head:{
        authorization:''
      },
      commodity_name:'',
      commodity_price:'',
      GoodsForm:{
        commodity_name:'',
        commodity_price:''
      },
      GoodsFormRules: {
        commodity_name: [
          { required: true, message: '输入新的商品名称', trigger: 'blur' },
          { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
        ],
        commodity_price: [
          { required: true, message: '输入新的商品价格', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 6 到 15 个数字', trigger: 'blur' }
        ],
      }
    }
   },
   components:{
     Delete,
     Edit,
     Search,
     Plus
   },
  //  setup(){
  //    return {
  //     Delete,
  //     Edit,
  //     Search
  //    }
  //  },
   created() {
    // this.goGood()
    // this.head.authorization = window.sessionStorage.getItem('token')
   },
   mounted() {
    this.goGood()
    this.head.authorization = window.sessionStorage.getItem('token')
   },
   methods:{
    async goGood(){
     const arr = await this.$http({
      method:'get',
      url:'/magoods/good1',
      headers:{
        authorization:window.sessionStorage.getItem('token')
      }
     })
     console.log(arr);
     this.goods = arr.data.data
     this.total = this.goods.length
     ElMessage({
        message: '数据获取成功',
        type: 'success',
        grouping:true,
        duration:3000
      })
    },
    updataButton(index) {
      this.dialogVisible1 = true
      this.index = index
    },
    deleteButton(index) {
      this.dialogVisible3 = true
      this.index = index
      let list = this.goods
      console.log(list);
      let arr = [];
      list.map((item)=>{
       console.log(item);
       if(item.commodity_id == index) {
         arr = [item]
       }
      })
      this.removeData = arr
    },
    async updateInfo() {
      const arr = await this.$http({
       method:'post',
       url:'/magoods/good3',
       headers:{
         authorization:window.sessionStorage.getItem('token')
       },
       data:{
         commodity_name:this.GoodsForm.commodity_name,
         commodity_price:this.GoodsForm.commodity_price,
         dialogImageUrl:this.dialogImageUrl,
         commodity_id:this.index
       },
      })
      await this.goGood()
      console.log(arr);
      if(arr.status == 200) {
        this.dialogVisible1 = false
        ElMessage({
          message: arr.data.message,
          type: 'success',
          grouping:true
        })
      }else {
        ElMessage({
          message: '商品修改失败',
          type: 'errer',
          grouping:true
        })
      }
    },
    async deleteInfo() {
     const data = await this.$http({
      method:'post',
      url:'/magoods/good4',
      headers:{
        authorization:window.sessionStorage.getItem('token')
      },
      data:{
        id:this.index
      }
     })
     await this.goGood()
     console.log(data);
     if(data.status == 200) {
        this.dialogVisible3 = false
        ElMessage({
          message: data.data.message,
          type: 'success',
          grouping:true
        })
      }else {
        ElMessage({
          message: '商品删除失败',
          type: 'errer',
          grouping:true
        })
      }
    },
    handleSizeChange() {

    },
    handleCurrentChange() {
     
    },
    handleAvatarSuccess(res) {
      console.log(res);
      this.dialogImageUrl = res.data.fileUrl
      this.showPlus = false
      // this.dialogVisible1 = false
      // this.resetForm()
      console.log('success');
    },
    handlePictureCardPreview() {

    },
    handleRemove(uploadFile) {
      console.log(uploadFile);
      this.dialogVisible2 = true
    },
    resetForm() {
      this.$refs.GoodsFormRef.resetFields()
    },
    closeDialog() {
      this.resetForm()
      this.dialogImageUrl = ''
    },
    closeDialog2() {

    },
    handleClose() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {
      
    }
   }
 }
 </script>
<template>
 <div>
  <el-table :data="goods.slice((currentPage-1)*pageSize,currentPage*pageSize)" border>
   <el-table-column prop="commodity_id" label="Id" width="80" />
   <el-table-column prop="commodity_imgurl" label="图片" width="80">
    <template #default="scope">
     <div style="height:50px;margin:0px auto;">
      <img :src="scope.row.commodity_imgurl" min-width="50" height="50" style="display:block;margin:0px auto;">
     </div>
    </template>
   </el-table-column>
   <el-table-column prop="commodity_name" label="商品名" />
   <el-table-column prop="commodity_price" label="价格" width="100" />
   <el-table-column prop="commodity_id" label="操作" width="150" >
    <template #default="button">
     <el-row>
      <el-button icon="" type="primary" @click="updataButton(button.row.commodity_id)" circle>
       <el-icon><Edit /></el-icon>
      </el-button>
      <el-button icon="" type="success" circle>
       <el-icon><Search /></el-icon>
      </el-button>
      <el-button icon="" type="danger" @click="deleteButton(button.row.commodity_id)" circle>
        <el-icon><Delete /></el-icon>
      </el-button>
     </el-row>
    </template>
   </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible1" title="商品修改" width="30%" draggable center="true" align-center="true" @close="closeDialog">
    <el-form ref="GoodsFormRef" :model="GoodsForm" :rules="GoodsFormRules" label-width="0px">
      <el-form-item prop="commodity_name">
        <span>商品名称</span>
        <el-input type="text" v-model="GoodsForm.commodity_name"  placeholder="输入新的商品名称" clearable >
        </el-input>
      </el-form-item>
      <el-form-item prop="commodity_price">
        <span>商品单价</span>
        <el-input type="text" v-model="GoodsForm.commodity_price"  placeholder="输入新的商品价格" clearable >
        </el-input>
      </el-form-item>
    </el-form>
    <span class="img">商品图片</span>
    <el-upload
      action="http://127.0.0.1:3007/img/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="handleAvatarSuccess"
      :on-remmove="handleRemove"
      :headers="head"
      multiple
      limit="1"
      >
      <el-icon><Plus /></el-icon>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb, and only one can be added
        </div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible2">
      <img w-full :src="dialogImageUrl" alt="Preview Image">
    </el-dialog>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="updateInfo" >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogVisible3"
    center="true"
    align-center="true"
    title="提示"
    width="30%"
    @close="closeDialog2"
  > 
    <div class="delete">商品序号：{{removeData[0].commodity_id}}</div>
    <div class="delete">商品名称：{{removeData[0].commodity_name}}</div>
    <div class="delete">商品价格：{{removeData[0].commodity_price}}</div>
    <div>
      <img :src="removeData[0].commodity_imgurl" width="200" style="border-radius: 5px;">
    </div>
    <div style="color: red;font-size:18px;text-align:center;width:100%;margin-top:10px;">确认删除此商品吗</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="dialogVisible3 = false">离开</el-button>
        <el-button type="danger" @click="deleteInfo">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-pagination
  v-model:currentPage="currentPage"
  v-model:page-size="pageSize"
  :small="small"
  :disabled="disabled"
  :background="background"
  layout="total, prev, pager, next, jumper"
  :total="total"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
/>
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
.el-dialog {
 .input {
  display: flex;
  justify-content: center;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  span{
    width: 90px;
  }
  .el-input{
    height: 30px;
    margin-top: 5px;
  }
 }
 .input:nth-child(2) {
  margin-bottom: 10px;
 }
 .img {
  display: block;
  margin: 10px 0px;
 }
 .delete {
  margin-bottom: 10px;
 }
}
</style>