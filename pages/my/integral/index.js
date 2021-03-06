// pages/my/Integral/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
   isDev:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.isDev) this.setData({
            isDev:true
          })

      let fpage = getCurrentPages().slice(-2)[0]
      console.log(fpage.data);
      let type = options.type || ''
      let title = type=='vip'?fpage.data.integralRule.useRuleTitle:fpage.data.integralRule.ruleTitle
      let content = type=='vip'? fpage.data.integralRule.useRuleContent: fpage.data.integralRule.ruleContent
      content= content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ') 

      this.setData({content})

      wx.setNavigationBarTitle({title})
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