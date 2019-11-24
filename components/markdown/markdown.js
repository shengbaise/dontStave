const WxParse = require('../wxParse/wxParse.js')

Component({
  behaviors: [],
  properties: {
    content: {
      type: [String, Object],
      value: '',
       observer: function(newVal, oldVal) {
          const that = this
          if (!newVal) {
            return
          }
          WxParse.wxParse('article', 'md', newVal, that)
       }
    }
  }
})
