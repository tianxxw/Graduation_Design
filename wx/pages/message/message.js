// pages/message/message.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  toShowAddress() {
    wx.choosePoi({
      success:(res)=>{
        console.log(res);
      },
      fail:(res)=>{
        console.log(res);
      }
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
    wx.setStorage({
      key:'key',
      data:1,
      encrypt:true,
      success(rx) {
        console.log(rx);
        wx.getStorage({
          key:'key',
          encrypt:true,
          success(res) {
            console.log(res.data.user);
          }
        })
      }
    })
  },
  getSage(){
    this.setData({
      userinfo:app.globalData
    })
    wx.getStorage({
      key:'key',
      success:(res) =>{
        console.log(res.data);
      }
    }) 
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

  }
})