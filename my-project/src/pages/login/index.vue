<template>
  <div class="login">
    login
  </div>
</template>

<script>
import { shareApp } from '@/utils/index.js'

export default {
  data () {
    return {}
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '登陆'
    })
  },
  onShareAppMessage (res) {
    return shareApp(res)
  }
}
</script>

<style lang="scss" scoped>
    .login {}
</style>
