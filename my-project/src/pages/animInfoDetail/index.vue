<template>
  <div class="anim-info-detail">
    <scroll-view :scroll-y="true" class="view">
      <common-good :good="item" type="animal"></common-good>
      <div class="detail-container">
        <div class="detail">
          <div class="top">
            <div class="top-tip">战利品</div>
            <!-- <img class="science-img" v-else src="/static/img/food/pot.png" alt="" mode="widthFix"> -->
          </div>
          <div class="materials" v-if="rewards.length > 0">
            <div class="material" v-for="(reward, index) in rewards" :key="index">
              <img class="material-img" @click="toImgDetail(reward.src)" :src="reward.src" alt="" mode="widthFix">
              <div v-if="reward.num[0] !== '×'">(<img @click="toImgDetail(reward.src)" class="material-img-tool" :src="reward.num" alt="" mode="widthFix">)</div>
              <div v-if="reward.num[0] === '×'">{{reward.num}}</div>
            </div>
          </div>
          <div class="materials-collection common-materials" v-if="collections.length > 0 && item.type === 36">
            <div class="need-materials">
              <div class="material-item" v-if="collections.length > 0">
                <div class="material" v-for="(material, index) in collections" :key="index">
                  <img class="material-img" :src="material" alt="" mode="aspectFit">
                </div>
              </div>
              <p class="material-item none" v-else>无</p>
              <p class="need-desc">收集</p>
            </div>
            <div class="fail-materials">
              <div class="material-item" v-if="feedBack">
                <div class="material" v-for="(feed, index) in feedBack" :key="index">
                  <img class="material-img" :src="feed.src" alt="" mode="aspectFit">
                  <div>{{feed.num}}</div>
                </div>
              </div>
              <p class="material-item none" v-else>无</p>
              <p class="need-desc">赠品</p>
            </div>
          </div>
          <div class="ability" v-show="item.Ability && item.Ability.length > 0">
            <h3 class="title">特殊能力</h3>
            <ul>
              <li class="content" v-for="(ability, index) in item.Ability" :key="index">{{ability}}</li>
            </ul>
          </div>
          <common-attr :attrs="attrs"></common-attr>
          <common-detail :console="item.console" :desc="item.desc"></common-detail>
        </div>
      </div>
    </scroll-view>
    <feed-back-button :item="item"></feed-back-button>
  </div>
</template>

<script>
import feedBackButton from '@/components/feedBackButton.vue'
import commonGood from '@/components/commonGood.vue'
import commonDetail from '@/components/commonDetail.vue'
import commonAttr from '@/components/commonAttr.vue'
import { getDetailItem, formatUrl, shareApp } from '@/utils/index.js'

export default {
  data () {
    return {
      item: {},
      version: 'DST',
      rewards: [],
      collections: [],
      feedBack: null
    }
  },
  components: {
    commonGood,
    commonDetail,
    commonAttr,
    feedBackButton
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  computed: {
    attrs () {
      const items = []
      const interval = this.item.interval
      const scope = this.item.scope
      const dangerous = this.item.Dangerous
      const san = this.item.san
      if (interval) {
        items.push({
          key: '攻击间隔',
          value: interval
        })
      }
      if (san) {
        items.push({
          key: '影响理智',
          value: `${san}/分钟`
        })
      }
      if (scope) {
        items.push({
          key: '攻击范围',
          value: scope
        })
      }
      if (dangerous) {
        items.push({
          key: '危险程度',
          value: dangerous
        })
      }

      return items
    }
  },
  async onLoad (options) {
    wx.setNavigationBarTitle({
      title: '生物详细资料'
    })
    this.version = options.version || 'DST'
    this.initData(options.src)
  },
  methods: {
    async initData (src) {
      const result = await this.$http.get(`/anim/single?version=${this.version}&src=${src}`)
      this.item = result.data
      // 收集
      if (this.item.collection) {
        this.collections = this.item.collection.map(item => formatUrl(item))
      } else {
        this.collections = []
      }
      // 赠品
      const feedBack = this.item.feedBack
      this.feedBack = []
      if (feedBack.length > 0) {
        feedBack.forEach((feed, index) => {
          if (index % 2 === 0) {
            this.feedBack.push({
              src: formatUrl(feed),
              num: feedBack[index + 1]
            })
          }
        })
      } else {
        this.feedBack = null
      }
      // 战利品
      this.rewards = this.item.reward.filter(item => item.src && item.num)
      this.rewards.forEach(item => {
        if (item.num[0] !== '×') {
          item.num = formatUrl(item.num)
        }
        item.src = formatUrl(item.src)
      })
    },
    toImgDetail (src) {
      const detailItem = getDetailItem(src)
      if (!detailItem.src || !detailItem.urlParam) {
        return
      }
      if (detailItem.urlParam === 'animInfoDetail') {
        this.item = {}
        setTimeout(() => {
          this.initData({
            src: detailItem.src
          })
        }, 0)
      } else {
        wx.navigateTo({
          url: `/pages/${detailItem.urlParam}/main?src=${detailItem.src}&version=${this.version}`
        })
      }
    }
  }
}
</script>
<style>
page {
  height: 100%;
}
</style>

<style scoped lang="scss">
.anim-info-detail {
  position: relative;
  height: 100%;
  .view {
    position: absolute;
    top: 0;
    height: 100%;
    overflow-y: scroll;
  }
  .ability {
    .title {
      font-size: 16px;
      font-weight: 600;
      text-align: left;
    }
    .content {
      padding: 12px 12px 12px 0;
      color: #333;
      font-size: 14px;
      text-align: left;
    }
  }
  .materials-collection {
    flex-flow: nowrap row;
  }
  .need-materials {
    border-right: 1px solid #999;
  }
  .fail-materials {
    // border-left: 1px solid #999;
    .material-img {
      margin-left: 2px;
    }
  }
  .need-materials, .fail-materials {
    align-items:center;
    display:flex;
    justify-content: space-between;
    flex-flow: column;
    text-align: center;
    width: 50%;
    .material-img {
      width: 32px;
    }
  }
  .need-desc {
    color: #999;
    font-size: 12px;
  }
}
</style>
