<template>
  <div class="search-input" @click="handleClick">
    <div class="search">
      <div class="search-container" :style="{'top': top + 'px'}">
        <input @focus="handleFocus()"
          :style="{'width': width, 'margin-right': marginRight}"
          @confirm="enter"
          :disabled="isReadonly"
          ref="searchInput"
          type="text" class="search-input" v-model="searchContent" placeholder="请输入搜索内容">
        <i class="icon-sousuo icon iconfont"></i>
        <span class="search-text" @click="search()" v-if="!isReadonly">搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isReadonly: {
      type: Boolean,
      default () {
        return false
      }
    },
    top: {
      type: Number,
      default () {
        return 0
      }
    },
    width: {
      type: [Number, String],
      default: '80%'
    },
    marginRight: {
      type: [Number, String],
      default: '40px'
    }
  },
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
      ],
      timer: null,
      begin: null
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    },
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
    search () {
      if (this.searchContent) {
        this.$emit('search', this.searchContent)
      }
    },
    handleFocus () {
      this.$emit('handle-search')
    },
    enter () {
      if (this.searchContent) {
        this.$emit('search', this.searchContent)
      }
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
  input::input-placeholder {
    color: #999;
  }
  user-select: none;
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
    // width: 100%;
  }
  .search-container {
    position: absolute;
    height: 48px;
    padding: 0 20px;
    // width: 100%;
    position: relative;
    display: flex;
    flex-flow: nowrap row;
    align-items: center;
    .icon-zhankai, .icon-shouqi {
      display: inline-block;
      text-align: right;
    }
    font-size: 14px;
    .search-input {
      width: 80%;
      -webkit-user-select: none;  /*webkit浏览器*/
      -ms-user-select: none;   /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
      // border-left: 1px solid #37474f;
      padding-left: 34px;
      font-size: 13px;
      width: 100%;
      height: 24px;
      color: gray;
      background-color: #f5f5f5;
      border-radius: 4px;
      // border-bottom-right-radius: 20px;
    }
    .search-text {
      position: absolute;
      right: 0;
      display: inline-block;
      font-size: 14px;
      color: gray;
      z-index: 10;
      padding:20px 30px 20px 20px;
      user-select: none;
      padding:20px;
      color:#009688;
    }
    .icon-sousuo {
      position: absolute;
      // right: 0;
      display: inline-block;
      font-size: 18px;
      color: gray;
      z-index: 10;
      padding-left: 10px;
      // padding:20px 30px 20px 20px;
      user-select: none;
    }
  }
}
</style>
