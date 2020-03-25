// pages/my/index.js
import { jump } from "../../../utils/util";

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[1,1,1,1,1,1,1],
    status:2,     // 订单状态
  },
  login(){
    jump('/pages/login/index')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log( app.globalData)
    this.setData({
      imgUrl: app.globalData.imgUrl,
      userName:  app.globalData.userInfo.trueName,
      userHead:  app.globalData.userInfo.head
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
    console.log('触底了')
    console.log(this.data.listData)
    this.setData({
      [`listData[${this.data.listData.length}]`]: this.data.listData.length,
      [`listData[${this.data.listData.length+1}]`]: this.data.listData.length+1,
      [`listData[${this.data.listData.length+2}]`]: this.data.listData.length+2,
      [`listData[${this.data.listData.length+3}]`]: this.data.listData.length+3,
      [`listData[${this.data.listData.length+4}]`]: this.data.listData.length+4,
      [`listData[${this.data.listData.length+5}]`]: this.data.listData.length+5
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
