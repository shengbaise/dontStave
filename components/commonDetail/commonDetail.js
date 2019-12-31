Component({
  properties: {
    attributes: {
      type: Array,
      value: []
    },
    detail: {
      type: Object,
      value: {}
    }
  },
  data: {
    name: 'attributes'
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
