const app = getApp()
import { getDetailItem, formatUrl } from '../../utils/util.js'
let interstitialAd = null

Page({
  data: {
    item: {},
    origins: [],
    createSciences: [],
    id: ''
  },
  onLoad (options) {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-3f1b4518f2939bd3'
      })
    }
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: '自然详情'
    })
    this.initData()
  },
  onShow () {
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
    this.data.origins = []
    this.data.createSciences = []
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
    })
    
  },
  toImgDetail (src) {
    const detailItem = getDetailItem(src)
    if (!detailItem.src || !detailItem.urlParam) {
      return
    }
    if (detailItem.urlParam === 'recipeDetail') {
      this.item = {}
      setTimeout(() => {
        this.initData({
          src: src,
          version: this.data.version
        })
      }, 0)
    } else {
      wx.navigateTo({
        url: `/pages/${detailItem.urlParam}/main?src=${detailItem.src}&version=${this.version}`
      })
    }
  },
  handleData (res) {
    if (res.origin) {
      const origins = res.origin.map(item => {
        if (item) {
          return formatUrl(item)
        }
      })
      this.setData({
        origins: origins.filter(item => !!item)
      })
    }
    if (res.createScience) {
      const createSciences = res.createScience.map(item => {
        if (item !== null) {
          return formatUrl(item)
        }
      })
      this.setData({
        createSciences: createSciences.filter(item => !!item)
      })
    }
    this.setData({
      item: res
    })
  },
  async initData () {
    const ret = await app.http.get(`/nature/single?id=${this.data.id}`)
    this.handleData(ret)
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
