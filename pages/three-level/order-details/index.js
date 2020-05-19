// pages/my/index.js
import {
  getOrderInfo,
  confirmReceipt,
  orderAppraise,
  getOrderTraces,
  getOrderAppraise,
  rquestRefund,
} from "../../../api";
import {sT} from "../../../utils/util"
const app = getApp();

let fpage = ""; // 上一个页面

Page({
  /**
   * 页面的初始数据
   */
  data: {
    state:-1,
    freightFee: 0,
    rateName: ["非常差", "差", "一般", "好", "非常好"],
    rateValue: 5, //评价星值
    comment: "", // 评价内容
    steps: [], // 物流信息
    loadMoreEx: false, // 展开物流信息
  },
  showMoreEx() {
    this.setData({
      loadMoreEx: !this.data.loadMoreEx,
    });
  },
  // 评价星星
  rateChange(e) {
    this.setData({
      rateValue: e.detail,
    });
  },
  // 评价内容
  commentChange(e) {
    this.setData({
      comment: e.detail,
    });
  },
  // 发布评价
  submitComment() {
    orderAppraise({
      orderId: this.data.id,
      star: this.data.rateValue,
      content: this.data.comment,
    }).then((res) => {
      this.setData({
        state: 5,
      });
      this.refreshFpage()
      
      sT('评价成功')
    
      
    });
  },
  // 获取订单评价
  getOrderAppraise(id) {
    getOrderAppraise({ orderId: id }).then((res) => {
      this.setData({
        rateValue: res.star,
        comment: res.content,
      });
    });
  },

  // 获取物流信息
  getOrderTraces(id) {
    getOrderTraces({ id }).then((res) => {
      console.log(res);
      let list = res.showapi_res_body.data;
      let stepsList = [];
      list.forEach((item) => {
        let { context: text, time: desc } = item;
        stepsList.push({ text, desc });
      });
      this.setData({
        steps: stepsList,
      });
    });
  },
  // 去商品详情
  goodsDetail() {
    let url = `/pages/three-level/good-details/index?productType=${this.data.type}&id=${this.data.proId}`;
    wx.navigateTo({
      url,
    });
  },
  // 申请退款
  refund() {
    if (this.data.refundState == 0) {
      wx.showModal({
        title: "退款申请",
        content: "您确定要申请退款?",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: async (result) => {
          if (result.confirm) {
            let res = await rquestRefund({ id: this.data.id });
            sT('申请提交成功')
            this.refreshFpage()
            this.setData({
              refundState: 1,
            });
          }
        },
        fail: (e) => {},
        complete: () => {},
      });
    } else {
      this.refreshFpage()
    }
  },

  // 确认收货
  confireBtn() {
    if (this.data.state < 3) return;
    if (this.data.refundState ==2) return;
    confirmReceipt({ id: this.data.id }).then((res) => {
      // 刷新上一页数据
     this.refreshFpage()
      this.setData({
        state:4
      })
    sT('确认收货成功')
    });
  },

  // 获取订单详情
  getOrderInfo(){
    getOrderInfo({id:this.data.id})
    .then(res=>{
      // 只更新变动数据
      let {state,inegral,creditAmount} = res 
      this.setData( {state,inegral,creditAmount})
      wx.stopPullDownRefresh();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.isDev)
      return this.setData({
        isDev: true,
      });

    let result = app.globalData.currentOrderData

    wx.setNavigationBarTitle({
      title: result.type == 1 ? "订单详情" : "众筹详情",
    });
    
    // 如果订单有物流 则获取物流信息
    if (result.expNo) this.getOrderTraces(result.id);

    // 如果订单已完成 则获取订单评价
    if (result.state == 5) this.getOrderAppraise(result.id);

    this.setData(result);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.nextTick(_=>{
      // 获取订单详情
    this.getOrderInfo()
    })
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
    console.log("onHide");
  },
  // 刷新数据
  refreshFpage(){
    // 刷新上页数据
    fpage = getCurrentPages().slice(-2)[0];
    fpage.onLoad({ type: fpage.options.type });
    // 刷新本页数据
    this.getOrderInfo()
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
    this.refreshFpage()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //
  // }
});
