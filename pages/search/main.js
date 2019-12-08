const app = getApp()

Page({
  data: {
    version: '',
    results: [],
    loading: false,
    loaded: false,
    moduleType: app.$c('MODLE_NAME'),
    moduleName: {
      materials: '制作',
      foods: '食谱',
      anims: '生物',
      natures: '自然',
      heros: '人物',
      geographys: '地理'
    },
    modulePath: {
      materials: 'scienceDetail',
      foods: 'recipeDetail',
      anims: 'animInfoDetail',
      natures: 'natureInfoDetail',
      heros: 'heroIntro',
      geographys: 'mapDetail'
    },
    suffix: '?x-oss-process=style/width-64',
    imgDomain: app.imgDomain
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST'
    })
  },
  getName (arr, key) {
    return app.$c2(arr, key)
  },
  async getSearchResult (value) {
    this.setData({
      loaded: false,
      loading: true
    })
    this.data.results = []
    let urlStr = ''
    this.data.moduleType.forEach(e=>{
      urlStr+="module[]="+e.value+"&"
    })
    urlStr = urlStr.replace(/&$/,"")
    const res = await app.http.get(`/search?version=${this.data.version}&searchVal=${value.detail}&${urlStr}`)
    this.setData({
      results: res,
      loaded: true,
      loading: false
    })
  },
  toDetail (event) {
    const dataset = event.currentTarget.dataset
    const type = dataset.type
    const id = dataset.id
    wx.navigateTo({
      url: `/pages/${this.data.modulePath[type]}/main?id=${id}`
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
