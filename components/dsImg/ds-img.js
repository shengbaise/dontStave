const app = getApp()

Component({
  properties: {
    src: {
      type: String,
      value: ''
    },
    suffix: {
      type: String,
      value: '?x-oss-process=style/width-64'
    }
  },
  data: {
    imgDomain: app.imgDomain
  }
})
