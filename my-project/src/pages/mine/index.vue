<template>
  <div class="mine">
    <div class="feed-back" @click="toFeedBackList">
      <div class="left">
        <img class="feed-back-icon" src="/static/icon/feed_back.png" alt="" mode="aspectFit">
        <p>FeedBack</p>
      </div>
      <div class="right">反馈</div>
    </div>
  </div>
</template>

<script>
import { shareApp } from '@/utils/index.js'

export default {
  data () {
    return {
      userInfo: {},
      hasAccess: false
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  created () {
    if (!this.hasAccess) {
      this.getUserInfo()
    }
  },
  mounted () {
    if (!this.hasAccess) {
      this.getUserInfo()
    }
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              console.info(res.rawData, 'res')
              this.userInfo = JSON.parse(res.rawData)
              this.hasAccess = true
              console.info(this.userInfo, 'userInfo')
            },
            fail: (res) => {
              this.hasAccess = false
            }
          })
        }
      })
    },
    toFeedBackList () {
      wx.navigateTo({
        url: '/pages/feedBackList/main'
      })
    }
  }
  // async mounted () {
  //   this.getUserInfo()
  //   console.info(this.userInfo, 'userInfo')
  // }
}
</script>

<style lang="scss">
page {
  height: 100%;
  width: 100%;
  background-color: #37474f;
}
</style>

<style lang="scss" scoped>
.mine {
  color: #ffffff;
  font-size: 14px;
  height: 100%;
  width: 100%;
  .feed-back {
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #666;
    .left {
      color: #fff;
      display: flex;
      width: 100px;
      justify-content: space-between;
    }
    .right {
      color: #999;
      font-size: 14px;
    }
  }
  .feed-back-icon {
    height:24px;
    width:24px;
  }
}
</style>
