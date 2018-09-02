import Vue from 'vue'
import App from './App'
import { global } from './mixin'
// import { AlertPlugin, ToastPlugin } from 'vux'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = fly
/* eslint-disable */
// Vue.prototype.compLink = function (imgUrl, version) {
//   const characters = imgUrl.split('/')
//   const comp = characters[characters.length - 1]
//   let src = ''
//   let firstComp = comp[0]
//   if (firstComp == "G") {
//       src = `http://img.fireleaves.cn/animReward/${comp}.png`
//       wx.navigateTo({
//         url: `/pages/natureInfoDetail/main?src=${imgUrl}&version=${this.version}`
//       })
//   } else if (firstComp == "S") {
//       src = `http://img.fireleaves.cn/Sciences/${comp}.png`
//       wx.navigateTo({
//         url: `/pages/scienceTechnologyDetail/main?src=${src}&version=${this.version}`
//       })
//   } else if (firstComp == "A") {
//     src = `http://img.fireleaves.cn/Creatures/${comp}.png`
//     wx.navigateTo({
//       url: `/pages/animInfoDetail/main?src=${src}&version=${this.version}`
//     })
//   } else if (firstComp == "F") {
//     src = `http://img.fireleaves.cn/Foods/${comp}.png`
//     wx.navigateTo({
//       url: `/pages/recipeDetail/main?src=${src}&version=${this.version}`
//     })
//   }
// }

Vue.mixin(global)

// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#009688',
      navigationBarTitleText: '掌上饥荒',
      navigationBarTextStyle: '#ffffff',
      backgroundColor: '#1a2933'
    }
  }
}
