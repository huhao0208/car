// 预支付
import { getProductDetail, crowdFunding, directPurchase,calculateShipping,getUserIntegral } from "../../../api"
const app = getApp()
let onloadData = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentAddress: '',
    number: 1,
    shippingMethods:1 , // 配送方式
    freight:0,    // 运费
    exchange:0, // 要兑换的积分,
    ratio:0,     // 兑换比例
    totalIntegral: 0 ,// 总积分
    submitIntegral:0,  // 确认提交的积分
    showIntegral:false,   // 积分选择显示
    showMthod:false,      // 显示购买方式
  },
  // 选择配送方式
  shippingChange(e){
    console.log(e);
    
    this.setData({
      shippingMethods:e.currentTarget.dataset.type,
      showMthod:false
    })
    if(e.currentTarget.dataset.type==1){
     if(this.data.currentAddress.id) this.calculateShipping()
    }else{
      this.setData({
        freight:0
      })
    }
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
  // 显示积分选择
  selectJf(){
    this.setData({
      showIntegral:!this.data.showIntegral
    })
  },
// 购买方式选择显示
selectMethod(){
  this.setData({
    showMthod:!this.data.showMthod
  })
},
  // 获取积分
  getUserIntegral(){
    let that = this
    // let vip = this.data.userInfo.vip || 0
    // let vipPrice = ['vip0Price','vip1Price','vip2Price','vip3Price']
    let orderMoney= this.data.number * this.data.details.currentPrice
    getUserIntegral({orderMoney})
    .then(res=>{
      
      that.setData( res )

    })
  },
  // 积分改变
  integralNumChange(e){

    // 输入的积分
    let exchange =parseInt(e.detail.value/1)  

    // 判断小于全部积分
    exchange = exchange<=0? 0 : exchange>this.data.creditAmount?this.data.creditAmount:exchange
    
    exchange =  exchange>this.data.totalIntegral?this.data.totalIntegral:exchange
    this.setData({
      exchange
    })
    
  },
  // 选择全部积分
  integralNumAll(){
    let options = {
      detail:{
        value:this.data.totalIntegral
      }
    }
    this.integralNumChange(options)
   
  },

  // 积分兑换确认
  exchangeConfirm(){
    this.setData({
      submitIntegral:this.data.exchange,
      showIntegral:false
    })

    // this.selectComponent('#integral_item').toggle();
  },

  // 获取商品详情
  getProductDetail(e) {
    let that = this
    getProductDetail({ id: onloadData.id })
      .then(res => {
        //   console.log(res)

       let specIndex = res.specs.findIndex(item=>item.id == onloadData.specId)
       console.log(onloadData);
       
        this.setData({
          details: res,
          specIndex:specIndex?specIndex:0
        }
        ,_=>{
          that.getUserIntegral()
        }
        )
      })
  },

  // 获取运费
  calculateShipping(){
    calculateShipping({addressId:this.data.currentAddress.id,proId:this.data.id,number:this.data.number})
    .then(res=>{
      this.setData(res)
    })
  },

  // 提交支付
  submit() {

    if(!this.data.shippingMethods) return wx.showToast({
      title:'请选择配送方式',
      icon:'none'
    })

    if (this.data.shippingMethods==1 && (!this.data.currentAddress || !this.data.currentAddress.id)) return wx.showToast({
      title: '请选择收获地址',
      icon: 'none'
    })
    let reqData = {
      specId:this.data.specId/1, // 规格id
      proId: this.data.details.id,
      quantity: this.data.number/1 || 1,
      addressId:this.data.shippingMethods==1? this.data.currentAddress.id:'',
      deliveryMethod:this.data.shippingMethods==1?2:1,
      integral:this.data.submitIntegral
    }

    let sel = this.data.details.type

    let fn = sel == 2 ? crowdFunding : directPurchase
    // 1普通订单 2众筹
    fn(reqData)
      .then(res => {
        res.paySign = res.sign
        wx.requestPayment({
          //  appId:appid,
          // timeStamp,
          // nonceStr,
          // package: 'prepay_id=' + prepay_id,
          // signType: 'HMACSHA256',        //'MD5',
          // paySign,
          ...res,
          success: function (re) {
            wx.redirectTo({
              url: '/pages/my/order/index?type=' + sel
            })
            // wx.showToast({
            //   title:'支付成功',
            //   success:()=>{
              
            //   }
            // })
           
          },
          fail: function () {
            // fail
          },
          complete: function (res) {
            // complete
            console.log(res);
            
          }
        })
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
    // // 获取用户信息
    // let userInfo = app.globalData.userInfo

    // 获取收货地址
    let address = wx.getStorageSync("currentAddress") || app.globalData.currentAddress
    this.setData({
      currentAddress: address|| '',
      // userInfo
    })
    if(address && address.id && this.data.shippingMethods==1) this.calculateShipping()
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
