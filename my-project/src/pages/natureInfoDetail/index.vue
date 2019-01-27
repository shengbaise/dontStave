<template>
  <div class="nature-intro-detail">
    <scroll-view :scroll-y="true" class="view">
      <common-good :good="item"></common-good>
      <div class="detail-container">
        <div class="detail">
          <div class="origin-tip" v-if="origins.length > 0">来源</div>
          <div class="materials" v-if="origins.length > 0">
            <div class="material" v-for="(origin, index) in origins" :key="index">
              <img class="material-img" @click="toImgDetail(item.origin[index])" :src="origin" alt="" mode="aspectFit">
            </div>
          </div>
          <div class="science-tip" v-if="createSciences.length > 0">可制作科技</div>
          <div class="materials" v-if="createSciences.length > 0">
            <div class="material" v-for="(science, index) in createSciences" :key="index">
              <img class="material-img" @click="toImgDetail(item.createScience[index])" :src="science" alt="" mode="aspectFit">
            </div>
          </div>
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
import { formatUrl, getDetailItem } from '@/utils/index.js'
// getImgDetail

export default {
  data () {
    return {
      item: {},
      origins: [],
      createSciences: []
    }
  },
  components: {
    commonGood,
    commonDetail,
    feedBackButton
  },
  onLoad (options) {
    this.version = options.version || 'DST'
    wx.setNavigationBarTitle({
      title: '自然详情'
    })
    this.initData(options)
  },
  mounted () {
    this.origins = []
    this.createSciences = []
  },
  methods: {
    toImgDetail (src) {
      const detailItem = getDetailItem(src)
      if (!detailItem.src || !detailItem.urlParam) {
        return
      }
      if (detailItem.urlParam === 'natureInfoDetail') {
        this.item = {}
        setTimeout(() => {
          this.initData({
            src: detailItem.src,
            version: this.version
          })
        }, 0)
      } else {
        wx.navigateTo({
          url: `/pages/${detailItem.urlParam}/main?src=${detailItem.src}&version=${this.version}`
        })
      }
    },
    async initData (options) {
      const result = await this.$http.get(`/nature/single?version=${options.version}&src=${options.src}`)
      this.item = result.data
      if (this.item.origin) {
        const origins = this.item.origin.map(item => {
          if (item !== null) {
            return formatUrl(item)
          }
        })
        this.origins = origins.filter(item => !!item)
      }
      if (this.item.createScience) {
        const createSciences = this.item.createScience.map(item => {
          if (item !== null) {
            return formatUrl(item)
          }
        })
        this.createSciences = createSciences.filter(item => !!item)
      }
    }
  }
}
</script>
<style lang="scss">
page {
  height: 100%;
}
</style>

<style scoped lang="scss">
.nature-intro-detail {
  position: relative;
  height: 100%;
  .view {
    position: absolute;
    top: 0;
    height: 100%;
    overflow-y: scroll;
  }
  .science-tip, .origin-tip {
    height: 24px;
    margin-top: -12px;
    margin-right: -12px;
    text-align: right;
    color: #999;
    font-size: 12px;
  }
} 
</style>
