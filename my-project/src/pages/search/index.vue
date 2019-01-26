<template>
  <div class="search">
    <p class="tip">Tips: 当前版本为{{version}}</p>
    <search-input
      @search="getSearchResult"></search-input>
    <scroll-view :scroll-y="true" class="view">
      <common-good
        v-if="results.length > 0"
        @click="toDetail(item)"
        v-for="item in results" :key="item._id"
        :good="item"></common-good>
    </scroll-view>
    <p class="loading" v-if="loading">加载中...</p>
    <p class="no-data" v-if="results.length === 0 && loaded">没有找到您要搜索的内容</p>
  </div>
</template>

<script>
import searchInput from '@/components/searchInput'
import commonGood from '@/components/commonGood.vue'

export default {
  data () {
    return {
      version: '',
      results: [],
      loading: false,
      loaded: false
    }
  },
  components: {
    searchInput,
    commonGood
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
    this.version = wx.getStorageSync('currentVersion') || 'DST'
    console.info(options, 'mish options')
  },
  filters: {
    filterType (item) {
      return 'animal'
    }
  },
  methods: {
    async getSearchResult (value) {
      this.loading = true
      this.loaded = false
      this.results = []
      try {
        const result = await this.$http.get(`/search?version=${this.version}&searchVal=${value}`)
        this.results = result.data
        this.loaded = true
        this.loading = false
      } catch (e) {
        this.loaded = true
        this.loading = false
      }
    },
    getDetailPath (type) {
      const technologyTypes = [9, 10, 11, 12, 13, 14, 15,
        16, 18, 19, 25, 26, 27, 28, 29, 30, 31, 32]
      const materialsTypes = [33, 34, 35]
      const foodsTypes = [4, 5, 6, 7, 8, 17, 20, 21]
      const animalTypes = [0, 1, 2, 3, 22, 23, 24, 36]
      if (technologyTypes.indexOf(parseInt(type)) > -1) {
        return 'scienceTechnologyDetail'
      }
      if (materialsTypes.indexOf(parseInt(type)) > -1) {
        return 'natureInfoDetail'
      }
      if (foodsTypes.indexOf(parseInt(type)) > -1) {
        return 'recipeDetail'
      }
      if (animalTypes.indexOf(parseInt(type)) > -1) {
        return 'animInfoDetail'
      }
    },
    toDetail (item) {
      const detail = this.getDetailPath(item.type)
      wx.navigateTo({
        url: `/pages/${detail}/main?src=${item.src}&version=${this.version}`
      })
    }
  }
}
</script>
<style>
page {
  width:100%;
  height:100%;
  /*background-color: #37474f;*/
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>
<style lang="scss" scoped>
.search {
  height: 100%;
  .tip {
    color: #999;
    font-size: 12px;
    text-align: left;
    padding: 8px;
    background-color: #f5f5f5;
  }
  .view {
    position: absolute;
    top: 82px;
    height: calc(100% - 82px);
  }
}
</style>
