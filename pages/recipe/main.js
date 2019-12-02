const app = getApp()
import regeneratorRuntime from '../../utils/runtime'

Page({
  data: {
    isSelect: false,
    type: '',
    version: 'DST',
    items: [],
    currentItems: [],
    tabs: [],
    foodAttr: app.$c('FOOD_ATTR'),
    currentTab: '',
    sortType: 'fullOfFood',
    itemsSort: [],
    scrollLeft: 0,
    scrollTop: 0
  },
  async onLoad (options) {
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    wx.setNavigationBarTitle({
      title: `食谱(${this.data.version})`
    })
    this.data.type = options.type
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
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
  sortRecipe (item) {
    let itemsSort
    const items = this.data.items
    if (item === 'fullOfFood') {
      itemsSort = items.sort((a, b) => {
        return b.attr[0] - a.attr[0]
      })
    } else if (item === 'bloodVolume') {
      itemsSort = items.sort((a, b) => {
        return b.attr[1] - a.attr[1]
      })
    } else if (item === 'spirit') {
      itemsSort = items.sort((a, b) => {
        return b.attr[2] - a.attr[2]
      })
    }
    this.data.itemsSort = itemsSort
  },
  toDetail ({detail}) {
    wx.navigateTo({
      url: `/pages/recipeDetail/main?id=${detail._id}&type=${detail.type}&version=${this.data.version}`
    })
  },
  async initData () {
    const ret = await app.http.get(`/${this.data.type}?version=${this.data.version}&tagId=${this.data.currentTab}`)
    this.setData({
      currentItems: ret && ret || []
    })
  },
  initSortData () {
    this.sortRecipe(this.data.sortType)
    this.setData({
      currentItems: this.data.itemsSort.filter(item => item.type === this.data.currentTabType)
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
