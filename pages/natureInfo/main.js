const app = getApp()

Page({
  data: {
    isSelect: false,
    type: '',
    version: 'DST',
    currentTab: '',
    tabs: [],
    currentGoods: [],
    scrollLeft: 0,
    scrollTop: 0
  },
  async onLoad (options) {
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
      type: options.type
    })
    wx.setNavigationBarTitle({
      title: `自然(${this.data.version})`
    })
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST'
    })
    await this.setTabs()
    this.initData()
  },
  async setTabs () {
    const tabs = await app.http.get(`/tags?type=${this.data.type+'s'}&version=${this.data.version}`)
    this.setData({
      tabs: tabs || [],
      currentTab: tabs[0] && tabs[0]._id || ''
    })
  },
  toDetail ({detail}) {
    wx.navigateTo({
      url: `/pages/natureInfoDetail/main?id=${detail._id}&version=${this.data.version}`
    })
  },
  async initData () {
    // app.http.get(`/${this.data.type}?version=${this.data.version}`, (res) => {
    //   const items = res || []
    //   const currentGoods = items.filter(item => item.type === this.data.currentTabType)
    //   this.setData({
    //     items: items,
    //     currentGoods: currentGoods
    //   })
    // })
    const ret = await app.http.get(`/${this.data.type}?version=${this.data.version}&tagId=${this.data.currentTab}`)
    const items = ret || []
    this.setData({
      currentGoods: items
    })
  },
  selectTab ({detail}) {
    this.setData({
      currentTab: detail
    })
    this.initData()
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
