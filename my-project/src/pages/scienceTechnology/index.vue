/*
 * @Author: chenxu
 * @Date: 2018-08-10 16:22:02
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-10 17:35:59
 */
<template>
  <div class="science-technology">
    <div class="top-imgs">
      <img class="bg-img" mode="scaleToFill" src="https://images.weserv.nl/?url=stavebox.oss-cn-beijing.aliyuncs.com/SomeLabel/cool-background.png?x-oss-process=style/versionbg" alt="">
      <img class="img" mode="widthFix" src="https://images.weserv.nl/?url=stavebox.oss-cn-beijing.aliyuncs.com/SomeLabel/C763C9B46AC4420F9F2107724A879221.png" alt="">
    </div>
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index">{{tab.label}}</div>
    </div>
    <div class="view">
      <div class="common-good" v-for="good in currentGoods" :key="good._id">
        <div class="good-img-container">
          <img class="good-img" :src="good.src" alt="" mode="widthFix">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [{
        label: '工具',
        type: 11
      }, {
        label: '照明',
        type: 11
      }, {
        label: '生存',
        type: 11
      }, {
        label: '更多'
      }],
      technologyType: '',
      currentGoods: []
    }
  },
  onLoad (options) {
    console.info(options, 'mish options')
    this.technologyType = options.type
  },
  async mounted () {
    const version = 'DST'
    const result = await this.$http.get(`${this.inline}/${this.technologyType}?version=${version}`)
    this.currentGoods = result.data.filter(item => item.type === 11)
    console.info(this.currentGoods, 'mish rerereredsfsf')
  }
}
</script>

<style lang="scss" scoped>
.science-technology {
  .top-imgs {
    position: relative;
    height: 160px;
    .bg-img {
      width: 100vw;
      height: 160px;
    }
    .img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
    }
  }
  .tabs {
    height: 30px;
    display: flex;
    flex-flow: nowrap row;
    font-size: 14px;
    background-color: #263238;
    color: white;
    justify-content: space-around;
    align-items: center;
  }
  .view {
    .common-good {
      .good-img-container {
        .good-img {
          width: 48px;
        }
      }
    }
  }
}
</style>
