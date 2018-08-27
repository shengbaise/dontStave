<template>
  <div class="article-detail">
    <img class="article-img" v-if="article.src" :src="article.src" alt="" mode="widthFix">
    <div class="article-content">
      <h1 class="title">{{article.title}}</h1>
      <div class="time-author">
        <p><i class="icon-geren iconfont icon"></i></span> {{article.author}}</p>
        <p><i class="icon-rili iconfont icon"></i></span> {{article.time}}</p>
      </div>
      <rich-text :nodes="content"></rich-text>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {},
      content: ''
    }
  },
  async onLoad (options) {
    wx.setNavigationBarTitle({
      title: '文章详情'
    })
    const result = await this.$http.get(`https://www.fireleaves.cn/article?id=${options.id}`)
    this.article = result.data[0]
    const content = this.article.content
    /* eslint-disable */
    this.content = content.replace(/\<img/g, '<img style="width: 100%;height: 100%;" mode="aspectFit"')
    /* eslint-enable */
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
      margin-top: 12px;
      color: #333;
      font-size: 26px;
      font-weight: 500;
      text-align: left;
      letter-spacing: 2px;
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
