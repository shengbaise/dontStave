/*
 * @Author: chenxu
 * @Date: 2018-08-14 14:32:16
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 14:46:37
 */
<template>
  <div class="nature-info">
    <top-imgs @switch-version="switchVersion()" :currentVersion="version"></top-imgs>
    <div class="tabs">
      <div @click="selectTab(tab.type)" :class="{ 'tab-selected': currentTabType === tab.type }" v-for="(tab, index) in tabs" :key="index">{{tab.label}}</div>
    </div>
    <div class="view">
      <common-good v-for="good in currentGoods" :good="good" :key="good._id"></common-good>
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
      isSelect: false,
      type: '',
      version: 'DST',
      currentTabType: 33,
      tabs: [{
        label: '材料',
        type: 33
      }, {
        label: '装备',
        type: 34
      }, {
        label: '树苗',
        type: 35
      }],
      currentGoods: []
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
      title: ` 自然(${this.version})`
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
    async initData () {
      const result = await this.$http.get(`https://www.fireleaves.cn/${this.type}?version=${this.version}`)
      this.items = result.data
      this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
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
        title: `自然(${this.version})`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nature-info {
  .tab-selected {
    color: #b7ba6b !important;
  }
  .tabs {
    height: 38px;
    display: flex;
    flex-flow: nowrap row;
    font-size: 14px;
    background-color: #263238;
    color: white;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
