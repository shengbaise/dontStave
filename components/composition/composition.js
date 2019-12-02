const app = getApp()

Component({
  data: {
    imgDomain: app.imgDomain + '/'
  },
  properties: {
    composition: {
      type: Array,
      value: []
    }
  },
  methods: {
    toImgDetail () {
      // TODO
    }
  }
})
