<template>
  <div class="anim-info-detail">
    <common-good :good="item" type="animal"></common-good>
    <div class="detail-container">
      <div class="detail">
        <div class="ability">
          <h3 class="title">特殊能力</h3>
          <ul>
            <li class="content" v-for="(ability, index) in item.Ability" :key="index">{{ability}}</li>
          </ul>
        </div>
        <div class="materials" v-if="rewards.length > 0">
          <div class="material" v-for="(material, index) in rewards" :key="index">
            <img class="material-img" :src="material" alt="" mode="widthFix">
          </div>
        </div>
        <common-detail :console="item.console" :desc="item.desc"></common-detail>
      </div>
    </div>
  </div>
</template>

<script>
import commonGood from '@/components/commonGood.vue'
import commonDetail from '@/components/commonDetail.vue'

export default {
  data () {
    return {
      item: {},
      version: 'DST',
      rewards: []
    }
  },
  components: {
    commonGood,
    commonDetail
  },
  async onLoad (options) {
    const result = await this.$http.get(`${this.inline}/anim/single?version=${this.version}&src=${options.src}`)
    this.item = result.data[0]
    console.info(this.item, 'mish item.......')
    // const composition = this.item.composition
    // composition.forEach(item => {
    //   item.src = this.formatUrl(item.src)
    // })
    if (this.item.reward) {
      const rewards = this.item.need.map((need, index) => {
        if (index % 2 === 0) {
          return {
            src: this.formatUrl(need),
            num: this.item.reward[index + 1]
          }
        }
      })
      this.rewards = rewards.filter(item => !!item)
    }
  },
  methods: {
    formatUrl (src) {
      let urlParam = ''
      // if (['G', 'S', 'F', 'A'].indexOf(src[0]) > -1) {
      //   urlParam = 'animReward'
      // }
      return `http://img.fireleaves.cn/${urlParam}/${src}.png`
    }
  }
}
</script>

<style scoped lang="scss">
.anim-info-detail {
  .ability {
    .title {
      font-size: 16px;
      font-weight: 600;
      text-align: left;
    }
    .content {
      padding: 12px 12px 12px 0;
      color: #333;
      font-size: 14px;
      text-align: left;
    }
  }
}
</style>
