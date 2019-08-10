Component({
  properties: {
    hasSpeed: {
      type: Boolean,
      value: true
    },
    good: {
      type: Object,
      value: {}
    },
    hasFeedback: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    toDetail () {
      this.triggerEvent('click', this.data.good)
    }
  }
})
