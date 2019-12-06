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
    size: {
      type: Number,
      value: 48
    }
  },
  methods: {
    toImgDetail () {
      // TODO
    }
  }
})
