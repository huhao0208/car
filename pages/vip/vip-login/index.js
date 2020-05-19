// 商品详情
const app = getApp()
import {
  getAdvertList,
  getMemberPropsDefs,
  upgradeMembership
} from "../../../api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    isLogin: false,
    indexSwiperData: [], //轮播图数据
    swiperActive: 0,
    tabActive: 0,
    showLogin: false,
    vipState :{
      vip0: '',
      vip1: '立即开通',
      vip2: '',
      vip3: '',
    }
  },
  swiperChange(e) {
    this.setData({
      swiperActive: e.detail.current,
    })
  },
  // 轮播图跳转
  swiperToDetail(e) {
    if (this.data.isDev) return
    app.isLogin(_ => {
      // 判断类型跳转对应页面 1 普通商品 2 众筹商品 3 金融贷款 4 汽车销售 5 合作商家
      let type = e.currentTarget.dataset.type
      let id = e.currentTarget.dataset.id
      // `/pages/three-level/good-details/index?productType=${type}&id=${e.currentTarget.dataset.id}`
      let url = (type == 1 || type == 2) ? `/pages/three-level/good-details/index?productType=${type}&id=${id}` : type == 3 ? '/pages/three-level/loan-details/index?id=' + id : type == 4 ? '/pages/three-level/car-details/index?id=' + id : type == 5 ? '/pages/three-level/cooperation-details/index?id=' + id : ''

      wx.navigateTo({
        url
      })

    })

  },


  // 获取轮播图数据
  getAdvertList() {
    getAdvertList({
        type: 2
      })
      .then(res => {
        this.setData({
          indexSwiperData: res.list
        })
      })
  },
  // 获取会员升级所需填写项目
  getMemberPropsDefs() {
    getMemberPropsDefs()
      .then(res => {
        this.setData({
          props: res
        })
      })
  },
  // 弹窗关闭
  onClose() {
    this.setData({
      show: false
    })
  },
  // 弹窗跳转 vip 填写详细信息
  jumpVipCode(e) {
    let canSubmit = true
    console.log(e.detail.value, 'e');
    let valuesObj = e.detail.value

    let props = this.data.props.defs || []
    for (let key in props) {
      if (props[key].required) {
        let val = valuesObj[props[key].name]

        if (!val) {
          wx.showToast({
            title: '请填写' + props[key].name,
            icon: 'none'
          })
          canSubmit = false
          break
        }
      }
    }
    if (canSubmit) {
      // 提交申请
      let req = []
      for(let key in valuesObj ){
        let obj = {
          name:key,
          value: valuesObj[key]
        }
        req.push(obj)
      }
      upgradeMembership({
      
          props: req
        })
        .then(res => {
          wx.showToast({
            title: '提交成功,等待审核',
            icon: 'none'
          })

          // 更新用户信息
          this.onShow()
          this.onClose()


        })

    }

  },

  // 进入会员专区
  toVip() {
    // 先判断登录
    app.isLogin(_ => {
      // 如果是会员进入专区/pages/vip/index/index 不是去开通页面 pages/vip-code/index/index
      let userInfo = app.globalData.userInfo || wx.getStorageSync('userInfo')
      if (userInfo.vip) {
        wx.navigateTo({
          url: '/pages/vip/index/index'
        })
      } else {
        wx.switchTab({
          url: '/pages/vip-code/index/index'
        })
      }

    })
  },

  // 升级会员
  openVip(e) {
    app.isLogin(_ => {
      // 如果是审核中则不执行后续
      if (this.data.userInfo.state == 1 && e.currentTarget.dataset.vip == this.data.userInfo.vip / 1 + 1) return wx.showToast({
        title: '您已提交审核,请稍后再看',
        icon: 'none'
      })
      // 如果未登录或者没有vip 则只能点击第一个
      if (e.currentTarget.dataset.vip ==  this.data.userInfo.vip || !this.data.userInfo.vip) {
        // 跳转开通页面
        wx.switchTab({
          url: '/pages/vip-code/index/index'
        })
      } else if (e.currentTarget.dataset.vip == this.data.userInfo.vip / 1 + 1) {
        
        this.getMemberPropsDefs()
        this.setData({
          show: true
        })

      }
    })
  },
  // 去众筹页面
  toZcDetail() {
    wx.navigateTo({
      url: '/pages/my/crowdfunding/index'
    })
  },


  // 此页面登录后触发
  hasLogin(e) {
   this.onShow()
  },
  toLogin() {
    app.isLogin()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdvertList()
    if (app.globalData.isDev) {
      this.setData({
        isDev: true
      })
    }

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
    if (app.globalData.isDev != this.data.isDev) {
      this.setData({
        isDev: app.globalData.isDev
      })
      this.getAdvertList()
    }

    // 这里判断登录状态 用来改变客服按钮属性
    if (app.globalData.unionId) {
      app.getUserDetailInfo(res => {

        // 0 没有 1审核中 2正在使用  3 可升级
        let vipState = {
          vip0: '',
          vip1: '立即开通',
          vip2: '',
          vip3: '',
        }
        vipState[`vip${res.vip/1}`] = "正在使用"
        vipState[`vip${res.vip/1+1}`] = res.state == 1 ? "正在审核" :res.state == -1 ?"审核失败":  res.vip == 0 ? "立即开通" : "立即升级"
        this.setData({
          isLogin: true,
          userInfo: res,
          vipState
        })
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
    return {
      title: '标题',
      path: '/pages/three-level/car-details/index'
    }
  }
})