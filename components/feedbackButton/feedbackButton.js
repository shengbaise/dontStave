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
      wx.navigateTo({
        url: `/pages/feedback/main?item=${JSON.stringify(data)}`
      })
    }
  }
})
