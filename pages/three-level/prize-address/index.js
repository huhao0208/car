// 收货地址
import {
	saveOrUpdateAddress,
	consultCarInfo,
	applyFinancialLoan,
	usePrize
} from "../../../api"
import areaList from "../../../components/area"

const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		options: {}, // 跳转过来接收的参数
		sex: 1, // 1男 2女
		imgUrl: '',
		areaList: '',
		isShowAera: false,
		address: [{
			name: '请选择'
		}, {
			name: '请选择'
		}, {
			name: '请选择'
		}], // 选择的地址
		pageData: '' // 上一个页面的data数据

	},

	// 去地址列表
	toAddressList() {
		wx.navigateTo({
			url: '/pages/my/deliveryList/deliveryList'
		})
	},
	toSelectAddress(e) {
		this.setData({
			isShowAera: true
		})
	},
	onCloseAera() {
		this.setData({
			isShowAera: false
		})
	},
	// 选择地址
	addressSelected(e) {
		let address = e.detail.values
		//console.log(address)
		this.setData({
			[`currentAddress.province`]: address[0].name,
			[`currentAddress.city`]: address[1].name,
			[`currentAddress.area`]: address[2].name,
			isShowAera: false
		})
	},
	iptAddressHandle(e) {

		this.setData({
			[`currentAddress.address`]: e.detail.value,
			iptAddress: e.detail.value
		})
	},
	// // 性别 选择
	selcetSexHandle(e) {

		this.setData({
			'currentAddress.sex': e.detail,
			sex: e.detail,
		})
	},
	iptNameHandle(e) {
		this.setData({
			[`currentAddress.contact`]: e.detail.value,
			[`currentAddress.name`]: e.detail.value
		})
	},
	iptPhoneHandle(e) {
		this.setData({
			[`currentAddress.phone`]: e.detail.value,
		})
	},
	// 提交
	submitHandle() {

		usePrize({
				...this.data.currentAddress,
				id: this.data.id
			})
			.then(_ => {
				wx.showToast({
					title: '提交成功'
				})

				try {
					// 刷新上一页数据
					let prevPage = getCurrentPages().slice(-2)[0]
					prevPage.tabChange({
						detail: {
							index: 1
						}
					})

				} catch (error) {
					console.log(error);
					
				}

				let time = setInterval(_ => {
					clearInterval(time)
					time = null
					wx.navigateBack()
				}, 1000)
			})

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			id: options.id,
			areaList
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
		let currentAddress = wx.getStorageSync('currentAddress') || app.globalData.currentAddress || ''
		this.setData({
			currentAddress
		})

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