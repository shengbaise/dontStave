Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    currentTab: {
      type: String,
      value: ''
    }
  },
  data: {
    // currentTab: '',
    scrollLeft: 0,
  },
  methods: {
    selectTab (e) {
      const dataset = e.target.dataset
      const index = dataset.index
      const type = dataset.type
      if (index > 2) {
        this.setData({
          scrollLeft: 76 * (index - 2)
        })
      } else {
        this.setData({
          scrollLeft: 0
        })
      }
      if (type) {
        // this.setData({
        //   currentTab: type
        // })
        this.data.currentGoods = []
        setTimeout(() => {
          this.triggerEvent('selectTab', type)
        }, 0)
      } else {
        this.setData({
          showMoreTab: true
        })
      }
    }
  }
})
