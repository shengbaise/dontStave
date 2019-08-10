const app = getApp()

Page({
  data: {
    type: '',
    items: [],
    isSelect: false,
    currentTabType: 0,
    currentGoods: [],
    version: 'DST',
    tabs: [
      {
        label: '陆地',
        type: 0
      }, {
        label: '飞行',
        type: 1
      }, {
        label: '洞穴',
        type: 2
      }, {
        label: '猪人',
        type: 36
      }, {
        label: '海洋',
        type: 24
      }, {
        label: '邪恶',
        type: 3
      }, {
        label: 'BOSS',
        type: 23
      }, {
        label: '其他',
        type: 22
      }],
    currentTabs: [],
    scrollLeft: 0,
    scrollTop: 0
  },
  onLoad (options) {
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    this.data.type = options.type
    wx.setNavigationBarTitle({
      title: `生物资料(${this.data.version})`
    })
  },
  onShow () {
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    this.initData()
  },
  toDetail ({detail}) {
    wx.navigateTo({
      url: `/pages/animInfoDetail/main?src=${detail.src}&version=${this.data.version}`
    })
  },
  initData () {
    let currentTabs = []
    if (this.data.version === 'SW') {
      currentTabs = this.data.tabs.filter(item => [2, 36].indexOf(item.type) === -1)
    } else if (this.data.version === 'HAMLET') {
      currentTabs = this.data.tabs.filter(item => [2, 24].indexOf(item.type) === -1)
    } else {
      currentTabs = this.data.tabs.filter(item => [24, 36].indexOf(item.type) === -1)
    }
    this.setData({
      currentTabs: currentTabs
    })
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
