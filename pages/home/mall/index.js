
// 精品商城
const app = getApp();

import { getProductList } from "../../../api"

let page = 1;
let categoryId = ''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadType: 1,
    showLoad: true,
    floorStatus: false,  // 返回顶部
    listData: [],     // 渲染列表用数据
  },

  // tab栏切换
  tabc(e) {
    page = 1
    console.log(e.detail, 'mmmm')
    categoryId = e.detail.categoryId
    this.getListData()
  },

  // 获取列表数据
  getListData(e) {
    if (page == 1) {
      this.setData({
        listData: [],
        loadType: 1
      })
    }

    getProductList({ page, subType: 1, categoryId })
      .then(res => {
        wx.stopPullDownRefresh()
        // page = res.page
        let ltype = (!res.total) ? 3 : (res.page == res.pages) ? 2 : 1

        if (res.pages && page > res.pages) return
        this.setData({
          [`listData[${this.data.listData.length}]`]: res.list,
          loadType: ltype
        })
        page = res.page+1

      })
  },

  // 去详情页面
  toDetail(e) {
    let productid = e.currentTarget.dataset.productid
    wx.navigateTo({
      url: '/pages/three-level/good-details/index?productType=1&id=' + productid,
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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.isDev) return
    page=1
    categoryId = ''

    this.getListData()

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
    page = 1
    this.getListData()


  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // page++;
    this.getListData()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
