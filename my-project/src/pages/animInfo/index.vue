/*
 * @Author: chenxu
 * @Date: 2018-08-14 13:34:53
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 14:21:35
 */
<template>
  <div class="anim-info">
    <top-imgs @switch-version="switchVersion()" :currentVersion="version"></top-imgs>
    <div class="tabs">
      <div class="tab" @click="selectTab(tab.type)" :class="{ 'selected-tab': currentTabType === tab.type }" v-for="tab in tabs" :key="tab.type">{{tab.label}}</div>
    </div>
    <div class="view">
      <common-good @click="toDetail(item)" v-for="item in currentGoods" :good="item" :key="item._id" type="animal"></common-good>
    </div>
    <select-version v-if="isSelect" @select-version="selectVersion($event)"></select-version>
  </div>
</template>

<script>
import topImgs from '@/components/topImgs.vue'
import commonGood from '@/components/commonGood.vue'
import selectVersion from '@/components/selectVersion.vue'

export default {
  data () {
    return {
      type: '',
      items: [],
      isSelect: false,
      currentTabType: 0,
      currentGoods: [],
      version: 'DST',
      tabs: [{
        label: '陆地',
        type: 0
      }, {
        label: '飞行',
        type: 1
      }, {
        label: '洞穴',
        type: 2
      }, {
        label: '邪恶',
        type: 3
      }, {
        label: 'BOSS',
        type: 23
      }, {
        label: '其他',
        type: 22
      }]
    }
  },
  components: {
    topImgs,
    commonGood,
    selectVersion
  },
  onLoad (options) {
    this.version = wx.getStorageSync('currentVersion')
    wx.setNavigationBarTitle({
      title: `生物资料(${this.version})`
    })
    this.type = options.type
  },
  mounted () {
    this.initData()
  },
  methods: {
    async selectVersion (item) {
      await wx.setStorageSync('currentVersion', item)
      this.version = wx.getStorageSync('currentVersion')
      this.isSelect = false
    },
    switchVersion () {
      this.isSelect = true
    },
    toDetail (item) {
      wx.navigateTo({
        url: `/pages/animInfoDetail/main?src=${item.src}`
      })
    },
    async initData () {
      const result = await this.$http.get(`https://www.fireleaves.cn/${this.type}?version=${this.version}`)
      this.items = result.data
      this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
      console.info(this.items, 'mish itemtetmetmetmem')
    },
    selectTab (type) {
      this.currentGoods = []
      this.currentTabType = type
      setTimeout(() => {
        this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
      }, 0)
    }
  },
  watch: {
    version (value) {
      this.initData()
      setTimeout(() => {
        wx.setStorageSync('currentVersion', value)
      }, 0)
      wx.setNavigationBarTitle({
        title: `生物资料(${this.version})`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.anim-info{
  .selected-tab {
    background-color: #2c3e50 !important;
    color: #fff !important;
  }
  .tabs {
    display: flex;
    flex-flow: nowrap row;
    background-color: #34495e;
    color: #bdc3c7;
    height: 37px;
    .tab {
      height: 37px;
      line-height: 37px;
      width: 17%;
      text-align: center;
      list-style: none;
      border-right: 1px solid #2c3e50;
      font-size: 14px;
    }
  }
}
</style>
