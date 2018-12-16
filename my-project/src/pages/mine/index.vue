<template>
  <div class="mine">
    <!-- <div class="user-info" v-if="hasAccess">
      <img class="avatar" :src="userInfo.avatarUrl" alt="" mode="aspectFit">
      <p>{{userInfo.nickName}}</p>
    </div>
     <button open-type="getUserInfo" v-if="!hasAccess">登陆</button> -->
     <p>开发中，敬请期待～～～</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      hasAccess: false
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '开发中'
    })
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
    }
  }
  // async mounted () {
  //   this.getUserInfo()
  //   console.info(this.userInfo, 'userInfo')
  // }
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  width: 100%;
}
.mine {
  color: #ffffff;
  font-size: 14px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: nowrap;
  justify-content: center;
  align-items: center;
  .user-info {
    display: flex;
    align-items: center;
    .avatar {
      width: 38px;
      height: 38px;
      border-radius: 20px;
    }
  }
}
</style>
