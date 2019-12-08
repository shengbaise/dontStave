Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  data: {
  },
  methods: {
    toFeedBack () {
      const data = {
        name: this.data.item.name,
        alis: this.data.item.alis
      }
      wx.redirectTo({
        url: `/pages/feedback/main?item=${JSON.stringify(data)}`
      })
    }
  }
})
