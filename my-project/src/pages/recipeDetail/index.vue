/*
 * @Author: chenxu
 * @Date: 2018-08-14 19:14:31
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 20:15:08
 */
<template>
  <div class="recipe-detail">
    <common-good :good="item" type="recipe"></common-good>
    <div class="detail-container">
      <div class="detail">
        <!-- <div class="materials">
          <div class="material" v-for="(material, index) in item.composite" :key="index">
            <img class="material-img" :src="material.src" alt="" mode="widthFix">
            <div>x {{material.num}}</div>
          </div>
        </div> -->
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
      version: 'DST'
    }
  },
  components: {
    commonGood,
    commonDetail
  },
  async onLoad (options) {
    const result = await this.$http.get(`${this.inline}/food/single?version=${this.version}&src=${options.src}`)
    this.item = result.data[0]
    console.info(this.item, 'item')
    // const composite = this.item.composite
    // composite.forEach(item => {
    //   item.src = this.formatUrl(item.src)
    // })
    // console.info(this.item, 'itemmmmmmmmmmmmm')
  },
  methods: {
    // formatUrl (src) {
    //   let urlParam = ''
    //   if (['G', 'S', 'F', 'A'].indexOf(src[0]) > -1) {
    //     urlParam = 'Foods'
    //   }
    //   return `http://img.fireleaves.cn/${urlParam}/${src}.png`
    // }
  }
}
</script>

<style lang="scss" scoped>
.recipe-detail {
  .detail-container {
    padding: 12px;
    .detail {
      position: relative;
      padding: 24px;
      background-color: #fff;
      border-radius: 6px;
      min-height: 30vh;
      border: 1px solid #e0e0e0;
      box-shadow: inset 0 4px 8px #e0e0e0;
      .materials {
        padding-top: 2px;
        padding-bottom: 18px;
        display: flex;
        flex-flow: nowrap row;
        justify-content: space-around;
        align-items: center;
        .material {
          display: flex;
          flex-flow: nowrap row;
          align-items: center;
          .material-img {
            width: 48px;
          }
        }
      }
    }
  }
}
</style>
