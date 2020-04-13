
Component({
	externalClasses: ['loadmore-class'],

	properties: {
		showGotop:{
			type:Boolean,
			value:false
		},
		loadType:{    //
			type:Number || String,
			value:1
		},
		//显示文本
		text: {
			type: String,
			value: "正在加载..."
		},
		//是否可见
		showLoad: {
			type: Boolean,
			value: true
		},
		//loading 样式 ：1,2,3
		index: {
			type: Number,
			value: 1
		},
		//颜色设置，只有index=3时生效：primary，red，orange，green
		type: {
			type: String,
			value: ""
		}
	},
	data: { },
	methods:{
		// 返回顶部
		goTop(){
		//	console.log('返回顶部')
			if (wx.pageScrollTo) {
				wx.pageScrollTo({
					duration: 0,
					scrollTop: 1000,
					success: function () {
						wx.pageScrollTo({
							duration: 100,
							scrollTop: 0
						})
					}
				})
			} else {
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
		},
	}
});
