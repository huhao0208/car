// 该组件使用 不用判断登录状态 只需通过 bindshowLogin 用来控制是否显示

const app = getApp()
Component({
	behaviors: [],

	properties: {
		showLogin: { // 控制是否需要展示
			type: Boolean,
			value: true
		},
	//	myProperty2: String // 简化的定义方式
	},

	data: {
		isLogin:false
	}, // 私有数据，可用于模板渲染

	lifetimes: {
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		attached: function () {
			console.log(app.globalData.unionId)
			if(app.globalData.unionId) return this.setData({
				isLogin:true
			})

			// 在这里全局监控登录状态 如果登录 则不展示
			app.$watch('unionId', (val, old) => {
				// 处理全局变量
				console.log(val, 'unionId变化了')
				this.setData({
					isLogin:true
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
			this.setData({
				showLogin:true
			})

		},
		hide: function () { },
		resize: function () { },
	},

	methods: {
		// 取消登录
		_loginCancel(){
			this.setData({
				showLogin:false
			})
		}


		// _propertyChange: function(newVal, oldVal) {
		//
		// }
	}
});
