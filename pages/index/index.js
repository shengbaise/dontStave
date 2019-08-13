//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    footerTabs: [
      {
        label: '主页',
        icon: 'icon-home',
        path: '/pages/index/main'
      }, {
        label: '动态',
        icon: 'icon-xiaoxi',
        path: '/pages/index/main'
      }, {
        label: '藏品',
        icon: 'icon-shoucang-tianchong',
        path: '/pages/index/main'
      }, {
        label: '我的',
        icon: 'icon-mine',
        path: '/pages/login/main'
      }],
    userInfo: {},
    tabs: [
      {
        tabImgUrl: '/static/img/home/entry-icon-chacter.png',
        name: '人物',
        toPath: 'heroIntro',
        type: 'hero'
      }, {
        tabImgUrl: '/static/img/home/entry-icon-thing.png',
        name: '科技',
        toPath: 'science',
        type: 'materials?version=DST'
      }, {
        tabImgUrl: '/static/img/home/entry-icon_food.png',
        name: '食谱',
        toPath: 'recipe',
        type: 'food?version=DST'
      }, {
        tabImgUrl: '/static/img/home/entry-icon_anim.png',
        name: '生物',
        toPath: 'animInfo',
        type: 'anim?version=DST'
      }, {
        tabImgUrl: '/static/img/home/entry-icon_nature.png',
        name: '自然',
        toPath: 'natureInfo',
        type: 'nature?version=DST'
      }, {
        tabImgUrl: '/static/img/home/entry-icon_rule.png',
        name: '机制',
        toPath: 'gameMechanism',
        type: ''
      }, {
        tabImgUrl: '/static/img/home/map_intro.png',
        name: '地理',
        toPath: 'geography',
        type: ''
      }
      // {
      //   tabImgUrl: '/static/img/home/activity.png',
      //   name: '活动',
      //   toPath: 'activity',
      //   type: ''
      // }
    ],
    pageDatas: [],
    banners: [],
    articles: [],
    version: '',
    currentLabel: '主页',
    pageNum: 0,
    loading: false,
    loaded: false,
    scrollTop: 0,
    borderColors: ['#dc1454', '#ae63e4', '#47cf73', '#ffdd40', '#0ebeff', '#4a4c53'],
    showSelectVersion: false,
    scrollLeft: 0,
    articleTabs: [
      {
        type: 0,
        label: '全部'
      }, {
        type: 1,
        label: '科普攻略'
      }, {
        type: 2,
        label: '生存技巧'
      }, {
        type: 3,
        label: '游戏更新'
      }, {
        type: 4,
        label: '官方公告'
      }, {
        type: 5,
        label: '其他'
      }
      // , {
      //   type: 6,
      //   label: '同人小说'
      // }
    ],
    currentArticleType: 0,
    isFixed: false,
    toView: 'toView',
    marginRight: 0,
    width: '100%',
    currentVersion: '',
    test1: app.globalData
  },
  onLoad () {
    const that = this;
    that.setData({
      navH: app.globalData.navHeight
    })

    if (!wx.getStorageSync('currentVersion')) {
      this.selectComponent("#select-version").handleOpen()
    }
    this.setArticles()
  },
  onShow() {
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scroll (e) {
    if (e.detail.scrollTop >= 460 && !this.data.isFixed) {
      console.info(e.detail.scrollTop, 'e.detail.scrollTop333')
      this.setData({
        isFixed: true
      })
    } else if (e.detail.scrollTop < 460 && this.data.isFixed) {
      console.info(e.detail.scrollTop, 'e.detail.scrollTop333555')
      this.setData({
        isFixed: false
      })
    }
  },
  selectTab (type, index) {
    // this.currentArticleType = type
    // if (index > 2) {
    //   this.scrollLeft = 76 * (index - 2)
    // } else {
    //   this.scrollLeft = 0
    // }
  },
  selectVersion () {
    const item = this.selectComponent('#select-version')
    item.handleOpen()
  },
  loadMore () {
    if (this.data.pageDatas.length !== 0) {
      this.data.pageNum = this.data.pageNum + 1
      this.setArticles()
    }
  },
  toSearch () {
    wx.navigateTo({
      url: '/pages/search/main'
    })
  },
  setArticles () {
    this.setData({
      loading: true
    })
    this.data.loaded = false
    this.data.pageDatas = []
    app.http.get(`/article?pageSize=10&pageNum=${this.data.pageNum}&type=${this.data.currentArticleType}`, (res) => {
      const datas = this.data.articles.concat(res.data)
      this.setData({
        articles: datas,
        pageDatas: res.data || [],
        loading: false,
        loaded: true
      })
    })
  },
  toGeographicalList (type) {
    wx.navigateTo({
      url: `/pages/GeographicalList/main?type=${type}`
    })
  },
  toArticleDetail (event) {
    const dataset = event.currentTarget.dataset
    const id = dataset.id
    wx.navigateTo({
      url: `/pages/articleDetail/main?id=${id}&type=article`
    })
  },
  toTabPage (tab) {
    this.data.currentLabel = tab.label
    wx.navigateTo({
      url: tab.path
    })
  },
  toTap (event) {
    const dataset = event.currentTarget.dataset
    const path = dataset.path
    const type = dataset.type
    wx.navigateTo({
      url: `/pages/${path}/main?type=${type}`
    })
  },
  handleChangeScroll ({ detail }) {
    if (this.data.isFixed) {
      this.setData({
        scrollTop: 210
      })
    }
    this.data.pageNum = 0
    this.setData({
      currentArticleType: detail.key
    })
    this.data.articles = []
    this.setArticles()
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
  },
  onPullDownRefresh () {
    this.data.pageNum = 0
    this.setArticles()
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.loadMore()
  },
  onPageScroll(e) {
    if (e.scrollTop >= 216 + this.data.navH && !this.data.isFixed) {
      this.setData({
        isFixed: true
      })
    } else if (e.scrollTop < 216 + this.data.navH && this.data.isFixed) {
      this.setData({
        isFixed: false
      })
    }
  }
})
