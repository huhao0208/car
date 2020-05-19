// pages/index/index.js
import { getAdvertList,getHomePage } from "../../../api"
const app = getApp()
// let cardList = [
// 	{
// 		name: '汽车销售',
// 		bg: 'car.png',
// 		navigatorUrl: 'car-sales'
// 	}, {
// 		name: '金融贷款',
// 		bg: 'money.png',
// 		navigatorUrl: 'loan'
// 	}, {
// 		name: '车主服务',
// 		bg: 'service.png',
// 		navigatorUrl: 'service'
// 	}, {
// 		name: '精品商城',
// 		bg: 'mendian.png',
// 		navigatorUrl: 'mall'
// 	}, {
// 		name: '会员专享',
// 		bg: 'vip-3.png',
// 		navigatorUrl: 'vip-login'
// 	}, {
// 		name: '每日活动',
// 		bg: 'huodong.png',
// 		navigatorUrl: 'activity'
// 	}, {
// 		name: '合作专区',
// 		bg: 'hezuo.png',
// 		navigatorUrl: 'cooperation'
// 	}, {
// 		name: '更多精彩',
// 		bg: 'more.png',
// 		navigatorUrl: ''
// 	}
// ]
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isDev:false,
		search: '',
		userInfo: "",
		indexSwiperData: [], //轮播图数据
		cardsData:[]

	},
	// 获取轮播图数据
	_getAdvertList() {
		getAdvertList({ type: 1 })
			.then(res => {
				this.setData({
					indexSwiperData: res.list
				})
			})
	},
	// 轮播图跳转
	swiperToDetail(e) {
		if(this.data.isDev) return
		// 判断类型跳转对应页面 1 普通商品 2 众筹商品 3 金融贷款 4 汽车销售 5 合作商家
		let type = e.currentTarget.dataset.type
		let id = e.currentTarget.dataset.id
		// `/pages/three-level/good-details/index?productType=${type}&id=${e.currentTarget.dataset.id}`
		let url = (type == 1 || type == 2) ? `/pages/three-level/good-details/index?productType=${type}&id=${id}` : type == 3 ? '/pages/three-level/loan-details/index?id=' + id : type == 4 ? '/pages/three-level/car-details/index?id=' + id : type == 5 ? '/pages/three-level/cooperation-details/index?id=' + id : ''

		wx.navigateTo({
			url
		})


	},
	// 获取卡片数据
	getHomePage(){
		getHomePage()
		.then(res=>{
			this.setData({
				cardsData:res
			})
		})
	},
	onChange(e) {
		this.setData({
			search: e.detail
		})
	},
	// 跳转到汽车销售页面
	onSearch() {
		wx.navigateTo({
			url: '/pages/home/car-sales/index?keyword=' + this.data.search
		})
	},
	// 未开放
	unopened() {
		wx.showModal({
			title: '提示',
			content: '暂未开放,敬请期待',
			// confirmColor:'#ccc',
			showCancel: false,
			success(res) {

			}
		})
	},

	// 页面跳转
	toPage(e) {
		let item = e.currentTarget.dataset.item
		if (item.name == '会员专享') {
		
			// 判断用户信息
			let userInfo = app.globalData.userInfo || wx.getStorageInfoSync('userInfo')
			if(userInfo && userInfo.vip>=1){
				// 会员 进入会员专享
				wx.navigateTo({
					url: '/pages/vip/index/index'
				})	
			}else{
				// 非会员或者未登录 进入开通页面
				wx.switchTab({
					url: '/pages/vip-code/index/index'
				})
			}
		}else if(item.name=='更多精彩'){

			this.unopened()

		} else {
			wx.navigateTo({
				url: '/pages/home/' + item.navigatorUrl + '/index'
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that =this
		this.getHomePage()


		app.getVersion({
			success(res){
				that.setData({
					isDev:Boolean(res)
				})
			}
		})
		this._getAdvertList()
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

		// 判断是否有 cardsData 如果没有则重新获取
		if(!this.data.cardsData.length ||!this.data.indexSwiperData.length ) this.onLoad()

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
