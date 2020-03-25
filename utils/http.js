import{sL,hL,sT,jump} from './util'

const config = require('./config')
const base_url = config.API_ROOT;
const request = function (method,url,data) {

	return new Promise((resolve, reject) => {
		// 请求头信息
		let header = {'content-type': 'application/json'}
		try {
			let value = wx.getStorageSync('unionId')
			if (value) {
				header['Authorization'] = `Bearer ${value}`;
				header['token'] = value;
				header['unionId'] = value;    // token
			}
			header['version'] = config.VERSION
			header['appId'] = config.APPID;
		} catch (e) {
			// Do something when catch error
		}
		// 判断请求api是否完整 并补全
		let reqUrl = url.startsWith('http') ? url : base_url +url

		// 发送请求
		sL('请稍候...')
		wx.request({
			url: encodeURI(reqUrl),
			method: method,
			data: data,
			header: header,
			success: (res) => {
				// 返回结果判断拦截
				if(res.data.result !=1) return sT(res.data.msg)

				if (res.data.result == -1) return jump('/pages/login/index')

				resolve(res.data.data)
			},
			fail: (err) => {
				sT("网络请求出错,请稍候再试!")
				console.log(err,'网络请求出错')
				reject(err)
			},
			complete(res) {
				hL()
			}
		})
	})

}

module.exports = {
	// get: request('GET'),
	// post: request('POST'),
	// delete: request('DELETE'),
	// put: request('PUT'),
	http: request,
	base_url: base_url
}
