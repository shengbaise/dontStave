/*
 * @Author: chenxu
 * @Date: 2018-08-13 17:38:57
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 19:14:08
 */
<template>
  <div class="recipe">
    <!-- <topImgs></topImgs> -->
    <div class="tabs-container">
      <div class="food" @click="selectTab(food.type)">{{food.label}}</div>
      <div class="tabs">
        <div class="tab" :key="tab.label" @click="selectTab(tab.type)" :class="{ 'selected-tab': currentTabType === tab.type }" v-for="tab in tabs">{{tab.label}}</div>
      </div>
    </div>
    <div class="view">
      <common-good  @click="toDetail(item)" v-for="item in currentItems" :good="item" :key="item._id" type="recipe"></common-good>
    </div>
  </div>
</template>

<script>
import topImgs from '@/components/topImgs.vue'
import commonGood from '@/components/commonGood.vue'

export default {
  data () {
    return {
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
      currentTabType: 7
    }
  },
  components: {
    topImgs,
    commonGood
  },
  onLoad (options) {
    this.type = options.type
    console.info(options, 'recipe')
  },
  mounted () {
    this.initData()
  },
  methods: {
    toDetail (item) {
      wx.navigateTo({
        url: `/pages/recipeDetail/main?src=${item.src}&type=${item.type}`
      })
    },
    async initData () {
      const result = await this.$http.get(`${this.inline}/${this.type}?version=${this.version}`)
      this.items = result.data
      this.currentItems = this.items.filter(item => item.type === this.currentTabType)
    },
    selectTab (type) {
      this.currentItems = []
      this.currentTabType = type
      setTimeout(() => {
        this.currentItems = this.items.filter(item => item.type === this.currentTabType)
      }, 0)
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