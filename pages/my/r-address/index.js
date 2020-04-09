// 收货地址
import { saveOrUpdateAddress, consultCarInfo, applyFinancialLoan, usePrize } from "../../../api"
import areaList from "../../../components/area"

const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		options: {},     // 跳转过来接收的参数
		sex: 1,  // 1男 2女
		imgUrl: '',
		areaList: '',
		isShowAera: false,
		address: [
			{ name: '请选择' }, { name: '请选择' }, { name: '请选择' }
		],  // 选择的地址
		pageType: 'address',     // 页面类型
		pageData: ''             // 上一个页面的data数据

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
		console.log(address)
		this.setData({
			[`options.province`]: address[0].name,
			[`options.city`]: address[1].name,
			[`options.area`]: address[2].name,
			isShowAera: false
		})
	},
	iptAddressHandle(e) {
		console.log(e.detail.value)
		this.setData({
			[`options.address`]: e.detail.value,
			iptAddress: e.detail.value
		})
	},
	// // 性别 选择
	selcetSexHandle(e) {
		console.log(e)
		this.setData({
			'options.sex': e.detail,
			sex: e.detail,
		})
	},
	iptNameHandle(e) {
		this.setData({
			[`options.contact`]: e.detail.value,
			[`userInfo.name`]: e.detail.value
		})
	},
	iptPhoneHandle(e) {
		this.setData({
			[`options.phone`]: e.detail.value,
		})
	},
	// 提交
	submitHandle() {
		if (!this.data.options.contact || !this.data.options.province || !this.data.options.phone || !this.data.options.city || !this.data.options.area)  return wx.showToast({title:'请输入完整信息',icon:'none'})

		// 手机号码验证
		let reg =  /^[1]([3-9])[0-9]{9}$/
		if(!reg.test(this.data.options.phone)) return wx.showToast({title:'请输入正确的手机号码',icon:"none"})

		// 判断是否为默认地址 如果是默认的地址 还需修改 app.globalData 以及本地缓存的地址
	try {
		let currentaddressId = wx.getStorageSync('currentAddress').id|| app.globalData.currentaddress.id || ''
		if(this.data.options.id&& (this.data.options.id ==currentaddressId) ){
			app.setGlobalData('currentAddress',this.data.options)
		}
	} catch (error) {
		console.log(error);
		
	}

		if (this.data.pageType == 'car-details' || this.data.pageType == 'loan-details' || this.data.pageType == 'prize') {
			// 购车咨询
			this.data.options.proId = this.data.pageData.id
			this.data.options.proName = this.data.pageData.name
			this.data.options.fullName = this.data.options.contact
			this.data.options.sex = this.data.sex
			let fn = this.data.pageType == 'car-details' ? consultCarInfo : this.data.pageType == 'loan-details' ? applyFinancialLoan : usePrize


			if (this.data.pageType == 'prize') {
				console.log(this.data.options);
				this.data.options.id = this.data.pageData.id
				let { contact, phone, province, city, area, address } = this.data.options

			}
			fn(this.data.options)
				.then(res => {
					console.log(res)
					wx.showToast({
						title: '提交成功',
						success(res) {
							setTimeout(_ => {
								wx.navigateBack()
							}, 1000)
						}
					})
				})


		} else {

			// 修改新增地址
			saveOrUpdateAddress(this.data.options)
				.then(res => {
					console.log(res)
					wx.navigateBack()
				})
		}

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		let pages = getCurrentPages()
		let page = pages[pages.length - 2] || ''
		// 如果是从 汽车销售过来的
		if (page && page.route == 'pages/three-level/car-details/index') {
			console.log(page.data.carInfo)
			this.setData({
				pageType: 'car-details',
				pageData: page.data.carInfo
			})
		} else if (page && page.route == 'pages/three-level/loan-details/index') {
			this.setData({
				pageType: 'loan-details',
				pageData: page.data.details
			})

		}else {
			this.setData({
				options,
				pageType:null
			})
		}
		this.setData({
			areaList: areaList
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
