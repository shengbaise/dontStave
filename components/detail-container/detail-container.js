const app = getApp()

Component({
  data: {
    imgDomain: app.imgDomain + '/'
  },
  properties: {
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
