import{ getCarList }from '../../api'

Component({
	properties: {
		type:{          // 评价类型
			type:String,
			value:''
		},
		page:{
			type:Number|| String,  // 需要加载的页面
			value:0
		},
		showGotop:{      // 显示返回顶部
			type:Boolean,
			value:false
		}
	},
	observers:{
		page(val){
		//	console.log(val+"/"+this.data.type,'评论组件请求参数')
			// -------linshi -------
			this.setData({loadType:3})
			return  // 暂时无接口
			// -------linshi -------
			if(val>=1){
				getCarList({page:val})
					.then(res=>{
				//		console.log(res,'获取的评价列表')
						// 如果页码是1 则 直接赋值
						if(res.page==1){
							this.setData({
								listData:[res.list]
							})
						}else{
							this.setData({
								[`listData[${this.data.listData.length}]`]:res.list
							})
						}
						// 空数据 //	total == 0
						// 数据加载完毕 // pages == page && total!=0
						// 加载中 // pages > page  total!-0
						if(!res.total){this.setData({loadType:3})}
						else{
							if(res.pages == res.page){this.setData({loadType:2}) }
							else{this.setData({loadType:1})}
						}
					})
			}
		}
	},
	data: {},
	methods: {}
});
