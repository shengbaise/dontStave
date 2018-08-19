/*
 * @Author: chenxu
 * @Date: 2018-08-13 16:01:39
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-13 17:14:56
 */
<template>
  <div class="top-imgs">
    <img class="bg-img" mode="scaleToFill" src="http://img.fireleaves.cn/SomeLabel/cool-background.png" alt="">
    <img class="img" mode="widthFix" src="http://img.fireleaves.cn/SomeLabel/C763C9B46AC4420F9F2107724A879221.png" alt="">
    <img class="switch" src="/static/icon/switch.png" alt="" mode="aspectFit">
  </div>
</template>

<script>
export default {
  data () {
  },
  mounted () {}
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
    width: 120px;
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
