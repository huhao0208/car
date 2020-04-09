// pages/index/index.js
import { getAdvertList } from "../../../api"
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		search: '',
		userInfo: "",
		indexSwiperData: [], //轮播图数据
		cardsData: [
			{
				name: '汽车销售',
				bg: 'car.png',
				navigatorUrl: 'car-sales'
			}, {
				name: '金融贷款',
				bg: 'money.png',
				navigatorUrl: 'loan'
			}, {
				name: '车主服务',
				bg: 'service.png',
				navigatorUrl: 'service'
			}, {
				name: '精品商城',
				bg: 'mendian.png',
				navigatorUrl: 'mall'
			}, {
				name: '会员专享',
				bg: 'vip-3.png',
				navigatorUrl: 'vip-login'
			}, {
				name: '每日活动',
				bg: 'huodong.png',
				navigatorUrl: 'activity'
			}, {
				name: '合作专区',
				bg: 'hezuo.png',
				navigatorUrl: 'cooperation'
			}, {
				name: '更多精彩',
				bg: 'more.png',
				navigatorUrl: ''
			}
		]

	},
	// 获取轮播图数据
	_getAdvertList() {
		getAdvertList({ type: 1 })
			.then(res => {
				console.log(res)
				this.setData({
					indexSwiperData: res.list
				})
			})
	},
	// 轮播图跳转
	swiperToDetail(e) {
		console.log(e.currentTarget.dataset);

		// 判断类型跳转对应页面 1 普通商品 2 众筹商品 3 金融贷款 4 汽车销售 5 合作商家
		let type = e.currentTarget.dataset.type
		let id = e.currentTarget.dataset.id
		// `/pages/three-level/good-details/index?productType=${type}&id=${e.currentTarget.dataset.id}`
		let url = (type == 1 || type == 2) ? `/pages/three-level/good-details/index?productType=${type}&id=${id}` : type == 3 ? '/pages/three-level/loan-details/index?id=' + id : type == 4 ? '/pages/three-level/car-details/index?id=' + id : type == 5 ? '/pages/three-level/cooperation-details/index?id=' + id : ''

		wx.navigateTo({
			url
		})


	},
	onChange(e) {
		console.log(e)
		this.setData({
			search: e.detail
		})
	},
	//轮播图跳转
	jump(e) {
		console.log(e)
		let url = ''
		wx.navigateTo({ url })
	},
	// 跳转到汽车销售页面
	onSearch() {
		wx.navigateTo({
			url: '/pages/home/car-sales/index?search=' + this.data.search
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
		console.log(e.currentTarget.dataset.item);
		let item = e.currentTarget.dataset.item
		if (item.name == '会员专享') {
		
			// 判断用户信息
			let userInfo = app.globalData.userInfo || wx.getStorageInfoSync('userInfo')
			if(userInfo && userInfo.id>=1){
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
