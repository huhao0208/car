// 商品详情
const app = getApp()
import { getProductDetail, judgeInCrowdFunding,getProductLimitQuantity } from "../../../api"
let onloadData = {};
let details = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,        // 众筹状态
    floorStatus: false,  // 返回顶部
    number: 1,       // 购买数量
    showLogin: false,
    swiperActive: 0,
    tabActive: 0,
    commentType: '',    // 获取评价类型
    page: 0,    // 用来获取评价 每次获取下一页只需改变page 即可
    showDialog: false,    // 选择分类对话框
    specsActiveIdnex: 0
  },

  swiperChange(e) {
    this.setData({
      swiperActive: e.detail.current,
    })
  },

  // 轮播图图片预览
  priviweImg() {
    const urls = this.data.details.carousel
    const current = this.data.details.carousel[this.data.swiperActive]
    wx.previewImage({
      // urls:[],
      current,
      urls

    })
  },

  // tab栏切换
  tabChange(e) {

    if (e.detail.index == 1) {
      // 获取评价
      this.setData({
        active: e.detail.index,
        page: 1
      })

    } else {
      // 获取详情
    }
  },
  // 阻止穿透
  preventTouchMove() { },

  // 选择规格
  selectSpecs(e) {
    console.log(e);
    this.setData({
      specsActiveIdnex: e.currentTarget.dataset.index
    })
  },

  // 购买数量
  numChangeH(e) {
    this.setData({
      number: e.detail
    })
  },

  // 获取当前可购买数量
  

  // 打开对话框
  openDialog() {
    this.setData({
      showDialog: true
    })
  },
  //关闭对话框
  dialogClose() {
    this.setData({
      showDialog: false
    })
  },
  // 立即购买
  buyNow() {

    let _this = this
    app.isLogin(async _ => {
      // 获取限购数量
      let limit = await getProductLimitQuantity({id:this.data.details.id})
     ;
      if(this.data.number>this.data.details.specs[this.data.specsActiveIdnex].stock) return wx.showToast({title:'数量超出库存',icon:'none'})
     if(limit !=-1){

      if(this.data.number>limit) return wx.showToast({title:'您当前最多可购买'+limit+'件',icon:'none'})
      if(limit==0) return wx.showToast({title:'你的购买次数已用尽，请下次再来',icon:'none'})

     }
      // 判读众筹 
      if (onloadData.productType == 2) {
        //众筹查询是否有资格

        judgeInCrowdFunding({ id: _this.data.id })
          .then(res => {
            // 未参加众筹 可以参与
            if (!res) {
              // 这里跳转
              console.log(res, '未参加众筹,可以参与');

              if (_this.data.details.totalNum == _this.data.details.activityNum) {
                _this.setData({
                  status: 3   // 众筹结束
                })
              } else {
                wx.navigateTo({
                  url: `/pages/goods/prepayment/index?id=${_this.data.id}&number=${_this.data.number}&specId=${_this.data.details.specs[_this.data.specsActiveIdnex].id}`
                })
              }



            } else {
              // 已参与众筹 
              console.log(res, '已参与众筹');

              //
              if (_this.data.details.totalNum == _this.data.details.activityNum) {
                _this.setData({
                  status: 2   // 众筹成功
                })
              } else {
                _this.setData({
                  status: 1   // 众筹中
                })
              }

            }
          })
      } else {

        // 这里跳转
        wx.navigateTo({
          url: `/pages/goods/prepayment/index?id=${_this.data.id}&number=${_this.data.number}&specId=${_this.data.details.specs[_this.data.specsActiveIdnex].id}`
        })
      }


    })


  },

  // 去众筹liebiao页面
  toZcPageList() {
    wx.navigateTo({
      url: '/pages/my/order/index?type=2'
    })
  },

  //屏幕滚动  返回顶部用
  onPageScroll(e) {
    if (e.scrollTop >= 400 && e.scrollTop < 1000) {
      if (this.data.floorStatus) return
      this.setData({
        floorStatus: true
      });
    } else if (e.scrollTop < 400) {
      if (!this.data.floorStatus) return
      this.setData({
        floorStatus: false
      })
    }
  },

  // 获取商品详情
  getProductDetail() {
    getProductDetail({ id: onloadData.id, type: onloadData.productType })
      .then(res => {
        let detailsData = res
        detailsData.details = res.details ? res.details.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ') : '等待商家添加'//防止富文本图片过大
        details = detailsData
        this.setData({
          details: detailsData
        })

        let _this = this
        // 每次进页面判断用户是否可以参加众筹
        if (onloadData.productType == 2) {

          judgeInCrowdFunding({ id: _this.data.id })
            .then(res => {
              // 未参加众筹 可以参与
              if (!res) {

                if (_this.data.details.totalNum == _this.data.details.activityNum) {
                  _this.setData({
                    status: 3   // 众筹结束
                  })
                } else {
                  _this.setData({
                    status: 0   // 可参与众筹
                  })

                }
              } else {
                // 已参与众筹 
                if (_this.data.details.totalNum == _this.data.details.activityNum) {
                  _this.setData({
                    status: 2   // 众筹成功
                  })
                } else {
                  _this.setData({
                    status: 1   // 众筹中
                  })
                }

              }
            })

        }


      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    details = ''
    if (app.globalData.isDev) return this.setData({
      isDev: true
    })


    this.setData({ ...options })
    onloadData = options
    // 在这里判断
    if (options.productType == 2) {
      console.log('众筹')
    } else if (options.productType == 1) {
      console.log('普通商品')
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
    this.getProductDetail()



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
     
      this.dialogClose()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
    this.dialogClose()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (this.data.tabActive == 1) this.setData({
      page: 1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.tabActive == 1) this.setData({
      page: this.data.page + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    return {
      title: this.data.details.name + '现价:' + this.data.details.currentPrice + '元',
      path: '/pages/three-level/good-details/index?productType=' + onloadData.productType + '&id=' + onloadData.id
    }

  }
})
