Component({
  properties: {
    navH: {
      type: Number,
      value: 0
    },
    title: {
      type: String,
      value: '掌上饥荒'
    },
    leftIcon1: {
      type: String,
      value: 'return'
    },
    leftIcon2: {
      type: String,
      value: ''
    }
  },
  methods: {
    left1Click () {
      if (this.data.leftIcon1 === 'return') {
        wx.navigateBack({
          delta: 1
        })
        return
      }
      this.triggerEvent('handle-click')
    },
    left2Click () {
      console.info('wewewe')
      this.triggerEvent('handle-click2')
    },
    // 返回上一页
    navBack: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    navHome: function () {
      wx.reLaunch({
        url: '../index/index'
      })
    }
  },
})
