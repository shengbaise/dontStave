const app = getApp()
const { $Toast } = require('../../components/iView/dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelect: false,
    friends: [],
    allFriends: [],
    typeList: [
      {
        name: ' 全部',
        id: 0,
        platform: '0',
        sex: '0'
      }, {
        name: ' Steam',
        id: 1,
        platform: '1',
        sex: '0'
      }, {
        name: ' WeGame',
        id: 2,
        platform: '2',
        sex: '0'
      }, {
        name: ' 男',
        id: 3,
        platform: '0',
        sex: '1'
      }, {
        name: ' 女',
        id: 4,
        platform: '0',
        sex: '2'
      }, {
        name: ' Steam（女）',
        id: 5,
        platform: '1',
        sex: '2'
      }, {
        name: ' Steam（男）',
        id: 6,
        platform: '1',
        sex: '1'
      }, {
        name: ' WeGame（女）',
        id: 7,
        platform: '2',
        sex: '2'
      }, {
        name: ' WeGame（男）',
        id: 8,
        platform: '2',
        sex: '1'
      }
    ],
    currentType: {
      name: ' 全部',
      id: 0,
      platform: '0',
      sex: '0'
    },
    pageNum: 0,
    loading: false,
    loaded: false,
    showToast: false,
    scrollTop: 0,
    navH: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '找饥友'
    })
    this.data.pageNum = 0
    this.data.friends = []
    this.setFriends()
    this.setData({
      navH: app.globalData.navHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 用户点击右上角分享
   */
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
  setFriends () {
    const currentType = this.data.currentType
    const type = parseInt(currentType.platform)
    const sex = parseInt(currentType.sex)
    this.setData({
      loading: true,
      loaded: false
    })
    app.http.get(`/message?pageSize=10&pageNum=${this.data.pageNum}&type=${type}&sex=${sex}`, (res) => {
      const datas = this.data.friends.concat(res.data)
      this.setData({
        allFriends: res.data,
        friends: datas,
        loading: false,
        loaded: true
      })
    })
  },
  copyNumber (event) {
    const dataset = event.currentTarget.dataset
    const contact = dataset.content
    wx.setClipboardData({
      data: contact
    })
  },
  loadMore () {
    if (this.data.allFriends.length !== 0) {
      this.data.pageNum = this.data.pageNum + 1
      this.setFriends()
    }
  },
  filter () {
    this.isSelect = true
  },
  toNew () {
    wx.navigateTo({
      url: '/pages/introduce/main'
    })
  },
  sexRadioChange (e) {
    this.currentSex = e.target.value
  },
  select () {
    this.pageNum = 0
    this.friends = []
    this.setFriends()
    this.isSelect = false
  },
  platformRadioChange (e) {
    this.data.currentPlatform = e.target.value
  },
  closeSelect () {
    this.setData({
      isSelect: false
    })
  },
  handleChangeScroll ({ detail }) {
    const id = detail.key
    const item = this.data.typeList.find(v => v.id == id)
    this.setData({
      currentType: item,
      pageNum: 0,
      scrollTop: 0
    })
    this.data.friends = []
    this.setFriends()
  },
  onReachBottom () {
    this.loadMore()
  },
  onPullDownRefresh () {
    this.data.pageNum = 0
    this.setFriends()
    wx.stopPullDownRefresh()
  }
})
