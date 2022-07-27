// pages/home/home.js
var app = getApp()
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const url = app.globalData.httpurl
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');//引入SDK文件
var qqmapsdk;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
     imaurl:["../../static/t1.png","../../static/t2.png","../../static/t3.png"],
     nav:{
      navHeight:0,
      navTop:0,
      navObj:0,
      navObjWid:0,
      navBottom:0
     },
     activeKey: 0,
     goodsList:[],
     show:false,
     good:'',
     num:1,
     price:'',
     changeprice:'',
     province: '',
     city: '',
     latitude: '',
     longitude: '',
     region:{
       city:'',
       province:'选择你的位置'
     },
     checkout:1
  },
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(2);
        // console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
      }
    })
  },
  getLocal: function (latitude, longitude) {
    console.log(3);
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(4);
        app.globalData.province = res.result.ad_info.province
        app.globalData.city = res.result.ad_info.city
        vm.setData({
          'region.province':res.result.ad_info.province,
          'region.city':res.result.ad_info.city
        })
        wx.switchTab({
          url: '/pages/home/home',
        })     
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
        wx.hideLoading({
          title:'获取位置信息成功！'
        })
      }
    });
  },
  onChange(event) {
    Notify({ type: 'primary', message: event.detail });
    this.setData({
      activeKey:event.detail
    })
  },
  onSearch() {
    wx.request({
      url:'http://127',
      method:'GET',
      data:{
        name:'zs',
        age:22
      }
    })
  },
  gotoSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  getGoods() {
    wx.request({
      // url:'http://127.0.0.1:3007/api/good1',
      url:url + '/api/good1',
      method:'GET',
      success:(res)=>{
        this.setData({
          goodsList:res.data.data
        })
      }
    })
  },
  goshop(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.id);
  },
  getDD(e){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     'nav.navHeight': app.globalData.navHeight,
     'nav.navTop': app.globalData.navTop,
     'nav.navObj': app.globalData.navObj,
     'nav.navObjWid': app.globalData.navObjWid,
     'nav.navBottom':app.globalData.navBottom,
     'region.city':app.globalData.city,
     'region.province':app.globalData.province
   })
   this.getGoods() 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    qqmapsdk = new QQMapWX({
      key: 'XY2BZ-KZP6F-ACUJB-JXR3B-LXRNV-LGFSA' //换成你自己申请的key秘钥
    });
    wx.checkSession({
      success:()=>{
        console.log(1);
        this.getLocation()
      },
      fail:()=>{
         wx.clearStorage({
           complete:(res)=>{
             console.log('本地缓存已清除');
           }
         })
         wx.showModal({
           title:'提示',
           content:'登录状态已过期，是否重新登录',
           success:(res)=>{
             if(res.confirm) {
               wx.navigateTo({
                 url:'/pages/login/login',
                 success:(res)=>{

                 }
               })
             }else {
                console.log('用户点击取消');
             }
           }
         })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

    this.getLocation()
    this.getRegion()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  getRegion(){
    this.setData({
      'region.city':app.globalData.city,
      'region.province':app.globalData.province
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showPopup(e) {
    this.setData({show:true})
    wx.request({
      url:url + '/api/good2',
      method:'GET',
      data:{id:e.currentTarget.dataset.id},
      success:(res)=>{
        console.log(res.data);
        console.log(res.data.data);
        this.setData({
         good:res.data.data[0],
         price:res.data.data[0].commodity_price,
         changeprice:res.data.data[0].commodity_price
        })
      }
    })
  },
  NumReduce(e){
    if(this.data.num == 1) {
      return true
    }
    this.setData({
      num:this.data.num-1,
      price:parseFloat((this.data.price - e.currentTarget.dataset.price).toFixed(1))
    })
  },
  NumAdd(e){
    if(this.data.num == 99) {
      return true
    }
    this.setData({
      num:this.data.num+1,
      price:parseFloat((this.data.price + e.currentTarget.dataset.price).toFixed(1))
    })
  },
  onClose() {
    this.setData({
      show:false,
      num:1
    })
    this.price()
  },
  input(e) {
    this.setData({
      num:e.detail.value == '' ? 0 : parseInt(e.detail.value)
    })
    this.price()
  },
  confirm(e){
    this.setData({
      num:parseInt(e.detail.value)
    })
    this.price()
  },
  price(){
    this.setData({
      price:parseFloat(( this.data.changeprice * this.data.num).toFixed(1))
    })
  },
  AddToCart(e){
    var vm = this
    wx.checkSession({
      success:()=>{
        wx.getStorage({
          key:'session_key',
          success:(res)=>{
            console.log(res.data);
            this.setData({
              'good.num':this.data.num,
              'good.session_key':res.data
            })
            wx.request({
              url:url + '/api/shop1',
              method:'POST',
              data:this.data.good,
              success:(res)=>{
                console.log(res);
                this.onClose()
                wx.showToast({
                  title: '添加成功',
                  icon: 'success',
                  duration: 2000                
                })
              },
              fail:(res)=>{
                console.log(1);
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
          fail:(res)=>{
            console.log(2);
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
        console.log(3);
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
})