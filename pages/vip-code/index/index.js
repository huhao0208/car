// pages/vip-code/index.js
import areaList from "../../../components/area"
import {openMembership} from "../../../api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList:'',
    isShowAera:false,
    formData:{}
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
    this.setData({
      'formData.province':address[0].name,
      'formData.city':address[1].name,
      'formData.area':address[2].name,
      isShowAera:false})
  },
  iptAddressHandle(e){
    console.log(e.detail.value)
    this.setData({
      'formData.address':e.detail.value
    })
  },
  // // 信息 选择
  selcetSexHandle(e){
    this.setData({
     'formData.gender':e.detail
    })
  },
  iptNameHandle(e){
    this.setData({
      'formData.fullName':e.detail.value
    })
  },
  iptPhoneHandle(e){
    this.setData({
      'formData.contact':e.detail.value
    })
  },
  // 提交
  submitHandle(){

    // province	是	string	省
    // city	是	string	市
    // area	是	string	区
    // address	是	string	详细地址
    // fullName	是	string	姓名
    // contact	是	string	联系方式
    // gender	是	int	性别 1 男士 2 女士
    let that  =this
    app.isLogin(_=>{
      let {province,city,area,address,fullName,contact,gender} = this.data.formData
      if(!(province&&city&&area&&address&&fullName&&contact&&gender)) return wx.showToast({
        title:'请完善信息',
        icon:'none'
      })
      openMembership(that.data.formData)
          .then(res=>{
            // 开通成功刷新用户信息
            app.getUserDetailInfo(re=>{
              console.log(re,'重新获取的用户信息')
              that.setData({
                userInfo:app.globalData.userInfo
              },_=>{

              })
            })

          })
    })

  },

  // 登录成功重新获取用户信息
  hasLogin(e){
    let that = this
      // 登录成功刷新用户信息
      app.getUserDetailInfo(re=>{
        that.setData({
          userInfo:app.globalData.userInfo
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
  

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
    this.setData({
      areaList:areaList,
      userInfo:app.globalData.userInfo
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