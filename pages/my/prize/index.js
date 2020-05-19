
import { postList, getBrandList, getWinningRecordList, usePrize } from "../../../api"

let page = 1;

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorStatus: false,  // 返回顶部
    loadType: 1,
    listData: [],     // 渲染列表用数据
    state: 0,        // tablan 索引
  },
  tabChange(e) {
    page = 1
    this.setData({
      state: e.detail.index
    }, _ => {
      this.getListData()
    })

  },
  jumpHandle(e) {
   let that =this
    // 判断type
    let type = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '',
      content: '确定使用?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          // xuyao 地址
          if (type == 1 || type == 2) {
            wx.navigateTo({
              url: '/pages/three-level/prize-address/index?id=' + id
            })
          }else{
          // 不需要地址
          usePrize({ id })
          .then(res => {
            page = 1
            that.getListData()
          })
         }
        }
      },
      fail: () => {},
      complete: () => {}
    });

  },
  // 去商品详情
  toGoodsDetail(e){
    console.log(e);
   let {type,goodsid:id} = e.currentTarget.dataset

   // type 1普通商品 2众筹商品 3 车主服务
	// 判断类型跳转对应页面 1 普通商品 2 众筹商品 3 金融贷款 4 汽车销售 5 合作商家
    // let url = (type == 1 || type == 2) ? `/pages/three-level/good-details/index?productType=${type}&id=${id}` : type == 3 ? '/pages/three-level/loan-details/index?id=' + id : type == 4 ? '/pages/three-level/car-details/index?id=' + id : type == 5 ? '/pages/three-level/cooperation-details/index?id=' + id : ''


    let url = (type == 1 || type == 2) ? `/pages/three-level/good-details/index?productType=${type}&id=${id}` : type == 3 ? '/pages/three-level/car-details/index?id=' + id : ''
    if (!url) return
    
		wx.navigateTo({
			url
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

  // 获取列表shuj
  getListData(e) {

    if (page == 1) {
      this.setData({
        listData: []
      })
    }
    getWinningRecordList({ page, state: this.data.state + 1 })
      .then(res => {
  
        let ltype = !res.total ? 3 : res.pages == res.page ? 2 : 1
        if (page > res.pages) res.list = ''
        this.setData({
          [`listData[${this.data.listData.length}]`]: res.list,
          loadType: ltype
        })
        page = res.page + 1
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.isDev) return this.setData({
      isDev:true
    })

    page = 1
    this.getListData()
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
    page = 1
    this.getListData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getListData()


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
