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
        id:0,
        title:'待付款',
        avatarUrl:'../../static/myself/receivedOrder'
      },
      {
        id:1,
        title:'已下单',
        avatarUrl:'../../static/myself/toBeSettled'
      },
      {
        id:2,
        title:'已发货',
        avatarUrl:'../../static/myself/settled'
      },
      {
        id:3,
        title:'已收货',
        avatarUrl:'../../static/myself/evaluate'
      },
      {
        id:4,
        title:'售后/退款',
        avatarUrl:'../../static/myself/receivedOrder'
      }
    ],
  },
  // 事件处理函数
  getLogin(){
    console.log(this.data.userInfo.name != "点此登录");
    // console.log(this.data.userInfo.avatar == undefined);
    if(this.data.userInfo.name == '点此登录') {
      wx.navigateTo({
        url:'/pages/login/login'
      })
    }else {
      this.goUpdataInfo()
    }
  },
  goOrderList(e) {
    if(this.data.userInfo.name != '点此登录') {
      if(e.currentTarget.dataset.state <= 3) {
        wx.navigateTo({
          url:'/pages/order/order',
          success:(res)=>{
            res.eventChannel.emit('acceptDataFromOpenerPage', { state: e.currentTarget.dataset.state })
          }
        })
      } 
    }
  },
  goAllOrderList() {
    if(this.data.userInfo.name != '点此登录') {
      wx.navigateTo({
        url:'/pages/order/order',
        success:(res)=>{
          res.eventChannel.emit('acceptDataFromOpenerPage', { state: 1 })
        }
      })
    }
  },
  goUpdataInfo() {
    var vm = this
    wx.checkSession({
      success:()=>{
        wx.getStorage({
          key:'session_key',
          success:(res)=>{
            wx.navigateTo({
              url:'/pages/updataInfo/updataInfo'
            })
          },
          fail:(res)=>{
            wx.showModal({
              title: '提示',
              content: '你尚未登录，是否前往登录',
              success:(res)=>{
                if(res.confirm) {
                  wx.redirectTo({
                    url:'/pages/login/login'
                  })
                }else if(res.cancel) {
                  
                }
              },
            })
          }
        })
      },
      fail:(res)=>{
        wx.showModal({
          title: '提示',
          content: '你尚未登录，是否前往登录',
          success:(res)=>{
            if(res.confirm) {
              wx.redirectTo({
                url:'/pages/login/login'
              })
            }else if(res.cancel) {
              
            }
          }
        })
      }
    })
  },
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
      }
    })
  },

  onReady() {
    
  },
  onShow(){
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
      }
    })
  },
  onPullDownRefresh: function () {

  },
})
