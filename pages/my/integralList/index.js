
import{getIntegralList,getIntegralRule} from "../../../api"
let page =0;
let type = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integralRule:{
			ruleTitle:''
		},
    scrollTop:0,
    loadType:1, 
    option1: [
      { text: '所有记录', value: '' },
      { text: '获取记录', value: 1 },
      { text: '使用记录', value: 2 }
    ],
    // option2: [
    //   { text: '默认排序', value: 'a' },
    //   { text: '好评排序', value: 'b' },
    //   { text: '销量排序', value: 'c' }
    // ],
    // value1:'',
    // value2: 'a',
    listData:[], /// 列表数据,
    subTypeName:['','注册获得','登录获取','消费获取','评价获取','积分抵扣消费','系统发放','退款扣除消费积分',"退款返还积分"]
  },
  typeChange(e){
   page=1
   type=e.detail
    this.getIntegralList()
    
  },
  // 获取积分列表数据
  getIntegralList(){
    if(page==1){
      this.setData({
        scrollTop:0,
        loadType:1,
        listData:[]
      })
    }
    getIntegralList({type,page})
    .then(res=>{
      let loadType = (!res.total)? 3: res.page==res.pages? 2:1
      if(res.pages && page > res.pages) return
      this.setData({
        [`listData[${this.data.listData.length}]`]: res.list,
        loadType
      })
      page = res.page+1
    })
  },
  loadmore(e){
    this.getIntegralList()
    
  },
  // 获取积分规则
	async getIntegralRule(){
		let res = await getIntegralRule()
		this.setData({
			integralRule:res
		})
	},
  // 跳转积分规则页面
  toInegral(){
    wx.navigateTo({
      url:'/pages/my/integral/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page =1
    type=''
    this.getIntegralList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.getIntegralRule()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})