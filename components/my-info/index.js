const app = getApp()
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
		},
	properties: {
		// level:{       //会员等级
		// 	type:String,
		// 	value:''
		// },
		// name:{
		// 	type:String,
		// 	value:''
		// },
		// head:{
		// 	type:String,
		// 	value:''
		// }
	},
	pageLifetimes:{
		show() {
			// console.log(app.globalData,'组件所在页面page')
		}
	},
	lifetimes:{
		created() {
			
		},
		attached() {
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
