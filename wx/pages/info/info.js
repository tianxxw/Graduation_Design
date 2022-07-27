// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:1,
    flag1:1,
    info:[],
    num:1,
    url:'',
    option0:[
      {text:'离我最近',value:'a'},
      {text:'最新发布',value:'b'}
    ],
    option1:[
      {text:'线上',value:0},
      {text:'线下',value:1},
      {text:'线上线下',value:2}
    ],
    option2:[
      {text:'其他',value:'A'},
      {text:'摄影',value:'B'},
      {text:'旅行',value:'C'},
      {text:'游戏陪玩',value:'D'},
      {text:'好物推荐',value:'E'}
    ],
    value1:0,
    value0:'a',
    value2:'A',
    conTain:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title:'数据加载中...'
    })
    if(this.data.flag) {
      this.data.flag = 0
      wx.request({
        method:'get',
        url:'http://119.29.141.196/getAllReleases',
        data:{
          num:this.data.num
        },
        success:(res)=>{
          this.setData({
            info:res.data.reverse(),
            flag:1,
            num:this.data.num +1
          })
          wx.hideLoading()
        },
        fail:(res)=>{
          wx.hideLoading()
        }
      })
    }
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
    wx.showLoading({
      title:'数据加载中...'
    })
    if(this.data.flag) {
      this.data.flag1 = 0
      wx.request({
        method:'get',
        url:'http://119.29.141.196/getAllReleases',
        data:{
          num:this.data.num
        },
        success:(res)=>{
          this.setData({
            info:res.data.reverse(),
            flag1:1,
            num:this.data.num +1
          })
          wx.hideLoading()
        },
        fail:(res)=>{
          wx.hideLoading()
        }
      })
    }
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
    wx.showLoading({
      title:'数据加载中...'
    })
    if(this.data.flag) {
      this.data.flag = 0
      wx.request({
        method:'get',
        url:'http://119.29.141.196/getAllReleases',
        data:{
          num:this.data.num
        },
        success:(res)=>{
          this.setData({
            info:res.data.reverse(),
            flag:1,
            num:this.data.num +1
          })
          wx.hideLoading()
        },
        fail:(res)=>{
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    wx.showLoading({
      title:'数据加载中...'
    })
    wx.request({
      method:'get',
      url:'http://119.29.141.196/getAllReleases',
      data:{
        num:this.data.num
      },
      success:(res)=>{
        this.setData({
          info:[...this.data.info.reverse(),...res.data].reverse(),
          num:this.data.num + 1
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})