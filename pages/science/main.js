const app = getApp()
import regeneratorRuntime from '../../utils/runtime'

Page({
  data: {
    isSelect: false,
    technologyType: '',
    currentGoods: [],
    currentTabType: 11,
    items: [],
    moreTabs: [
      {
        label: '工具',
        type: 11,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '照明',
        type: 9,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '生存',
        type: 10,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '食物',
        type: 13,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '战斗',
        type: 12,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '科学',
        type: 14,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '魔法',
        type: 15,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '服装',
        type: 16,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '书本',
        type: 19,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '建筑',
        type: 25,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '合成',
        type: 26,
        version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
      }, {
        label: '远古',
        type: 27,
        version: ['DST', 'DS', 'ROG']
      }, {
        label: '暗影',
        type: 28,
        version: ['DST']
      }, {
        label: '宠物',
        type: 29,
        version: ['DST']
      }, {
        label: '雕塑',
        type: 30,
        version: ['DST']
      }, {
        label: '航海',
        type: 18,
        version: ['SW', 'HAMLET']
      }, {
        label: '火山',
        type: 32,
        version: ['SW']
      }, {
        label: '考古',
        type: 37,
        version: ['HAMLET']
      }, {
        label: '月体',
        type: 42,
        version: ['DST']
      }, {
        label: '炼金',
        type: 43,
        version: ['DST']
      }, {
        label: '年货',
        type: 44,
        version: ['DST']
      }, {
        label: '城镇规划',
        type: 45,
        version: ['HAMLET']
      }, {
        label: '绿色园艺',
        type: 46,
        version: ['HAMLET']
      }],
    version: 'DST',
    currentMoreTabs: [],
    scrollLeft: 0,
    scrollTop: 0
  },
  onLoad (options) {
    this.version = wx.getStorageSync('currentVersion') || 'DST'
    this.setData({
      version: wx.getStorageSync('currentVersion') || 'DST',
      technologyType: options.type
    })
    wx.setNavigationBarTitle({
      title: `科技(${this.data.version})`
    })
  },
  onShow () {
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    this.initData()
  },
  setCurrentMoreTabs () {
    const tabs = this.data.moreTabs.filter(item => {
      return item.version.indexOf(this.version) > -1
    })
    this.setData({
      currentMoreTabs: tabs
    })
  },
  toDetail ({detail}) {
    wx.navigateTo({
      url: `/pages/scienceDetail/main?src=${detail.src}&version=${this.data.version}`
    })
  },
  async initData () {
    const ret = await app.http.get(`/${this.data.technologyType}?version=${this.data.version}`)
    console.info(ret, 'retttttt')
    // app.http.get(`/${this.data.technologyType}?version=${this.data.version}`, (res) => {
    //   this.setCurrentMoreTabs()
    //   const datas = res.filter(item => item.type === this.data.currentTabType)
    //   this.data.items = res
    //   this.setData({
    //     currentGoods: datas
    //   })
    // })
  },
  selectTab ({detail}) {
    this.setData({
      currentGoods: this.data.items.filter(item => item.type === detail)
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
