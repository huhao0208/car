// 汽车详情
const app = getApp()
import{getVehicleOwnerDetail} from "../../../api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentPage:0,
    commentType:'',
    floorStatus:false,  // 返回顶部
    swiperActive: 0,
    tabActive: 0,

  },

  swiperChange(e){
    this.setData({
      swiperActive:e.detail.current,
    })
  },

  // 轮播图图片预览
  priviweImg(){
    const urls = this.data.details.carousel.map(item =>item)
    const current = this.data.details.carousel[this.data.swiperActive]
    console.log(urls,current)

   wx.previewImage({
     current,
     urls
   })
  },

  // 打开地图
  openMap(){
    wx.openLocation({
      latitude:this.data.details.latitude,
      longitude:this.data.details.longitude,
      scale:18
    })
  },

  // 打电话
  call(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  // tab切换
  tabChange(e){
   // commentPage,commentType

    if(e.detail.index==1){
      this.setData({
        commentPage : 1,
        commentType :'',
      })
    }
    this.setData({
      tabActive:e.detail.index,

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

  // 获取详情
  getDetail(id){
    getVehicleOwnerDetail({id})
        .then(res=>{
          console.log(res)
          this.setData({
            details:res
          })
        })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {id} = options
    this.getDetail(id)

    //获取我的定位
    let that =this
    app.getLocation({
      successFn(e){
        console.log(e,'我的定位')
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
      commentPage: this.data.commentPage+1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.details.name,
      path: '/pages/three-level/service-details/index?id='+this.data.details.id
    }
  }
})
