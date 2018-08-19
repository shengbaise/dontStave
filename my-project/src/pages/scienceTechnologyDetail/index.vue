/*
 * @Author: chenxu
 * @Date: 2018-08-14 15:01:38
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 20:05:12
 */
<template>
  <div class="science-technology-detail">
    <common-good :good="item" type="science"></common-good>
    <div class="detail-container">
      <div class="detail">
        <div class="science">
          <div class="no-science" v-if="item.technology === 0">不需要科技</div>
          <img class="science-img" v-else :src="sciencesImgs[item.technology - 1]" alt="test" mode="widthFix">
        </div>
        <div class="materials">
          <div class="material" v-for="(material, index) in item.composition" :key="index">
            <img class="material-img" :src="material.src" alt="" mode="widthFix">
            <div>x {{material.num}}</div>
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
      sciencesImgs: ['http://img.fireleaves.cn/Sciences/S_science_machine.png',
        'http://img.fireleaves.cn/Sciences/S_alchemy_engine.png', 'http://img.fireleaves.cn/Sciences/S_prestihatitator.png']
    }
  },
  components: {
    commonGood,
    commonDetail
  },
  async onLoad (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#009688',
      animation: {
        duration: 300,
        timingFunc: 'easeIn'
      }
    })
    wx.setNavigationBarTitle({
      title: '物品详情'
    })
    const result = await this.$http.get(`https://www.fireleaves.cn/material/single?version=${this.version}&src=${options.src}`)
    this.item = result.data[0]
    const composition = this.item.composition
    composition.forEach(item => {
      item.src = this.formatUrl(item.src)
    })
  },
  mounted () {
  },
  methods: {
    formatUrl (src) {
      let urlParam = ''
      if (['G', 'S', 'F', 'A'].indexOf(src[0]) > -1) {
        urlParam = 'animReward'
      }
      return `http://img.fireleaves.cn/${urlParam}/${src}.png`
    }
  }
}
</script>

<style lang="scss" scoped>
.science-technology-detail {
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
      .science {
        height: 32px;
        margin-top: -12px;
        margin-right: -12px;
        text-align: right;
        .no-science {
          color: #999;
          font-size: 12px;
        }
        .science-img {
          width: 32px;
        }
      }
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
