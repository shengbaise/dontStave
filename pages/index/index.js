//index.js

//获取应用实例
const app = getApp()
import regeneratorRuntime from '../../utils/runtime'

Page({
  data: {
    userInfo: {},
    tabs: app.$c('MODEL_TYPES'),
    pageDatas: [],
    articles: [],
    version: '',
    pageNum: 0,
    loading: false,
    loaded: false,
    scrollTop: 0,
    borderColors: ['#dc1454', '#ae63e4', '#47cf73', '#ffdd40', '#0ebeff', '#4a4c53'],
    isSelectVersion: false,
    scrollLeft: 0,
    articleTabs: app.$c('ARTICLE_TYPES'),
    currentArticleType: 0,
    isFixed: false,
    marginRight: 0,
    width: '100%'
  },
  onLoad () {
    const that = this
    that.setData({
      navH: app.globalData.navHeight
    })

    if (!wx.getStorageSync('currentVersion')) {
      this.selectComponent("#select-version").handleOpen()
    }
    this.setArticles()
  },
  onShow() {
    // if(interstitialAd) {
    //     interstitialAd.show().catch((err) => {
    //         console.error(err, 'hahaha');
    //     })
    // }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showSelectVersion () {
    this.data.isSelectVersion = true
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
  showSelectVersion () {
    this.data.isSelectVersion = true
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
  async setArticles () {
    this.setData({
      loading: true
    })
    this.data.loaded = false
    this.data.pageDatas = []
    const ret = await app.http.get(`/article?pageSize=10&pageNum=${this.data.pageNum}&type=${this.data.currentArticleType}`)
    const datas = ret && ret.data || []
    const articles = this.data.articles.concat(datas)
    this.setData({
      articles: articles ,
      pageDatas: datas,
      loading: false,
      loaded: true
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
