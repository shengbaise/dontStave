const app = getApp()
import { getDetailItem, formatUrl } from '../../utils/util.js'

Page({
  data: {
    item: {},
    version: 'DST',
    sciencesImgs: { 1: 'http://img.fireleaves.cn/Sciences/S_science_machine.png',
      2: 'http://img.fireleaves.cn/Sciences/S_alchemy_engine.png',
      3: 'http://img.fireleaves.cn/Sciences/S_prestihatitator.png',
      4: '/static/img/material/469.png',
      5: 'http://img.fireleaves.cn/Natures/N_ancient_pseudoscience_station.png',
      6: 'http://img.fireleaves.cn/Sciences/S_codex_umbra.png',
      7: 'http://img.fireleaves.cn/Natures/N_rock_den.png',
      8: 'http://img.fireleaves.cn/Sciences/S_potters_wheel.png',
      10: 'http://img.fireleaves.cn/Natures/N_obsidian_workbench.png',
      11: '/static/img/material/86.png'
    }
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: `物品详情(${options.version})`
    })
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
    })
    this.initData(options)
  },
  onShow () {
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
  },
  initData (options) {
    app.http.get(`/material/single?version=${this.data.version}&src=${options.src}`, (res) => {
      const compositions = res.composition || []
      if (compositions.length) {
        compositions.forEach(v => {
          v.src = formatUrl(v.src)
        })
        res.composition = compositions
        const key = `item.composition`
        this.setData({
          item: res
        })
      }
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