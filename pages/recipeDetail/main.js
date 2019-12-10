const app = getApp()
import { getDetailItem, formatUrl } from '../../utils/util.js'
import regeneratorRuntime from '../../utils/runtime'
let interstitialAd = null

Page({
  data: {
    item: {},
    version: 'DST',
    potItem: {
      1: '/static/img/food/pot.png',
      2: '/static/img/food/wolyPot.png'
    },
    foodAttr: app.$c('FOOD_ATTR'),
    imgDomain: app.imgDomain + '/',
    attributes: app.$c('FOOD_ATTRIBUTES'),
    size: 32,
    showNumber: false
  },
  onLoad (options) {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-45a24e9f86ac9fc9'
      })
    }
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
    })
    wx.setNavigationBarTitle({
      title: '食谱详情'
    })
    this.initData(options)
  },
  onShow () {
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
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
  async initData (options) {
    const res = await app.http.get(`/food/single?id=${options.id}`)
    this.setData({
      hasNeed: res.need && res.need.length,
      item: res,
      hasFail: res.fail && res.fail.length,
      hasProperty: res.property && res.property.length
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
