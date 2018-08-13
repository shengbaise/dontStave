/*
 * @Author: chenxu
 * @Date: 2018-08-13 17:38:57
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-13 17:53:20
 */
<template>
  <div class="recipe">
    <topImgs></topImgs>
    <div class="tabs">
      <div class="tab"></div>
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
      currentitems: [],
      tabs: [{
        label: '料理',
        type: 7
      }, {
        label: '肉类',
        type: 7
      }, {
        label: '蔬菜',
        type: 7
      }, {
        label: '水果',
        type: 7
      }, {
        label: '蛋类',
        type: 7
      }, {
        label: '其他',
        type: 7
      }, {
        label: '非食材',
        type: 7
      }]
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
    async initData () {
      const result = await this.$http.get(`${this.inline}/${this.type}?version=${this.version}`)
      this.items = result.data
      console.info(this.items, 'mish items')
      // this.currentitems = this.items.filter(item => item.type === this.currentTabType)
    }
    // selectTab (type) {
    //   if (type) {
    //     this.currentTabType = type
    //     this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
    //     this.showMoreTab = false
    //   } else {
    //     this.showMoreTab = true
    //   }
    // }
  }
}
</script>
