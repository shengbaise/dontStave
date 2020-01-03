const app = getApp()

Page({
  data: {
    pageNum: 0,
    loading: false,
    loaded: false,
    newFeedBacks: [],
    feedBacks: [],
    status: {
      // 0 待处理 1 已处理 2 不予处理
      0: '待处理',
      1: '已处理',
      2: '不予处理'
    },
    tabs: [
      {
      label: '待处理',
      type: 0
    }, {
      label: '已处理',
      type: 1
    }, {
      label: '拒绝处理',
      type: 2
    }],
    currentTabType: 0,
    scrollTop: 0
  },
  onLoad () {
    this.data.pageNum = 0
    this.setFeedBacks()
  },
  // onShow () {
  //   this.data.pageNum = 0
  //   this.setFeedBacks()
  // },
  async setFeedBacks () {
    this.setData({
      loading: true,
      loaded: false
    })
    const res = await app.http.get(`/feedback?pageSize=10&pageNum=${this.data.pageNum}&status=${this.data.currentTabType}`)
    const datas = this.data.feedBacks.concat(res.data)
    this.setData({
      newFeedBacks: res.data,
      feedBacks: datas,
      loading: false,
      loaded: true
    })
  },
  loadMore () {
    if (this.data.newFeedBacks.length !== 0) {
      this.data.pageNum = this.data.pageNum + 1
      this.setFeedBacks()
    }
  },
  handleChangeScroll ({ detail }) {
    const id = detail.key
    this.data.pageNum = 0
    this.setData({
      currentTabType: id,
      scrollTop: 0
    })
    this.data.feedBacks = []
    this.setFeedBacks()
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
  },
  onPullDownRefresh () {
    this.data.pageNum = 0
    this.setFeedBacks()
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.loadMore()
  },
})