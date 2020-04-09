
import {get,post} from "./utils/http"
module.exports = {
	// 登录

	// api/xcxLogin
	xcxLogin:data=>post('api/xcxLogin',data),
	// 获取用户信息getUserDetail
	getUserDetail:data=>post('api/getUserDetail',data),
	//获取收货地址信息
	getAddressList:data=>post('api/getAddressList',data),

	//删除地址
	deleteAddress:data=>post('api/deleteAddress',data),
	//修改地址 新增地址
	saveOrUpdateAddress:data=>post('api/saveOrUpdateAddress',data),

	// 公用
	// 获取产品列表
	getProductList:data=>post('api/getProductList',data),

	// 获取产品详情
	getProductDetail:data=>post('api/getProductDetail',data),
	// 评价

	// 分类列表
	getCategoryList: data => post('api/getCategoryList',data),


	// test
	postList: data => post('/weixin/index/getRecommendCommunity.html',data),

	// 获取首页轮播图数据  api/getAdvertList
	getAdvertList: data => post('api/getAdvertList',data),

	/*
	汽车销售
	 */
	//  精选品牌 api/getBrandList
	getBrandList: data => post('api/getBrandList',data),
	// 汽车列表 api/getCarList
	getCarList: data => post('api/getCarList',data),
	// 车辆详细信息 getCarDetail
	getCarDetail: data => post('api/getCarDetail',data),

	// 金融贷款列表
	getFinancialLoanList:data=>post('api/getFinancialLoanList',data),
	// 金融贷款获取详情
	getFinancialLoanDetail:data=>post('api/getFinancialLoanDetail',data),

	// 车主服务列表
	getVehicleOwnerList:data=>post('api/getVehicleOwnerList',data),
	// 车主服务详情
	getVehicleOwnerDetail:data=>post('api/getVehicleOwnerDetail',data),

	// 合作商家列表
	getStoreList:data=>post('api/getStoreList',data),

	// 合作商家详情
	getStoreDetail:data=>post('api/getStoreDetail',data),

	// 获取奖品列表
	getPrizePool:data=>post('api/getPrizePool',data),

	// 获取抽奖结果
	userDrawLottery:data=>post('api/userDrawLottery',data),

	// 获取中奖结果列表
	getWinningRecordList:data=>post('api/getWinningRecordList',data),

	// 使用奖品
	usePrize:data=>post('api/usePrize',data),


	// 咨询购车提交 地址页面
	consultCarInfo:data=>post('api/consultCarInfo',data),

	// 金融贷款  申请咨询
	applyFinancialLoan:data=>post('api/consultCarInfo',data),

	// 开通会员
	openMembership:data=>post('api/openMembership',data),

	// 获取活动列表
	getActivityList:data=>post('api/getActivityList',data),

	// 收藏产品
	collectProduct:data=>post('api/collectProduct',data),

	// 移除收藏
	removeCollect:data=>post('api/removeCollect',data),

	// 查询收藏状态 judgeCollect

	judgeCollect:data=>post('api/judgeCollect',data),

	// 获取我的收藏列表 getCollectionList
	getCollectionList:data=>post('api/getCollectionList',data),

	// 普通商品下单
	directPurchase:data=>post('api/directPurchase',data),

	// 众筹商品下单
	crowdFunding:data=>post('api/crowdFunding',data),

	// 获取订单列表
	getOrderList:data=>post('api/getOrderList',data),

	// 订单确认收货 
	confirmReceipt:data=>post('api/confirmReceipt',data),
	
}
