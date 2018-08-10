/*
 * @Author: chenxu
 * @Date: 2018-08-10 16:22:02
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-10 17:35:59
 */
<template>
  <div class="science-technology">
    <div class="top-imgs">
      <img class="bg-img" mode="scaleToFill" src="https://images.weserv.nl/?url=stavebox.oss-cn-beijing.aliyuncs.com/SomeLabel/cool-background.png?x-oss-process=style/versionbg" alt="">
      <img class="img" mode="widthFix" src="https://images.weserv.nl/?url=stavebox.oss-cn-beijing.aliyuncs.com/SomeLabel/C763C9B46AC4420F9F2107724A879221.png" alt="">
    </div>
    <div class="tabs">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [{
        label: '工具'
      }, {
        label: '照明'
      }, {
        label: '生存'
      }, {
        label: '更多'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.science-technology {
  .top-imgs {
    position: relative;
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
  .tabs {
    height: 30px;
    background-color: #263238;
  }
}
</style>
