const app = getApp()
import { formatUrl } from '../../utils/util.js'
let interstitialAd = null

Page({
  data: {
    item: {},
    version: 'DST',
    rewards: [],
    collections: [],
    feedBack: null,
    src: ''
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
      src: options.src,
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
  handleData (res) {
    // 收集
    if (res.collection) {
      this.setData({
        collections: res.collection.map(item => formatUrl(item))
      })
    } else {
      this.setData({
        collections: []
      })
    }
    // 赠品
    const feedBack = res.feedBack
    const feedBacks = []
    if (feedBack.length > 0) {
      feedBack.forEach((feed, index) => {
        if (index % 2 === 0) {
          feedBacks.push({
            src: formatUrl(feed),
            num: feedBack[index + 1]
          })
        }
      })
      this.setData({
        feedBack: feedBacks
      })
    } else {
      this.setData({
        feedBack: null
      })
    }
    // 战利品
    const rewards = res.reward.filter(item => item.src && item.num)
    rewards.forEach(item => {
      if (item.num[0] !== '×') {
        item.num = formatUrl(item.num)
      }
      item.src = formatUrl(item.src)
    })
    this.setData({
      rewards: rewards,
      item: res
    })
  },
  initData () {
    app.http.get(`/anim/single?version=${this.data.version}&src=${this.data.src}`, (res) => {
      this.handleData(res)
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
