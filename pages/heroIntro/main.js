const app = getApp()
import regeneratorRuntime from '../../utils/runtime'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    heroList: [],
    type: '',
    attrKeys: ['饥饿', '生命', '精神', '空手伤害'],
    currentVersion: wx.getStorageSync('currentVersion') || 'DST',
    imgDomain: app.imgDomain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setPageTitle()
    this.setData({
      type: options.type
    })
  },
  onShow () {
    this.setData({
      currentVersion: wx.getStorageSync('currentVersion') || 'DST'
    })
    this.getData()
  },
  setPageTitle () {
    wx.setNavigationBarTitle({
      title: `人物(${this.data.currentVersion})`//页面标题为路由参数
    })
  },
  async getData () {
    this.data.heroList = []
    const ret = await app.http.get(`/${this.data.type}?version=${this.data.currentVersion}`)
    this.setData({
      heroList: ret
    })
    this.setCurrentHero(ret[0]._id)
  },
  async setCurrentHero (id) {
    this.data.currentHero = null
    const ret = await app.http.get(`/hero/single?id=${id}`)
    this.setData({
      currentHero: ret
    })
  },
  showSelectHero () {
    this.isSelect = true
  },
  selectHero (name, index) {
    this.imgIndex = index
    this.heroIndex = this.heros.findIndex(item => item.name === name) || 0
    this.isSelect = false
  },
  handleChangeScroll ({ detail }) {
    const id = detail.key
    this.setData({
      scrollTop: 0
    })
    this.setCurrentHero(id)
  },
  selectVersion () {
    this.setData({
      currentVersion: wx.getStorageSync('currentVersion') || 'DST'
    })
    this.setPageTitle()
    this.getData()
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `人物(${this.data.currentVersion})`,
      path: '/pages/heroIntro/main?type=hero',
      imageUrl: 'http://img.fireleaves.cn/SomeLabel/share.png'
    }
  }
})
