<template>
  <!-- <div class="upload-img"> -->
    <img :src="imgUrl" alt=""
      :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }"
      style="max-height: 64px;" mode="aspectFit">
  <!-- </div> -->
</template>

<script>
// style="max-height: 64px; max-width: 64px;"
export default {
  props: {
    imgUrl: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      imgWidth: 0,
      imgHeight: 0
    }
  },
  onReady () {
    const self = this
    wx.getImageInfo({
      src: self.imgUrl,
      success: (res) => {
        self.imgWidth = res.width
        self.imgHeight = res.height
      }
    })
  }
}
</script>
