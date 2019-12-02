const app = getApp()
import { getDetailItem, formatUrl } from '../../utils/util.js'
import regeneratorRuntime from '../../utils/runtime'
let interstitialAd = null

Page({
  data: {
    item: {},
    version: 'DST',
    imgDomain: app.imgDomain + '/',
    attributes: app.$c('SCIENCE_ATTRIBUTES')
  },
  onLoad (options) {
    console.info(this.data.attributes, 'attributes')
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-b9f3ae65f20eae61'
      })
    }
    wx.setNavigationBarTitle({
      title: `物品详情(${options.version})`
    })
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
    })
    this.initData(options)
  },
  onShow () {
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
  },
  async initData (options) {
    const res = await app.http.get(`/material/single?id=${options.id}`)
    this.setData({
      item: res
    })
  },
  toImgDetail (src) {
    const detailItem = getDetailItem(src)
    console.info(src, detailItem)
    if (!detailItem.src || !detailItem.urlParam) {
      return
    }
    if (detailItem.urlParam === 'scienceTechnologyDetail') {
      this.item = {}
      setTimeout(() => {
        this.initData({
          src: src,
          version: this.version
        })
      }, 0)
    } else {
      wx.navigateTo({
        url: `/pages/${detailItem.urlParam}/main?src=${detailItem.src}&version=${this.version}`
      })
    }
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