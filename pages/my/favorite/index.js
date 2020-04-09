
import {getCollectionList,removeCollect} from "../../../api"
const app = getApp();
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
  // 移除收藏
  delete(e){
    console.log(e)
    let opt = e.currentTarget.dataset
    removeCollect({proId:opt.proid,type:opt.type})
        .then(_=>{
            page =1
          this.getListData()
        })

  },
  // 去详情页
  toDetail(e){
    console.log(e,'详情页')
    let url =''
    let opt = e.currentTarget.dataset
    if(!opt.proid || !opt.type)  return wx.showToast({
      title:'信息填写不完整,请完善后提交',
      icon:'none'
    })
    if(opt.type==1|| opt.type ==2){
      url = '/pages/three-level/good-details/index?productType='+opt.type+'&id='+opt.proid
    }else if(opt.type==3){
      url = '/pages/three-level/loan-details/index?id='+opt.proid
    }else {
      url = '/pages/three-level/car-details/index?id='+opt.proid
    }
    wx.navigateTo({
      url
    })
  },
  // 获取列表数据
  getListData(e){
    if(page==1){
      this.setData({
        listData:[],
      })
    }
    getCollectionList({page})
        .then(res=>{
          wx.stopPullDownRefresh()
          let type = (!res.total)?3:( res.page == res.pages )?2:1;

          if(page>res.pages)  return
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
    page =1
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
  //  page++ ;
    this.getListData()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})



