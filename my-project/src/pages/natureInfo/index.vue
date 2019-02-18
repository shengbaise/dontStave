/*
 * @Author: chenxu
 * @Date: 2018-08-14 14:32:16
 * @Last Modified by: chenxu
 * @Last Modified time: 2019-02-18 21:46:44
 */
<template>
  <div class="nature-info">
    <scroll-view :scroll-left="scrollLeft" scroll-x style="width: 100%;" class="tabs">
      <div class="tab" @click="selectTab(tab.type, index)" :class="{ 'tab-selected': currentTabType === tab.type }" v-for="(tab, index) in tabs" :key="tab.type">{{tab.label}}</div>
    </scroll-view>
    <scroll-view class="view" scroll-y>
      <common-good :hasSpeed="false" v-if="currentGoods.length > 0" @click="toDetail(good)" v-for="good in currentGoods" :good="good" :key="good._id"></common-good>
      <p v-if="currentGoods.length === 0" class="no-data">暂无数据～～～</p>
    </scroll-view>
  </div>
</template>

<script>
import commonGood from '@/components/commonGood.vue'
import { shareApp } from '@/utils/index.js'

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
      }, {
        label: '其他',
        type: 41
      }],
      currentGoods: [],
      scrollLeft: 0
    }
  },
  components: {
    commonGood
  },
  onLoad (options) {
    this.version = wx.getStorageSync('currentVersion') || 'DST'
    wx.setNavigationBarTitle({
      title: ` 自然(${this.version})`
    })
    this.type = options.type
  },
  mounted () {
    this.initData()
  },
  methods: {
    toDetail (item) {
      wx.navigateTo({
        url: `/pages/natureInfoDetail/main?src=${item.src}&version=${this.version}`
      })
    },
    async initData () {
      const result = await this.$http.get(`/${this.type}?version=${this.version}`)
      this.items = result.data
      this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
    },
    selectTab (type, index) {
      if (index > 2) {
        this.scrollLeft = 76 * (index - 2)
      } else {
        this.scrollLeft = 0
      }
      this.currentGoods = []
      this.currentTabType = type
      setTimeout(() => {
        this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
      }, 0)
    }
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  watch: {
    version (value) {
      this.currentGoods = []
      setTimeout(() => {
        this.initData()
        wx.setStorageSync('currentVersion', value)
      }, 0)
      wx.setNavigationBarTitle({
        title: `自然(${this.version})`
      })
    }
  }
}
</script>

<style lang="scss">
page {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.nature-info {
  display: flex;
  flex-flow: column;
  height: 100%;
  .tab-selected {
    color: #b7ba6b !important;
  }
  .tabs {
    // flex-shrink: 0;
    width: 100%;
    height: 38px;
    width:100%;
    overflow-x:scroll;
    white-space: nowrap;
    font-size: 14px;
    background-color: #263238;
    color: #999;
    justify-content: space-around;
    align-items: center;
    .tab {
      display: inline-block;
      width: 64px;
      height: 38px;
      margin-right: 12px;
      line-height: 38px;
      text-align: center;
      white-space: nowrap;
    } 
  }
  .view {
    flex-grow: 1;
    overflow: scroll;
    height: 100%;
  }
}
</style>
