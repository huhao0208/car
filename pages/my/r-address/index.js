// 收货地址
import { jump } from "../../../utils/util";
import areaList from "../../../components/area"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'',
    areaList:'',
    isShowAera:false,
    address:[
      {name:'请选择'},{name:'请选择'},{name:'请选择'}
    ],  // 选择的地址
    iptAddress:'',  // 填写的详细地址
    userInfo:{
      sex:'1',         // 性别
    }

  },
  login(){
    jump('/pages/login/index')
  },

  toSelectAddress(e){
    this.setData({
      isShowAera:true
    })
  },
  onCloseAera(){
    this.setData({
      isShowAera:false
    })
  },
  // 选择地址
  addressSelected(e){
    let address = e.detail.values
    this.setData({address, isShowAera:false})
  },
  iptAddressHandle(e){
    console.log(e.detail.value)
    this.setData({
      iptAddress:e.detail.value
    })
  },
  // // 信息 选择
  selcetSexHandle(e){
    this.setData({
      [`userInfo.sex`]:e.detail
    })
  },
  iptNameHandle(e){
    this.setData({
      [`userInfo.name`]:e.detail.value
    })
  },
  iptPhoneHandle(e){
    this.setData({
      [`userInfo.phone`]:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList:areaList
    })
    console.log( app.globalData)
    this.setData({
      imgUrl: app.globalData.imgUrl,
      userName:  app.globalData.userInfo.trueName,
      userHead:  app.globalData.userInfo.head
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
