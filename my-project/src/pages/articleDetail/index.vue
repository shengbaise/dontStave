<template>
  <div class="article-detail">
    <img class="article-img" v-if="article.src" :src="article.src" alt="" mode="aspectFill">
    <div class="article-content">
      <ad unit-id="adunit-6ef8df293fa6394f"></ad>
      <h3 class="title">{{article.title}}</h3>
      <div class="time-author">
        <p><i class="icon-geren iconfont icon"></i>{{article.author}}</p>
        <p><i class="icon-rili iconfont icon"></i>{{article.time}}</p>
      </div>
      <marked-content :mdString="this.article.content"></marked-content>
    </div>
  </div>
</template>

<script>
import markedContent from '@/components/markedContent.vue'
import { shareApp } from '@/utils/index.js'

export default {
  data () {
    return {
      article: {},
      content: ''
    }
  },
  components: {
    markedContent
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  async onLoad (options) {
    wx.setNavigationBarTitle({
      title: '文章详情'
    })
    const type = options.type
    const result = await this.$http.get(`/${type}/single?id=${options.id}`)
    this.article = result.data
  }
}
</script>

<style scoped lang="scss">
.article-detail {
  .article-img {
    margin-top: -20px;
    width: 100vw;
  }
  .article-content {
    padding: 0 12px 12px 12px;
    rich-text {
      padding-bottom: 12px;
      font-size: 14px;
      color: #4b494c;
      letter-spacing: 2px;
      font-family: Avenir,Helvetica,Arial,sans-serif;
      line-height: 30px;
    }
    .title {
      // font-size: 1.25em !important;
      margin-top: 12px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    .time-author {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      margin: 18px 0;
      font-size: 12px;
      color: #999;
    }
    .icon {
      display: inline-block;
    }
  }
}
</style>
