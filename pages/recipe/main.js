const app = getApp()

Page({
  data: {
    isSelect: false,
    type: '',
    version: 'DST',
    items: [],
    currentItems: [],
    tabs: [
      {
        label: '料理',
        type: 7
      }, {
        label: '肉类',
        type: 4
      }, {
        label: '蔬菜',
        type: 6
      }, {
        label: '水果',
        type: 5
      }, {
        label: '蛋类',
        type: 8
      }, {
        label: '其他',
        type: 20
      }, {
        label: '非食材',
        type: 21
    }],
    foodAttrImgs: [
      'http://img.fireleaves.cn/SomeLabel/image.jpg',
      'http://img.fireleaves.cn/SomeLabel/image%20%281%29.jpg',
      'http://img.fireleaves.cn/SomeLabel/image%20%282%29.jpg',
      '/static/img/food/notFresh.png'
    ],
    currentTabType: 7,
    sortType: 'fullOfFood',
    itemsSort: [],
    scrollLeft: 0,
    scrollTop: 0
  },
  onLoad (options) {
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    wx.setNavigationBarTitle({
      title: `食谱(${this.data.version})`
    })
    this.setData({
      type: options.type
    })
  },
  onShow () {
    this.data.sortType = wx.getStorageSync('currentSort') || 'fullOfFood'
    this.data.version = wx.getStorageSync('currentVersion') || 'DST'
    this.initData()
  },
  // hideSelect () {
  //   this.setData({
  //     isSelect: false
  //   })
  // },
  // showSelectVersion () {
  //   this.setData({
  //     isSelect: true
  //   })
  // },
  // selectSort (item) {
  //   wx.setStorageSync('currentSort', item)
  //   this.setData({
  //     sortType: wx.getStorageSync('currentSort'),
  //     isSelect: false
  //   })
  // },
  sortRecipe (item) {
    let itemsSort
    const items = this.data.items
    if (item === 'fullOfFood') {
      itemsSort = items.sort((a, b) => {
        return b.attr[0] - a.attr[0]
      })
    } else if (item === 'bloodVolume') {
      itemsSort = items.sort((a, b) => {
        return b.attr[1] - a.attr[1]
      })
    } else if (item === 'spirit') {
      itemsSort = items.sort((a, b) => {
        return b.attr[2] - a.attr[2]
      })
    }
    this.data.itemsSort = itemsSort
  },
  toDetail ({detail}) {
    wx.navigateTo({
      url: `/pages/recipeDetail/main?src=${detail.src}&type=${detail.type}&version=${this.data.version}`
    })
  },
  initData () {
    app.http.get(`/${this.data.type}?version=${this.data.version}`, (res) => {
      const items = res
      this.setData({
        items: items
      })
      this.sortRecipe(this.data.sortType)
      this.setData({
        currentItems: this.data.itemsSort.filter(item => item.type === this.data.currentTabType)
      })
    })
  },
  initSortData () {
    this.sortRecipe(this.data.sortType)
    this.setData({
      currentItems: this.data.itemsSort.filter(item => item.type === this.data.currentTabType)
    })
  },
  selectTab (e) {
    const dataset = e.target.dataset
    const index = dataset.index
    const type = dataset.type
    if (index > 2) {
      this.setData({
        scrollLeft: 76 * (index - 2)
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }

    this.data.currentItems = []
    this.setData({
      currentTabType: type
    })
    setTimeout(() => {
      this.setData({
        currentItems: this.data.itemsSort.filter(item => item.type === this.data.currentTabType),
        scrollTop: 0
      })
    }, 0)
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
