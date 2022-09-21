import { createRouter,createWebHistory } from "vue-router";



const router = createRouter({
 history:createWebHistory(),
 routes:[
  {path:'/login',name:'Login',component:()=>import("./components/Login.vue")},
  {path:'/',redirect:'/login'},
  {
   path:'/home',
   name:'Home',
   component:()=>import("./components/Home.vue"),
   children:[
    {path:'/dashboard',name:'Dashboard',component:()=>import("./components/Dashboard.vue")},
    {path:'/goods',name:'Goods',component:()=>import("./components/Goods.vue")},
    {path:'/order',name:'Order',component:()=>import("./components/Order.vue")},
    {path:'/user',name:'User',component:()=>import("./components/User.vue")},
    {path:'/chat',name:'Chat',component:()=>import("./components/Chat.vue")},
    {path:'/setting',name:'Setting',component:()=>import("./components/Setting.vue")}
   ],
   redirect:'/dashboard'
  }
 ]
})
router.beforeEach((to, from, next) => {
 if (to.path === '/login') return next()
 const tokenStr = window.sessionStorage.getItem('token')
 if (!tokenStr) return next('/login')
 next()
})

export default router