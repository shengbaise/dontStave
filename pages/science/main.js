const app = getApp()
import regeneratorRuntime from '../../utils/runtime'

Page({
  data: {
    isSelect: false,
    technologyType: '',
    currentGoods: [],
    currentTab: '',
    items: [],
    version: 'DST',
    tabs: [],
    scrollLeft: 0,
    scrollTop: 0
  },
  async onLoad (options) {
    this.version = wx.getStorageSync('currentVersion') || 'DST'
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
      technologyType: options.type
    })
    wx.setNavigationBarTitle({
      title: `科技(${this.data.version})`
    })
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    await this.setTabs()
    this.initData()
  },
  async setTabs () {
    const tabs = await app.http.get(`/tags?type=${this.data.technologyType}&version=${this.data.version}`)
    this.setData({
      tabs: tabs || [],
      currentTab: tabs[0] && tabs[0]._id || ''
    })
  },
  toDetail ({detail}) {
    wx.navigateTo({
      url: `/pages/scienceDetail/main?id=${detail._id}&version=${this.data.version}`
    })
  },
  async initData () {
    const ret = await app.http.get(`/${this.data.technologyType}?version=${this.data.version}&tagId=${this.data.currentTab}`)
    this.setData({
      currentGoods: ret && ret || []
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
