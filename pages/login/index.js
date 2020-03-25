//index.js  unionId
import { sT,goBack} from'../../utils/util'
import {http } from '../../utils/http'
//获取应用实例
const app = getApp()
let requestData = {
	encryptedData: '',   // 户信息的加密数据
	enIv: '',            // 用户信息加密算法的初始向量
	telNumber: '',        // 手机号码
	iv: '',                // 手机iv
	code: '',           // 用户登录凭证（有效期五分钟）。后台调用 auth.code2Session，使用 code 换取 openid 和 session_key 等信息
	username: '',        // userInfo.nickName
	userhead: ''         // userInfo.avatarUrl
}
Page({
	data: {
		openType: 'getUserInfo',
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUseI: wx.canIUse('button.open-type.getUserInfo'),   // 判断接口是否可用
		canIUseN: wx.canIUse('button.open-type.getPhoneNumber'),   // 判断接口是否可用
	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},

	onLoad: function () {

		wx.login({
          success(res) {
            requestData.code  = res.code
          },
          fail(res) {
            console.log('登录失败！' + res.errMsg)
          }
        })
	},

	getUserInfo (e) {
		console.log(e)
		if(!e.detail.iv) return  sT("获取用户信息失败,请稍候再试")
		// app.globalData.userInfo = e.detail.userInfo
		requestData = {
			...requestData,
			encryptedData: e.detail.encryptedData,
			enIv: e.detail.iv,
			username: e.detail.userInfo.nickName,
			userhead: e.detail.userInfo.avatarUrl
		}

		wx.setStorageSync('userInfo', e.detail.userInfo)

		this.setData({
			openType:'getPhoneNumber'
		})
	},

	getPhoneNumber(e){
		if(!e.detail.iv) return  sT("获取手机号码失败,请稍候再试")
		requestData = {
			...requestData,
			telNumber: e.detail.encryptedData,
			iv: e.detail.iv
		}

		this.login()
	},

	login(){

		http('POST','weixin/xcxRegist.html',requestData)
			.then(
				res=>{
					console.log(res,'登录成功')
					//选择数据存储

					app.setGlobalData('unionId',res.userInfo.unionId)
					app.setGlobalData('userInfo',res.userInfo)
					wx.navigateBack()
				}
			)
	},

	// 取消登录
	loginCancel(){
		wx.navigateBack()
	}

})
