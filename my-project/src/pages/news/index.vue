// 动态
<template>
  <div class="news">
    <p style="text-align: center;color: #fff;font-size: 12px;padding: 12px;">开发中敬请期待～～</p>
    <scroll-view v-if="false" :scroll-top="scrollTop" :scroll-y="true" class="view" @scrolltolower="loadMore">
      <div style="padding: 12px;padding-top: 0;">
        <div class="top">
          <div class="count-text">
            <h1 class="count">{{total}}</h1>
            <p class="text">动态总数</p>
          </div>
          <div class="tabs">
            <div class="tab" @click="selectTab(1)">
              <i :class="{'selected-tag': tag == 1}" class="icon-tree iconfont icon"></i>
              <p>生存</p>
            </div>
            <div class="tab" @click="selectTab(2)">
              <i :class="{'selected-tag': tag == 2}" class="icon-icon_tiwen iconfont icon"></i>
              <p>提问</p>
            </div>
            <div class="tab" @click="selectTab(3)">
              <i :class="{'selected-tag': tag == 3}" class="iconfont">&#xe657;</i>
              <p>建造</p>
            </div>
            <div class="tab" @click="selectTab(4)">
              <i :class="{'selected-tag': tag == 4}" class="icon-xunhuan iconfont icon"></i>
              <p>工厂流</p>
            </div>
            <div class="tab" @click="selectTab(5)">
              <i :class="{'selected-tag': tag == 5}" class="icon-shuben iconfont icon"></i>
              <p>同人小说</p>
            </div>
            <div class="tab" @click="selectTab(6)">
              <i :class="{'selected-tag': tag == 6}" class="icon-huati iconfont icon"></i>
              <p>话题</p>
            </div>
          </div>
        </div>
        <div class="tip">
          <div class="athor-container">
            <img mode="aspectFill" style="width: 50px;height: 50px;border-radius: 50%;" src="https://desc-user.oss-cn-shenzhen.aliyuncs.com/mrhuoye.jpg?x-oss-process=style/clipping" alt="">
            <p class="name">Mr火叶</p>
          </div>
          <div class="text-container">
            <p class="tip-text">掌上饥荒官方群：603846749，饥荒相关问题都能得到解答。(tips:我们会收取5元用于群建设，给大家提供良好的讨论氛围)</p>
          </div>
          <div class="moderator">版主</div>
        </div>
        <div class="dynamic-container">
          <div @click="toDetail(article.id)" class="single-dynamic" v-for="article in articles" :key="article.id">
            <div class="user-tag">
              <div class="user">
                <img v-if="article.avatersrc" style="width: 50px;height: 50px;border-radius: 50%;" :src="article.avatersrc" alt="">
                <p v-if="!article.avatersrc" style="width: 50px;height: 50px;border-radius: 50%;background-color: #f6f6f6;"></p>
              </div>
              <div class="name-container">
                <p class="name">{{article.nickname}}</p>
                <p class="type">工厂流{{article.type}}</p>
              </div>
              <div class="time">{{article.date}}</div>
            </div>
            <p class="title">{{article.title}}</p>
            <img v-if="article.imgsrc" mode="aspectFill" class="picture" :src="article.imgsrc" alt="">
            <div class="like-container">
              <i class="iconfont comment">&#xe891;</i>
            </div>
          </div>
          <p class="bottom-tip" v-if="loading">加载中...</p>
          <p class="bottom-tip" v-if="loaded && !(total > (pageNum * 10 + 10))">没有更多数据</p>
        </div>
      </div>
    </scroll-view>
    <div v-if="false" class="hover-button" @click="addNews" :style="{'background-color': backgroundColor}">
      <i :style="{'font-size': fontSize, 'color': color}" class="iconfont">&#xe71c;</i>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../utils/index.js'

export default {
  data () {
    return {
      pageDatas: [],
      articles: [],
      total: 0,
      pageNum: 0,
      loading: false,
      loaded: false,
      scrollTop: 50,
      tag: 1,
      fontSize: '24px',
      color: '#fff',
      backgroundColor: '#009688'
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '动态'
    })
  },
  mounted () {
    this.setArticles()
  },
  onShow () {
    this.pageNum = 0
  },
  methods: {
    addNews () {
      wx.navigateTo({
        url: `/pages/addNews/main`
      })
    },
    selectTab (tag) {
      this.tag = tag
    },
    toDetail (id) {
      wx.navigateTo({
        url: `/pages/newsDetail/main?id=${id}`
      })
    },
    async setArticles () {
      this.loading = true
      this.loaded = false
      this.pageDatas = []
      const res = await this.$http.get(`https://api.fireleaves.cn/api/article?tag=${this.tag}&pageSize=10&pageNum=${this.pageNum}`)
      const data = res.data.result
      this.pageDatas = data.list.map(item => {
        item.date = formatDate(item.date)
        return item
      })
      this.total = data.total
      this.articles.push(...this.pageDatas)
      this.loading = false
      this.loaded = true
    },
    loadMore () {
      if (this.total > (this.pageNum * 10 + 10)) {
        this.pageNum = this.pageNum + 1
        this.setArticles()
      }
    }
  },
  watch: {
    tag (value) {
      this.articles = []
      this.pageNum = 0
      this.setArticles()
    }
  }
}
</script>
<style lang="scss">
page {
  width: 100%;
  height: 100%;
  background-color: #37474f;
}
</style>

<style lang="scss" scoped>
.news {
  height: 100%;
  position: relative;
  .selected-tag {
    color: #009688 !important;
  }
  .view {
    position: absolute;
    overflow-y: scroll;
    width: 100%;
    top: 0;
    height: 100%;
    box-sizing:border-box;
    .top {
      margin-top: 12px;
      box-sizing:border-box;
      height:151px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      width: 100%;
      background-color: #fff;
      box-shadow: inset 0 0 8px 2px #bdbdbd;
      border-radius: 4px;
      justify-content: space-between;
      .count-text {
        flex-basis: 30%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        .count {
          font-size: 38px;
          color: #333;
          text-align: center;
        }
        .text {
          margin-top: 12px;
          color: #999;
          font-size: 12px;
          text-align: center;
        }
      }
      .tabs {
        display: flex;
        flex-flow: wrap row;
        flex-grow: 1;
        align-items: center;
        justify-content: space-around;
        .tab {
          text-align: center;
          flex-basis: 30%;
          // margin-bottom: 16px;
          .iconfont {
            color: gray;
            font-size: 38px;
          }
          p {
            margin-top: 6px;
            // line-height: 0;
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
    .tip {
      position: relative;
      padding: 12px;
      margin-top: 12px;
      display: flex;
      background-color: #fff;
      box-shadow: inset 0 0 8px 2px #bdbdbd;
      border-radius:4px;
      .athor-container {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        .name {
          margin-top: 4px;
          color: #333;
          font-size: 12px;
          width: 50px;
          text-align: center;
        }
      }
      .text-container {
        flex-basis: 70%;
        margin-left: 24px;
        .tip-text {
          margin-left: 6px;
          color: #666;
          font-size: 12px;
          line-height: 16px;
          text-align: justify;
        }
      }
      .moderator {
        position: absolute;
        right: 6px;
        bottom: 6px;
        font-size: 12px;
        color: #999;
        border-radius: 4px;
      }
    }
    .dynamic-container {
      position: relative;
      .single-dynamic {
        border-radius:4px;
        position: relative;
        background-color: #fff;
        box-shadow: inset 0 0 8px 2px #bdbdbd;
        margin-top: 12px;
        .user-tag {
          padding: 12px;
          display: flex;
          .name-container {
            margin-left: 8px;
            color: #333;
            text-align: left;
            .name {
              font-weight: 600;
              font-size: 12px;
              line-height: 12px;
            }
            .type {
              height:12px;
              line-height:12px;
              margin-top:6px;
              font-size: 12px;
              align-items: center;
              margin-top: 6px;
              padding: 2px 8px;
              border: 1px solid #666;
              border-radius: 50px;
              color: #666;
            }
          }
        }
        .time {
          position: absolute;
          right: 6px;
          top: 12px;
          font-size: 12px;
          color: #999;
        }
        .title {
          margin-bottom: 12px;
          padding-left: 12px;
          font-size: 16px;
          font-weight: 600;
          width: 100%;
          text-align: left;
          color: #222;
        }
        .picture {
          height: 180px;
          width: 100%;
        }
        .like-container {
          padding: 12px;
          justify-content: space-between;
          .comment {
            font-size: 24px;
          }
        }
      }
    }
  }
  .bottom-tip {
    position: absolute;
    padding-top:12px;
    bottom:-40px;
    width:100%;
    font-size:12px;
    color:#999;
    text-align:center;
    padding-bottom: 12px;
  }
}
</style>
