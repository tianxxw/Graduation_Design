// pages/info/info.js
var app = getApp()
const url = app.globalData.httpurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    info:[],
    price:'',
    state:0,
    xsprice:'',
    position:'选择收货地址'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
      eventChannel.emit('someEvent', {data: 'test'});
      // 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
      eventChannel.on('acceptDataFromOpenerPage', (data)=> {
        console.log(data)
        wx.nextTick(()=>{
          this.setData({
            list:data.data,
            price:data.price,
            xsprice:(data.price/100).toFixed(2)
          })
        })
      })
  },
  getPosition() {
     let vm = this
     wx.chooseAddress({
      success: (res)=> {
        console.log(res);
        let pst = (res.provinceName== undefined ? '': res.provinceName) + ' ' + (res.cityName == undefined ? '' : res.cityName) + ' '+ (res.countyName == undefined ? '' : res.countyName) + ' ' + (res.streetName == undefined ? '' : res.streetName)
         vm.setData({
           info:res,
           position:pst
         })
      },fail:(res)=>{
        console.log(res);
      }
    })
  },
  getOrder() {
    // console.log(this.data.info);
    let vm = this
    if(this.data.info.length != 0) {
      wx.showModal({
        title: '提示',
        content: '你确认下单吗',
        success (res) {
          if (res.confirm) {
            vm.setData({
              state:1
            })
            vm.postInfo()
          } else if (res.cancel) {
            vm.postInfo()
          }
        }
      })
    }else {
      wx.showToast({
        title:'请选择收货地址',
        icon:'error',
        duration:2000
      })
    }
  },
  postInfo() {
    wx.getStorage({
      key:'session_key',
      success:(res)=>{
        wx.request({
          url:url+ '/api/postOrder',
          method:'POST',
          data:{
             info:this.data.info,
             list:this.data.list,
             state:this.data.state,
             allprice:this.data.xsprice,
             session_key:res.data
          },
          success:(res)=>{
            if(this.data.state == 0) {
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }else {
              wx.reLaunch({
                url: '/pages/jump/jump'
              })
            }
          }
        })
      }
    })
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