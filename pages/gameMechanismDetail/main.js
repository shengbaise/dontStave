const app = getApp()

Page({
  data: {
    type: '',
    currentRules: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      type: options.type
    })
    wx.setNavigationBarTitle({
      title: '详细机制'
    })
    this.initData()
  },
  toArticleDetail (event) {
    const dataset = event.currentTarget.dataset
    const id = dataset.id
    wx.navigateTo({
      url: `/pages/articleDetail/main?id=${id}&type=rule`
    })
  },
  async initData () {
    const res = await app.http.get(`/rule?type=${this.data.type}`)
    this.setData({
      currentRules: res
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
