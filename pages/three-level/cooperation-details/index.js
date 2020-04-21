// 合作专区详情
import { getStoreDetail } from "../../../api"
const app = getApp()
let id = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperActive: 0,
    tabActive: 0,
    ShowDistance: false,
    commentType: '',    // 获取评价类型
    page: 0,    // 用来获取评价 每次只需改变page 即可
  },
  swiperChange(e) {
    this.setData({
      swiperActive: e.detail.current,
    })
  },
  // 轮播图图片预览
  priviweImg() {
    let current = this.data.carousel[this.data.swiperActive]
    wx.previewImage({
      // urls:[],
      current,
      urls: this.data.carousel

    })
  },
  
  // tab栏切换
  tabChange(e) {
    if (e.detail.index == 1) {
      // 获取评价
      this.setData({
        tabActive: e.detail.index,
        page: 1
      })

    } else {
      // 获取详情
    }
  },
  openMap() {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 18
    })
  },
  call(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success: res => {

      },
      fail: rse => {
        // 取消
      }
    })
  },

  // 获取详情列表
  getStoreDetail() {
    getStoreDetail({ id })
      .then(res => {
        this.setData({
          ...res
        })
      })
  },

  // 未开放
  unopened() {
    wx.showModal({
      title: '提示',
      content: '暂未开放,请下载XXX APP购买',
      // confirmColor:'#ccc',
      showCancel: false,
      success(res) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     if(app.globalData.isDev) return this.setData({
            isDev:true
          })
      
      



    id = options.id
    this.getStoreDetail()

    //获取我的定位
    let that = this
    app.getLocation({
      successFn(e) {
        console.log(e, '我的定位')
        // 控制显示距离
        that.setData({
          ShowDistance: true,
          latitude1: app.globalData.latitude,
          longitude1: app.globalData.longitude
        })
      },
      failFn() {
        that.setData({
          ShowDistance: false
        })
      }
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
