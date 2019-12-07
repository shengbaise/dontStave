const app = getApp()
{/* <i-tabs wx:if="false" style="" color="#f5f5f5" i-class="tabs" current="{{currentTabType}}" scroll bindchange="handleChangeScroll">
  <i-tab i-class="tab" wx:for="{{tabs}}" key="{{item.type}}" wx:key="{{item.type}}" title="{{item.label}}">{{item.label}}</i-tab>
</i-tabs> */}
Page({
  data: {
    currentTab: '',
    tabs: [],
    scrollTop: 0,
    pageNum: 0,
    currentItems: [],
    items: [],
    loading: false,
    loaded: false,
    imgDomain: app.imgDomain + '/'
  },
  async onLoad () {
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    wx.setNavigationBarTitle({
      title: `地理列表(${this.data.version})`
    })
    this.data.currentItems = []
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    await this.setTabs()
    this.initData()
  },
  async setTabs () {
    const tabs = await app.http.get(`/tags?type=geographys&version=${this.data.version}`)
    this.setData({
      tabs: tabs || [],
      currentTab: tabs[0] && tabs[0]._id || ''
    })
  },
  selectTab ({detail}) {
    this.setData({
      currentTab: detail
    })
    this.initData()
  },
  async initData () {
    this.data.loading = true
    this.data.loaded = false
    this.data.items = []
    const ret = await app.http.get(`/geography?pageSize=10&pageNum=${this.data.pageNum}&version=${this.data.version}&tagId=${this.data.currentTab}`)
    const allItems = this.data.currentItems.concat(ret.data)
    this.setData({
      currentItems: allItems,
      items: ret.data,
      loading: false,
      loaded: true,
    })
  },
  handleChangeScroll ({ detail }) {
    // const id = detail.key
    this.data.pageNum = 0
    this.setData({
      currentTab: detail,
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