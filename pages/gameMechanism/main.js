Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    wx.setNavigationBarTitle({
      title: '游戏机制'
    })
  },
  toDetail (event) {
    const dataset = event.currentTarget.dataset
    const type = dataset.index
    wx.navigateTo({
      url: `/pages/gameMechanismDetail/main?type=${type}`
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
