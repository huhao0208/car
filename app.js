const http = require('utils/http');
const config = require('./utils/config');
import { getUserDetail, getVersion } from "./api"
let isLocation = true


const oldPage = Page

Page = function (app) {

	// 不能用 卡爆了
	// app.onPageScroll =function(options){
	// 	console.log('屏幕滚动了');

	// 	if (options.scrollTop >= 400 &&options.scrollTop <1000 ) {
	// 		if (this.data.floorStatus) return
	// 		options.floorStatus = true

	// 	  } else if(options.scrollTop < 400) {
	// 		if (!this.data.floorStatus) return

	// 		options.floorStatus = false
	// 	  }

	// 	  if (typeof app.onPageScroll === 'function') {

	//         app.onPageScroll.call(this, options);
	//     }
	// }

	return oldPage(app)
}


App({
	onLaunch: function () {
		// 获取服务器版本 判断是否为dev 如果一致 则为线上版
		this.getVersion()

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

		// 获取本地存储的token
		this.globalData.unionId = wx.getStorageSync('unionId') || ''

		// 如果有token 直接获取用户信息 每次打开小程序更新用户信息
		if (this.globalData.unionId) {
			this.getUserDetailInfo()
		}


	},

	// 获取服务器版本
	getVersion({ success } = {}) {
		let that = this
		getVersion()
			.then(res => {
				that.globalData.isDev = Boolean(res)
				if (success && (typeof success == 'function')) success(Boolean(res))
				// if(!that.globalData.isDev)
				console.log('~~~~~ isDev:' + that.globalData.isDev + "版本:" + config.VERSION + "~~~~~~~~");
			})
	},


	globalData: {
		isDev: true,
		//	logo:config.LOGO,
		imgUrl: config.IMG_URL,
		apiImg: config.API_IMG,
		userInfo: {},
		unionId: '',
		showLogin: false,   // 用来控制登录弹窗开关
		latitude: 0, // 定位数据
		longitude: 0,
	},
	// 登录验证 在需要验证地方调用  用来控制所在页面login弹窗 ,传入的参数是 登录后要执行的方法
	isLogin(handle) {
		if (!this.globalData.unionId) {
			// 弹出登录框
			this.globalData.showLogin = true
			return false
		} else {
			// 执行回调函数
			if (typeof (handle) == "function") handle(this.globalData.userInfo)
			return true
		}
	},

	// 监听器 用来监听globalData中某个数据变化
	watchCallBack: {},
	watchingKeys: [],

	// 同步修改数据
	setGlobalData(name, data) {
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
	getLocation({ successFn, failFn }) {
		let app = getApp()
		if (app.globalData.latitude && app.globalData.longitude) return successFn({ latitude: app.globalData.latitude, longitude: app.globalData.longitude })
		wx.getLocation({
			type: 'gcj02',
			// isHighAccuracy: true,
			//   highAccuracyExpireTime: 3100,
			success: res => {
				let { latitude, longitude } = res
				app.globalData.latitude = latitude
				app.globalData.longitude = longitude
				successFn({ latitude, longitude })
			},
			fail: err => {
				wx.getSetting({
					success: function (res) {
						if (!res.authSetting['scope.userLocation']) {
							wx.showModal({
								title: '',
								content: '请允许获取您的定位',
								confirmText: '授权',
								success: function (res) {
									if (res.confirm) {
										wx.openSetting({
											success(res) {
												//	console.log('定位授权结果')
												if (res.authSetting.scope.userLocation) successFn({ latitude: app.globalData.latitude, longitude: app.globalData.longitude })
											}
										});
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
									console.log(res, '系统定位开启')
									app.getLocation()
								}
							})
						}
					},
					fail: _ => {
						console.log(_)
						failFn(_)
					}
				})
			}
		})

	},

	// 获取最新用户信息
	async getUserDetailInfo(successFn) {
		let res = await getUserDetail({ hideLoading: true })
		// mmp 小程序支持async await了啊
		this.setGlobalData("userInfo", res)
		if (typeof (successFn) == 'function') successFn(res)
	},

})
