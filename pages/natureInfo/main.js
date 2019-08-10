const app = getApp()

Page({
  data: {
    isSelect: false,
    type: '',
    version: 'DST',
    currentTabType: 33,
    tabs: [{
      label: '材料',
      type: 33
    }, {
      label: '装备',
      type: 34
    }, {
      label: '树苗',
      type: 35
    }, {
      label: '其他',
      type: 41
    }],
    currentGoods: [],
    scrollLeft: 0,
    scrollTop: 0
  },
  onLoad (options) {
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
      type: options.type
    })
    wx.setNavigationBarTitle({
      title: `自然(${this.data.version})`
    })
  },
  onShow () {
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST'
    })
    this.initData()
  },
  toDetail ({detail}) {
    wx.navigateTo({
      url: `/pages/natureInfoDetail/main?src=${detail.src}&version=${this.data.version}`
    })
  },
  initData () {
    app.http.get(`/${this.data.type}?version=${this.data.version}`, (res) => {
      const items = res || []
      const currentGoods = items.filter(item => item.type === this.data.currentTabType)
      this.setData({
        items: items,
        currentGoods: currentGoods
      })
    })
  },
  selectTab (e) {
    const dataset = e.target.dataset
    const index = dataset.index
    const type = dataset.type
    if (index > 2) {
      this.setData({
        scrollLeft: 76 * (index - 2)
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
    this.data.currentGoods = []
    this.setData({
      currentTabType: type
    })
    setTimeout(() => {
      this.setData({
        currentGoods: this.data.items.filter(item => item.type === this.data.currentTabType),
        scrollTop: 0
      })
    }, 0)
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
