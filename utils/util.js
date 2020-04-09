
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



const sT = (title,type) =>{
 let options = {
   title:title+'',
   icon:'none',
   duration:1500
 }
  if(type=='error') {
    options.image='/images/error.png'
  }else if(type='warning'){
    options.image='/images/warning.png'
  }else if(type="success"){
    icon:'success'
  }
  wx.showToast(options)
}

let isShowLoading = true

const hL = () =>{
  wx.hideLoading()
  isShowLoading = true
}

const sL = (title,mask=false)=> {
  isShowLoading && wx.showLoading({
    title,
    mask,
    success:()=>{
      isShowLoading = false
     let time= setInterval(_=>{
       clearInterval(time)
       time=null
        hL()
      },7000)
    }
  })
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
             wx.showToast({
               title:'目标页面不存在'
             })
              console.log(url+'跳转失败')
            }
          })
        }
      })
    }
  })
}

// 距离计算
const distance = (la1, lo1, la2, lo2)=>{
  const app = getApp()
  app.globalData.getLocation()
  let La1 = la1 * Math.PI / 180.0;
  let La2 = la2 * Math.PI / 180.0;
  let La3 = La1 - La2;
  let Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
  s = s * 6378.137;
  console.log(s,'计算出来的距离util')
  s = Math.round(s * 10000) / 10000;
  s = s.toFixed(2);
  return s;
}

module.exports = {
  formatTime,
  sT,
  sL,
  hL,
  distance,
  jump
}
