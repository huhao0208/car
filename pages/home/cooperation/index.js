

// 精品商城
const app = getApp();
import{getStoreList} from "../../../api"
let page  = 1;
let categoryId = '';  // tab分类
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
    page=1
    // console.log(e.detail,'tab切换')
    categoryId= e.detail.categoryId
    this.getListData()

  },

  // 获取列表数据
  getListData(e){
    if(page==1){
      this.setData({
        listData:[],
        loadType: 1
      })
    }
    getStoreList({page,categoryId})
        .then(res=>{
          wx.stopPullDownRefresh()
          page = res.page
          let type = (!res.total)?3:( res.page ==res.pages )?2:1

          if(res.page && page>res.pages) return   
            this.setData({
              [`listData[${this.data.listData.length}]`]:res.list,
              loadType: type
            })
          page = res.page+1

        })
  },

  // 去详情页
  toDetailPage(e){
    wx.navigateTo({
      url:'/pages/three-level/cooperation-details/index?id='+e.currentTarget.dataset.id
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
     if(app.globalData.isDev) return this.setData({
            isDev:true
          })
      


    page =1
    categoryId = ''
    this.getListData()

    let that =this
    app.getLocation({
      successFn(e){
       // console.log(e,'我的定位')
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

