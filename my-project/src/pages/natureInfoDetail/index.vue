<template>
  <div class="nature-intro-detail">nature-intro-detail</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '自然详情'
    })
    console.info(options, 'nature-intro-detail')
  }
}
</script>

<style scoped lang="scss">
.nature-intro-detail {} 
</style>
