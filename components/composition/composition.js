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
    },
    title: {
      type: String,
      value: ''
    }
  },
  methods: {
    toImgDetail ({target}) {
      const item = target.dataset.item || {}
      console.info(item, 'itemmmm')
    }
  }
})
