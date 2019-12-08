// const baseURL = 'https://fireleaves.cn'
const baseURL = 'http://47.112.19.174'

const header = {
  'Accept': 'application/json',
  'content-type': 'application/json'
}

function getReq(url, params, cb) {
  const promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseURL + url,
      method: 'get',
      data: params,
      header: header,
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode !== 200) {
          resolve(false)
          return
        }
        resolve(res.data)
      },
      fail: function (err) {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject(err)
      }
    })
  });
  return promise
}
 
function postReq(url, data, cb) {
  // wx.showLoading({
  //   title: '加载中',
  // })
  const promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseURL + url,
      header: header,
      data: data,
      method: 'post',
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode !== 200) {
          resolve(false)
          return
        }
        resolve(res.data)
      },
      fail: function (err) {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject(err)
      }
    })
  })
  return promise
}
module.exports = {
  get: getReq,
  post: postReq,
  header: header
}  
