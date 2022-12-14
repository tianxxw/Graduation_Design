// pages/shop/shop.js
var app = getApp()
const url = app.globalData.httpurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    load1:true,
    checkedAll:false,
    result:[],
    price:0,
    sendData:[]
  },
  onChangeAll(event){
    console.log('2222');
    console.log(event.detail);
    this.setData({
      checkedAll:event.detail
    })
    let k = this.data.goodsList.every(item =>{
      return this.data.result.includes(item.good_id + '')
    })
    let arr = []
    let arr2 = []
    //按钮没有全选时为FALSE，全选了为true
    if(k) {
      this.setData({
        result:[]
      })
      this.onChange(arr,true)
    }
    else {
      this.data.goodsList.map(item=>{
        arr =  [...arr,item.good_id + '']
        arr2 = [...arr2,item]
      })
      this.setData({
        result:arr,
        sendData:arr2
      })
      this.onChange(arr,true)
    }
  },
  onChange(event,all = false) {
    // console.log(all);
    // console.log('change');
    console.log(event);
    // console.log(event.detail);
    // console.log(this.data.result);
    // console.log(typeof event.detail);
    let idlist = event.detail ? event.detail : event
    console.log(idlist);
    let arr = this.data.goodsList
    let prop = 0

    if(event.detail) {
      let arr2 = []
      console.log(2);
      for(let i = 0;i<idlist.length;i++) {
        this.data.goodsList.forEach(item=>{
          if(item.commodity_id == idlist[i]) {
            arr2 = [...arr2,item]
          }
        }) 
      }
     this.setData({
      result:event.detail ? event.detail : event,
      sendData:arr2
    })
    }
    else {
      // console.log('xxxxxxxxxxxxxxx');
      if(all) {
        // console.log(idlist.length);
        // console.log(arr.length);
        // console.log(this.data.result);
        if(idlist.length < arr.length && idlist.length >= 1) {
          // console.log('kkkkkkkkkkkkkkkk');
          let arr1 = []
          let arr2 = []
          this.data.goodsList.forEach(item=>{
             arr1 = [...arr1,item.good_id + '']
             arr2 = [...arr2,item]
          })
          // console.log(arr1);
          this.setData({
            result:arr1,
            sendData:arr2
          })
        }  
      }
    }
    // console.log(this.data.result);
    arr.forEach((item1,index)=>{
      // console.log(item1);
      // console.log('price');
      console.log(idlist.length);
      if(idlist.length != 0) {
        idlist.forEach(item2=>{
          // console.log(item2);
          if(item1.commodity_id == item2){
            // prop = [...prop,parseFloat((item1.commodity_price * item1.number)*100)]
            // console.log(prop);
            prop = prop + parseFloat((item1.commodity_price * item1.number)*100)
          }
        })
        console.log(idlist.length == this.data.goodsList.length);
        if(idlist.length == this.data.goodsList.length) {
          this.setData({
            checkedAll:true
          })
        }else {
          this.setData({
            checkedAll:false
          })
        }
      }
      else {
        // console.log('2');
        if(all) {
          // console.log('kxs');
          prop = 0
        }
        this.setData({
          checkedAll:false
        })
      }
      this.setData({
        price:prop,
      })
    })
  },
  onClick(event){
  },
  onPlus(e){
    console.log(e);
    let that = this
    let list = e.currentTarget.dataset.number
    let good_id = e.currentTarget.dataset.number.good_id
    list.number ++
    // console.log(list.commodity_id);
    let goodlist = this.data.goodsList
    goodlist.forEach((item,index)=>{
      // console.log(item);
      if(item.commodity_id == list.commodity_id) {
        // console.log(index);
        goodlist[index] = undefined
        let k = goodlist[index]
        // console.log(goodlist[index]);
        goodlist[index] = list 
        // console.log(goodlist[index]);
        this.setData({
          k:goodlist
        })
        wx.request({
          url:url + '/api/shop3',
          method:'post',
          data:{
            number:goodlist[index].number,
            price:goodlist[index].commodity_price,
            id:goodlist[index].id
          },
          success:(res)=>{
            this.data.result.forEach(item=>{
              if(item == good_id) {
                console.log();
                // that.onChange((good_id + '').split(','))
                that.onChange(this.data.result)
              }
            })
          },
          fail:(res)=>{
            console.log(res);
          }
        })
      }
    })
  },
  onMinus(e){
    let list = e.currentTarget.dataset.number
    let that = this
    let good_id = e.currentTarget.dataset.number.good_id
    list.number = list.number - 1
    let goodlist = this.data.goodsList
    goodlist.forEach((item,index)=>{
      if(item.commodity_id == list.commodity_id) {
        goodlist[index] = undefined
        let k = goodlist[index]
        goodlist[index] = list 
        this.setData({
          k:goodlist
        })
        console.log(goodlist[index].number);
        wx.request({
          url:url + '/api/shop3',
          method:'post',
          data:{
            number:goodlist[index].number,
            price:goodlist[index].commodity_price,
            id:goodlist[index].id
          },
          success:(res)=>{
            console.log(res);
            this.data.result.forEach(item=>{
              if(item == good_id) {
                console.log();
                that.onChange(this.data.result)
              }
            })
          },
          fail:(res)=>{
            console.log(res);
          }
        })
      }
    })
  },
  check1() {
      this.setData({
        load1:false
    })
  },
  check2() {
    this.setData({
      load1:true
  })
  },
  getGoods() {
    wx.getStorage({
      key:'session_key',
      success:(res)=>{
        // console.log(res.data);
        wx.request({
          url: url + '/api/shop2',
          method:'GET',
          data:{
            session_key:res.data
          },
          success:(res)=>{
            console.log(res);
            if(res.data.message != "获取失败!") {
              this.setData({
                goodsList:res.data.data
              })
              wx.hideLoading()
            }else {
              this.setData({
                goodsList:[],
                price:0,
                checkedAll:false
              })
              wx.hideLoading()
            }
          }
        })
      }
    })
  },
  onSubmit() {
    if(this.data.sendData.length == 0) {
      wx.showToast({
        title:'请选择商品',
        icon:'error',
        duration:2000
      })
    }else {
      wx.navigateTo({
        url: '/pages/info/info',
        success: (res)=> {
          // 通过 eventChannel 向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: this.data.sendData ,price:this.data.price})
        }
      })
    }
  },
  deleteGood() {
    if(this.data.result.length>0) {
      let vm = this
      wx.request({
        url:url + '/api/deleteShopGoods',
        method:'post',
        data:{
          id:this.data.result
        },
        success:(res)=>{
          console.log(1);
          vm.setData({
            load1:true,
            result:[],
            sendData:[]
          })
          vm.getGoods()
        },
        fail:(res)=>{
          console.log(2);
          vm.getGoods()
          vm.onChange()
        }
      })
    }else {
      wx.showToast({
        title:'请选择商品后再进行操作',
        icon:'error',
        duration:2000
      })
    }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getGoods()
    if(this.data.goodsList.length != this.data.result.length) {
      this.setData({
        checkedAll:false
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
  onClose(event) {
    const {position,instance} = event.detail;
    switch(position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialoog.confirm({
          message:'确定删除吗?',
        }).then(()=>{
          instance.close();
        })
        break;
    }
  } 
})