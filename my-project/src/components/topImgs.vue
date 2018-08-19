/*
 * @Author: chenxu
 * @Date: 2018-08-13 16:01:39
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-13 17:14:56
 */
<template>
  <div class="top-imgs">
    <img class="bg-img" mode="scaleToFill" src="http://img.fireleaves.cn/SomeLabel/cool-background.png" alt="">
    <img class="img" mode="aspectFit" :src="logoImg[currentVersion]" alt="">
    <img @click="switchVersion()" class="switch" src="/static/icon/switch.png" alt="" mode="aspectFit">
  </div>
</template>

<script>
export default {
  props: {
    currentVersion: {
      type: String,
      default () {
        return 'DST'
      }
    }
  },
  data () {
    return {
      logoImg: {
        'DST': 'http://img.fireleaves.cn/SomeLabel/C763C9B46AC4420F9F2107724A879221.png',
        'DS': 'http://img.fireleaves.cn/SomeLabel/250px-Logo.png',
        'ROG': 'http://img.fireleaves.cn/SomeLabel/Reign_of_Giants.png',
        'SW': 'http://img.fireleaves.cn/SomeLabel/250px-Shipwrecked_Logo.png'
      }
    }
  },
  methods: {
    switchVersion () {
      this.$emit('switch-version')
    }
  }
}
</script>

<style lang="scss" scoped>
.top-imgs {
  position: relative;
  height: 160px;
  .bg-img {
    width: 100vw;
    height: 160px;
  }
  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 120px;
  }
  .switch {
    position: absolute;
    right: 10px;
    top: 3px;
    height: 28px;
    width: 28px;
  }
}
</style>
