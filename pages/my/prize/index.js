
import { postList, getBrandList, getWinningRecordList, usePrize } from "../../../api"

let page = 1;

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorStatus: false,  // 返回顶部
    loadType: 1,
    listData: [],     // 渲染列表用数据
    state: 0,        // tablan 索引
  },
  tabChange(e) {
    page = 1
    this.setData({
      state: e.detail.index
    }, _ => {
      this.getListData()
    })

  },
  jumpHandle(e) {
   let that =this
    // 判断type
    let type = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id
    if (type == 1 || type == 2) {
      wx.navigateTo({
        url: '/pages/three-level/prize-address/index?id=' + id
      })
    } else {
      usePrize({ id })
        .then(res => {
          page = 1
          that.getListData()
        })
    }
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

  // 获取列表shuj
  getListData(e) {
    if (page == 1) {
      this.setData({
        listData: []
      })
    }
    getWinningRecordList({ page, state: this.data.state + 1 })
      .then(res => {
  
        let ltype = !res.total ? 3 : res.pages == res.page ? 2 : 1
        if (page > res.pages) res.list = ''
        this.setData({
          [`listData[${this.data.listData.length}]`]: res.list,
          loadType: ltype
        })
        page = res.page + 1
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1
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
    this.getListData()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
