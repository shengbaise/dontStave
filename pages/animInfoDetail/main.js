const app = getApp()
let interstitialAd = null

Page({
  data: {
    version: 'DST',
    animInfo: {},
    attributes: app.$c('ANIMAL_ATTRIBUTES'),
    size: 32,
    id: ''
  },
  onLoad (options) {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-c6e9488489010cf4'
      })
    }
    wx.setNavigationBarTitle({
      title: '生物详细资料'
    })
    this.setData({
      id: options.id,
      version: wx.getStorageSync('currentVersion') || 'DST'
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
    const ret = await app.http.get(`/anim/single?id=${this.data.id}`)
    this.setData({
      animInfo: ret,
      hasFeedback: ret.feedBackItems && ret.feedBackItems.length,
      hasCollection: ret.collectItems && ret.collectItems.length
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
