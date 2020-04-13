//车主服务

const app = getApp();
import{getVehicleOwnerList} from "../../../api"
let page  = 1;
let categoryId =''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ShowDistance:false,
    loadType:1,
    showLoad:true,
    floorStatus:false,  // 返回顶部
    listData:[],     // 渲染列表用数据
  },
// tab栏切换
  tabc(e){
    page =1
    categoryId = e.detail.categoryId
    this.getListData()
  },

  // 打开地图
  openMap(e){
    const {latitude,longitude} = e.currentTarget.dataset
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  },

  // 去汽车服务详情页
  toServiceDetail(e){
    wx.navigateTo({
      url:'/pages/three-level/service-details/index?id='+e.currentTarget.dataset.id,
    })
  },

  // 获取列表数据
  getListData(e){
    if(page==1){
      this.setData({
        listData:[],
        loadType: 1
      })
    }
    getVehicleOwnerList({page,categoryId})
        .then(res=>{
          wx.stopPullDownRefresh()
          let type = (!res.total)?3:( page == res.pages )?2:1  
          if(res.pages && page> res.pages) return
            this.setData({
              [`listData[${this.data.listData.length}]`]:res.list,
              loadType: type
            })
            page = res.page+1
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
    categoryId =''
    page=1
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
  //  console.log(app.globalData)
    let that =this
      app.getLocation({
        successFn(e){
      //    console.log(e,'我的定位')
          // 控制显示距离
          that.setData({
            ShowDistance:true,
            latitude1:app.globalData.latitude,
            longitude1:app.globalData.longitude
          })
        },
        failFn(){
          that.setData({
            ShowDistance:false
          })
        }
      })
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
    this.getListData()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})









