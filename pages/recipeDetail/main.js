const app = getApp()
import { getDetailItem, formatUrl } from '../../utils/util.js'
import regeneratorRuntime from '../../utils/runtime'
let interstitialAd = null

Page({
  data: {
    item: {},
    version: 'DST',
    composites: [],
    needs: [],
    fails: [],
    features: [],
    type: 0,
    potItem: {
      1: '/static/img/food/pot.png',
      2: '/static/img/food/wolyPot.png'
    },
    foodAttr: app.$c('FOOD_ATTR')
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
  handleData (res, options) {
    let composites = []
    let needItems = []
    let fails = []
    let features = []
    this.setData({
      type: options.type,
      item: res
    })
    if (res.composite && res.composite.length > 0) {
      composites = res.composite.map(item => {
        return formatUrl(item)
      })
      composites = composites.filter(item => !!item)
    }
    if (res.need && res.need.length > 0) {
      needItems = res.need.map((need, index) => {
        if (index % 2 === 0) {
          return {
            src: formatUrl(need),
            num: res.need[index + 1]
          }
        }
      })
      needItems = needItems.filter(item => !!item)
    }
    if (res.fail && res.fail.length > 0) {
      fails = res.fail.map((need, index) => {
        if (index % 2 !== 0) {
          return {
            src: formatUrl(need),
            num: res.fail[index - 1]
          }
        }
      })
      fails = fails.filter(item => !!item && !!item.src)
    }
    if (res.feature && res.feature.length > 0) {
      features = res.feature.map((feature, index) => {
        if (index % 2 === 0 && feature) {
          return {
            src: ['荤', '素'].indexOf(feature) > -1 ? feature : formatUrl(feature),
            num: res.feature[index + 1]
          }
        }
      })
      features = features.filter(item => !!item && !!item.src)
    }
    this.setData({
      composites: composites,
      needs: needItems,
      fails: fails,
      features: features
    })
  },
   async initData (options) {
    const ret = await app.http.get(`/food/single?id=${options.id}`)
    this.handleData(ret, options)
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
