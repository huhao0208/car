const app = getApp();
import{getProductList,getAdvertList} from "../../../api"
let page  = 1;
let categoryId = '' ;   // 分类id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorStatus:false,  // 返回顶部
    indexSwiperData: [ ], //轮播图数据
    swiperActive: 0,
    tabActive: 0,
  },
  swiperChange(e){
    this.setData({
      swiperActive:e.detail.current,
    })
  },
  // 去详情页
  toDetail(e){
    console.log(e)
    let {id,productType} = e.currentTarget.dataset
      wx.navigateTo({
        url:'/pages/three-level/good-details/index?id='+id+'&productType='+productType,
      })
  },

  // 获取轮播图
  getAdvertListData(){
    getAdvertList({type:2})
        .then(res=>{
          console.log(res)
          this.setData({
            indexSwiperData:res.list
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
    categoryId=""
    this.getListData()
    this.getAdvertListData()
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
// tab栏切换
  tabc(e){
//    console.log(e.detail.categoryId,'mmmm')
    page =1
    categoryId = e.detail.categoryId
    this.getListData()
  },

  // 获取列表数据
  getListData(){
    if(page == 1){
      this.setData({
        listData: [],
        loadType:1
      })
    }
    // 获取众筹 type2
    getProductList({page,type:2,categoryId})
        .then(res=>{
          wx.stopPullDownRefresh()
          page = res.page
          let ltype = (!res.total)?3:( res.page == res.pages )?2:1
          page++
          if(page>res.pages+1) return
            this.setData({
              [`listData[${this.data.listData.length}]`]:res.list,
              loadType: ltype
            })
        })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    page=1
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