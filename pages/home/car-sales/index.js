// mall

const app = getApp();

import {
  getBrandList,
  getCarList
} from "../../../api"
let page = 1
let brandId = '' //汽车品牌id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    showGotop: false, // 返回顶部
    brandListIndex: -1, // 选中的汽车品牌
    listData: [], // 渲染列表用数据
    brandList: [], // 品牌列表
  },


  // 搜索内容改变
  onChange(e) {
    this.setData({
      keyword: e.detail
    })
  },
  // 搜索
  onSearch(e) {
    page = 1
    this.setData({
      listData: []
    }, _ => {
      this._getListData()
    })

  },
  // 汽车品牌搜索
  brandSearch(e) {
    page = 1
    let brandListIndex = e.currentTarget.dataset.index != this.data.brandListIndex ? e.currentTarget.dataset.index : '-1'
    let brandId = e.currentTarget.dataset.index != this.data.brandListIndex ? e.currentTarget.dataset.brandid : ''
    brandId = brandListIndex != -1 ? brandId : ''
    this.setData({
      brandListIndex,
      brandId
    }, _ => {
      this._getListData()
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
  // 返回顶部
  goTop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        duration: 0,
        scrollTop: 1000,
        success: function () {
          wx.pageScrollTo({
            duration: 100,
            scrollTop: 0
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  // 获取品牌列表
  _getBrandList() {
    getBrandList({
      page: 1,
      pageSize: 0
    })
      .then(res => {

        let list = res.list.map(item => {
          let {
            id,
            icon,
            name
          } = item
          return {
            id,
            icon,
            name
          }
        })
        this.setData({
          brandList: list
        })
      })
  },

  // 获取汽车列表
  _getListData(e) {
    let that =this
    if (page == 1) {
      this.setData({
        listData: [],
        loadType: 1
      })
    }
    getCarList({
      keyword: this.data.keyword,
      page,
      brandId: this.data.brandId
    })
      .then(res => {
        if (res.pages && page > res.pages) return

        let loadType = res.total == 0 ? 3 : res.pages == page ? 2 : 1
        page = res.page + 1

        this.setData({
          [`listData[${this.data.listData.length}]`]: res.list,
          loadType
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   console.log(options, '接收到的数据')
    page = 1
    this.setData({
      keyword: options.keyword
    }, _ => {
      this._getListData()
    })
    // 搜索数据

    this._getBrandList()
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
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getListData()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})