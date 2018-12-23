<template>
  <div class="feed-back-button" @click="toFeedBack">
    <img class="feed-back-icon" src="/static/icon/feed_back.png" alt="" mode="aspectFit">
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toFeedBack () {
      wx.navigateTo({
        url: `/pages/feedBack/main?item=${JSON.stringify(this.item)}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.feed-back-button {
    position: absolute;
    background-color: #009688;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    right: 20px;
    bottom: 20px;
}
.feed-back-button .feed-back-icon {
  height:24px;
  width:24px;
}
</style>

