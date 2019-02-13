// 反馈列表
<template>
  <div class="feed-back-list">
    <scroll-view :scroll-y="true" class="view" @scrolltolower="loadMore">
      <div class="feed-backs">
        <div class="feed-back" v-for="feedBack in feedBacks" :key="feedBack._id">
          <hr class="status" :style="{'background-color': statusColor[feedBack.status] }">
          <div class="name-time">
            <div class="name-alis">
              <p class="name">{{feedBack.name}}</p>
              <p class="alis">{{feedBack.alis}}</p>
            </div>
            <div class="time">{{feedBack.time}}</div>
          </div>
          <p class="content">{{feedBack.content}}</p>
        </div>
      </div>
    </scroll-view>
    <p class="bottom-tip-feed" v-if="loading">加载中...</p>
    <p class="bottom-tip-feed" v-if="loaded && newFeedBacks.length === 0">没有更多数据</p>
  </div>
</template>

<script>
import { shareApp } from '@/utils/index.js'

export default {
  data () {
    return {
      pageNum: 0,
      loading: false,
      loaded: false,
      newFeedBacks: [],
      feedBacks: [],
      statusColor: {
        // 0 待处理 1 已处理 2 不予处理
        0: '#909399',
        1: '#67c23a',
        2: '#f56c6c'
      }
    }
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  onShow () {
    this.pageNum = 0
    this.setFeedBacks()
  },
  methods: {
    async setFeedBacks () {
      const result = await this.$http.get(`/feedback?pageSize=10&pageNum=${this.pageNum}`)
      this.newFeedBacks = result.data.data
      this.feedBacks.push(...this.newFeedBacks)
    },
    async loadMore () {
      if (this.newFeedBacks.length !== 0) {
        this.loading = true
        this.loaded = false
        this.pageNum = this.pageNum + 1
        await this.setFeedBacks()
        this.loading = false
        this.loaded = true
      }
    }
  }
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #37474f;
}
</style>

<style lang="scss" scoped>
.feed-back-list {
  height: 100%;
  position: relative;
  .view {
    position: absolute;
    overflow-y: scroll;
    background-color: #37474f;
    width: 100%;
    top: 0;
    height: 100%;
    .feed-backs {
      padding: 12px;
      .feed-back {
        position: relative;
        margin-bottom: 12px;
        width: 100%;
        min-height: 60px;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        box-shadow: 0 2px 8px #0f131a;
      }
      .status {
        position: absolute;
        left: 12px;
        top: -3px;
        width:32px;
        height:4px;
        // background-color:red;
        border-radius:15px;
      }
      .name-time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:12px;
        border-bottom: 1px solid #eee;
        .name-alis{
          display: flex;
          align-items: center;
          justify-content: space-between;
          // min-width: 100px;
          // max-width: 200px;
          font-weight: 600;
          font-size: 14px;
          .alis {
            margin-left: 6px;
            font-size: 12px;
            color: #999;
            font-weight: 400;
          }
        }
        .time {
          font-size: 12px;
          color: #999;
          font-weight: 400;
        }
      }
      .content {
        padding: 12px;
        font-size: 14px;
        color: #333;
        text-align: justify;
      }
    }
  }
  .bottom-tip-feed {
    position:absolute;
    bottom: -24px;
    width:100%;
    font-size:12px;
    color:#999;
    text-align:center;
    padding-bottom:12px;
    // border-top: 4px solid #909399;
  }
}
</style>
