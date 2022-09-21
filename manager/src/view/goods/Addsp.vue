<script>
  import { Plus } from '@element-plus/icons-vue'
 export default{
   data() {
    return {
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
      },
      head:{
        authorization:''
      },
      dialogVisible:false,
      dialogImageUrl:'',
    }
   },
   components:{
     Plus
   },
   created() {

   },
   methods:{
    handlePictureCardPreview(){

    },
    handleAvatarSuccess(res) {
      this.dialogImageUrl = res.data.fileUrl
    },
    handleRemove() {

    },
    resetForm() {
      this.$refs.GoodsFormRef.resetFields()
    },
    async addInfo() {
      const arr = await this.$http({
       method:'post',
       url:'/magoods/good5',
       headers:{
         authorization:window.sessionStorage.getItem('token')
       },
       data:{
         commodity_name:this.GoodsForm.commodity_name,
         commodity_price:this.GoodsForm.commodity_price,
         dialogImageUrl:this.dialogImageUrl
       },
      })
      if(arr.status == 200) {
        this.dialogVisible1 = false
        ElMessage({
          message: arr.data.message+',3s后将跳转到商品列表',
          type: 'success',
          grouping:true
        })
      }else {
        ElMessage({
          message: '商品添加失败',
          type: 'errer',
          grouping:true
        })
      }
      this.resetForm()
      this.dialogImageUrl = ''
      window.sessionStorage.setItem('GoodPath','sale')
      window.sessionStorage.setItem('cssPath',0)
      setTimeout(()=>{
        window.location.reload()
      },3000)
    }
   }
 }
 </script>
<template>
  <div>
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
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image">
    </el-dialog>
    <div>
      <span class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="addInfo" >确定</el-button
        >
      </span>
    </div>
  </div>
 </template>
<style scoped lang="less">
 .el-form {
  .el-form-item {
    width: 400px;
  }
 }
</style>