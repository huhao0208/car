// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexSwiperData: [
      {
        id: 1,
        url: 'http://img5.imgtn.bdimg.com/it/u=1699290070,1429634299&fm=26&gp=0.jpg'
      }, {
        id: 2,
        url: 'http://img3.imgtn.bdimg.com/it/u=1075925060,2199011497&fm=11&gp=0.jpg'
      }
    ], //轮播图数据
    swiperActive: 0,
    tabActive: 0,
  },
  swiperChange(e){
    this.setData({
      swiperActive:e.detail.current,
    })
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
