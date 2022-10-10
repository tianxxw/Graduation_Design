// pages/detail/detail.js
const app = getApp()
const url = app.globalData.httpurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:11,
    num:1,
    good:'',
    number:0
  },
  AddToCart(e,k){
    var vm = this
    console.log(k);
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
                wx.showToast({
                  title: '添加成功',
                  icon: 'success',
                  duration: 2000                
                })
                this.setData({
                  number:1
                })
                if(k) {
                  wx.switchTab({
                    url: '/pages/shop/shop',
                  })
                }
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
  onSubmit(e) {
    // if(this.data.sendData.length == 0) {
    //   wx.showToast({
    //     title:'请选择商品',
    //     icon:'error',
    //     duration:2000
    //   })
    // }else {
    //   wx.navigateTo({
    //     url: '/pages/info/info',
    //     success: (res)=> {
    //       // 通过 eventChannel 向被打开页面传送数据
    //       res.eventChannel.emit('acceptDataFromOpenerPage', { data: this.data.sendData ,price:this.data.price})
    //     }
    //   })
    // }
    if(this.data.number != 1) {
      this.AddToCart(e,1)
    }
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let vm = this
    const eventChannel = this.getOpenerEventChannel()
    if(eventChannel.on == undefined) {
      
    }else {
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        console.log(data);
        vm.setData({
          id:data.data
        })
      })
    }
    wx.request({
      url: url + '/api/good2',
      method:'GET',
      data:{
        id:this.data.id
      },
      success:(res)=>{
        console.log(res);
        this.setData({
          good:res.data.data[0]
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