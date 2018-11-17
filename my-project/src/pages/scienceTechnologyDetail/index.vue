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
          <img class="science-img" v-else :src="sciencesImgs[item.technology]" alt="test" mode="widthFix">
        </div>
        <div class="materials">
          <div class="material" v-for="(material, index) in item.composition" :key="index">
            <img @click="toImgDetail(material.src)" class="material-img" :src="material.src" alt="" mode="aspectFit">
            <div>x {{material.num}}</div>
          </div>
        </div>
        <common-detail
          :warm="warm"
          :heat="heat"
          :moistureCloth="moistureCloth"
          :reason="reason"
          :moisture="moisture"
          :defense="defense"
          :type="item.type"
          :console="item.console"
          :desc="item.desc"></common-detail>
      </div>
    </div>
  </div>
</template>

<script>
import commonGood from '@/components/commonGood.vue'
import commonDetail from '@/components/commonDetail.vue'
import { getImgDetail, formatUrl } from '@/utils/index.js'

export default {
  data () {
    return {
      item: {},
      version: 'DST',
      sciencesImgs: { 1: 'http://img.fireleaves.cn/Sciences/S_science_machine.png',
        2: 'http://img.fireleaves.cn/Sciences/S_alchemy_engine.png',
        3: 'http://img.fireleaves.cn/Sciences/S_prestihatitator.png',
        4: '/static/img/material/469.png',
        5: 'http://img.fireleaves.cn/Natures/N_ancient_pseudoscience_station.png',
        6: 'http://img.fireleaves.cn/Sciences/S_codex_umbra.png',
        7: 'http://img.fireleaves.cn/Natures/N_rock_den.png',
        8: 'http://img.fireleaves.cn/Sciences/S_potters_wheel.png',
        10: 'http://img.fireleaves.cn/Natures/N_obsidian_workbench.png',
        11: '/static/img/material/86.png'
      },
      moisture: 0,
      defense: 0,
      reason: 0,
      moistureCloth: 0,
      heat: 0,
      warm: 0
    }
  },
  components: {
    commonGood,
    commonDetail
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '物品详情'
    })
    this.version = options.version
    this.initData(options)
  },
  mounted () {
    this.moisture = 0
    this.defense = 0
    this.reason = 0
    this.moistureCloth = 0
    this.heat = 0
    this.warm = 0
  },
  methods: {
    async initData (options) {
      const result = await this.$http.get(`https://www.fireleaves.cn/material/single?version=${this.version}&src=${options.src}`)
      this.item = result.data[0]
      if (this.item.attr) {
        this.reason = this.item.attr[3]
        this.moisture = this.item.attr[4]
        this.defense = this.item.attr[2]
        this.moistureCloth = this.item.attr[4]
        this.heat = this.item.attr[5]
        this.warm = this.item.attr[6]
        // if (this.item.type === 16)
      }
      const composition = this.item.composition
      composition.forEach(item => {
        item.src = formatUrl(item.src)
      })
    },
    toImgDetail (src) {
      const detailItem = getImgDetail(src)
      if (!detailItem) {
        return
      }
      if (src === 'scienceTechnologyDetail') {
        this.item = {}
        setTimeout(() => {
          this.initData({
            src: src,
            version: this.version
          })
        }, 0)
      } else {
        wx.navigateTo({
          url: `/pages/${detailItem}/main?src=${src}&version=${this.version}`
        })
      }
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
        // align-items: center;
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
