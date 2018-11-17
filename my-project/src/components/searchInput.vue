<template>
  <div class="search-input">
    <div class="search">
      <div class="search-container">
        <div class="search-type" @click="selectSearchType()">
          <p class="search-type-value">{{currentSearchType}}</p>
          <i v-if="!isSelectType" class="icon-zhankai iconfont icon"></i>
          <i v-else class="icon-shouqi iconfont icon"></i>
          <radio-group class="version-group" @change="searchTypeRadioChange" v-if="isSelectType">
            <label class="radio" v-for="(item, index) in typeItems" :key="index">
              <radio :checked="item.value === currentSearchType" class="input-item" color="#009688" type="radio" :value="item.value"/>{{item.value}}
            </label>
          </radio-group>
        </div>
        <input type="text" class="search-input" v-model="searchContent" placeholder="请输入搜索内容">
        <i class="icon-sousuo icon iconfont" @click="toSearch()"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSelectType: false,
      searchContent: '',
      currentSearchType: '科技',
      typeItems: [
        {name: 'scienceTechnology', value: '科技'},
        {name: 'recipe', value: '食谱'},
        {name: 'animInfo', value: '生物'},
        {name: 'nature', value: '自然'}
      ]
    }
  },
  methods: {
    selectSearchType () {
      if (!this.isSelectType) {
        this.isSelectType = true
      } else {
        this.isSelectType = false
      }
    },
    searchTypeRadioChange (e) {
      this.currentSearchType = e.target.value
    },
    toSearch () {
      console.info(';;;;;')
      wx.navigateTo({
        url: `/pages/search/main?type=${this.currentSearchType}&searchContent=${this.searchContent}`
      })
    }
  }
}
</script>

<style>
radio .wx-radio-input {
  border-radius: 30rpx;
  height: 30rpx;
  width: 30rpx;
}
</style>

<style lang="scss" scoped>
.search-input {
  width: 100%;
  .version-group {
    z-index: 3;
    top: 43px;
    left: 0;
    width: 120px;
    height: 200px;
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    background-color: #fff;
    padding-bottom: 10px;
    .radio {
      padding: 12px;
      padding-bottom: 0;
      color: rgba(0,0,0,.54);
    }
  }
  .search {
    width: 100%;
  }
  .search-container {
    position: absolute;
    height: 68px;
    top: 0;
    padding: 0 20px;
    position: relative;
    display: flex;
    flex-flow: nowrap row;
    align-items: center;
    .icon-zhankai, .icon-shouqi {
      display: inline-block;
      text-align: right;
    }
    font-size: 14px;
    .search-type {
      position: relative;
      padding: 0 5px 0 14px;
      color: gray;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      display: flex;
      flex-flow: nowrap row;
      align-items: center;
      justify-content: space-between;
      width: 20%;
      height: 33px;
      line-height: 33px;
      background-color: #1a2933;
    }
    .search-input {
      border-left: 1px solid #37474f;
      padding-left: 10px;
      font-size: 13px;
      width: 80%;
      height: 33px;
      color: gray;
      background-color: #1a2933;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    .icon-sousuo {
      position: absolute;
      right: 8%;
      display: inline-block;
      font-size: 18px;
      color: gray;
      z-index: 10;
    }
  }
}
</style>
