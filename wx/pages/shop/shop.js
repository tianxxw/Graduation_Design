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
    price:0
  },
  onChangeAll(event){
    this.setData({
      checkedAll:event.detail
    })
    let k = this.data.goodsList.every(item =>{
      return this.data.result.includes(item.good_id + '')
    })
    let arr = []
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
      })
      this.setData({
        result:arr
      })
      this.onChange(arr,true)
    }
    console.log(this.data.result);
  },
  onChange(event,all = false) {
    console.log(all);
    console.log('change');
    console.log(event);
    console.log(event.detail);
    console.log(this.data.result);
    // console.log(typeof event.detail);
    let idlist = event.detail ? event.detail : event
    console.log(idlist);
    let arr = this.data.goodsList
    let prop = 0
    if(event.detail) {
      this.setData({
        result:event.detail ? event.detail : event,
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
          this.data.goodsList.forEach(item=>{
             arr1 = [...arr1,item.good_id + '']
          })
          console.log(arr1);
          this.setData({
            result:arr1
          })
        }  
      }
    }
    console.log(this.data.result);
    arr.forEach((item1,index)=>{
      console.log(item1);
      // console.log('price');
      // console.log(idlist.length);
      if(idlist.length != 0) {
        idlist.forEach(item2=>{
          console.log(item2);
          if(item1.commodity_id == item2){
            // prop = [...prop,parseFloat((item1.commodity_price * item1.number)*100)]
            console.log(prop);
            prop = prop + parseFloat((item1.commodity_price * item1.number)*100)
            console.log('prop   '+prop);
          }
        })
        if(idlist.length == 4) {
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
        console.log('2');
        if(all) {
          console.log('kxs');
          prop = 0
        }
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
            shop_cart_id:goodlist[index].shop_cart_id
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
            shop_cart_id:goodlist[index].shop_cart_id
          },
          success:(res)=>{
            console.log(1);
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
            this.setData({
              goodsList:res.data.data
            })
          }
        })
      }
    })
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
    this.getGoods()
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