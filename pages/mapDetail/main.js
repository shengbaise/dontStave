const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    imgDomain: app.imgDomain + '/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    wx.setNavigationBarTitle({
      title: '地理详情'
    })
    const res = await app.http.get(`/geography/single?id=${options.id}`)
    this.setData({
      article: res
    })
  },
  toDetail (event) {
    const dataset = event.currentTarget.dataset
    const id = dataset.id
    wx.navigateTo({
      url: `/pages/mapDetail/main?id=${id}`
    })
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '掌上饥荒',
      path: 'pages/index/index',
      imageUrl: 'http://img.fireleaves.cn/SomeLabel/share.png'
    }
  }
})
