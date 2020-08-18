import {
	sL,
	hL,
	sT
} from './util'
const config = require('./config')
const base_url = config.API_ROOT;
const request = function (method, url, data) {
	const app = getApp()
	
	return new Promise((resolve, reject) => {
		
		// 请求头信息
		let header = {
			'content-type': 'application/json'
		}
		header['X-Version'] = config.VERSION

		try {
			let apptoken =(app&&app.globalData.unionId)? app.globalData.unionId:''
			let value = wx.$unionId ? wx.$unionId : apptoken //wx.getStorageSync('unionId')
			console.log(apptoken,'httpapp');
			// getStorageSync有坑
			// let value = wx.getStorageSync('unionId')? wx.getStorageSync('unionId') : ''
			if (value) {
				header['Authorization'] = `${value}`;
			}
			// header['appId'] = config.APPID;
		} catch (e) {
			// Do something when catch error
			console.log(e, '请求头err')
		}
		// 判断请求api是否完整 并补全
		let reqUrl = url.startsWith('http') ? url : base_url + url
		let isShowLoading = false
		// 发送请求 当获取分页数据时不显示loading  如果不需显示loading 则在请求的参数中添加hideLoading即可
		try {
			//	console.log(data.page, 'dataPage')
			if ((!data.page || data.page == 1) && !data.hideLoading) {
				wx.showLoading({
					title:'请稍候...'
				})
				 isShowLoading = true
			}
			
			if (data.hideLoading) delete data.hideLoading
		} catch (e) {

		}
		console.log('请求参数',{
			header,
			url: encodeURI(reqUrl),
			method,
			data
		});
		
		wx.request({
			url: encodeURI(reqUrl),
			method: method,
			data: data,
			header: header,
			success: (res) => {
				console.log(...url.split('/').slice(-1), res.data);
				if(isShowLoading) wx.hideLoading()
				
				if (res.data.code == 401) {
					sT('登录状态过期,请重新登录', 'none')
					app.setGlobalData('unionId', '')
					app.setGlobalData('userInfo', {})
					app.globalData.showLogin = true
					reject(res)
					return
				}
				// // 返回结果判断拦截
				
				if (res.data && res.data.code == 200) {
					resolve(res.data.result)
				} else {
					(res.data.message) && sT(res.data.message, 'none')

				}
			},
			fail: (err) => {
				sT('网络异常,请检查网络连接', 'none')
				// wx.showToast({
				// 	title: '网络异常,请检查网络连接',
				// 	icon: 'none'
				// })
				console.log(err, '网络请求出错')
				console.log(data, url);

				reject({
					url
				})
			},
			complete(res) {

			}
		})
	})
}
const get = function (url, data = {}) {
	return new request("GET", url, data)
}
const post = function (url, data = {}) {
	return new request("POST", url, data)
}
module.exports = {
	http: request,
	get: get,
	post: post,
	base_url: base_url
}