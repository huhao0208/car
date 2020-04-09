// 金融贷款详情
const app = getApp()
import{getFinancialLoanDetail,collectProduct} from "../../../api"
let id = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    isCollection:false,     // 是否收藏
    detailsData:{},

  },

  // 立即申请
  applying(){
    app.isLogin(_=>{
      console.log(this.data,this)
      wx.navigateTo({
        url:'/pages/my/r-address/index?type=loan&id='+id
      })
    })
  },
  // 收藏
  collection(){
    app.isLogin(_=>{
      console.log('立即收藏')
      this.setData({
        isCollection:!this.data.isCollection
      })
      collectProduct({proId:this.data.details.id,type:3})
    })
  },

  kefuClick(){
    app.isLogin()
  },

  // 此页面登录后触发
  hasLogin(){
      this.setData({
        isLogin:true
      })
  },

  // 获取金融贷款详情
  getFinancialLoan(e){
    getFinancialLoanDetail(e)
        .then(res=>{
            this.setData({
              details:res,
              html: `<img src='${res.showUrl}'>`
            })
        })
  },
  handleContact(e){
    console.log(e,'客服消息')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      id = options.id/1
    this.getFinancialLoan({id})

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
      // 这里判断登录状态 用来改变客服按钮属性
      if(app.globalData.unionId){
        this.setData({
          isLogin:true
        })
      }

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
