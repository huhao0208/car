// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      active: {
          type: String,
          value: '/pages/home/homePages/homePages'
      },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      onChange(event){
          wx.redirectTo({
              url:event.detail
          })
      },
  }
})
