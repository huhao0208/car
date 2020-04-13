const app = getApp();
import{getActivityList} from "../../../api"
let page  = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadType:1,
    showLoad:true,
    floorStatus:false,  // 返回顶部
    listData:[],     // 渲染列表用数据
  },
  // 去详情页
  toDetail(e){
    // 1 去商品详情 0去抽奖 2众筹
    let url = ''
    let type = e.currentTarget.dataset.type
    if(type ==0){
      url = '/pages/three-level/raffle/index'
    }else{
      url = `/pages/three-level/good-details/index?productType=${type}&id=${e.currentTarget.dataset.id}`
    }
    wx.navigateTo({
      url
    })

  }, // 获取列表数据
  getListData(e){
    if(page==1){
      this.setData({
        listData:[],
      })
    }
    getActivityList({page})
        .then(res=>{
          wx.stopPullDownRefresh()
          page = res.page
          let type = (!res.total)?3:( res.page == res.pages )?2:1
          this.setData({
            [`listData[${this.data.listData.length}]`]:res.list,
            loadType: type
          })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    page= 1
    this.getListData()


  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page++ ;
    this.getListData()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})



