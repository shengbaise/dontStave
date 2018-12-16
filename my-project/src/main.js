import Vue from 'vue'
import App from './App'
import { global } from './mixin'
// import { AlertPlugin, ToastPlugin } from 'vux'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
fly.config = {
  baseURL: 'https://fireleaves.cn'
  // baseURL: 'http://47.107.130.106'
}
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = fly

Vue.mixin(global)

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
    },
    tabBar: {
      fontSize: '12px',
      color: '#666',
      backgroundColor: '#263238',
      selectedColor: '#398dee',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: 'static/icon/home.png',
        selectedIconPath: 'static/icon/home-selected.png'
      }, {
        pagePath: 'pages/mine/main',
        text: '动态',
        iconPath: 'static/icon/dynamic.png',
        selectedIconPath: 'static/icon/dynamic-selected.png'
      }, {
        pagePath: 'pages/findFriend/main',
        text: '找饥友',
        iconPath: 'static/icon/find.png',
        selectedIconPath: '/static/icon/find-selected.png'
      }, {
        pagePath: 'pages/mine/main',
        text: '藏品',
        iconPath: 'static/icon/skin.png',
        selectedIconPath: 'static/icon/skin-selected.png'
      }, {
        pagePath: 'pages/mine/main',
        text: '我的',
        iconPath: 'static/icon/mine.png',
        selectedIconPath: 'static/icon/mine-selected.png'
      }]
    }
  }
}
