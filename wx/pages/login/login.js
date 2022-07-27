// pages/login/login.js
var app = getApp()
const url = app.globalData.httpurl
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');//引入SDK文件
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    qqmapsdk = new QQMapWX({
      key: 'XY2BZ-KZP6F-ACUJB-JXR3B-LXRNV-LGFSA' //换成你自己申请的key秘钥
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getLogin(){
    let vm = this;
    wx.showLoading({
      title:'正在登录...'
    })
    wx.login({
      success: (res) => {
        this.setData({
          codeId:res.code
        })
        if (res.code) {
          //发起网络请求
          wx.request({
            method:'post',
            url: url + '/login/login',
            data: {
              code: this.data.codeId
            },
            success:(res)=>{
              console.log(res.data);
              console.log(res.data.session_key);
              wx.setStorage({
                key:'info',
                data:JSON.stringify(res.data.info[0])
              })
              wx.setStorage({
                key:'session_key',
                data:JSON.stringify(res.data.session_key)
              })
              wx
              wx.hideLoading({
                success:(res)=>{
                  wx.showToast({
                    title:'登录成功！',
                    success:(res)=>{
                      wx.getStorage({
                        key:'session_key',
                        success:(res)=>{
                          vm.getUserLocation();
                          console.log('session_key:',res.data);
                        }
                      })
                    }
                  })
                }
              })
            },
            fail:(res)=>{
              console.log(res);
              wx.showToast({
                title:'登录失败！'+ res.errMsg,
                success:(res)=>{
                  wx.getStorage({
                    key:'session_key',
                    success:(res)=>{
                      vm.getUserLocation();
                      console.log('session_key:',res.data);
                    }
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
    }  
  })
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) 
        {//如果没有授权就提示需要授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000,
                        success:(res)=>{
                          wx.showLoading({
                            title:"位置获取中"
                          })
                        }
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
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
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        vm.setData({
          province:res.result.ad_info.province,
          city:res.result.ad_info.city
        })
        app.globalData.province = res.result.ad_info.province
        app.globalData.city = res.result.ad_info.city
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
  }
})