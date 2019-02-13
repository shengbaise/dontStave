<template>
  <div class="game-mechanism-detail">
    <div class="mechainsm-list">
      <div class="item" :class="{ 'item-spread': currentIndex === index }" v-for="(item, index) in currentRules" :key="item.id">
        <div class="item-title" @click="retract()" v-if="currentIndex === index">
          <p class="title">{{item.title}}</p>
          <span class="retract"><i class="icon-shouqi iconfont icon"></i></span>
          <!-- <span @click="spread(index)" class="retract" v-else ><i class="icon-zhankai iconfont icon"></i></span> -->
        </div>
        <div class="item-title" v-else @click="spread(index)">
          <p class="title">{{item.title}}</p>
          <!-- <span class="retract" v-if="currentIndex === index" @click="retract()"><i class="icon-shouqi iconfont icon"></i></span> -->
          <span class="retract"><i class="icon-zhankai iconfont icon"></i></span>
        </div>
        <div class="desc" v-if="currentIndex === index">
          <!-- <p>{{item.title}}</p> -->
          <div class="button" @click="toArticleDetail(item._id)">详细资料</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shareApp } from '@/utils/index.js'

export default {
  data () {
    return {
      title: '',
      currentIndex: -1,
      type: '',
      currentRules: []
    }
  },
  async onLoad (options) {
    // this.type = options.type
    const result = await this.$http.get(`/rule?type=${options.type}`)
    this.currentRules = result.data
    wx.setNavigationBarTitle({
      title: '详细机制'
    })
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  methods: {
    spread (index) {
      this.currentIndex = index
    },
    retract () {
      this.currentIndex = -1
    },
    toArticleDetail (id) {
      wx.navigateTo({
        url: `/pages/articleDetail/main?id=${id}&type=rule`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.game-mechanism-detail {
  // box-shadow: 0 4px 8px #acacac;
  background-color: #f5f5f5;
  padding: 12px;
  .item-spread {
    box-shadow: 0 4px 8px #acacac;
    margin: 16px;
  }
  .item {
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    // box-shadow: 0 4px 8px #acacac;
    // margin: 16px;
    color: rgba(0,0,0,.87);
    font-size: 14px;
    .item-title {
      position: relative;
      height: 48px;
      padding: 0 24px;
      line-height: 48px;
      box-sizing: border-box;
      .retract, .title {
        display: inline-block;
      }
      .retract {
        position: absolute;
        right: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.54);
      }
    }
    .desc {
      padding: 16px 12px;
      background-color: #eee;
      color: #666;
      .button {
        margin-top: 12px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #607d8b;
        color: #fff;
        box-sizing: border-box;
        box-shadow: 0 4px 8px #acacac;
      }
    }
    .icon {
      font-size: 20px;
    }
  }
}
</style>
