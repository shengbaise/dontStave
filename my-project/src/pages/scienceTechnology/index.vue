/*
 * @Author: chenxu
 * @Date: 2018-08-10 16:22:02
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-13 15:46:10
 */
<template>
  <div class="science-technology">
    <div class="top-imgs">
      <img class="bg-img" mode="scaleToFill" src="https://images.weserv.nl/?url=stavebox.oss-cn-beijing.aliyuncs.com/SomeLabel/cool-background.png?x-oss-process=style/versionbg" alt="">
      <img class="img" mode="widthFix" src="https://images.weserv.nl/?url=stavebox.oss-cn-beijing.aliyuncs.com/SomeLabel/C763C9B46AC4420F9F2107724A879221.png" alt="">
    </div>
    <div class="tabs">
      <div @click="selectTab(tab.type)" :class="{ 'tab-selected': currentTabType === tab.type }" v-for="(tab, index) in tabs" :key="index">{{tab.label}}</div>
    </div>
    <div class="more-tabs-container" v-show="showMoreTab">
      <div class="more-tabs">
        <div class="tab" @click="selectTab(item.type)" :class="{ 'more-tab-selected': currentTabType === item.type }"  v-for="item in moreTabs" :key="item.label">{{item.label}}</div>
      </div>
    </div>
    <div class="view">
      <div class="common-good" v-for="good in currentGoods" :key="good._id">
        <div class="good-img-container">
          <!-- <img class="good-img" :src="good.src" alt="" mode="widthFix"> -->
        </div>
        <div class="desciption">
          <div class="name">{{good.name}}</div>
          <div class="alis">{{good.alis}}</div>
          <div v-if="good.attr" class="attrs">
            <div><span class="aggressivity">攻击力：</span>{{good.attr[0]}}</div>
            <div><span class="durable">耐久：</span>{{good.attr[1]}}</div>
          </div>
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
        type: 9
      }, {
        label: '生存',
        type: 10
      }, {
        label: '更多'
      }],
      technologyType: '',
      currentGoods: [],
      currentTabType: 11,
      items: [],
      moreTabs: [{
        label: '工具',
        type: 11
      }, {
        label: '照明',
        type: 9
      }, {
        label: '生存',
        type: 10
      }, {
        label: '食物',
        type: 13
      }, {
        label: '战斗',
        type: 12
      }, {
        label: '科学',
        type: 14
      }, {
        label: '魔法',
        type: 15
      }, {
        label: '服装',
        type: 16
      }, {
        label: '书本',
        type: 19
      }, {
        label: '建筑',
        type: 25
      }, {
        label: '合成',
        type: 26
      }, {
        label: '远古',
        type: 27
      }, {
        label: '暗影',
        type: 28
      }, {
        label: '宠物',
        type: 30
      }, {
        label: '雕塑',
        type: 10
      }],
      showMoreTab: false,
      version: 'DST'
    }
  },
  onLoad (options) {
    console.info(options, 'mish options')
    this.technologyType = options.type
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      const result = await this.$http.get(`${this.inline}/${this.technologyType}?version=${this.version}`)
      this.items = result.data
      this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
    },
    selectTab (type) {
      if (type) {
        this.currentTabType = type
        this.currentGoods = this.items.filter(item => item.type === this.currentTabType)
        this.showMoreTab = false
      } else {
        this.showMoreTab = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.science-technology {
  .tab-selected {
    color: #b7ba6b !important;
  }
  .more-tab-selected {
    background-color: #2F4F4F !important;
    color: white !important;
  }
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
    height: 38px;
    display: flex;
    flex-flow: nowrap row;
    font-size: 14px;
    background-color: #263238;
    color: white;
    justify-content: space-around;
    align-items: center;
  }
  .more-tabs-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: rgba(0,0,0,.65);
    .more-tabs {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 15px;
      box-sizing: border-box;
      transform: translate(-50%, -50%);
      display: flex;
      flex-flow: wrap row;
      justify-content: flex-start;
      width: 90%;
      height: 180px;
      background-color: white;
      border-radius: 6px;
      .tab {
        font-size: 14px;
        width: 64px;
        height: 30px;
        margin-right: 12px;
        line-height: 30px;
        text-align: center;
        background-color: #F5F5F5;
        color: gray;
        border-radius: 4px;
      }
    }
  }
  .view {
    position: absolute;
    top: 198px;
    height: calc(100% - 198px);
    width: 100%;
    overflow: scroll;
    .common-good {
      display: flex;
      flex-flow: nowrap row;
      padding: 10px;
      border-bottom: 1px solid #DCDFE6;
      .good-img-container {
        width: 126px;
        height: 106px;
        background-image: url(../../../static/img/home/chacter2.png);
        .good-img {
          width: 48px;
        }
      }
      .desciption {
        margin-left: 15px;
        .name {
          font-size: 18px;
        }
        .alis {
          padding-bottom: 10px;
          font-size: 14px;
          color: gray;
        }
        .attrs {
          font-size: 15px;
          .aggressivity, .durable {
            color: gray
          }
        }
      }
    }
  }
}
</style>
