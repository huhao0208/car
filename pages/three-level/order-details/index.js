// pages/my/index.js
import { confirmReceipt, orderAppraise, getOrderTraces, getOrderAppraise, rquestRefund } from "../../../api"

const app = getApp()

let fpage = ''  // 上一个页面

Page({

  /**
   * 页面的初始数据
   */
  data: {
    freightFee: 0,
    rateName: ['非常差', '差', '一般', '好', '非常好'],
    rateValue: 5,    //评价星值
    comment: '',      // 评价内容
    steps: [],  // 物流信息 
    loadMoreEx: false,   // 展开物流信息

  },
  showMoreEx() {
    this.setData({
      loadMoreEx: !this.data.loadMoreEx
    })
  },
  // 评价星星
  rateChange(e) {
    this.setData({
      rateValue: e.detail
    })
  },
  // 评价内容
  commentChange(e) {
    this.setData({
      comment: e.detail
    })
  },
  // 发布评价
  submitComment() {
    orderAppraise({ orderId: this.data.id, star: this.data.rateValue, content: this.data.comment })
      .then(res => {
        wx.showToast({ title: '评价成功' })
        this.setData({
          state: 5
        })
        fpage = getCurrentPages().slice(-2)[0]
        fpage.onLoad({ type: fpage.options.type })
      })

  },
  // 获取订单评价
  getOrderAppraise(id) {

    getOrderAppraise({ orderId: id })
      .then(res => {
        this.setData({
          rateValue: res.star,
          comment: res.content

        })
      })
  },

  // 获取物流信息
  getOrderTraces(id) {
    getOrderTraces({ id })
      .then(res => {
        console.log(res);
        let list = res.showapi_res_body.data
        let stepsList = []
        list.forEach(item => {
          let { context: text, time: desc } = item
          stepsList.push({ text, desc })
        })
        this.setData({
          steps: stepsList
        })

      })
  },
  // 去商品详情
  goodsDetail() {
    let url = `/pages/three-level/good-details/index?productType=${this.data.type}&id=${this.data.proId}`
    wx.navigateTo({
      url
    })
  },
  // 申请退款
   refund() {
      fpage = getCurrentPages().slice(-2)[0]
      if (this.data.refundState == 0) {
        wx.showModal({
          title: '退款申请',
          content: '您确定要申请退款?',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: async (result) => {
            if(result.confirm){
              let res = await rquestRefund({ id: this.data.id })
              wx.showToast({
                title: '申请退款成功'
              })
              fpage.onLoad({ type: fpage.options.type }) 
              this.setData({
                refundState: 1
              })
            }
      
          },
          fail: () => { },
          complete: () => { }
        });


      
    }else {
      fpage.onLoad({ type: fpage.options.type })
    }





  },

  // 确认收货
  confireBtn() {
    if (this.data.state < 3) return
    if(!this.data.refundState) return
    fpage = getCurrentPages().slice(-2)[0]
    confirmReceipt({ id: this.data.id })
      .then(res => {
        // 刷新上一页数据
        console.log(fpage);

        fpage.onLoad({ type: fpage.options.type })
        wx.navigateBack({
          delta: 1
        });
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.isDev) return this.setData({
      isDev: true
    })

    wx.showLoading({
      title: '请稍候...'
    })
    // 获取上一页数据 order.js
    let pages = getCurrentPages()
    let fpage = pages[pages.length - 2]
    let result = fpage.data.currentData


    // 如果订单有物流 则获取物流信息
    if (result.expNo) this.getOrderTraces(result.id)

    // 如果订单已完成 则获取订单评价
    if (result.state == 5) this.getOrderAppraise(result.id)

    this.setData({
      ...result
    }, _ => {
      wx.hideLoading()
    })
    wx.setNavigationBarTitle({
      title: this.data.type == 1 ? '订单详情' : '众筹详情'
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
    console.log('onHide');
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload,刷新上页数据');
    fpage = getCurrentPages().slice(-2)[0]
    fpage.onLoad({ type: fpage.options.type })
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    fpage = getCurrentPages().slice(-2)[0]
    fpage.onLoad({ type: fpage.options.type })

    setTimeout(_=>{
      wx.stopPullDownRefresh()
    },800)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //
  // }
})
