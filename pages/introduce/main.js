const app = getApp()
import { isEmail, isPhone, formatDate } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    qq: '',
    weixin: '',
    sexType: '1',
    accountType: '1',
    introduce: '',
    errorMessage: '',
    hasNickname: true,
    hasIntroduce: true,
    value1: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '介绍'
    })
  },
  onShow () {
    this.setData({
      errorMessage: '',
      sexType: '1',
      nickname: '',
      qq: '',
      weixin: '',
      accountType: '1',
      introduce: '',
      hasNickname: true,
      hasIntroduce: true
    })
  },
  handleWeixinBlur (e) {
    const value = e.detail.value
    this.setData({
      weixin: value
    })
  },
  handleQQBlur (e) {
    const value = e.detail.value
    this.setData({
      qq: value
    })
  },
  handlehasIntroduceBlur (e) {
    const value = e.detail.value
    this.setData({
      introduce: value,
      hasIntroduce: !!value
    })
  },
  handleNicknameBlur (e) {
    const value = e.detail.value
    this.setData({
      nickname: value,
      hasNickname: !!value
    })
  },
  accountChange (e) {
    this.setData({
      accountType: e.detail.value
    })
  },
  sexChange (e) {
    this.setData({
      sexType: e.detail.value
    })
  },
  commit () {
    if (!this.data.nickname) {
      this.handleNicknameBlur()
      return
    }
    this.setData({
      errorMessage: ''
    })
    if (!this.data.qq && !this.data.weixin) {
      this.setData({
        errorMessage: '微信和QQ必须选填一个'
      })
      return
    }
    if (this.data.qq && !RegExp(/^[1-9][0-9]{4,9}$/).test(this.data.qq)) {
      this.setData({
        errorMessage: '请输入正确的QQ'
      })
      return
    }
    if (this.data.weixin && !isEmail(this.data.weixin) && !isPhone(this.data.weixin)) {
      this.setData({
        errorMessage: '请输入正确的微信号'
      })
      return
    }
    if (!this.data.introduce) {
      this.handlehasIntroduceBlur()
      return
    }
    const item = {
      time: formatDate(),
      contact: this.data.qq || this.data.weixin,
      contactType: this.data.qq ? 1 : 2,
      desc: this.data.introduce,
      name: this.data.nickname,
      sex: this.data.sexType,
      type: this.data.accountType
    }

    app.http.post('/message/add', item, (res) => {
      if (res.code === 0) {
        wx.navigateBack()
      }
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
