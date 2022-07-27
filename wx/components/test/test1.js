// components/test/test1.js
var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    vTitle: {
      type: String,
      value: ""
    },
    isSearch:{
      type: Boolean,
      value: false
    },
    nav1:{
      type:Object,
      value:{
        navHeight:0,
        navTop:0,
        navObj:0,
        navObjWid:0,
        navBottom:0
      }
    },
    regions:{
      type:Object,
      value:{
        city:'',
        province:'选择你的位置',
      }
    },
    num:Number
  },


  /**
   * 组件的初始数据
   */
  data: {
    region:[],
    province:'选择你的位置',
    city:''
  },
  created:function() {
    this.properties.regions.city = app.globalData.city
    this.properties.regions.province = app.globalData.province
    log
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // getUserProvince(e) {
    //   wx.showLoading({
    //     title:'数据加载中...'
    //   })
    //   wx.choosePoi({
    //     success(res) {
    //       // console.log(res.address);
    //       console.log(res, '成功回调')
    //     },
    //     fail(res) {
    //       // console.log(res.address);
    //       console.log(res, '失败回调')
    //     },
    //     complete(res) {
    //       // console.log(res.address);
    //       console.log(res, '结束回调')
    //     }
    //   }) 
    //   this.setData({
    //     region:e.detail.value,
    //     checkout:false
    //   })
    //   wx.hideLoading()
    // }
  },
  lifetimes:{
      // attached(){
      //   const query = wx.createSelectorQuery().in(this)
      //   const queryy = query.select("#nav1Top")
      //   queryy.boundingClientRect(function(res) {
      //     console.log(res.height);
      //   }).exec()
      // },
      // ready:function() {
      // }
  }

})
