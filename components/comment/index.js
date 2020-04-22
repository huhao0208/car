import{ getAppraiseList }from '../../api'

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
		proId:{                    // 产品id
			type:String,
			value:''
		},
		showGotop:{      // 显示返回顶部
			type:Boolean,
			value:false
		}
	},
	observers:{
		'page'(page){
		//	console.log(val+"/"+this.data.type,'评论组件请求参数')
		if(page) this.getAppraiseList(page)

		}
	},
	data: {
		rateName:['非常差','差','一般','好','非常好'],
		loadType:1, 
		listData:[]
	},
	methods: {
		getAppraiseList(page){
			let that =this
			if(page==1) this.setData({listData:[],loadType:1})
			getAppraiseList({page,proId:this.data.proId,type:this.data.type})
			.then(res=>{

				let type =  (!res.total )?3:( res.pages == page )?2:1
				if(res.pages && res.pages<page) return
				that.setData({
					[`listData[${that.data.listData.length}]`]:res.list,
					loadType:type
				})

			})
		}
	}
});
