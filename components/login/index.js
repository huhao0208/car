// 组件自动监控登录状态  如果需要登录 则直接调用 app.isLogin() 括号里面传递需要登录后处理的函数
// 组件通过hasLogin 绑定事件获取登录状态  接收参数为微信用户昵称 头像
import { xcxLogin } from "../../api"
//获取应用实例
const app = getApp()
let requestData = {
	encryptedData: '',   // 户信息的加密数据
	enIv: '',            // 用户信息加密算法的初始向量
	telNumber: '',        // 手机号码
	iv: '',                // 手机iv
	code: '',           // 用户登录凭证（有效期五分钟）。后台调用 auth.code2Session，使用 code 换取 openid 和 session_key 等信息
	username: '',        // userInfo.nickName
	userhead: ''         // userInfo.avatarUrl
}

Component({
	behaviors: [],
	properties: {
		showLogin: {     // 控制是否需要展示
			type: Boolean,
			value: false
		},
	},

	data: {
		isLogin: false,
		openType: 'getUserInfo',
		userInfo: {},
		hasUserInfo: false,
	}, // 私有数据，可用于模板渲染

	lifetimes: {
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		attached: function () {
			// 先判断是否有登录吗 有的话直接不用往下执行
			if (app.globalData.unionId) return this.setData({
				isLogin: true
			})
			app.$watch('showLogin', (val, old) => {
				// 处理全局变量
				console.log(val, 'showLogin变化了')

				this.setData({
					showLogin: Boolean(val)
				})
			})
			// 在这里全局监控登录状态 如果登录 则不展示
			app.$watch('unionId', (val, old) => {

				// 处理全局变量
				console.log(val, 'unionId变化了')
				this.setData({
					isLogin: Boolean(val)
				})
				wx.nextTick(_ => {
					// 登录成功后获取用户信息
					if (val) {
						app.getUserDetailInfo()
					}
				})
			})

		},
		moved: function () { },
		detached: function () { },
	},

	// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
	// attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
	// ready: function() { },

	pageLifetimes: {
		// 组件所在页面的生命周期函数
		show: function () {
		},
		hide: function () { },
		resize: function () { },
	},

	methods: {
		// 取消登录
		_loginCancel() {
			this.setData({
				showLogin: false
			})
		},
		getUserInfo(e) {
		//	console.log(e)
			if (!e.detail.iv) return wx.showToast({ title: '获取用信息失败,请稍候再试' })
			// app.globalData.userInfo = e.detail.userInfo
			requestData = {
				...requestData,
				encryptedData: e.detail.encryptedData,
				enIv: e.detail.iv,
				username: e.detail.userInfo.nickName,
				userhead: e.detail.userInfo.avatarUrl
			}
			this.setData({
				openType: 'getPhoneNumber'
			})
		},

		getPhoneNumber(e) {
			let that = this
			if (!e.detail.iv) return wx.showToast({
				title: '获取手机号码失败,请稍候再试',
				icon: 'none'
			})
			requestData = {
				...requestData,
				telNumber: e.detail.encryptedData,
				iv: e.detail.iv
			}
			wx.login({
				success(res) {
					requestData.code = res.code
					that.login()
				},
				fail(res) {
					console.log('获取登录code失败!' + res.errMsg)
				}
			})
		},
		login() {
			let that = this
			//	console.log(requestData,'requestData')
			// 不需要对用户信息解密
			let { code, telNumber: encryptedData, iv, username, userhead } = requestData
			let newReq = { code, encryptedData, iv, username, userhead }
			xcxLogin(newReq)
				.then(
					res => {
					//	console.log(res, '登录成功')
						//选择数据存储
						app.setGlobalData('unionId', res.token)

						// 从后台获取用户信息
						app.getUserDetailInfo(
							res => {
								// 也可以通过在组件绑定事件 通过登录状态的改变触发事件 并传递参数
								this.triggerEvent('hasLogin', res)
								wx.showToast({title:'登录成功'})
							}
						)


					}
				).catch(err => {
					console.log(err)

					that.setData({
						openType: 'getUserInfo',
					}, _ => {
						console.log('登录失败重新登录')
						app.setGlobalData('userInfo', "")
						app.setGlobalData('unionId', "")

					})
				})
		},

	}
});
