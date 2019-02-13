<template>
  <div class="nature-intro-detail">
    <common-good :good="item"></common-good>
    <div class="detail-container">
      <div class="detail">
        <div class="origin-tip" v-if="origins.length > 0">来源</div>
        <div class="materials" v-if="origins.length > 0">
          <div class="material" v-for="(origin, index) in origins" :key="index">
            <img class="material-img" @click="toImgDetail(origin)" :src="origin" alt="" mode="aspectFit">
          </div>
        </div>
        <div class="science-tip" v-if="createSciences.length > 0">可制作科技</div>
        <div class="materials" v-if="createSciences.length > 0">
          <div class="material" v-for="(science, index) in createSciences" :key="index">
            <img class="material-img" @click="toImgDetail(science)" :src="science" alt="" mode="aspectFit">
          </div>
        </div>
        <common-detail :console="item.console" :desc="item.desc"></common-detail>
      </div>
    </div>
  </div>
</template>

<script>
import commonGood from '@/components/commonGood.vue'
import commonDetail from '@/components/commonDetail.vue'
import { getImgDetail, formatUrl, shareApp } from '@/utils/index.js'

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
    commonDetail
    // detailContainer
  },
  onShareAppMessage (res) {
    return shareApp(res)
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
      const detailItem = getImgDetail(src)
      if (!detailItem) {
        return
      }
      if (src === 'natureInfoDetail') {
        this.item = {}
        setTimeout(() => {
          this.initData({
            src: src,
            version: this.version
          })
        }, 0)
      } else {
        wx.navigateTo({
          url: `/pages/${detailItem}/main?src=${src}&version=${this.version}`
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

<style scoped lang="scss">
.nature-intro-detail {
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
