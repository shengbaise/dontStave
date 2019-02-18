/*
 * @Author: chenxu
 * @Date: 2018-08-14 13:34:53
 * @Last Modified by: chenxu
 * @Last Modified time: 2019-02-18 22:02:42
 */
<template>
  <div class="anim-info">
    <scroll-view :scroll-with-animation="true" :scroll-left="scrollLeft" scroll-x style="width: 100%;" class="tabs">
      <div class="tab" @click="selectTab(tab.type, index)" :class="{ 'tab-selected': currentTabType === tab.type }" v-for="(tab, index) in currentTabs" :key="tab.type">{{tab.label}}</div>
    </scroll-view>
    <scroll-view class="view" scroll-y>
      <common-good v-if="currentGoods.length > 0" @click="toDetail(item)" v-for="item in currentGoods" :good="item" :key="item._id" type="animal"></common-good>
      <p class="no-data" v-if="currentGoods.length === 0">暂无数据～～～</p>
    </scroll-view>
  </div>
</template>

<script>
import commonGood from '@/components/commonGood.vue'
import {shareApp} from '@/utils/index.js'

export default {
  data () {
    return {
      type: '',
      items: [],
      isSelect: false,
      currentTabType: 0,
      currentGoods: [],
      version: 'DST',
      tabs: [
        {
          label: '陆地',
          type: 0
        }, {
          label: '飞行',
          type: 1
        }, {
          label: '洞穴',
          type: 2
        }, {
          label: '猪人',
          type: 36
        }, {
          label: '海洋',
          type: 24
        }, {
          label: '邪恶',
          type: 3
        }, {
          label: 'BOSS',
          type: 23
        }, {
          label: '其他',
          type: 22
        }],
      currentTabs: [],
      scrollLeft: 0
    }
  },
  components: {
    commonGood
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  onLoad (options) {
    this.version = wx.getStorageSync('currentVersion') || 'DST'
    wx.setNavigationBarTitle({
      title: `生物资料(${this.version})`
    })
    this.type = options.type
  },
  mounted () {
    this.initData()
  },
  methods: {
    toDetail (item) {
      wx.navigateTo({
        url: `/pages/animInfoDetail/main?src=${item.src}&version=${this.version}`
      })
    },
    async initData () {
      if (this.version === 'SW') {
        this.currentTabs = this.tabs.filter(item => [2, 36].indexOf(item.type) === -1)
      } else if (this.version === 'HAMLET') {
        this.currentTabs = this.tabs.filter(item => [2, 24].indexOf(item.type) === -1)
      } else {
        this.currentTabs = this.tabs.filter(item => [24, 36].indexOf(item.type) === -1)
      }
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
  watch: {
    version (value) {
      this.currentGoods = []
      setTimeout(() => {
        this.initData()
        wx.setStorageSync('currentVersion', value)
      }, 0)
      wx.setNavigationBarTitle({
        title: `生物资料(${this.version})`
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
.anim-info{
  display: flex;
  flex-flow: column;
  height: 100%;
  .tab-selected {
    color: #b7ba6b !important;
  }
  .tabs {
    flex-shrink: 0;
    width: 100%;
    height: 42px;
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
      height: 42px;
      margin-right: 12px;
      line-height: 42px;
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
