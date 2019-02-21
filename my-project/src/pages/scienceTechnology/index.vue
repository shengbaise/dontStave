/*
 * @Author: chenxu
 * @Date: 2018-08-10 16:22:02
 * @Last Modified by: chenxu
 * @Last Modified time: 2019-02-20 19:59:00
 */
<template>
  <div class="science-technology">
    <scroll-view :scroll-with-animation="true" :scroll-left="scrollLeft" scroll-x style="width: 100%;" class="tabs">
      <div class="tab" @click="selectTab(tab.type, index)" :class="{ 'tab-selected': currentTabType === tab.type }" v-for="(tab, index) in currentMoreTabs" :key="tab.type">{{tab.label}}</div>
    </scroll-view>
    <scroll-view class="view" scroll-y>
      <common-good v-if="currentGoods.length > 0" @click="toDetail(good)" v-for="good in currentGoods" :good="good" :key="good._id" type="science"></common-good>
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
      technologyType: '',
      currentGoods: [],
      currentTabType: 11,
      items: [],
      moreTabs: [
        {
          label: '工具',
          type: 11,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '照明',
          type: 9,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '生存',
          type: 10,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '食物',
          type: 13,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '战斗',
          type: 12,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '科学',
          type: 14,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '魔法',
          type: 15,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '服装',
          type: 16,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '书本',
          type: 19,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '建筑',
          type: 25,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '合成',
          type: 26,
          version: ['DST', 'DS', 'ROG', 'SW', 'HAMLET']
        }, {
          label: '远古',
          type: 27,
          version: ['DST', 'DS', 'ROG']
        }, {
          label: '暗影',
          type: 28,
          version: ['DST']
        }, {
          label: '宠物',
          type: 29,
          version: ['DST']
        }, {
          label: '雕塑',
          type: 30,
          version: ['DST']
        }, {
          label: '航海',
          type: 18,
          version: ['SW', 'HAMLET']
        }, {
          label: '火山',
          type: 32,
          version: ['SW']
        }, {
          label: '考古',
          type: 37,
          version: ['HAMLET']
        }, {
          label: '月体',
          type: 42,
          version: ['DST']
        }, {
          label: '炼金',
          type: 43,
          version: ['DST']
        }, {
          label: '年货',
          type: 44,
          version: ['DST']
        }, {
          label: '城镇规划',
          type: 45,
          version: ['HAMLET']
        }, {
          label: '绿色园艺',
          type: 46,
          version: ['HAMLET']
        }],
      showMoreTab: false,
      version: 'DST',
      currentMoreTabs: [],
      scrollLeft: 0
    }
  },
  components: {
    commonGood
  },
  onLoad (options) {
    this.version = wx.getStorageSync('currentVersion') || 'DST'
    wx.setNavigationBarTitle({
      title: `物品资料(${this.version})`
    })
    this.technologyType = options.type
  },
  mounted () {
    this.initData()
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  methods: {
    hideSelect () {
      this.showMoreTab = false
    },
    setCurrentMoreTabs () {
      this.currentMoreTabs = this.moreTabs.filter(item => {
        return item.version.indexOf(this.version) > -1
      })
    },
    toDetail (item) {
      wx.navigateTo({
        url: `/pages/scienceTechnologyDetail/main?src=${item.src}&version=${this.version}`
      })
    },
    async initData () {
      const result = await this.$http.get(`/${this.technologyType}?version=${this.version}`)
      this.items = result.data
      this.setCurrentMoreTabs()
      this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
    },
    selectTab (type, index) {
      if (index > 2) {
        this.scrollLeft = 76 * (index - 2)
      } else {
        this.scrollLeft = 0
      }
      if (type) {
        this.currentGoods = []
        this.currentTabType = type
        setTimeout(() => {
          this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
          this.showMoreTab = false
        }, 0)
      } else {
        this.showMoreTab = true
      }
    }
  },
  watch: {
    version (value) {
      this.currentGoods = []
      this.currentTabType = 11
      setTimeout(() => {
        this.initData()
        wx.setStorageSync('currentVersion', value)
      }, 0)
      wx.setNavigationBarTitle({
        title: `食谱(${this.version})`
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
.science-technology {
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
