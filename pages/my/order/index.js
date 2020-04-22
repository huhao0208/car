// pages/my/index.js
import {jump} from "../../../utils/util";
import {getOrderList} from "../../../api"

const app = getApp()
let page = 1
let type =1  // 页面状态 1 普通 2众筹
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		loadType: 1,
		showLoad: true,
		floorStatus: false,  // 返回顶部
		listData: [],     // 渲染列表用数据
		state:123
	},

	  //屏幕滚动  返回顶部用
	  onPageScroll(e){
		if (e.scrollTop >= 400 &&e.scrollTop <1000 ) {
		  if (this.data.floorStatus) return
		  this.setData({
			floorStatus: true
		  });
		} else if(e.scrollTop < 400) {
		  if (!this.data.floorStatus) return
		  this.setData({
			floorStatus: false
		  })
		}
	  },
	tabChange(e){
		page=1
		this.setData({
			state:e.detail.index==0?123:5,
			type:1

		},_=>{
			this.getListData()
		})

	},
	// 获取订单列表数据
	getListData() {
		if(page==1) this.setData({
			listData:[],
			type:1
		})
		getOrderList({page, type:type/1,state:this.data.state})
			.then(res => {
				wx.stopPullDownRefresh()
				let ltype = (!res.total) ? 3 : (res.page == res.pages) ? 2 : 1
				if ( res.pages && page > res.pages)  return
				this.setData({
					loadType: ltype,
					[`listData[${this.data.listData.length}]`]: res.list,
				})
				page = res.page + 1
				
			})

	},
	// 去订单详情
	toOrderDetail(e) {
		// console.log(e)
		 console.log(e.currentTarget.dataset.item)
		 this.setData({
			 currentData:e.currentTarget.dataset.item
		 })
		wx.navigateTo({
			url: '/pages/three-level/order-details/index?orderId='+ e.currentTarget.dataset.orderid
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		 if(app.globalData.isDev) return this.setData({
			      isDev:true
			    })
			

		if(app.globalData.isDev) return

		type= options.type
		wx.setNavigationBarTitle({
			title:type==1?'我的订单':'我的众筹'
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
