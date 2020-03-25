// pages/index/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		indexSwiperData: [
			{
				id: 1,
				url: 'http://img5.imgtn.bdimg.com/it/u=1699290070,1429634299&fm=26&gp=0.jpg'
			}, {
				id: 2,
				url: 'http://img3.imgtn.bdimg.com/it/u=1075925060,2199011497&fm=11&gp=0.jpg'
			}
		], //轮播图数据
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
				navigatorUrl: 'exclusive'
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
				navigatorUrl: 'more'
			}
		]

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
