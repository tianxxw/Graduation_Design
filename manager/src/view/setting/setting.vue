<script>
 import {Plus} from '@element-plus/icons-vue'
 export default{
   data() {
    return {
      info:'',
      size:200,
      shape:'square',
      openInfo:0,
      GoodsForm:{
        ma_nickname:'',
        ma_password:''
      },
      GoodsFormRules: {
        ma_nickname: [
          { required: true, message: '输入新的用户名', trigger: 'blur' },
          { min: 0, max: 30, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        ma_password: [
          { required: true, message: '输入新的密码', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
      },
      head:{
        authorization:''
      },
      dialogImageUrl:'',
    }
   },
   components:{
    Plus
   },
   created() {

   },
   mounted() {
     this.info = JSON.parse(window.sessionStorage.getItem('info'))
     this.GoodsForm.ma_nickname = this.info.ma_nickname
     this.GoodsForm.ma_password = this.info.ma_password
   },
   methods:{
     open() {
       this.openInfo = 1
       this.$refs.right.style.flex = 1
     },
     outUpdata() {
      this.openInfo = 0
       this.$refs.right.style.flex = 0
     },
     login_out () {
      window.sessionStorage.clear()
      this.openInfo = 0
      this.$refs.right.style.flex = 0
      ElMessage({
          message: '退出登录成功，3s将自动跳转到登录页',
          type: 'success',
          grouping:true
        })
      setTimeout(()=>{
       window.location.reload()
      },3000)
     },
     handlePictureCardPreview(){

     },
     handleAvatarSuccess(res) {
       this.dialogImageUrl = res.data.fileUrl
     },
     handleRemove() {
     
     },
     resetForm() {
       this.$refs.GoodsFormRef.resetFields()
       this.dialogImageUrl = ''
     },
     async updataInfo() {
      const arr = await this.$http({
       method:'post',
       url:'/mausers/updataInfo',
       headers:{
         authorization:window.sessionStorage.getItem('token')
       },
       data:{
         ma_nickname:this.GoodsForm.ma_nickname,
         ma_password:this.GoodsForm.ma_password,
         dialogImageUrl:this.dialogImageUrl,
         ma_username:this.info.ma_username
       },
      })
      if(arr.status == 200) {
        this.dialogVisible1 = false
        ElMessage({
          message: '修改成功，请重新登录，1s后自动跳转到登录页面',
          type: 'success',
          grouping:true
        })
      }else {
        ElMessage({
          message: '修改失败',
          type: 'errer',
          grouping:true
        })
      }
      this.resetForm()
      this.dialogImageUrl = ''
      this.openInfo = 0 
      window.sessionStorage.clear()
      setTimeout(()=>{
        window.location.reload()
      },3000)
    }
   }
 }
 </script>
<template>
 <div class="info">
  <div class="left">
   <el-avatar :size="size" :src="info.ma_avatar" class="avatar_img" :shape="shape" @mouseenter="showAvatar" @mouseleave="closeAvatar" />
   <div>账号：{{info.ma_username}}</div>
   <div>用户名：{{info.ma_nickname}}</div>
   <el-button type="primary" v-if="!openInfo" size="large" @click="open">修改个人信息</el-button>
   <el-button type="danger" size="large" @click="login_out">退出登录</el-button>
   <div></div>
  </div>
  <div class="right" ref="right">
   <el-form ref="GoodsFormRef" :model="GoodsForm" :rules="GoodsFormRules" label-width="0px">
     <el-form-item prop="ma_nickname">
       <span>用户名：</span>
       <el-input type="text" v-model="GoodsForm.ma_nickname"  placeholder="输入新的商品名称" clearable >
       </el-input>
     </el-form-item>
     <el-form-item prop="ma_password">
       <span>密码：</span>
       <el-input type="password" v-model="GoodsForm.ma_password"  placeholder="输入新的商品价格" clearable show-password >
       </el-input>
     </el-form-item>
   </el-form>
   <span class="img">用户头像</span>
   <el-upload
     action="http://127.0.0.1:3007/img/upload"
     list-type="picture-card"
     :on-preview="handlePictureCardPreview"
     :on-success="handleAvatarSuccess"
     :on-remmove="handleRemove"
     :headers="head"
     multiple
     limit="1"
     class="upload"
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
      <el-button type="danger" @click="outUpdata">取消</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="updataInfo" >确定</el-button
      >
    </span>
  </div>
  </div>
 </div>
</template>
<style scoped lang="less">
 .info {
  display: flex;
  justify-content: center;
  height: 100%;
  .avatar_img {
   width: 200px;
   height: 200px;
   margin: 20px 20px 10px 20px;
 }
 .left div {
  margin: 10px 20px;
 }
 .el-button {
  display: block;
  width: 200px;
  margin: 5px 20px 10px;
  line-height: 15px;
  font-size: 20px;
 }
 .right {
  flex: 0;
  overflow: hidden;
  transition: all .4s;
  .el-form {
   margin: 20px;
  }
  .img {
   margin: 20px;
  }
  .upload {
   margin: 20px;
 }
 }
 }
 .dialog-footer {
  .el-button {
   display: inline;
  }
 }
</style>