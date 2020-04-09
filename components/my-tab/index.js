// 使用方法
// 1. plate tab请求分类数据参数 1 2 3
// 2. active 默认选中项 数字字符串 0 1 2
// 3. showGotop true false
// 4. tabChange事件监听 tab 改变
// 5.  loadType 底部样式    空数据3  加载中1 没有更多2
// 6.  showLoad true false  显示底部状态
import{getCategoryList} from "../../api"
Component({
	properties: {
		showLoad: {
			type:Boolean,
			value:true
		},
		loadType: {
			type: String|| Number,
			value: 1   // loading 1 || over 2 || null 3
		},
		plate: {     // 类型
			type: String || Number,
			value: 0,
		},
		active:{
			type: String || Number,
			value: 0,
		}   ,      // 默认选中的tab项index
		showGotop:{
			type:Boolean,
			value:false        // 是否显示gotop
		}
	},

	data: {
		list:[],
		tabActive:0
	},
	lifetimes:{
		attached() {
			getCategoryList({
				plate: this.data.plate/1
			})
				.then(res=>{
					this.setData({
						list:[{id:'',name:'全部',plate:this.data.plate},...res.list]
					})
					this.setData({
						tabActive:this.data.active/1,  // 设置默认选中项
					})
				//	console.log(this.data.showLoad+"/"+String(this.data.loadType),'showLoad/type------load状态')
				})

		},
	},
	pageLifetimes:{
		show() {
		//	this.triggerEvent("tabActiveId",activeId)
		}
	},
	methods: {
		tabChange(e){
			this.setData({
				tabActive:e.detail.index
			})
			let {sort,plate,id:categoryId} = this.data.list[e.detail.index]
			this.triggerEvent("tabChange",{
				...e.detail,
				sort,
				plate,
				categoryId

			})
		},
	},
});
