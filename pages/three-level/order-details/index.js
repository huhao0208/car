// pages/my/index.js
import {confirmReceipt} from "../../../api"

const app = getApp()

let fpage =''  // 上一个页面

Page({

  /**
   * 页面的初始数据
   */
  data: {},
  // 去商品详情
  goodsDetail(){
    let url = `/pages/three-level/good-details/index?productType=${this.data.type}&id=${this.data.proId}`
    wx.navigateTo({
      url
    })
  },

  // 确认收货
  confireBtn(){
    if(this.data.state < 3) return
    fpage = getCurrentPages().slice(-1)[0]
    confirmReceipt({id:this.data.id})
    .then(res=>{
      // 刷新上一页数据

      fpage.onLoad()
     wx.navigateBack({
        delta: 1
      });
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'请稍候...'
    })
   // 获取上一页数据 order.js
    let pages = getCurrentPages()
    let fpage = pages[pages.length-2]
    // console.log(fpage.data.listData)
    // let res = ''
    // fpage.data.listData.forEach(item=>{
    
    //   if(item instanceof Array ){
    //     res =item.find(obj=>obj.id == options.orderId)
    //   //  console.log(res)
    //   }
    // if(res) return res
   
    
    // })

    let result = fpage.data.currentData 

    this.setData({
      ...result
    },_=>{
      wx.hideLoading()
    })
    wx.setNavigationBarTitle({
      title:res.type==1?'订单详情':'众筹详情'
    })
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //
  // }
})
