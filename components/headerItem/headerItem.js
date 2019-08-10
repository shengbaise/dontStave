Component({
  properties: {
    navH: {
      type: Number,
      value: 0
    },
    title: {
      type: String,
      value: '掌上饥荒'
    }
  },
  methods: {
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
