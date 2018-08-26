/*
 * @Author: chenxu
 * @Date: 2018-08-13 17:38:57
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 19:14:08
 */
<template>
  <div class="recipe">
    <top-imgs @switch-version="switchVersion()" :currentVersion="version"></top-imgs>
    <div class="tabs-container">
      <div class="food" @click="selectTab(food.type)">{{food.label}}</div>
      <div class="tabs">
        <div class="tab" :key="tab.label" @click="selectTab(tab.type)" :class="{ 'selected-tab': currentTabType === tab.type }" v-for="tab in tabs">{{tab.label}}</div>
      </div>
    </div>
    <div class="view">
      <common-good  @click="toDetail(item)" v-for="item in currentItems" :good="item" :key="item._id" type="recipe"></common-good>
    </div>
    <select-version @select-sort="selectSort($event)" :isRecipe="true" v-if="isSelect" @select-version="selectVersion($event)"></select-version>
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
      items: [],
      currentItems: [],
      food: {
        label: '料理',
        type: 7
      },
      tabs: [{
        label: '肉类',
        type: 4
      }, {
        label: '蔬菜',
        type: 6
      }, {
        label: '水果',
        type: 5
      }, {
        label: '蛋类',
        type: 8
      }, {
        label: '其他',
        type: 20
      }, {
        label: '非食材',
        type: 21
      }],
      currentTabType: 7,
      sortType: 'fullOfFood',
      itemsSort: []
    }
  },
  components: {
    topImgs,
    commonGood,
    selectVersion
  },
  onLoad (options) {
    if (wx.getStorageSync('currentSort')) {
      this.sortType = wx.getStorageSync('currentSort')
    }
    if (wx.getStorageSync('currentVersion')) {
      this.version = wx.getStorageSync('currentVersion')
    }

    wx.setNavigationBarTitle({
      title: `食谱(${this.version})`
    })
    this.type = options.type
  },
  mounted () {
    this.initData()
  },
  methods: {
    async selectSort (item) {
      await wx.setStorageSync('currentSort', item)
      this.sortType = wx.getStorageSync('currentSort')
      this.isSelect = false
    },
    sortRecipe (item) {
      if (item === 'fullOfFood') {
        this.itemsSort = this.items.sort((a, b) => {
          return b.attr[0] - a.attr[0]
        })
      } else if (item === 'bloodVolume') {
        this.itemsSort = this.items.sort((a, b) => {
          return b.attr[1] - a.attr[1]
        })
      } else if (item === 'spirit') {
        this.itemsSort = this.items.sort((a, b) => {
          return b.attr[2] - a.attr[2]
        })
      }
    },
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
        url: `/pages/recipeDetail/main?src=${item.src}&type=${item.type}&version=${this.version}`
      })
    },
    async initData () {
      const result = await this.$http.get(`https://www.fireleaves.cn/${this.type}?version=${this.version}`)
      this.items = result.data
      this.sortRecipe(this.sortType)
      this.currentItems = this.itemsSort.filter(item => item.type === this.currentTabType)
    },
    initSortData () {
      this.sortRecipe(this.sortType)
      this.currentItems = this.itemsSort.filter(item => item.type === this.currentTabType)
    },
    selectTab (type) {
      this.currentItems = []
      this.currentTabType = type
      setTimeout(() => {
        this.currentItems = this.itemsSort.filter(item => item.type === this.currentTabType)
      }, 0)
    }
  },
  watch: {
    version (value) {
      this.currentItems = []
      // this.currentTabType = 11
      setTimeout(() => {
        this.initData()
        wx.setStorageSync('currentVersion', value)
      }, 0)
      wx.setNavigationBarTitle({
        title: `食谱(${this.version})`
      })
    },
    sortType (value) {
      this.currentItems = []
      // this.currentTabType = 11
      setTimeout(() => {
        this.initSortData()
        wx.setStorageSync('currentSort', value)
      }, 0)
      wx.setNavigationBarTitle({
        title: `食谱(${this.version})`
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .recipe {
    .selected-tab {
      background-color: #2c3e50 !important;
      color: #fff !important;
    }
    .tabs-container {
      display: flex;
      flex-flow: nowrap row;
      background-color: #34495e;
      .food {
        width: 159px;
        height: 80px;
        background-color: #2c3e50;
        color: white;
        text-align: center;
        line-height: 80px;
        box-shadow: inset 0 0 4px #212121;
        font-size: 16px;
        border-top: 1px solid #2c3e50;
        border-bottom: 1px solid #2c3e50;
      }
      .tabs {
        display: flex;
        flex-flow: wrap row;
        width: calc(100% - 159px);
        height: 80px;
        .tab {
          width: calc(33% - 2px);
          height: 40px;
          background-color: #34495e;
          border-bottom: 1px solid #2c3e50;
          border-left: 1px solid #2c3e50;
          font-size: 12px;
          color: #bdc3c7;
          text-align: center;
          line-height: 40px;
        }
      }
    }
    
  }
</style>