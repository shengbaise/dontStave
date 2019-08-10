import { formatDate } from '../../utils/util.js'

Page({
  data: {
    name: '',
    alis: '',
    question: '',
    hasClickCommit: false,
    item: {}
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '反馈'
    })
    this.setData({
      item: JSON.parse(options.item)
    })
  },
  onShow () {
    this.setData({
      question: '',
      hasClickCommit: false
    })
  },
  handleInput ({detail}) {
    this.setData({
      question: detail.value
    })
  },
  commit () {
    this.setData({
      hasClickCommit: true
    })
    if (!this.data.question) {
      return
    }
    const item = {
      type: this.data.item.type,
      time: formatDate(),
      name: this.data.item.name,
      alis: this.data.item.alis,
      status: 0,
      content: this.data.question // 0 待处理 1 已处理 2 不予处理
    }

    app.http.post('/feedback/add', item, (res) => {
      if (res.code === 0) {
        wx.navigateTo({
          url: '/pages/feedBackList/main'
        })
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
