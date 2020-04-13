// 预支付
import { getProductDetail, crowdFunding, directPurchase } from "../../../api"
const app = getApp()
let onloadData = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentAddress: '',
    number: 1
  },
  // 选择地址
  addAddress() {
    // if(!this.data.currentAddress){
    wx.navigateTo({
      url: `/pages/my/deliveryList/deliveryList`
    })
    // }else{
    //   let {address,area, city, contact, createTime, id, phone, province} = this.data.currentAddress
    //   wx.navigateTo({
    //     url: `/pages/my/r-address/index?address=${address}&area=${area}&contact=${contact}&createTime=${createTime}&city=${city}&id=${id}&phone=${phone}&province=${province}`
    //   })
    // }
  },

  // 获取商品详情
  getProductDetail(e) {
    getProductDetail({ id: onloadData.id })
      .then(res => {
     //   console.log(res)
        this.setData({
          details: res
        })
      })
  },

  // 提交支付
  submit() {
    if (!this.data.currentAddress || !this.data.currentAddress.id) return wx.showToast({
      title: '请选择收获地址',
      icon: 'none'
    })
    let reqData = {
      proId: this.data.details.id,
      quantity: this.data.number || 1,
      addressId: this.data.currentAddress.id
    }
    let sel = this.data.details.type

    let fn = sel == 2 ? crowdFunding : directPurchase
    // 1普通订单 2众筹
    fn(reqData)
      .then(_ => {

        wx.showToast({
          title: '支付成功'
        })

        let time = setInterval(_=> {
          clearInterval(time)
          time = null

          // 调用微信支付 成功后返回
          // wx.navigateBack({delta:-1})

          wx.redirectTo({
            url: '/pages/my/order/index?type=' + sel
          })
        }, 1000)
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    onloadData = options
    this.setData({ ...options })
    this.getProductDetail()
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
    // 获取收货地址
    let address = wx.getStorageSync("currentAddress") || app.globalData.currentAddress
    this.setData({
      currentAddress: address
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
