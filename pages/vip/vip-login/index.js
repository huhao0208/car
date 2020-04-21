// 商品详情
const app = getApp()
import { getAdvertList } from "../../../api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    indexSwiperData: [], //轮播图数据
    swiperActive: 0,
    tabActive: 0,
    showLogin: false
  },
  swiperChange(e) {
    this.setData({
      swiperActive: e.detail.current,
    })
  },
  // 轮播图跳转
  swiperToDetail(e) {
    if(this.data.isDev) return
    app.isLogin(_ => {
      // 判断类型跳转对应页面 1 普通商品 2 众筹商品 3 金融贷款 4 汽车销售 5 合作商家
      let type = e.currentTarget.dataset.type
      let id = e.currentTarget.dataset.id
      // `/pages/three-level/good-details/index?productType=${type}&id=${e.currentTarget.dataset.id}`
      let url = (type == 1 || type == 2) ? `/pages/three-level/good-details/index?productType=${type}&id=${id}` : type == 3 ? '/pages/three-level/loan-details/index?id=' + id : type == 4 ? '/pages/three-level/car-details/index?id=' + id : type == 5 ? '/pages/three-level/cooperation-details/index?id=' + id : ''

      wx.navigateTo({
        url
      })

    })

  },


  // 获取轮播图数据
  getAdvertList() {
    getAdvertList({ type: 2 })
      .then(res => {
        this.setData({
          indexSwiperData: res.list
        })
      })
  },



  // 进入会员专区
  toVip() {
    // 先判断登录
    app.isLogin(_ => {
      // 如果是会员进入专区/pages/vip/index/index 不是去开通页面 pages/vip-code/index/index
      let userInfo = app.globalData.userInfo || wx.getStorageSync('userInfo')
      if (userInfo.vip) {
        wx.navigateTo({
          url: '/pages/vip/index/index'
        })
      } else {
        wx.switchTab({
          url: '/pages/vip-code/index/index'
        })
      }

    })
  },

  // 升级会员
  openVip(e) {

    let vipType = app.globalData.userInfo.vip || ''
    if (!vipType) {
      // 如果未登录或者没有vip 则只能点击第一个
      if (e.currentTarget.dataset.vip == 1) {
        app.isLogin(_ => {
          wx.switchTab({
            url: '/pages/vip-code/index/index'
          })
        })
      }
    } else {


      if (e.currentTarget.dataset.vip == vipType) {

        app.isLogin(_ => {
          wx.switchTab({
            url: '/pages/vip-code/index/index'
          })
        })
      }
    }

    // 如果未登录 或者没有vip 则青铜 显示立即sq

    // 如果登录了 则只能申请当前下一级会员 白银跟黄金只能联系客服 使用当前会员卡 
    return
    app.isLogin(_ => {

      wx.switchTab({
        url: '/pages/vip-code/index/index'
      })
    })
  },
  // 去众筹页面
  toZcDetail() {
    wx.navigateTo({
      url: '/pages/my/crowdfunding/index'
    })
  },


  // 此页面登录后触发
  hasLogin(e) {
    this.setData({
      isLogin: true,
      userInfo: e.detail
    })
  },
  toLogin() {
    app.isLogin()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdvertList()
    if(app.globalData.isDev){
      this.setData({
        isDev:true
      })
    }
    
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
    // 这里判断登录状态 用来改变客服按钮属性
    if (app.globalData.unionId) {
      app.getUserDetailInfo(res => {
        this.setData({
          isLogin: true,
          userInfo: res
        })
      })
    }
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
    return {
      title: '标题',
      path: '/pages/three-level/car-details/index'
    }
  }
})
