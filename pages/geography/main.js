const app = getApp()

Page({
  data: {
    currentTabType: 0,
    tabs: [{
      label: '地形',
      type: 0
    }, {
      label: '地标',
      type: 1
    }, {
      label: '奇遇',
      type: 2
    }],
    scrollTop: 0,
    pageNum: 0,
    currentItems: [],
    items: [],
    loading: false,
    loaded: false
  },
  onLoad () {
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    wx.setNavigationBarTitle({
      title: `地理列表(${this.data.version})`
    })
  },
  onShow () {
    this.data.currentItems = []
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    this.initData()
  },
  initData () {
    this.data.loading = true
    this.data.loaded = false
    this.data.items = []
    app.http.get(`/geography?type=${this.data.currentTabType}&pageSize=10&pageNum=${this.data.pageNum}&version=${this.data.version}`, (res) => {
      const items = res.data || []
      const allItems = this.data.currentItems.concat(items)
      this.setData({
        currentItems: allItems,
        items: items,
        loading: false,
        loaded: true,
      })
    })
  },
  handleChangeScroll ({ detail }) {
    const id = detail.key
    this.data.pageNum = 0
    this.setData({
      currentTabType: id,
      scrollTop: 0
    })
    this.data.currentItems = []
    this.initData()
  },
  loadMore () {
    if (this.data.items.length !== 0) {
      this.data.pageNum = this.data.pageNum + 1
      this.initData()
    }
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