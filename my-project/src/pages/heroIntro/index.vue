/*
 * @Author: chenxu
 * @Date: 2018-08-09 15:04:43
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-12-23 18:13:28
 */
<template>
  <div class="hero-intro">
    <scroll-view :scroll-y="true" class="hero">
      <div class="top-picture">
        <img class="picture" v-if="currentHero.src" :src="currentHero.src" alt="" mode="aspectFit">
        <div class="shade"></div>
        <div class="hero-message" v-if="currentHero._id">
          <div class="name">{{currentHero.name}}</div>
          <div class="motto">{{currentHero.motto}}</div>
          <div class="attr">饥饿： {{currentHero.attr[0]}} 生命： {{currentHero.attr[1]}} 精神： {{currentHero.attr[2]}}</div>
          <div class="hurt">空手伤害： {{currentHero.attr[3]}}倍</div>
        </div>
      </div>
      <div class="content-body" v-if="currentHero.src">
        <h3 class="program">简介</h3>
        <div class="ability" v-html="currentHero.ability"></div>
      </div>
    </scroll-view>
    <div class="select-version-button" @click.stop.prevent="showSelectHero()">
      <img class="switch-icon" src="/static/icon/switch.png" alt="" mode="aspectFit">
    </div>
    <div class="select-hero" v-show="isSelect" @click.stop.prevent="isSelect = false">
      <div class="hero-list" @click.stop.prevent>
        <div class="title">选择角色</div>
        <div class="hero-item" v-for="item in heroList" :key="item.alis" @click="setCurrentHero(item._id)">
          <img class="picture" :src="item.avatarSrc" alt="" mode="widthFix">
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
      imgIndex: 0,
      heroIndex: 0,
      isSelect: false,
      type: '',
      heroList: [],
      currentHero: {}
    }
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '人物介绍'
    })
    this.type = options.type
  },
  async mounted () {
    const result = await this.$http.get(`/${this.type}`)
    console.info(result.data, 'data')
    this.heroList = result.data
    this.setCurrentHero(this.heroList[0]._id)
  },
  methods: {
    async setCurrentHero (id) {
      const hero = await this.$http.get('hero/single', {
        id: id
      })
      this.currentHero = hero.data
      /* eslint-disable */
      this.currentHero.ability = this.currentHero.ability.replace(/\<h3/g, '<h3 style="line-height: 48px;letter-spacing: normal;margin-bottom: 16px;font-size: 20px;color: #333;border-bottom: 1px solid #e0e0e0;"').replace(/\<p/g, '<p style="text-align: justify;font-size: 14px;color: #333;letter-spacing: 2px;"').replace(/\<li/g, '<li style="margin-bottom: 4px;color: #333;"')
      this.isSelect = false
    },
    showSelectHero () {
      this.isSelect = true
    },
    selectHero (name, index) {
      this.imgIndex = index
      this.heroIndex = this.heros.findIndex(item => item.name === name) || 0
      this.isSelect = false
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-intro {
  height: 100%;
  width: 100%;
  .hero {
    position:absolute;
    height:100%;
    top:0;
    overflow-y:scroll;
    .top-picture {
      position: relative;
      text-align: center;
      .picture {
        position: relative;
        // width: 50%;
        height: 250px;
      }
      .shade {
        position: absolute;
        top: 0;
        height: 250px;
        width: 100%;
        background: radial-gradient(rgba(255, 255, 255, 0) 6%, rgba(0, 0, 0, 0.9) 80%);
        box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
      }
      .hero-message {
        position: absolute;
        bottom: 30px;
        left: 15px;
        color: white;
        font-size: 14px;
        text-align: left;
        .name {
          font-size: 18px;
          margin-bottom: 4px;
        }
        .motto {
          margin: 4px 0;
          padding-left: 10px;
          font-size: 14px;
          color: #d6d6d6;
          border-left: 4px solid #d6d6d6;
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
        font-size: 20px;
        font-weight: 600;
        color: #333;
        border-width: thin;
        border-bottom: 1px solid #e0e0e0;
        line-height: 48px;
        letter-spacing: normal;
        margin-bottom: 16px;
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
          padding-left: 12px;
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
  .ability {
    font-size: 14px;
  }
  .select-version-button {
    position: absolute;
    background-color: #009688;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    right: 20px;
    bottom: 20px;
    .switch-icon {
      height:24px;
      width:24px;
    }
  }
}
</style>
