<template>
  <div class="find-friend">
    <scroll-view :scroll-y="true" class="view">
      <div class="friends">
        <div class="friend"
          v-for="friend in friends"
          :key="friend._id"
          :style="{'border-color': friend.sex === 1 ? '#795548' : '#ff80ab'}">
          <img class="logo" v-if="friend.type === 2" mode="aspectFit" src="/static/img/home/wegameLogo.jpg" />
          <img class="logo" v-if="friend.type === 1" mode="aspectFit" src="/static/img/home/steamLogo.png" />
          <div class="detail">
            <div class="personal-message">
              <div class="name">{{friend.name}}</div>
              <div class="contact-logo" v-if="friend.contactType === 1" key="qq">QQ</div>
              <div class="contact-logo" v-else key="weixin">微信</div>
              <div class="contact-number">{{friend.contact}}</div>
              <div class="time">{{friend.time}}</div>
            </div>
            <div class="personal-talk">
              {{friend.desc}}
            </div>
          </div>
        </div>
      </div>
      <p class="bottom-tip-friend" v-if="loading">加载中...</p>
      <p class="bottom-tip-friend" v-if="loaded && allFriends.length === 0">没有更多数据</p>
    </scroll-view>
    <div class="edit-button" @click="toNew()">
      <i class="icon-bianji icon iconfont"></i>
    </div>
    <span class="switch-button" @click="filter()">
      <img class="switch-icon" src="/static/icon/switch.png" alt="" mode="aspectFit">
    </span>
    <div class="select-sort" v-if="isSelect" @click="isSelect = false">
      <div class="sort-list" @click.stop.prevent>
        <div class="title">游戏平台</div>
        <radio-group class="sort-group" @change="platformRadioChange">
          <label class="radio" v-for="item in platforms" :key="item._id">
            <radio :checked="item.value === currentPlatform" class="input-item" color="#009688" type="radio" :value="item.value"/>{{item.name}}
          </label>
        </radio-group>
        <div class="title">性别</div>
        <radio-group class="sort-group" @change="sexRadioChange">
          <label class="radio" v-for="(item, index) in sexs" :key="index">
            <radio :checked="item.value === currentSex" class="input-item" color="#009688" type="radio" :value="item.value"/>{{item.name}}
          </label>
        </radio-group>
        <div class="ok" @click="select()">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isSelect: false,
        friends: [],
        allFriends: [],
        platforms: [
          {value: '1', name: 'Steam'},
          {value: '2', name: 'WeGame'},
          {value: '0', name: '不限'}
        ],
        sexs: [{
          value: '1',
          name: '只看男生'
        }, {
          value: '2',
          name: '只看女生'
        }, {
          value: '0',
          name: '不限'
        }],
        currentPlatform: '0',
        currentSex: '0',
        pageNum: 0,
        loading: false,
        loaded: false
      }
    },
    config: {
      'enablePullDownRefresh': true,
      'onReachBottomDistance': 30
    },
    async onLoad () {
      wx.setNavigationBarTitle({
        title: '找饥友'
      })
    },
    async onShow () {
      this.currentSex = '0'
      this.currentPlatform = '0'
      this.pageNum = 0
      this.setFriends()
    },
    async onReachBottom () {
      if (this.allFriends.length !== 0) {
        this.loading = true
        this.loaded = false
        this.pageNum = this.pageNum + 1
        await this.setFriends()
        this.loading = false
        this.loaded = true
      }
    },
    methods: {
      async setFriends () {
        const result = await this.$http.get(`message?pageSize=10&pageNum=${this.pageNum}`, {
          type: parseInt(this.currentPlatform),
          sex: parseInt(this.currentSex)
        })
        this.allFriends = result.data.data
        this.friends.push(...this.allFriends)
      },
      filter () {
        this.isSelect = true
      },
      toNew () {
        wx.navigateTo({
          url: '/pages/introduce/main'
        })
      },
      sexRadioChange (e) {
        this.currentSex = e.target.value
      },
      select () {
        this.pageNum = 0
        this.friends = []
        this.setFriends()
        this.isSelect = false
      },
      platformRadioChange (e) {
        this.currentPlatform = e.target.value
      }
    }
  }
</script>

<style lang="scss">
.find-friend {
  .sort-list {
    width: 80% !important;
  }
}
page {
  height: 100%;
  width: 100%;
  background-color: #37474f;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>

<style lang="scss" scoped>
.find-friend {
  height: 100%;
  width: 100%;
  box-sizing: content-box;
  background-color: #37474f;
  position: relative;
  .view {
    position: absolute;
    overflow-y: scroll;
    background-color: #37474f;
    width: 100%;
    top: 0;
    height: 100%;
  }
  .add {
    height: 20px;
  }
  .friends {
    padding: 12px;
    .friend {
      position: relative;
      border-left: 4px solid;
      background-color: #212121;
      padding: 12px;
      justify-content: flex-start;
      margin-bottom: 6px;
      display: flex;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      .detail {
        .personal-message {
          margin-left: 8px;
          text-align: left;
          display: flex;
          align-items: center;
          .name {
            font-size: 16px;
            color: #fff;
          }
          .contact-logo {
            font-size: 12px;
            margin: 0 8px;
            color: #666;
          }
          .contact-number {
            font-size: 12px;
            color: #666;
          }
          .time {
            position: absolute;
            right: 12px;
            top: 12px;
            font-size: 12px;
            color: #666;
          }
        }
        .personal-talk {
          margin-left: 8px;
          text-align: left;
          margin-top: 4px;
          padding-top: 4px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .logo {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
  }
  .bottom-tip-friend {
    position:absolute;
    bottom: -24px;
    width:100%;
    font-size:12px;
    color:#999;
    text-align:center;
    padding-bottom:12px;
  }
  .edit-button, .switch-button {
    position: absolute;
    background-color: #ff80ab;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 50%;
  }
  .edit-button {
    width: 32px;
    height: 32px;
    bottom: 20px;
    right: 20px;
    .icon-bianji {
      font-size: 24px;
      color: #fff;
    }
  }
  .switch-button {
    right: 27px;
    width: 18px;
    height: 18px;
    bottom: 90px;
    .switch-icon {
      width: 18px;
      height: 18px;
      color: #fff;
    }
  }
}
</style>