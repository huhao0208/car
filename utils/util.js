
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const sT = (title,duration=2000,icon='none') =>{
  wx.showToast({
    title,
    icon,
    duration
  })
}

let isShowLoading = true
const sL = (title,mask=false)=> {
  isShowLoading && wx.showLoading({
    title,
    mask,
    success:()=>{
      isShowLoading = false
    }
  })
}

const hL = () =>{
  isShowLoading = false
  wx.hideLoading()


}

const jump = (e)=>{
  let url = e.startsWith('/')?e:'/'+e
  wx.switchTab({
    url,
    fail(res) {
      wx.navigateTo({
        url,
        fail: function() {
          wx.redirectTo({
            url,
            fail(res) {
              sT('目标页面不存在!')
              console.log(url+'跳转失败')
            }
          })
        }
      })
    }
  })
}



module.exports = {
  formatTime,
  sT,
  sL,
  hL,
  jump,
}
