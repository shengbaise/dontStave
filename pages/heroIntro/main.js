const app = getApp()

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
    navH: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
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
  getData () {
    this.data.heroList = []
    app.http.get(`/${this.data.type}?version=${this.data.currentVersion}`, (res) => {
      this.setData({
        heroList: res
      })
      this.setCurrentHero(res[0]._id)
    })
  },
  setCurrentHero (id) {
    this.data.currentHero = null
    app.http.get(`/hero/single?id=${id}`, (res) => {
      const data = res
      data.ability = res.ability.replace(/\<h3/g,'<h3 style="line-height: 48px;letter-spacing: normal;margin-bottom: 16px;font-size: 20px;color: #333;border-bottom: 1px solid #e0e0e0;"')
       .replace(/\<p/g, '<p style="text-align: justify;font-size: 14px;color: #333;letter-spacing: 2px;"')
       .replace(/\<ul/g, '<ul style="font-size: 14px;"' )
      this.setData({
        currentHero: data
      })
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
  openSelectVersion () {
    const item = this.selectComponent('#select-version')
    item.handleOpen()
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
