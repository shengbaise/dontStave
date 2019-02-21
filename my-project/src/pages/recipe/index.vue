/*
 * @Author: chenxu
 * @Date: 2018-08-13 17:38:57
 * @Last Modified by: chenxu
 * @Last Modified time: 2019-02-20 20:00:39
 */
<template>
  <div class="recipe">
    <scroll-view :scroll-with-animation="true" :scroll-left="scrollLeft" scroll-x style="width: 100%;" class="tabs">
      <div class="tab" :key="tab.label" @click="selectTab(tab.type, index)" :class="{ 'tab-selected': currentTabType === tab.type }" v-for="(tab, index) in tabs">{{tab.label}}</div>
    </scroll-view>
    <scroll-view :scroll-y="true" class="view">
      <div class="list">
        <common-good v-if="currentItems.length > 0"  @click="toDetail(item)" v-for="item in currentItems" :good="item" :key="item._id" type="recipe"></common-good>
        <p v-if="currentItems.length === 0" class="no-data">暂无数据～～～</p>
      </div>
    </scroll-view>
    <div class="select-version-button" @click="showSelectVersion">
      <img class="switch-icon" src="/static/icon/switch.png" alt="" mode="aspectFit">
    </div>
    <select-version
      @hide-select="hideSelect"
      v-if="isSelect"
      @select-sort="selectSort"
      listWidth="80%"
      :hasVersionSelect="false"
      :isRecipe="true"></select-version>
  </div>
</template>

<script>
import selectVersion from '@/components/selectVersion.vue'
import commonGood from '@/components/commonGood.vue'
import { shareApp } from '@/utils/index.js'

export default {
  data () {
    return {
      isSelect: false,
      type: '',
      version: 'DST',
      items: [],
      currentItems: [],
      tabs: [
        {
          label: '料理',
          type: 7
        }, {
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
      itemsSort: [],
      scrollLeft: 0
    }
  },
  components: {
    commonGood,
    selectVersion
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  onLoad (options) {
    if (wx.getStorageSync('currentSort')) {
      this.sortType = wx.getStorageSync('currentSort')
    }
    if (wx.getStorageSync('currentVersion')) {
      this.version = wx.getStorageSync('currentVersion') || 'DST'
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
    hideSelect () {
      this.isSelect = false
    },
    showSelectVersion () {
      this.isSelect = true
    },
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
    toDetail (item) {
      wx.navigateTo({
        url: `/pages/recipeDetail/main?src=${item.src}&type=${item.type}&version=${this.version}`
      })
    },
    async initData () {
      const result = await this.$http.get(`/${this.type}?version=${this.version}`)
      this.items = result.data
      this.sortRecipe(this.sortType)
      this.currentItems = this.itemsSort.filter(item => item.type === this.currentTabType)
    },
    initSortData () {
      this.sortRecipe(this.sortType)
      this.currentItems = this.itemsSort.filter(item => item.type === this.currentTabType)
    },
    selectTab (type, index) {
      if (index > 2) {
        this.scrollLeft = 76 * (index - 2)
      } else {
        this.scrollLeft = 0
      }
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

<style lang="scss">
page {
  height: 100%;
  width: 100%;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>


<style scoped lang="scss">
  .recipe {
    position: relative;
    display: flex;
    flex-flow: nowrap column;
    width: 100%;
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
    .select-version-button {
      position: fixed;
      background-color: #ae63e4;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      right: 20px;
      bottom: 20px;
      .switch-icon {
        height:24px;
        width:24px;
      }
    }
  }
</style>