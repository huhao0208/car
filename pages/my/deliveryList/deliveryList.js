const app = getApp();
let prizePage= ''
import { getAddressList, deleteAddress } from "../../../api"
Page({

    /**
     * 页面的初始数据
     */
	data: {
		page: 1,
		addressList: [],  //地址列表
		activeIndex: 0,    //默认设置
	},

	//新增收货地址
	addAddress() {
		wx.navigateTo({
			url: '/pages/my/r-address/index'
		})
	},

	//获取地址列表
	getAddressList() {
		getAddressList({})
			.then(res => {
				this.setData({
					addressList: res.list
				})
			})
	},

	//编辑--修改地址信息
	editAddress(e) {
	//	console.log(e.currentTarget.dataset.info)
		if (!e.currentTarget.dataset.info) {
			wx.navigateTo({
				url: `/pages/my/r-address/index`
			})
		} else {
			let { address, area, city, contact, createTime, id, phone, province } = e.currentTarget.dataset.info
			wx.navigateTo({
				url: `/pages/my/r-address/index?address=${address}&area=${area}&contact=${contact}&createTime=${createTime}&city=${city}&id=${id}&phone=${phone}&province=${province}`
			})
		}


	},
	onclose() {

	},
	// 地址操作
	clickHandle(e) {
		// console.log(e)
		// const instance = e.detail
		let that = this
	//	console.log(e.currentTarget.dataset)
		if (e.detail == 'right') {
			// 判断当前要删除的地址是否为默认 如果默认 则无法删除\
			let currentAddress = wx.getStorageSync("currentAddress") || app.globalData.currentAddress
			if (currentAddress && (currentAddress.id == e.currentTarget.dataset.info.id)) {
				wx.showToast({
					title: '当前为选中的默认地址,无法删除',
					icon: "none"
				})
			} else {
				// 删除地址
				wx.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: function (sm) {
						if (sm.confirm) {
							deleteAddress({ id: e.currentTarget.dataset.info.id })
								.then(res => {
									wx.showToast({
										title: '删除成功'
									})
									that.getAddressList()

								})

						} else if (sm.cancel) {
							// instance.close()
						}
					}
				})
			}


		} else if (e.detail == 'left') {
			// 选择地址
			app.setGlobalData("currentAddress", e.currentTarget.dataset.info)
		//	console.log(e.currentTarget.dataset.info);

			this.setData({
				selctedId: e.currentTarget.dataset.info.id
			})
			wx.showToast({ title: '设置成功', icon: 'success' })

			let time = setInterval(_ => {
				clearInterval(time)
				time =null
				try {
					wx.navigateBack()
				} catch (error) {

				}
			}, 500)
			// instance.close()
		} else {
			// 选择地址
			app.setGlobalData("currentAddress", e.currentTarget.dataset.info)
		//	console.log(e.currentTarget.dataset.info);

			this.setData({
				selctedId: e.currentTarget.dataset.info.id
			})
			wx.showToast({ title: '设置成功', icon: 'success' })

			let time = setInterval(_ => {
				clearInterval(time)
				time =null
				try {
					wx.navigateBack()
				} catch (error) {

				}
			}, 500)
		
		}
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
		let selctedId = wx.getStorageSync('currentAddress').id
		this.setData({
			selctedId
		})
	},

    /**
     * 生命周期函数--监听页面显示
     */
	onShow: function () {
		 if(app.globalData.isDev) return this.setData({
			      isDev:true
			    })
			
			
		this.getAddressList();
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
	// onShareAppMessage: function () {
	//
	// }
})
