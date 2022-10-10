// pages/search/search.js
var app = getApp()
const url = app.globalData.httpurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    value:'',
    page:1
  },
  onSearch(e) {
    this.setData({
      value: e.detail,
    });
    this.getSearch()
  },
  getSearch() {
    wx.showLoading({
      title:'数据加载中...'
    })
    wx.request({
      url:url + '/api/search',
      method:'POST',
      data:{
        name:this.data.value,
        page:this.data.page * 10
      },
      success:(res)=>{
        console.log(res.data.data);
        if(res.data.message == '添加搜索成功') {
          this.setData({
            list:res.data.data
          })
        }else {
          this.setData({
            list:[]
          })
        }
        wx.hideLoading()
      }
    })
  },
  goDetail(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url:'/pages/detail/detail',
      success:(res)=>{
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.currentTarget.dataset.id })
      }
    })
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