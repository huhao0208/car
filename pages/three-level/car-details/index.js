// 汽车详情
const app = getApp()
import {sL,hL} from "../../../utils/util"
import { getCarDetail } from "../../../api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorStatus: false,  // 返回顶部
    reqPage: 1,    // 请求参数:页码
    listData: [],     // 渲染列表用数据 评价
    showLogin: false,
    // indexSwiperData: [], //轮播图数据
    swiperActive: 0,
    tabActive: 0,
    carInfo: [],       // 汽车信息
  },
  swiperChange(e) {
    this.setData({
      swiperActive: e.detail.current,
    })
  },
  // 轮播图图片预览
  priviweImg() {
    const urls = this.data.carInfo.carousel
    const current = this.data.carInfo.carousel[this.data.swiperActive]
 

    wx.previewImage({
      // urls:[],
      current,
      urls
    })
  },


  // tab栏切换
  tabChange(e) {

    if (e.detail.index == 1) {
      // 获取评价
      this.setData({
        active: e.detail.index,
        commentType: 223
      })
    } else {
      // 获取详情
    }
  },
  // 立即购买
  buyNow() {
    app.isLogin(_ => {
      // 这里跳转
      wx.navigateTo({
        url: '/pages/my/r-address/index?from=car-details'
      })
    })
  },

  //屏幕滚动  返回顶部用
  onPageScroll(e) {
    if (e.scrollTop >= 400 && e.scrollTop < 1000) {
      if (this.data.floorStatus) return
      this.setData({
        floorStatus: true
      });
    } else if (e.scrollTop < 400) {
      if (!this.data.floorStatus) return
      this.setData({
        floorStatus: false
      })
    }
  },


  // 获取汽车信息
  getCarInfo(id) {
    sL("数据加载中...")
    getCarDetail({ id })
      .then(res => {
        /**
        * 此代码段处理目的为，匹配富文本代码中的 <img> 标签，并将其图片的宽度修改为适应屏幕
        * max-width:100% 		--- 图片宽度加以限制，避免超出屏幕
        * height:auto 	 	   	--- 高度自适应
        * display:block       	--- 此代码，可以去掉图片之间的空白间隔，个人觉得好用
        */

        let detailsData = res
        detailsData.details = res.details? res.details.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" '): '等待商家添加'//防止富文本图片过大
        this.setData({
          carInfo: detailsData
        })
        hL()
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.getCarInfo(options.id)
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

    wx.stopPullDownRefresh()

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
      title: this.data.carInfo.name + '现价仅需:' + this.data.carInfo.currentPrice + '元',
      path: '/pages/three-level/car-details/index'
    }
  }
})
