// 评论详情
<template>
  <div class="comment-detail">
    <scroll-view :scroll-top="scrollTop" :scroll-y="true" class="view" @scrolltolower="loadMore">
      <div class="single-comment" v-for="comment in comments" :key="comment.id">
        <div class="user-tag">
          <div class="user">
            <img v-if="comment.imgsrc" style="width: 30px;height: 30px;border-radius: 50%;" :src="comment.imgsrc" alt="">
            <p v-if="!comment.imgsrc" style="width: 30px;height: 30px;border-radius: 50%;background-color: #f6f6f6;"></p>
          </div>
          <div class="name-container">
            <p class="name">{{comment.firstName}}</p>
            <p class="comment-time">{{comment.date}}</p>
          </div>
        </div>
        <p class="replay-name"><span>回复</span><span>{{comment.thirdName}}</span></p>
        <p class="comment-content">{{comment.content}}</p>
        <div class="like-container">
          <i class="iconfont comment">&#xe891;</i>
        </div>
      </div>
      <div v-if="comments.length === 0" class="no-comment">暂无回复～</div>
    </scroll-view>
    <!-- <div class="hover-button" @click="addReplay" :style="{'background-color': backgroundColor}">
      <i :style="{'font-size': fontSize, 'color': color}" class="iconfont">&#xe891;</i>
    </div> -->
  </div>
</template>

<script>
import { formatDate } from '../../utils/index.js'

export default {
  data () {
    return {
      scrollTop: 50,
      id: '',
      comments: [],
      total: 0,
      pageNum: 0,
      fontSize: '24px',
      color: '#fff',
      backgroundColor: '#009688'
    }
  },
  onLoad (options) {
    console.info(options)
    this.id = options.id
    wx.setNavigationBarTitle({
      title: '评论详情'
    })
  },
  mounted () {
    this.setComments()
  },
  methods: {
    // addReplay () {
    //   console.info('增加回复')
    // },
    loadMore () {},
    async setComments () {
      const result = await this.$http.get(`https://api.fireleaves.cn/api/replysec?id=${this.id}`)
      this.comments = result.data.result
      this.comments.map(item => {
        item.date = formatDate(item.date)
        return item
      })
      console.info(this.comments, 'comments')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-detail {
  .single-comment {
    border-bottom: 1px solid #ededed;
    margin-top: 8px;
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
    .comment-time {
      font-size: 12px;
      color: #999;
    }
    .like-container {
      padding: 12px;
      justify-content: space-between;
      .comment {
        font-size: 24px;
      }
    }
    .name-container {
      .name {
        font-weight: 400;
        font-size: 14px;
        color: #333;
      }
    }
    .comment-time {
      padding-top: 6px;
      font-size: 12px;
    }
    .comment-content {
      padding: 0 12px;
      margin-left: 40px;
      font-size: 14px;
      color: #333;
    }
    .like-container {
      text-align: right;
      margin-left: 40px;
      .comment {
        color: #999;
        font-size: 14px;
      }
    }
    .replay-name {
      color: #0d47a1;
      margin-left:40px;
      padding-left:12px;
      font-size: 14px;
    }
  }
  .no-comment {
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 6px;
    background-color: #fff;
    font-size:14px;
    text-align:center;
    margin:12px;
  }
}
</style>
