

const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userIfo:{},
		vipArr:["","青铜会员","白银会员","黄金会员"]
	},
	// 页面跳转
	jumpHandle(e) {
		// console.log(e.target.dataset.url)
		app.isLogin(_ => {
				console.log('可以跳转到:' + e.target.dataset.url)
				if(!e.target.dataset.url) return
				wx.navigateTo({
					url: e.target.dataset.url
				})
			}
		)
	},
	loginTap(){
		app.isLogin()
	},
	// 组件绑定的时间 用来实时获取登录的用户信息
	hasLogin(e) {
		// console.log(e.detail,'登陆成功后获取的用户信息')
		// 可以在此更新用户信息
		this.getUserInfo()
	},

	// 获取用户信息 及登录状态
	getUserInfo() {
		// 登录的状态
		let userInfo =  app.globalData.userInfo || wx.getStorageSync('userInfo')
		this.setData({
			userInfo
		})
	},
	improveInof(){
		wx.chooseAddress({
			success(res) {
				console.log(res,'地执信息')
			}
		})
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
		this.getUserInfo()
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
