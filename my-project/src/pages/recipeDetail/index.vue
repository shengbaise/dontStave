/*
 * @Author: chenxu
 * @Date: 2018-08-14 19:14:31
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-15 14:44:51
 */
<template>
  <div class="recipe-detail">
    <common-good :good="item" type="recipe"></common-good>
    <div class="detail-container">
      <div class="detail">
        <div class="science">
          <div class="no-science" v-if="type !== '7'">食物属性</div>
          <img class="science-img" v-else src="/static/img/food/pot.png" alt="" mode="widthFix">
        </div>
        <div class="materials" v-if="composites.length > 0">
          <div class="material" v-for="(material, index) in composites" :key="index">
            <img class="material-img" :src="material" alt="" mode="widthFix">
          </div>
        </div>
        <div class="materials">
          <div class="need-materials" v-if="needs.length > 0">
            <div class="material-item">
              <div class="material" v-for="(material, index) in needs" :key="index">
                <img class="material-img" :src="material.src" alt="" mode="widthFix">
                <div>{{material.num}}</div>
              </div>
            </div>
            <p class="need-desc">必须材料</p>
          </div>
          <div class="fail-materials" v-if="fails.length > 0">
            <div class="material-item">
              <div class="material" v-for="(material, index) in fails" :key="index">
                <div>{{material.num}}</div>
                <img class="material-img" :src="material.src" alt="" mode="widthFix">
              </div>
            </div>
            <p class="need-desc">不能添加材料</p>
          </div>
        </div>
        <div class="materials" v-if="features.length > 0">
          <div class="material" v-for="(feature, index) in features" :key="index">
            <img class="material-img" :src="feature.src" alt="" mode="widthFix">
            <div>{{feature.num}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-container">
      <div class="detail">
        <div class="attr-text">
          <div class="key">优先级</div>
          <div class="value">{{item.priority}}</div>
        </div>
        <div class="attr-text">
          <div class="key">烹饪</div>
          <div class="value">{{item.time}}</div>
        </div>
        <div class="attr-text">
          <div class="key">温度</div>
          <div class="value">不影响</div>
        </div>
        <common-detail :console="item.console" :desc="item.desc"></common-detail>
      </div>
    </div>
  </div>
</template>

<script>
import commonGood from '@/components/commonGood.vue'
import commonDetail from '@/components/commonDetail.vue'
import detailContainer from '@/components/detailContainer.vue'

export default {
  data () {
    return {
      item: {},
      version: 'DST',
      composites: [],
      needs: [],
      fails: [],
      features: [],
      type: 0
    }
  },
  components: {
    commonGood,
    commonDetail,
    detailContainer
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '食谱详情'
    })
    this.initData(options)
  },
  methods: {
    formatUrl (src) {
      let urlParam = ''
      if (['G', 'S', 'F', 'A'].indexOf(src[0]) > -1) {
        urlParam = 'Foods'
      }
      return `http://img.fireleaves.cn/${urlParam}/${src}.png`
    },
    async initData (options) {
      const result = await this.$http.get(`https://www.fireleaves.cn/food/single?version=${this.version}&src=${options.src}`)
      this.type = options.type
      this.item = result.data[0]
      this.composites = []
      this.needs = []
      this.fails = []
      this.features = []

      if (this.item.composites) {
        this.composites = this.item.composite.map(item => {
          return this.formatUrl(item)
        })
      }

      if (this.item.need) {
        const needItems = this.item.need.map((need, index) => {
          if (index % 2 === 0) {
            return {
              src: this.formatUrl(need),
              num: this.item.need[index + 1]
            }
          }
        })
        this.needs = needItems.filter(item => !!item)
      }
      if (this.item.fail) {
        const fails = this.item.fail.map((need, index) => {
          if (index % 2 !== 0) {
            return {
              src: this.formatUrl(need),
              num: this.item.fail[index - 1]
            }
          }
        })
        this.fails = fails.filter(item => !!item)
      }

      if (this.item.feature) {
        const features = this.item.feature.map((feature, index) => {
          if (index % 2 === 0) {
            return {
              src: this.formatUrl(feature),
              num: this.item.feature[index + 1]
            }
          }
        })
        this.features = features.filter(item => !!item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recipe-detail {
  .detail-container {
    padding: 12px;
    .detail {
      position: relative;
      padding: 24px 24px 0 24px;
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
        .material-item {
          display: flex;
          flex-flow: nowrap row;
          justify-content: space-around;
          align-items: center;
          padding-bottom: 60px;
          font-size: 12px;
        }
        .material {
          display: flex;
          flex-flow: nowrap row;
          align-items: center;
          .material-img {
            width: 48px;
          }
        }
        .need-materials {
          border-right: 1px solid #999;
        }
        .fail-materials {
          border-left: 1px solid #999;
          .material-img {
            margin-left: 2px;
          }
        }
        .need-materials, .fail-materials {
          text-align: center;
          width: 50%;
          .material-img {
            width: 32px;
          }
        }
        .need-desc {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .attr-text {
    align-items: center;
    margin-bottom: 12px;
    padding-right: 12px;
    height: 36px;
    border-radius: 4px;
    border-left: 4px solid #666;
    background-color: #f9f9f9;
    color: #999;
    font-size: 14px;
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-between;
    .key {
      padding-left: 10px;
    }
    .value {
      color: #333;
    }
  }
}
</style>
