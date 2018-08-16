/*
 * @Author: chenxu
 * @Date: 2018-08-13 16:01:39
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-13 17:14:56
 */
<template>
  <div class="top-imgs">
    <img class="bg-img" mode="scaleToFill" src="https://images.weserv.nl/?url=stavebox.oss-cn-beijing.aliyuncs.com/SomeLabel/cool-background.png?x-oss-process=style/versionbg" alt="">
    <img class="img" mode="widthFix" src="https://images.weserv.nl/?url=stavebox.oss-cn-beijing.aliyuncs.com/SomeLabel/C763C9B46AC4420F9F2107724A879221.png" alt="">
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
}
</style>
