import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import store from './store'
const app = createApp(App)
axios.defaults.baseURL = 'http://127.0.0.1:3007'
app.config.globalProperties.$http = axios

app.use(router)
app.use(store)
// app.use(
//  new VueSocketIO({
//   debug:true,
//   connection:'http://127.0.0.1:3007',
//   options:{
//    //创建时是否自动连接
//    autoConnect:false, 
//    //路径（默认值：/socket.io/）
//    // path:"/my-app/" ,
//    //目前有两种传输方式：HTTP long-polling（简称polling）、webSocket
//    // transports:['polling'],
//    //附加请求头（在服务器端的socket.handshake.headers对象中找到）
//    // extraHeaders:{},
//   },
//   // vuex:{
//   //  store,
//   //  actionPrefix:'SOCKET_',
//   //  mutationPrefix:'SOCKET_'
//   // }
// }))
app.mount('#app')
