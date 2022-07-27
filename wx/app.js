// app.js
let menuButtonObject = wx.getMenuButtonBoundingClientRect();
let navHight = 0;
var QQMapWX = require('./utils/qqmap-wx-jssdk.min');//引入SDK文件
var qqmapsdk;

App({
  data: {
    province: '',
    city: '',
    latitude: '',
    longitude: ''
  },
  onShow:function(options) {
    qqmapsdk = new QQMapWX({
      key: 'XY2BZ-KZP6F-ACUJB-JXR3B-LXRNV-LGFSA' //换成你自己申请的key秘钥
    });
  },
  onLaunch() {
    console.log(this.globalData);
    // 登录
//--------------------------------------------------------------------------------------
    wx.getSystemInfo({
      success: res => {
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width, // 胶囊按钮与右侧的距离 =     windowWidth - right+胶囊宽度
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight; //导航栏总体高度
        this.globalData.navTop = navTop; //胶囊距离顶部距离
        this.globalData.navObj = menuButtonObject.height; //胶囊高度
        this.globalData.navObjHead = navObjWid; //胶囊宽度(包括右边距离)
        this.globalData.navBottom = this.globalData.navObj-navTop
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  globalData: {
    userInfo: '',
    navHeight:0,
    navTop:0,
    navObj:0,
    navObjWid:0,
    navBottom:0,
    cookie:0,
    CodeId:0,
    httpurl:'http://127.0.0.1:3007',
    latitude:'',
    longitude:''
  },
  province:'',
  city:'',
  
})
