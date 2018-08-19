/*
 * @Author: chenxu
 * @Date: 2018-08-09 15:04:43
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-10 15:57:44
 */
<template>
  <div class="hero-intro">
    <div class="hero">
      <div class="top-picture">
        <img class="picture" v-if="heroList[heroIndex]" :src="heroList[heroIndex].topImg" alt="" mode="aspectFit">
        <div class="shade"></div>
        <div class="hero-message" v-if="hero._id">
          <div class="name">{{heros[heroIndex].name}}</div>
          <div class="motto">{{heros[heroIndex].motto}}</div>
          <div class="attr">饥饿： {{heros[heroIndex].attr[0]}} 生命： {{heros[heroIndex].attr[1]}} 精神： {{heros[heroIndex].attr[2]}}</div>
          <div class="hurt">空手伤害： {{heros[heroIndex].attr[3]}}</div>
        </div>
      </div>
      <div class="content-body" v-if="heros[heroIndex]">
        <h3 class="program">简介</h3>
        <div v-html="heros[heroIndex].ability"></div>
      </div>
    </div>
    <div class="select-button" @click="showSelectHero()">选择角色</div>
    <div class="select-hero" v-show="isSelect">
      <div class="hero-list">
        <div class="title">选择角色</div>
        <div class="hero-item" v-for="(item, index) in heroList" :key="item.alis" @click="selectHero(index)">
          <img class="picture" :src="item.src" alt="" mode="widthFix">
          <div class="item-name">
            <div class="name">{{item.name}}</div>
            <div class="english-name">{{item.alis}}</div>
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
      heroIndex: 0,
      isSelect: false,
      type: '',
      hero: {},
      heros: [],
      heroList: [{
        src: '/static/img/hero/wex.png',
        name: '威尔森',
        alis: 'Wilson',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Wilson.jpg'
      }, {
        src: '/static/img/hero/huonv.png',
        name: '薇洛',
        alis: 'Willow',
        topImg: 'http://img.fireleaves.cn/SomeLabel/willow.jpg'
      },
      {
        src: '/static/img/hero/dls.png',
        name: '沃尔夫冈',
        alis: 'Wolfgang',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Wolfgang.jpg'
      },
      {
        src: '/static/img/hero/wendi.png',
        name: '温蒂',
        alis: 'Wendy',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Wendy.jpg'
      },
      {
        src: '/static/img/hero/jqr.png',
        name: '机器人',
        alis: 'WX-78',
        topImg: 'http://img.fireleaves.cn/SomeLabel/WX-78.jpg'
      },
      {
        src: '/static/img/hero/lnn.png',
        name: '老奶奶',
        alis: 'Wickerbottom',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Wickerbottom.jpg'
      },
      {
        src: '/static/img/hero/fmg.png',
        name: '伍迪',
        alis: 'Woodie',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Woodie.jpg'
      },
      {
        src: '/static/img/hero/xiaochou.png',
        name: '韦斯',
        alis: 'Wes',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Wes.jpg'
      },
      {
        src: '/static/img/hero/mswe.png',
        name: '麦斯威尔',
        alis: 'Maxwell',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Maxwell.jpg'
      },
      {
        src: '/static/img/hero/wns.png',
        name: '薇格弗德',
        alis: 'Wigfrid',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Wigfrid.jpg'
      },
      {
        src: '/static/img/hero/walani.png',
        name: '瓦拉尼',
        alis: 'Walani',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Walani.png'
      },
      {
        src: '/static/img/hero/weibo.png',
        name: '韦伯',
        alis: 'Webber',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Webber.jpg'
      },
      {
        src: '/static/img/hero/woli.png',
        name: '沃利',
        alis: 'Warly',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Warly.png'
      },
      {
        src: '/static/img/hero/weierbo.png',
        name: '威尔伯',
        alis: 'Wilbur',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Wilbur.png'
      },
      {
        src: '/static/img/hero/mtcz.png',
        name: '木腿船长',
        alis: 'Woodlegs',
        topImg: 'http://img.fireleaves.cn/SomeLabel/Woodlegs.png'
      },
      {
        src: '/static/img/hero/winona.png',
        name: '薇诺娜',
        alis: 'Winona',
        topImg: 'http://fireleaves.cn/staveImg/winona.png'
      }]
    }
  },
  onLoad (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#009688',
      animation: {
        duration: 300,
        timingFunc: 'easeIn'
      }
    })
    wx.setNavigationBarTitle({
      title: '人物介绍'
    })
    this.type = options.type
  },
  async mounted () {
    const result = await this.$http.get(`https://www.fireleaves.cn/${this.type}`)
    this.heros = result.data
    this.hero = this.heros[0]
    console.info(this.hero, 'mish hero')
  },
  methods: {
    showSelectHero () {
      this.isSelect = true
    },
    selectHero (index) {
      this.heroIndex = index
      this.isSelect = false
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-intro {
  .hero {
    .top-picture {
      position: relative;
      text-align: center;
      .picture {
        position: relative;
        width: 50%;
      }
      .shade {
        position: absolute;
        top: 0;
        height: 270px;
        width: 100%;
        background: radial-gradient(rgba(255, 255, 255, 0) 6%, rgba(0, 0, 0, 0.9) 80%);
      }
      .hero-message {
        position: absolute;
        bottom: 15px;
        left: 15px;
        color: white;
        font-size: 14px;
        text-align: left;
        .name {
          font-size: 18px;
          margin-bottom: 4px;
        }
        .motto {
          padding-left: 10px;
          color: #d3d7d4;
          border-left: 4px solid #4f5555;
        }
      }
    }
    .content-body {
      margin: 20px 30px;
      padding: 10px;
      // border: 1px solid #DCDFE6;
      box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
      border-radius: 4px;
      .program {
        font-size: 18px;
        font-weight: bold;
      }
      rich-text {
        font-size: 15px;
        letter-spacing: 4px;
      }

    }
  }
  .select-button {
    position: absolute;
    top: 30px;
    right: 30px;
  }
  .select-hero {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.3);
    .hero-list {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
      height: 58%;
      overflow: scroll;
      background-color: white;
      border-radius: 4px;
      .title {
        padding-left: 10px;
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #DCDFE6;
        font-size: 12px;
        box-sizing: content-box;
      }
      .hero-item {
        margin: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-flow: nowrap row;
        align-items: center;
        font-size: 13px;
        text-align: center;
        border-bottom: 1px solid #DCDFE6;
        .picture {
          width: 48px;
        }
        .item-name {
          text-align: left;
          .english-name {
            font-size: 12px;
            padding-top: 5px;
            color: gray;
          }
        }
      }
    }
  }
}
</style>
