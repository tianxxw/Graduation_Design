// pages/order/order.js
var app = getApp()
const url = app.globalData.httpurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'',
    kpstate:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onChange(e) {
    this.setData({
      state:e.detail.index
    })
    wx.setStorage({
      key:'state',
      data:this.data.state
    })
    this.getOrder()
  },
  getOrder() {
    if(this.data.state < 2) {
      wx.getStorage({
        key:'session_key',
        success:(res)=>{
          wx.request({
            method:'GET',
            url:url+ '/api/getOrder',
            data:{
               state:this.data.state,
               session_key:res.data
            },
            success:(res)=>{
              if(res.data.result == undefined) {
                this.setData({
                  list:[]
                })
              }else {
                this.setData({
                  list:res.data.result
                })
              }
            }
          })
        }
      })
    }else if(this.data.state == 3) {
      wx.getStorage({
        key:'session_key',
        success:(res)=>{
          wx.request({
            method:'GET',
            url:url+ '/api/getOrder',
            data:{
               state:this.data.state - 1,
               session_key:res.data
            },
            success:(res)=>{
              if(res.data.result == undefined) {
                this.setData({
                  list:[]
                })
              }else {
                this.setData({
                  list:res.data.result
                })
              }
            }
          })
        }
      })
    }else if(this.data.state == 2){
     this.getInOrder2()
    }
  },
  getInOrder() {
    wx.getStorage({
      key:'session_key',
      success:(res)=>{
        wx.request({
          method:'GET',
          url:url+ '/api/getInOrder',
          data:{
             state:this.data.state,
             session_key:res.data
          },
          success:(res)=>{
            if(res.data.result == undefined) {
              this.setData({
                list:[]
              })
            }else {
              this.setData({
                list:res.data.result
              })
            }
          }
        })
      }
    })
  },
  getInOrder2() {
    wx.getStorage({
      key:'session_key',
      success:(res)=>{
        wx.request({
          method:'GET',
          url:url+ '/api/getInOrder2',
          data:{
             instate:this.data.kpstate,
             session_key:res.data
          },
          success:(res)=>{
            console.log(res);
            if(res.data.result == undefined) {
              this.setData({
                list:[]
              })
            }else {
              this.setData({
                list:res.data.result
              })
            }
          }
        })
      }
    })
  },
  getInOrder3(e) {
    console.log(e.currentTarget.dataset.order_number);
    wx.getStorage({
      key:'session_key',
      success:(res)=>{
        wx.request({
          method:'GET',
          url:url+ '/api/getInOrder3',
          data:{
            order_number:e.currentTarget.dataset.order_number
          },
          success:(res)=>{
            this.getOrder()
          }
        })
      }
    })
  },
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    wx.getStorage({
      key:'state',
      success:(res)=>{
        this.setData({
          state:res.data
        })
      }
    })
    let vm = this
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data);
      vm.setData({
        state:data.state
      })
      wx.setStorage({
        key:'state',
        data:vm.data.state
      })
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getOrder()
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
    wx.removeStorage({
      key:'state',
    })
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