// index.js
// 获取应用实例
const app = getApp()
const url = app.globalData.httpurl
Page({
  data: {
    userInfo: {
      name:'点此登录',
      avatar:''
    },
    codeId:{},
    userInfoServe:{
      token:''
    },
    myHelp:[
      {
        id:1,
        title:'已下单',
        avatarUrl:'../../static/myself/receivedOrder'
      },
      {
        id:2,
        title:'待结算',
        avatarUrl:'../../static/myself/toBeSettled'
      },
      {
        id:3,
        title:'已完成',
        avatarUrl:'../../static/myself/settled'
      },
      {
        id:4,
        title:'评价',
        avatarUrl:'../../static/myself/evaluate'
      },
      {
        id:5,
        title:'售后/退款',
        avatarUrl:'../../static/myself/receivedOrder'
      }
    ],
  },
  // 事件处理函数
  onLoad() {
    wx.getStorage({
      key:'info',
      success:(res)=>{
        var info = JSON.parse(res.data)
        this.setData({
          'userInfo.name':info.name,
          'userInfo.avatar':info.avatar
        })
      },
      fail:(res)=>{
        this.getLogin()
      }
    })
  },

  onReady() {
    
  },
  getLogin(){
    wx.navigateTo({
      url:'/pages/login/login'
    })
  },
  onPullDownRefresh: function () {

  },
})
