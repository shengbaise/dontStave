const app = getApp()

Component({
  data: {
    imgDomain: app.imgDomain + '/'
  },
  properties: {
    showNumber: {
      type: Boolean,
      value: true
    },
    composition: {
      type: Array,
      value: []
    },
    technology: {
      type: Array,
      value: []
    },
    attributes: {
      type: Array,
      value: []
    },
    detail: {
      type: Object,
      default: {}
    }
  }
})
