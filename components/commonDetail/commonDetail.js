Component({
  properties: {
    console: {
      type: String,
      value: ''
    },
    introduce: {
      type: String,
      value: ''
    }
  },
  methods: {
    copyNumber (event) {
      const dataset = event.currentTarget.dataset
      const contact = dataset.content
      wx.setClipboardData({
        data: contact
      })
    }
  },
})
