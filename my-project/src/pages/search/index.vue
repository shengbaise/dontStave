<template>
  <div class="search-item">
    <p class="tip">Tips: 当前版本为{{version}}</p>
    <search-input></search-input>
  </div>
</template>

<script>
import searchInput from '@/components/searchInput'

export default {
  data () {
    return {
      version: ''
    }
  },
  components: {
    searchInput
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
    this.version = wx.getStorageSync('currentVersion')
    console.info(options, 'mish options')
  },
  methods: {
  }
}
</script>
<style>
page {
  width:100%;
  height:100%;
  background-color: #37474f;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>
<style lang="scss" scoped>
.search-item {
  .tip {
    color: #999;
    font-size: 12px;
    text-align: left;
    padding: 8px;
    background-color: #1a2933;
  }
}
</style>
