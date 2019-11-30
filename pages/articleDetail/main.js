const app = getApp()
import regeneratorRuntime from '../../utils/runtime'
let interstitialAd = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    imgDomain: app.imgDomain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-63cb209a5d409740'
      })
    }

    wx.setNavigationBarTitle({
      title: '文章详情'
    })
    const type = options.type
    const ret = await app.http.get(`/${type}/single?id=${options.id}`)
    this.setData({
      article: ret
    })
    console.info(this.data.article, 'article')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '文章详情',
      path: '/pages/articleDetail/main',
      imageUrl: 'http://img.fireleaves.cn/SomeLabel/share.png'
    }
  }
})
