<template>
  <div class="select-version">
    <div class="version-list" :style="{ width: listWidth }">
      <div class="title" v-if="isRecipe">食谱排序</div>
      <radio-group v-if="isRecipe" class="version-group" @change="sortRadioChange">
        <label class="radio" v-for="(item, index) in sortItems" :key="index">
          <radio :checked="item.name === currentSort" class="input-item" color="#009688" type="radio" :value="item.name"/>{{item.value}}
        </label>
      </radio-group>
      <div class="title" v-if="!isHome">版本选择</div>
      <div class="title" v-else>选择你当前游戏的版本，我们会优先展示这些数据</div>
      <radio-group class="version-group" @change="versionRadioChange">
        <label class="radio" v-for="(item, index) in items" :key="index">
          <radio :checked="item.name === currentVersion" class="input-item" color="#009688" type="radio" :value="item.name"/>{{item.value}}
        </label>
      </radio-group>
      <div class="ok" @click="selectVersion()">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listWidth: {
      type: String,
      default () {
        return '70%'
      }
    },
    isHome: {
      type: Boolean,
      default () {
        return false
      }
    },
    isRecipe: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      items: [
        {name: 'DST', value: '联机版(DST)'},
        {name: 'DS', value: '单机版(DS)'},
        {name: 'ROG', value: '巨人统治(ROG)'},
        {name: 'SW', value: '船难(SW)'},
        {name: 'HAMLET', value: '哈姆雷特(HAMLET)'}
      ],
      sortItems: [{
        name: 'fullOfFood',
        value: '按照饱食从高到低'
      }, {
        name: 'bloodVolume',
        value: '按照血量从高到低'
      }, {
        name: 'spirit',
        value: '按照精神从高到低'
      }],
      currentVersion: 'DST',
      currentSort: 'fullOfFood'
    }
  },
  onLoad () {
    if (wx.getStorageSync('currentVersion')) {
      this.currentVersion = wx.getStorageSync('currentVersion')
    }
    if (wx.getStorageSync('currentSort')) {
      this.currentSort = wx.getStorageSync('currentSort')
    }
  },
  methods: {
    versionRadioChange (e) {
      this.currentVersion = e.target.value
    },
    selectVersion () {
      this.$emit('select-version', this.currentVersion)
      if (this.isRecipe) {
        this.$emit('select-sort', this.currentSort)
      }
    },
    sortRadioChange (e) {
      this.currentSort = e.target.value
    }
  }
}
</script>
<style lang="scss">
.select-version {
  radio .wx-radio-input{
    border-radius: 30rpx;
    height: 30rpx;
    width: 30rpx;
  }
}
</style>
<style scoped lang="scss">
.select-version {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.3);
  .version-list {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
    // height: 40%;
    overflow: scroll;
    background-color: white;
    border-radius: 4px;
    .title {
      padding: 16px 0 12px 10px;
      border-bottom: 1px solid #DCDFE6;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      box-sizing: content-box;
    }
    .version-group {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .radio {
        padding: 12px;
        padding-bottom: 0;
        color: rgba(0,0,0,.54);
      }
    }
    .ok {
      text-align: right;
      color: #43a047;
      font-size: 14px;
      padding-top: 15px;
      padding-bottom: 10px;
      padding-right: 25px;
    }
  }
}
</style>
