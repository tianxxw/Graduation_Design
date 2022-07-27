// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {id:1,username:'拿外卖'},
      {id:2,username:'网页设计'},
      {id:3,username:'代练王者巅峰赛2000分'},
      {id:4,username:'送水'},
      {id:5,username:'北京烤鸭急急急'},
      {id:6,username:'芳华苑买饭'},
    ]
  },
  gotoSearch() {
    console.log('xx');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title:'数据加载中...'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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

  }
})