const app = getApp()
import { getDetailItem, formatUrl } from '../../utils/util.js'
let interstitialAd = null

Page({
  data: {
    id: '',
    natureInfo: {},
    attributes: app.$c('NATURE_ATTRIBUTES'),
    size: 32,
    hasOrigin: false,
    hasCreate: false
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
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
    })
    this.initData()
  },
  onShow () {
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },
  async initData () {
    const ret = await app.http.get(`/nature/single?id=${this.data.id}`)
    this.setData({
      natureInfo: ret,
      hasOrigin: ret.origin && ret.origin.length,
      hasCreate: ret.createScience && ret.createScience.length
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
