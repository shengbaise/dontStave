// 反馈
<template>
  <div class="feed-back">
    <p class="name-alis">
      <span class="name">{{item.name}}</span>
      <span class="alis">({{item.alis}})</span>
    </p>
    <textarea :class="{ 'red-border': hasClickCommit && !question }" v-model="question" rows="4" minlength="10" maxlength="120" placeholder="百科资料问题反馈，5到50字" class="feed-back-textarea"></textarea>
    <div class="commit" @click="commit">提交</div>
  </div>
</template>

<script>
import { getCurrentDay } from '../../utils/index.js'
export default {
  data () {
    return {
      name: '',
      alis: '',
      question: '',
      hasClickCommit: false,
      item: {}
    }
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '问题反馈'
    })
    this.item = JSON.parse(options.item)
  },
  onShow () {
    this.question = ''
    this.hasClickCommit = false
  },
  methods: {
    async commit () {
      this.hasClickCommit = true
      if (!this.question) {
        return
      }
      const item = {
        type: this.item.type,
        time: getCurrentDay(),
        name: this.item.name,
        alis: this.item.alis,
        status: 0,
        content: this.question // 0 待处理 1 已处理 2 不予处理
      }

      const result = await this.$http.post('/feedback/add', item)
      if (result.data.code === 0) {
        wx.navigateTo({
          url: '/pages/feedBackList/main'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.feed-back {
  padding: 12px;
  .name-alis {
    padding: 12px;
    text-align: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px 4px 0 0;
    .name {
      margin-right: 2px;
      font-size: 14px;
      font-weight: 600;
      color: #999;
    }
    .alis {
      font-size: 12px;
      color: #999;
    }
  }
  .feed-back-textarea {
    width: auto !important;
    height: 90px;
    font-size: 14px;
    line-height: 21px;
    outline: none;
    text-decoration: none;
    border: 1px solid #e0e0e0;
    border-top: none;
    padding: 8px 0 8px 8px;
    border-radius: 4px;
  }
  .commit {
    margin-top: 48px;
    color:#009688;
    font-size:32rpx;
    height:96rpx;
    line-height:96rpx;
    text-align:center;
  }
}
</style>
