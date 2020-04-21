

const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		vipArr: ["", "青铜会员", "白银会员", "黄金会员"]
	},
	// 页面跳转
	jumpHandle(e) {
		// console.log(e.target.dataset.url)
		app.isLogin(_ => {
			console.log('可以跳转到:' + e.target.dataset.url)
			if (!e.target.dataset.url) return
			wx.navigateTo({
				url: e.target.dataset.url
			})
		}
		)
	},
	// 点击登录 调起登录组件
	loginTap() {
		app.isLogin()
	},

	// 组件绑定的时间 用来实时获取登录的用户信息
	// 不需要了...
	// hasLogin(e) {
	// 	// console.log(e.detail,'登陆成功后获取的用户信息')
	// 	// 更新用户信息
	// //	this.onShow()

	// },

	// 完善个人信息
	improveInof() {
		wx.chooseAddress({
			success(res) {

			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			isDev: app.globalData.isDev,
			//	userInfo:app.globalData.userInfo
		})

		let that = this
		// 监控用户信息变化 防止登录状态过期 无响应
		app.$watch('userInfo', (val, old) => {
			that.setData({
				userInfo: val
			})
		})
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
		// 如果登录状态 则每次打开获取最新用户信息
		if (app.globalData.unionId) {
			app.getUserDetailInfo()
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

	}
})
