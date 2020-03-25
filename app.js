const http = require('utils/http');
const config = require('./utils/config');


let isLocation = true

App({
	isLogin(){
		return 	Boolean(wx.getStorageSync('unionId'))     // 登录状态 false || true 需要页面直接调用 正常似乎用不到?
	},
	onLaunch: function () {
		//版本更新
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate(function (res) {
				console.log('onCheckForUpdate====', res)
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					console.log('res.hasUpdate====')
					updateManager.onUpdateReady(function () {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function (res) {
								console.log('success====', res)
								// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
								if (res.confirm) {
									// 新的版本已经下载好，调用 thislyUpdate 应用新版本并重启
									updateManager.thislyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function () {
						// 新的版本下载失败
						wx.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
						})
					})
				}
			})
		}
	},
	globalData: {
		logo:config.LOGO,
		imgUrl: config.IMG_URL,
		userInfo:  wx.getStorageSync('userInfo')|| '',
		unionId: wx.getStorageSync('unionId')|| '',
	},

	// 监听器 用来监听globalData中某个数据变化

	watchCallBack: {},
	watchingKeys: [],

	setGlobalData(name,data) {
		// let res = null
		// // 为了便于管理，应通过此方法修改全局变量
		// if(data.constructor === Object ) {
		// 	Object.keys(data).map(key => {
		// 		this.globalData[key] = data[key]
		// 	})
		// 	this.globalData.name = data
		// 	wx.setStorageSync(name, data)// 加入缓存
		// }

		this.globalData[name] = data
		wx.setStorageSync(name, data)// 加入缓存

	},

	$watch(key, cb) {
		this.watchCallBack = Object.assign({}, this.watchCallBack, {
			[key]: this.watchCallBack[key] || []
		});
		this.watchCallBack[key].push(cb);
		if (!this.watchingKeys.find(x => x === key)) {
			const that = this;
			this.watchingKeys.push(key);
			let val = this.globalData[key];
			Object.defineProperty(this.globalData, key, {
				configurable: true,
				enumerable: true,
				set(value) {
					const old = that.globalData[key];
					val = value;
					that.watchCallBack[key].map(func => func(value, old));
				},
				get() {
					return val
				}
			})
		}
	},
	// 获取定位
	getLocation() {
		let app = getApp()
		return new Promise(function (resolve, reject) {
			// 判断有定位数据 且时间间隔少于10s 才能重新获取数据
			if (isLocation && app.globalData.latitude && app.globalData.longitude) return resolve(true)
			isLocation = false
			wx.getLocation({
				type: 'gcj02',
				// isHighAccuracy: true,
				//   highAccuracyExpireTime: 3100,
				success: res => {
					let {latitude, longitude} = res
					app.globalData.latitude = latitude
					app.globalData.longitude = longitude
					resolve(true)
					setTimeout(_ => isLocation = true, 10000)
				},
				fail: err => {
					wx.hideLoading();
					wx.getSetting({
						success: function (res) {
							if (!res.authSetting['scope.userLocation']) {
								wx.showModal({
									title: '',
									content: '请允许澜庭公社获取您的定位',
									confirmText: '授权',
									success: function (res) {
										if (res.confirm) {
											wx.openSetting();
										} else {
											console.log('get location fail');
										}
									}
								})
							} else {
								//用户已授权，但是获取地理位置失败，提示用户去系统设置中打开定位
								wx.showModal({
									title: '',
									content: '请在系统设置中打开定位服务',
									confirmText: '确定',
									success: function (res) {
										res.confirm && that.getNearbyProduct()
									}
								})
							}
						},
						fail: reject
					})
				}
			})
		})
	}
})
