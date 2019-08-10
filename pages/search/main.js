const app = getApp()

Page({
  data: {
    version: '',
    results: [],
    loading: false,
    loaded: false
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST'
    })
  },
  getSearchResult (value) {
    this.setData({
      loaded: false,
      loading: true
    })
    this.data.results = []
    app.http.get(`/search?version=${this.data.version}&searchVal=${value.detail}`, (res) => {
      this.setData({
        results: res,
        loaded: true,
        loading: false
      })
    })
  },
  getDetailPath (type) {
    const technologyTypes = [9, 10, 11, 12, 13, 14, 15,
      16, 18, 19, 25, 26, 27, 28, 29, 30, 31, 32, 42, 43, 44, 45, 46]
    const materialsTypes = [33, 34, 35, 41]
    const foodsTypes = [4, 5, 6, 7, 8, 17, 20, 21]
    const animalTypes = [0, 1, 2, 3, 22, 23, 24, 36]
    if (technologyTypes.indexOf(parseInt(type)) > -1) {
      return 'scienceDetail'
    }
    if (materialsTypes.indexOf(parseInt(type)) > -1) {
      return 'natureInfoDetail'
    }
    if (foodsTypes.indexOf(parseInt(type)) > -1) {
      return 'recipeDetail'
    }
    if (animalTypes.indexOf(parseInt(type)) > -1) {
      return 'animInfoDetail'
    }
  },
  toDetail ({detail}) {
    const detailType = this.getDetailPath(detail.type)
    wx.navigateTo({
      url: `/pages/${detailType}/main?src=${detail.src}&version=${this.data.version}&type=${detail.type}`
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
