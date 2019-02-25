<template>
  <div class="home-container">
    <div class="fixed-item" v-show="isFixed">
      <search-input @click="toSearch" marginRight="0" :top="0" width="100%" :isReadonly="true"></search-input>
      <scroll-view :scroll-with-animation="true" :scroll-left="scrollLeft" scroll-x style="width: 100%;" class="article-tabs">
        <div class="tab" @click="selectTab(tab.type, index)" :class="{ 'tab-selected': currentArticleType === tab.type }" v-for="(tab, index) in articleTabs" :key="tab.type">{{tab.label}}</div>
      </scroll-view>
    </div>
    <scroll-view
      :scroll-into-view="testId"
      :scroll-top="scrollTop"
      @scroll="scroll" :scroll-y="true" class="view" @scrolltolower="loadMore">
      <ad unit-id="adunit-e7a57fa768a06808"></ad>
      <search-input @click="toSearch" marginRight="0" :top="0" width="100%" :isReadonly="true"></search-input>
      <div class="tabs">
        <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="toTap(tab.toPath, tab.type)">
          <img class="tab-img" alt="" :src="tab.tabImgUrl" mode="aspectFill">
          <div class="tab-name">{{tab.name}}</div>
        </div>
      </div>
      <scroll-view id="test" :scroll-with-animation="true" :scroll-left="scrollLeft" scroll-x style="width: 100%;" class="article-tabs">
        <div class="tab" @click="selectTab(tab.type, index)" :class="{ 'tab-selected': currentArticleType === tab.type }" v-for="(tab, index) in articleTabs" :key="tab.type">{{tab.label}}</div>
      </scroll-view>
      <!-- <div class=" egg-shell">
        <div class="left" @click="toGeographicalList('map')">
          <img src="/static/img/home/map_intro.png" class="egg-img" alt="" mode="widthFix">
          <div class="content">
            <p class="map">地图百科</p>
            <p class="detail">地域特色，生物群落</p>
          </div>
        </div>
        <div class="right" @click="toGeographicalList('adventure')">
          <img src="/static/img/home/season_intro.png" class="egg-img" alt="" mode="widthFix">
          <div class="content">
            <p class="location">地标 & 奇遇</p>
            <p class="detail">地标建筑，趣味彩蛋</p>
          </div>
        </div>
      </div> -->
      <div class="articles">
        <div class="article"
          v-for="item in articles"
          :key="item.id"
          @click="toArticleDetail(item._id)"
          :style="{'border-color': borderColors[index % 6]}">
          <img class="article-img" :src="item.src" alt="" mode="aspectFill">
          <div class="text">
            <h1 class="title">{{item.title}}</h1>
            <div class="article-footer">
              <i class="icon-geren iconfont icon"></i><p class="author">{{item.author}}</p>
              <i class="icon-rili iconfont icon" style="padding-left:4px;"></i><p class="time">{{item.time}}</p>
            </div>
          </div>
        </div>
        <p class="bottom-tip" v-if="loading">加载中...</p>
        <p class="bottom-tip" v-if="loaded && pageDatas.length === 0">没有更多数据</p>
      </div>
    </scroll-view>
    <div class="select-version-button" @click="showSelectVersion">
      <img class="switch-icon" src="/static/icon/switch.png" alt="" mode="aspectFit">
    </div>
    <select-version
      @hide-select="hideSelect"
      v-if="isSelectVersion"
      @select-version="selectVersion($event)"
      listWidth="80%"
      :isHome="true"></select-version>
  </div>
</template>

<script>
import searchInput from '@/components/searchInput'
import uploadImg from '@/components/uploadImg'
import selectVersion from '@/components/selectVersion.vue'
import {shareApp} from '@/utils/index.js'

export default {
  data () {
    return {
      footerTabs: [
        {
          label: '主页',
          icon: 'icon-home',
          path: '/pages/index/main'
        }, {
          label: '动态',
          icon: 'icon-xiaoxi',
          path: '/pages/index/main'
        }, {
          label: '藏品',
          icon: 'icon-shoucang-tianchong',
          path: '/pages/index/main'
        }, {
          label: '我的',
          icon: 'icon-mine',
          path: '/pages/login/main'
        }],
      motto: 'Hello World',
      userInfo: {},
      tabs: [
        {
          tabImgUrl: '/static/img/home/entry-icon-chacter.png',
          name: '人物',
          toPath: 'heroIntro',
          type: 'hero'
        }, {
          tabImgUrl: '/static/img/home/entry-icon-thing.png',
          name: '科技',
          toPath: 'scienceTechnology',
          type: 'materials?version=DST'
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
          toPath: 'gameMechanism',
          type: ''
        }],
      pageDatas: [],
      banners: [],
      articles: [],
      version: '',
      currentLabel: '主页',
      total: 0,
      pageNum: 0,
      loading: false,
      loaded: false,
      scrollTop: 0,
      borderColors: ['#dc1454', '#ae63e4', '#47cf73', '#ffdd40', '#0ebeff', '#4a4c53'],
      isSelectVersion: false,
      scrollLeft: 0,
      articleTabs: [
        {
          type: 0,
          label: '推荐'
        }, {
          type: 1,
          label: '科普攻略'
        }, {
          type: 2,
          label: '生存技巧'
        }, {
          type: 3,
          label: '游戏更新'
        }, {
          type: 4,
          label: '官方公告'
        }, {
          type: 5,
          label: '背景故事'
        }, {
          type: 6,
          label: '同人小说'
        }
      ],
      currentArticleType: 0,
      isFixed: false
    }
  },
  components: {
    uploadImg,
    selectVersion,
    searchInput
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '掌上饥荒'
    })
    this.version = wx.getStorageSync('currentVersion') || 'DST'
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  async mounted () {
    await this.setArticles()
    this.testId = 'test'
  },
  onPageScroll () {
    console.info('滚动')
  },
  methods: {
    scroll (e) {
      if (e.target.scrollTop >= 167 && !this.isFixed) {
        console.info('出现')
        this.isFixed = true
      } else if (e.target.scrollTop < 167 && this.isFixed) {
        this.isFixed = false
        console.info('隐藏')
      }
      // console.info(e.target.scrollTop, 'wwwwwwww', e)
    },
    selectTab (type, index) {
      // this.currentArticleType = type
      // if (index > 2) {
      //   this.scrollLeft = 76 * (index - 2)
      // } else {
      //   this.scrollLeft = 0
      // }
    },
    hideSelect () {
      this.isSelectVersion = false
    },
    showSelectVersion () {
      this.isSelectVersion = true
    },
    loadMore () {
      if (this.pageDatas.length !== 0) {
        this.pageNum = this.pageNum + 1
        this.setArticles()
      }
    },
    toSearch () {
      // wx.navigateTo({
      //   url: `/pages/search/main?type=${this.currentSearchType}&searchContent=${this.searchContent}`
      // })
    },
    async setArticles () {
      this.loading = true
      this.loaded = false
      this.pageDatas = []
      const res = await this.$http.get(`/article?pageSize=10&pageNum=${this.pageNum}`)
      this.pageDatas = res.data.data
      this.total = res.data.total
      this.articles.push(...this.pageDatas)
      this.loading = false
      this.loaded = true
    },
    toGeographicalList (type) {
      wx.navigateTo({
        url: `/pages/GeographicalList/main?type=${type}`
      })
    },
    toArticleDetail (id) {
      wx.navigateTo({
        url: `/pages/articleDetail/main?id=${id}&type=article`
      })
    },
    toTabPage (tab) {
      this.currentLabel = tab.label
      wx.navigateTo({
        url: tab.path
      })
    },
    async selectVersion (item) {
      await wx.setStorageSync('currentVersion', item)
      this.version = wx.getStorageSync('currentVersion') || 'DST'
      this.isSelectVersion = false
    },
    toTap (path, type) {
      wx.navigateTo({
        url: `/pages/${path}/main?type=${type}`
      })
    }
    // getUserInfo () {
    //   // 调用登录接口
    //   wx.login({
    //     success: () => {
    //       wx.getUserInfo({
    //         success: (res) => {
    //           this.userInfo = res.userInfo
    //         }
    //       })
    //     }
    //   })
    // }
    // clickHandle (msg, ev) {
    //   console.log('clickHandle:', msg, ev)
    // }
  }
  // created () {
  // 调用应用实例的方法获取全局数据
  // this.getUserInfo()
  // }
}
</script>

<style>
page {
  height: 100%;
  width: 100%;
  background-color: #37474f;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>

<style lang="scss" scoped>
.home-container {
  position: relative;
  padding-top: 0;
  width: 100%;
  height: 100%;
  background-color: #37474f;
  .fixed-item {
    position: absolute;
    top: 0;
    z-index:12;
    background-color: #37474f;
  }
  .tab-selected {
    color: #b7ba6b !important;
  }
  .article-tabs {
    white-space: nowrap;
    flex-shrink: 0;
    width: 100%;
    height: 42px;
    width:100%;
    overflow-x:scroll;
    white-space: nowrap;
    font-size: 14px;
    background-color: #37474f;
    color: #999;
    justify-content: space-around;
    align-items: center;
    .tab {
      display: inline-block;
      width: 64px;
      height: 42px;
      margin-right: 12px;
      line-height: 42px;
      text-align: center;
      white-space: nowrap;
    } 
  }
  .selected {
    color: rgb(40, 116, 240) !important;
    .icon {
      color: rgb(40, 116, 240) !important;
    }
  }
  .banner {
    height: auto;
    flex-shrink: 0;
  }
  .search-item {
    position: relative;
    flex-shrink: 0;
  }
  .view {
    position: relative;
    white-space: nowrap;
    height: 100vh;
    overflow:scroll;
    background-color: #37474f;
    width: 100%;
    .tabs {
      border-bottom:8px solid #2d3b42;
      padding-bottom:12px;
      padding: 0 10px 12px 10px;
      display: flex;
      flex-flow: nowrap row;
      font-size:14px;
      justify-content: space-around;
      color: #a6a9b0;
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
        background-color: #102027;
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
      position: relative;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      padding: 12px 12px 0 12px;
      .article {
        position: relative;
        width: calc(50% - 6px);
        margin-bottom: 12px;
        background-color: #1a2933;
        font-size: 14px;
        background-color: #191a1d;
        border-radius: 4px;
        box-sizing: border-box;
        border-top: 4px solid;
        .article-img {
          border-radius: 4px;
          width: 100%;
          height: 100px;
        }
        .text {
          .title {
            width:calc(100% - 26px);
            margin-top: 12px;
            padding-left: 12px;
            padding-right: 12px;
            text-align: left;
            font-size: 14px;
            color: #fff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
        .article-footer {
          display: flex;
          align-items: center;
          margin-top: 6px;
          margin-bottom: 6px;
          padding-right: 12px;
          padding-left: 12px;
          color: #a6a9b0;
          font-size: 12px;
          .author, .time {
            margin-left: 8px;
            max-width: 65px;
            min-width: 30px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-align: left;
            overflow: hidden;
          }
        }
      }
    }
  }
  .bottom-tip {
    position: absolute;
    bottom:-30px;
    width:100%;
    font-size:12px;
    color:#999;
    text-align:center;
    padding-bottom: 12px;
  }
  .select-version-button {
    position: absolute;
    background-color: #ae63e4;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    right: 20px;
    bottom: 20px;
    .switch-icon {
      height:24px;
      width:24px;
    }
  }
}
</style>
