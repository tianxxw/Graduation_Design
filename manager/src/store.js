import { createApp } from "vue";
import { createStore } from "vuex";
import App from './App.vue'

//创建一个新的store实例
const store = createStore({
 state () {
  return {
   count:0
  }
 },
 mutations:{
  increment (state) {
   state.count++
  }
 }
})

export default store