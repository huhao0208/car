// pages/home/index.js
import {jump} from "../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bacImg:'http://img1.imgtn.bdimg.com/it/u=3695285348,438586739&fm=26&gp=0.jpg',
    showLogin:true
  },

  handlerSearchClick(){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  jumpHandle(){
    jump('/pages/test/index')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData,'globalData')
    console.log(app.isLogin(),'isLogin')
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
  onShareAppMessage: function () {

  }
})
