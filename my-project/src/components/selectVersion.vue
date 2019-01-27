<template>
  <div class="select-sort" @click="hideSelect">
    <div class="sort-list" :style="{ width: listWidth }" @click.prevent.stop>
      <div class="title" v-if="isRecipe">食谱排序</div>
      <radio-group v-if="isRecipe" class="sort-group" @change="sortRadioChange">
        <label class="radio" v-for="(item, index) in sortItems" :key="index">
          <radio :checked="item.name === currentSort" class="input-item" color="#009688" type="radio" :value="item.name"/>{{item.value}}
        </label>
      </radio-group>
      <div class="title" v-if="!isHome">版本选择</div>
      <div class="title" v-else>选择你当前游戏的版本，我们会优先展示这些数据</div>
      <radio-group class="sort-group" @change="versionRadioChange">
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
    },
    hideSelect () {
      this.$emit('hide-select')
    }
  }
}
</script>

<style lang="scss" scoped>
.select-sort {
  z-index: 9999;
}
</style>
