<script>
import { Search,User,Lock, } from '@element-plus/icons-vue'
export default {
  data() {
    return{
      msg:'',
      login:true,
      loginForm:{
       username:'',
       password:''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  // components:{
  //   User,
  //   Lock
  // },
  setup() {
    return {
      User,
      Lock
    }
  },
  methods:{
    async goLogin(){
      if(this.login) {
        await this.$http.get(`/ma/login?username=${this.loginForm.username}&password=${this.loginForm.password}`).then(({data:res})=>{
          if(res.token) {
            window.sessionStorage.setItem('token',res.token)
            window.sessionStorage.setItem('info',JSON.stringify(res.data[0]))
            ElMessage({
              message: res.message,
              type: 'success',
              grouping:true,
              duration:1000
            })
            this.login = false
            setTimeout(()=>{
              this.$router.push("/home")
            },1100)
          }else {
            ElMessage({
              message: res.message == undefined ? '请输入账号和密码' : res.message,
              type: 'error',
              grouping:true
            })
          }
        }).catch(()=>{})
      }
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    }
  } 
}
</script>
  
<template>
  <div class="body">
    <div class="box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username"  placeholder="请输入用户名" :prefix-icon="User">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password"  placeholder="请输入登录密码" :prefix-icon="Lock" show-password>
          </el-input>
        </el-form-item>
      </el-form>
      <button type="submit" class="login" @click="goLogin">登录</button>
      <button type="submit" class="login" @click="resetLoginForm">重置</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.body {
    width: 100vw;
    height: 100vh;
    background: url("../assets/images/background.jpeg") fixed no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 240px;
    height: 220px;
    padding: 40px;
    background: inherit;
    z-index: 100;
    border-radius: 18px;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    .login, .register {
      margin: 6px 0;
      height: 36px;
      border: none;
      margin-top: 4px;
      background-color: rgba(57, 88, 69, 0.4);
      border-radius: 4px;
      padding: 0 14px;
      color: white;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: 0.4s;
    }
    .register {
      margin-top: 3px;
    }
    button:hover {
      background-color: rgba(12, 80, 38, 0.67);
    }
    button::before,button::after {
      content: "";
      display: block;
      width: 80px;
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      opacity: 0.5;
      position: absolute;
      top: 0;
      right: 0;
      transform: skewX(15deg);
      filter: blur(30px);
      overflow: hidden;
      transform: translateX(100px);
    }
    button::after {
      width: 40px;
      background: rgba(179, 255, 210, 0.3);
      right: -60px;
      opacity: 0;
      filter: blur(5px);
    }
    button:hover::before {
      transition: 1s;
      transform: translateX(-300px);
      opacity: 0.7;
    }
    button:hover::after {
      transition: 1s;
      transform: translateX(-300px);
      opacity: 1;
    }
}
.box::before {
    content: "";
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    position: absolute;
    background: inherit;
    top: -10px;
    left: -10px;
    overflow: hidden;
    box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
    filter: blur(6px);
    z-index: -1;
}
</style>



