// mall

const app = getApp();

import{postList,getBrandList,getCarList} from "../../../api"
let page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:'',
    showGotop:false,  // 返回顶部

    listData:[],     // 渲染列表用数据
    brandList:[],    // 品牌列表

  },


  // 搜索内容
  onChange(e){
    this.setData({
      search:e.detail
    })
  },
  // 搜索
  onSearch(e){
    console.log(e.currentTarget.dataset,'search')
    this.setData({
      reqPage:1,
      listData:[],
      search:e.currentTarget.dataset.search|| this.data.search
    },_=>{
      this._getListData( )
    })

  },

  //屏幕滚动  返回顶部用
  onPageScroll(e){
    if (e.scrollTop >= 400 &&e.scrollTop <1000 ) {
      if (this.data.floorStatus) return
      this.setData({
        floorStatus: true
      });
    } else if(e.scrollTop < 400) {
      if (!this.data.floorStatus) return
      this.setData({
        floorStatus: false
      })
    }
  },
  // 返回顶部
  goTop(){
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
  _getBrandList(){
    getBrandList({page:1,pageSize: 0})
        .then(res=>{
      let list= res.list.map(item=>{
         let{id,icon,name} =item
            return {id,icon,name}
          })
          this.setData({
            brandList:list
          })
        })
  },

  // 获取汽车列表
  _getListData(e){
    let reqData = {
      pageSize:  10,
      page:this.data.reqPage,
      keyword:this.data.search,
      ...e
    }

    getCarList(reqData)
        .then(res=>{
          console.log(res)
          this.setData({
            [`listData[${this.data.listData.length}]`]:res.list,
            resDataLength:res.list.length
          })
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'接收到的数据')
    this.setData({
      search:options.search
    })
    // 搜索数据
    this._getListData(options.search)
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

    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    this.setData({
      reqPage:reqPageNumber || this.data.reqPage+1
    })
    this._getListData()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
