/*
 * @Author: chenxu
 * @Date: 2018-08-10 16:22:02
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-12-23 17:10:25
 */
<template>
  <div class="science-technology">
    <div class="tabs">
      <div @click="selectTab(tab.type)" :class="{ 'tab-selected': currentTabType === tab.type }" v-for="(tab, index) in tabs" :key="index">{{tab.label}}</div>
    </div>
    <div class="more-tabs-container" v-show="showMoreTab" @click="hideSelect">
      <div class="more-tabs">
        <div class="tab" @click="selectTab(item.type)" :class="{ 'more-tab-selected': currentTabType === item.type }"  v-for="item in currentMoreTabs" :key="item.label">{{item.label}}</div>
      </div>
    </div>
    <div class="view">
      <common-good @click="toDetail(good)" v-for="good in currentGoods" :good="good" :key="good._id" type="science"></common-good>
    </div>
  </div>
</template>

<script>
import commonGood from '@/components/commonGood.vue'

export default {
  data () {
    return {
      isSelect: false,
      tabs: [{
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
        label: '更多'
      }],
      technologyType: '',
      currentGoods: [],
      currentTabType: 11,
      items: [],
      moreTabs: [{
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
        version: 'HAMLET'
      }],
      showMoreTab: false,
      version: 'DST',
      currentMoreTabs: []
    }
  },
  components: {
    commonGood
  },
  onLoad (options) {
    this.version = wx.getStorageSync('currentVersion')
    wx.setNavigationBarTitle({
      title: `物品资料(${this.version})`
    })
    this.technologyType = options.type
  },
  mounted () {
    this.initData()
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
    selectTab (type) {
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

<style lang="scss" scoped>
.science-technology {
  .tab-selected {
    color: #b7ba6b !important;
  }
  .more-tab-selected {
    background-color: #2F4F4F !important;
    color: white !important;
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
  .more-tabs-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: rgba(0,0,0,.65);
    .more-tabs {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 15px;
      box-sizing: border-box;
      transform: translate(-50%, -50%);
      display: flex;
      flex-flow: wrap row;
      justify-content: flex-start;
      width: 90%;
      height: 180px;
      background-color: white;
      border-radius: 6px;
      .tab {
        font-size: 14px;
        width: 64px;
        height: 30px;
        margin-right: 12px;
        line-height: 30px;
        text-align: center;
        background-color: #F5F5F5;
        color: gray;
        border-radius: 4px;
      }
    }
  }
  .view {
    // position: absolute;
    // top: 198px;
    // height: calc(100% - 198px);
    // width: 100%;
    // overflow: scroll;
  }
}
</style>
