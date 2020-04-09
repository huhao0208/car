import{sL,hL} from './util'

const config = require('./config')
const base_url = config.API_ROOT;

const request = function (method,url,data) {
	const app = getApp()
	return new Promise((resolve, reject) => {
		// 请求头信息
		let header = {'content-type': 'application/json'}
		try {
			let value = wx.getStorageSync('unionId')
			if (value) {
				//header['Authorization'] = `Bearer ${value}`;
				header['Authorization'] = `${value}`;
				// header['token'] = value;
				// header['unionId'] = value;    // token
			}
			// header['version'] = config.VERSION
			// header['appId'] = config.APPID;
		} catch (e) {
			// Do something when catch error
			console.log(e,'请求头err')
		}
		// 判断请求api是否完整 并补全
		let reqUrl = url.startsWith('http') ? url : base_url +url

		// 发送请求 当获取分页数据时不显示loading
		try{
			console.log(data.page,'dataPage')
			if(data.page && data.page ==1) sL('请稍候...')
		}catch(e) {}

		wx.request({
			url: encodeURI(reqUrl),
			method: method,
			data: data,
			header: header,
			success: (res) => {
				// console.log(res,'http')
				if (res.data.code == 401)  {
					wx.showToast({
						title:'登录状态过期,请重新登录',
						icon:'none'
					})

					app.setGlobalData('unionId','')
					app.globalData.showLogin = true

					return
				}
				// // 返回结果判断拦截
				// if(res.data.result.code ==500) return
				if(res.data && res.data.code== 200) {  resolve(res.data.result)}
				else {
					(res.data.message) &&  wx.showToast({
						title:res.data.message,
						icon:'none'
					})
					let resData = {total:0}
					resolve(resData)
					//reject(res)
					console.log(res,'出错了')
				}

			},
			fail: (err) => {
				wx.showToast({
					title:'网络异常,请检查网络连接',
					icon:'none'
				})
				console.log(err,'网络请求出错')
				reject(err)
			},
			complete(res) {
				hL()
			}
		})
	})
}
const get =function (url,data) {
    return 	new request("GET",url,data)
}
const post = function (url,data) {
	return new request("POST",url,data)
}
module.exports = {
	http: request,
	get:get,
	post:post,
	base_url: base_url
}
