<template>
  <div class="container">
    <div class="banner">
      <img class="banner-home" src="https://images.weserv.nl/?url=img1.gamersky.com/upimg/pic/2017/04/13/201704131606415972_tiny.jpg" alt="">
      <!-- <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="(item, index) in banners" :index="index" :key="index">
          <swiper-item>
            <img :src="item.src" class="slide-image" mode="aspectFill">
          </swiper-item>
        </block>
      </swiper> -->
    </div>
    <div class="view">
      <div class="tabs">
        <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="toTap(tab.toPath, tab.type)">
          <img class="tab-img" alt="" :src="tab.tabImgUrl" mode="aspectFill">
          <div class="tab-name">{{tab.name}}</div>
        </div>
      </div>
      <div class=" egg-shell">
        <div class="left">
          <!-- <upload-img imgUrl="/static/img/home/map_intro.png"></upload-img> -->
          <img src="/static/img/home/map_intro.png" class="egg-img" alt="" mode="widthFix">
          <div class="content">
            <p class="map">地图百科</p>
            <p class="detail">地域特色，生物群落</p>
          </div>
        </div>
        <div class="right">
          <img src="/static/img/home/season_intro.png" class="egg-img" alt="" mode="widthFix">
          <!-- <upload-img imgUrl="/static/img/home/season_intro.png"></upload-img> -->
          <div class="content">
            <p class="location">地标 & 奇遇</p>
            <p class="detail">地标建筑，趣味彩蛋</p>
          </div>
        </div>
      </div>
      <div class="articles">
        <div class="article" v-for="item in articles" :key="item.id">
          <img class="article-img" :src="item.src" alt="" mode="aspectFill">
          <div class="text">
            <h1 class="title">{{item.title}}</h1>
            <p class="content">{{item.content}}</p>
            <div class="article-footer">
              <div class="time">{{item.time}}</div>
              <div class="author">{{item.author}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div @click="toTabPage(tab.label)" v-for="tab in footerTabs" :key="tab.label" :class="{ 'selected': currentLabel === tab.label }">
        <i
          class="iconfont icon icon-home"
          :class="[tab.icon === 'icon-home' ? 'icon-home' : tab.icon === 'icon-xiaoxi'
          ? 'icon-xiaoxi' : tab.icon === 'icon-shoucang-tianchong'
          ? 'icon-shoucang-tianchong' : 'icon-mine']"></i>
        <div class="label">{{tab.label}}</div>
      </div>
    </div>
    <select-version v-if="!version" @select-version="selectVersion($event)" listWidth="80%" :isHome="true"></select-version>
  </div>
</template>

<script>
import uploadImg from '@/components/uploadImg'
import selectVersion from '@/components/selectVersion.vue'

export default {
  data () {
    return {
      footerTabs: [{
        label: '主页',
        icon: 'icon-home'
      }, {
        label: '动态',
        icon: 'icon-xiaoxi'
      }, {
        label: '藏品',
        icon: 'icon-shoucang-tianchong'
      }, {
        label: '我的',
        icon: 'icon-mine'
      }],
      motto: 'Hello World',
      userInfo: {},
      tabs: [{
        tabImgUrl: '/static/img/home/entry-icon-chacter.png',
        name: '人物',
        toPath: 'heroIntro',
        type: 'hero'
      }, {
        tabImgUrl: '/static/img/home/entry-icon-thing.png',
        name: '科技',
        toPath: 'scienceTechnology',
        type: 'material?version=DST'
      }, {
        tabImgUrl: '/static/img/home/entry-icon_food.png',
        name: '食谱',
        toPath: 'recipe',
        type: 'food?version=DST'
      }, {
        tabImgUrl: '/static/img/home/entry-icon_anim.png',
        name: '生物',
        toPath: 'animInfo',
        type: 'anim?version=DST'
      }, {
        tabImgUrl: '/static/img/home/entry-icon_nature.png',
        name: '自然',
        toPath: 'natureInfo',
        type: 'nature?version=DST'
      }, {
        tabImgUrl: '/static/img/home/entry-icon_rule.png',
        name: '机制',
        toPath: 'Rule',
        type: 'hero'
      }],
      data: {},
      banners: [],
      articles: [],
      version: '',
      currentLabel: '主页'
    }
  },
  components: {
    uploadImg,
    selectVersion
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '掌上饥荒'
    })
    this.version = wx.getStorageSync('currentVersion')
  },
  async mounted () {
    const res = await this.$http.get('https://www.fireleaves.cn/init')
    this.data = res.data[0]
    this.banners = this.data.banner
    this.articles = this.data.article
  },
  methods: {
    toTabPage (label) {
      this.currentLabel = label
    },
    async selectVersion (item) {
      await wx.setStorageSync('currentVersion', item)
      this.version = wx.getStorageSync('currentVersion')
    },
    toTap (path, type) {
      wx.navigateTo({
        url: `/pages/${path}/main?type=${type}`
      })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
    // clickHandle (msg, ev) {
    //   console.log('clickHandle:', msg, ev)
    // }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>
<style>
page {
  width:100%;
  height:100%;
  background-color: #37474f;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>

<style lang="scss" scoped>
.container {
  padding-top: 0;
  width: 100%;
  background-color: #37474f;
  .selected {
    color: rgb(40, 116, 240) !important;
    .icon {
      color: rgb(40, 116, 240) !important;
    }
  }
  .banner {
    .banner-home {
      margin-top: 12px;
      height: 160px;
    }
  }
  .view {
    position: relative;
    margin-bottom: 44px;
    background-color: #37474f;
    // top: 172px;
    width: 100%;
    // overflow: scroll;
    .tabs {
      height: 40px;
      padding: 10px;
      display: flex;
      flex-flow: nowrap row;
      font-size:14px;
      justify-content: space-around;
      color: white;
      .tab-img {
        height: 32px;
        width: 32px;
      }
    }
    .egg-shell {
      margin-top: 20px;
      padding: 0 12px;
      height: 110px;
      display: flex;
      flex-flow: nowrap row;
      justify-content: space-between;
      font-size: 14px;
      color: #fff;
      border-top: 10px solid #2d3b42;
      border-bottom: 10px solid #2d3b42;
      box-sizing: border-box;
      .egg-img {
        padding: 10px;
        width: 38px;
      }
      .left, .right {
        margin-top: 10px;
        height: 70px;
        width: 50%;
        display: flex;
        flex-flow: nowrap row;
        align-items: center;
      }
      .left {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        background-color: #1a2933;
      }
      .right {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: rgb(32, 43, 50);
      }
      .content {
        .detail {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .articles {
      .article {
        position: relative;
        margin: 10px;
        display: flex;
        flex-flow: nowrap row;
        border-radius: 4px;
        // align-items: center;
        background-color: #1a2933;
        font-size: 14px;
        .article-img {
          width: 120px;
          height: 120px;
          margin: 10px;
        }
        .text {
          width: calc(100% - 140px);
          .title {
            margin: 10px 0;
            color: white;
            font-size: 16px;
          }
          .content {
            color: #4f5555;
            margin-bottom: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .article-footer {
          position: absolute;
          bottom: 15px;
          right: 30px;
          display: flex;
          flex-flow: row nowrap;
          font-size: 12px;
          color: #4f5555;
        }
      }
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    bottom: 0px;
    height: 56px;
    background-color: #263238;
    color: rgba(102,102,102,.54);
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    .icon {
      font-size: 24px;
      color: rgba(102,102,102,.54);
    }
    .icon-shoucang-tianchong {
      font-size: 23px;
    }
    .icon-mine {
      font-size: 28px;
    }
  }
}
</style>
