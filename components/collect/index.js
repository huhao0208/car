const app = getApp()
import {collectProduct,removeCollect,judgeCollect } from "../../api"

Component({
	properties: {
		proid:{
			type:String,
			value:''
		},
		type:{
			type:String||Number,
			value:1           // 1 普通商品 2 众筹商品 3 金融贷款 4 汽车销售
		},
		size:{
			type:String|| Number,
			value:50
		}
	},
	data: {
		isCollelected:false   // 未收藏
	},
	observers:{
		proid(nval,oval){
		//	console.log(nval,oval)
		//	console.log('proid')
			if(nval){
				this.judgeCollect()
			}
		}
	},
	lifetimes:{
		attached() {

		}
	},
	methods: {
		// 点击
		collection(){
			if(!this.data.isCollelected){
					this.collectProduct()
			}else{
				this.removeCollect()
			}
		},
		// 收藏
		collectProduct(){
			let that = this
			collectProduct({type:this.data.type,proId:this.data.proid})
				.then(_=>{
						that.judgeCollect()
				})
		},
		// 移除收藏
		removeCollect(){
			let that = this
			removeCollect({type:this.data.type,proId:this.data.proid})
				.then(_=>{
					that.judgeCollect()
				})
		},
		// 获取收藏状态
		judgeCollect(){
			judgeCollect({type:this.data.type,proId:this.data.proid})
				.then(res=>{
				//	console.log(res,'获取的收藏状态')
					this.setData({
						isCollelected: Boolean(res)
					})
				})
		}
	}
});
