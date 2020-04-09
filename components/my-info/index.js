const app = getApp()
Component({
	properties: {
		level:{       //会员等级
			type:String,
			value:''
		},
		name:{
			type:String,
			value:''
		},
		head:{
			type:String,
			value:''
		}
	},
	pageLifetimes:{
		show() {
			// console.log(app.globalData,'组件所在页面page')
		}
	},
	lifetimes:{
		attached() {
			// console.log(app.globalData,'组件self')
			let userInfo = app.globalData.userInfo || wx.getStorageSync("userInfo")
			this.setData({
				userInfo
			})
		}
	},
	data: {
		vipArr:["","青铜会员","白银会员","黄金会员"]
	},
	methods: {

	}
});
