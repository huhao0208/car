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
      wx.navigateTo({
        url:'/pages/my/r-address/index?type=loan&id='+id
      })
    })
  },
  // 收藏
  collection(){
    app.isLogin(_=>{
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
          let detailsData = res
          detailsData.details = res.details? res.details.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ') : '等待商家添加'//防止富文本图片过大       
            this.setData({
              details:detailsData,
          //   html: `<img src='${res.showUrl}'  style="max-width:100%;height:auto;float:left;display:block">`
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

      id = Number(options.id)
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


