// 消息详情
<template>
  <div class="news-detail">
    <scroll-view :scroll-top="scrollTop" :scroll-y="true" class="view" @scrolltolower="loadMore">
      <div style="padding: 12px;padding-top: 0;">
        <div class="news">
          <div class="dynamic-container">
            <div class="single-dynamic">
              <div class="user-tag">
                <div class="user">
                  <img v-if="article.avatersrc" style="width: 40px;height: 40px;border-radius: 50%;" :src="article.avatersrc" alt="">
                  <p v-if="!article.avatersrc" style="width: 40px;height: 40px;border-radius: 50%;background-color: #f6f6f6;"></p>
                </div>
                <div class="name-container">
                  <p class="name">{{article.nickname}}</p>
                  <p class="type">工厂流{{article.type}}</p>
                </div>
                <div class="time">{{article.date}}</div>
              </div>
              <hr class="line">
              <p class="title">{{article.title}}</p>
              <p v-html="article.content"></p>
              <img v-if="article.imgsrc" mode="aspectFill" class="picture" :src="article.imgsrc" alt="">
              <div class="like-container">
                <i class="iconfont comment">&#xe891;</i>
              </div>
            </div>
          </div>
          <div class="comment-container" v-if="comments.length > 0">
            <p class="comment-title">评论</p>
            <div @click="toDetail(comment.id)" class="single-comment" v-for="comment in comments" :key="comment.id">
              <div class="user-tag">
                <div class="user">
                  <img v-if="comment.imgsrc" style="width: 30px;height: 30px;border-radius: 50%;" :src="comment.imgsrc" alt="">
                  <p v-if="!comment.imgsrc" style="width: 30px;height: 30px;border-radius: 50%;background-color: #f6f6f6;"></p>
                </div>
                <div class="name-container">
                  <p class="name">{{comment.nickname}}</p>
                  <p class="comment-time">{{comment.date}}</p>
                </div>
              </div>
              <p class="comment-content">{{comment.reply}}</p>
              <div class="like-container">
                <i class="iconfont comment">&#xe891;</i>
              </div>
            </div>
          </div>
          <div v-if="comments.length === 0" class="no-comment">目前还没有任何评论～</div>
        </div>
      </div>
    </scroll-view>
    <div class="hover-button" @click="addComment" :style="{'background-color': backgroundColor}">
      <i :style="{'font-size': fontSize, 'color': color}" class="iconfont">&#xe891;</i>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../utils/index.js'

export default {
  data () {
    return {
      articles: [],
      total: 0,
      pageNum: 0,
      loading: false,
      loaded: false,
      scrollTop: 50,
      id: '',
      article: {},
      comments: [],
      fontSize: '24px',
      color: '#fff',
      backgroundColor: '#009688'
    }
  },
  onLoad (options) {
    this.id = options.id
    wx.setNavigationBarTitle({
      title: '文章详情'
    })
  },
  mounted () {
    this.setArticle()
    this.setComments()
  },
  methods: {
    addComment () {
      console.info('增加评论')
    },
    loadMore () {},
    toDetail (id) {
      wx.navigateTo({
        url: `/pages/commentDetail/main?id=${id}`
      })
    },
    async setArticle () {
      const result = await this.$http.get(`https://api.fireleaves.cn/api/article/${this.id}`)
      this.article = result.data.result[0]
      this.article.date = formatDate(this.article.date)
      this.article.content = this.article.content.replace(/<strong/g, '<strong style="font-size: 16px;color: #333;"')
        .replace(/<p/g, '<p style="padding: 0 12px;font-size: 14px;margin-bottom: 12px;"')
    },
    async setComments () {
      const result = await this.$http.get(`https://api.fireleaves.cn/api/reply?id=${this.id}`)
      this.comments = result.data.result
      this.comments.map(item => {
        item.date = formatDate(item.date)
        return item
      })
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
.news-detail {
  height: 100%;
  position: relative;
  .view {
    position: absolute;
    overflow-y: scroll;
    width: 100%;
    top: 0;
    height: 100%;
    box-sizing:border-box;
    .news {
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
      .single-dynamic {
        position: relative;
        background-color: #fff;
        box-shadow: inset 0 0 8px 2px #bdbdbd;
        margin-top: 12px;
        border-radius:4px;
        .line {
          margin-bottom: 12px;
          outline: none;
          border: none;
          height: 1px;
          width: 100%;
          background-color: #ededed;
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
      }
      .dynamic-container {
        position: relative;
      }
      .comment-container {
        position: relative;
        margin-top: 12px;
        padding-top: 12px;
        background-color: #fff;
        border-radius: 6px;
        .comment-title {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 12px;
          color: #999;
        }
        .single-comment {
          border-bottom: 1px solid #ededed;
          margin-top: 8px;
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
        }
      }
    }
    .no-comment {
      margin-top: 12px;
      color: #fff;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
