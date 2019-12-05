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
    toImgDetail ({target}) {
      const item = target.dataset.item || {}
      console.info(item, 'itemmmm')
    }
  }
})
