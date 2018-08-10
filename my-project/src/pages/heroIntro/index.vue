/*
 * @Author: chenxu
 * @Date: 2018-08-09 15:04:43
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-09 19:49:30
 */
<template>
  <div class="hero-intro">
    <div class="hero">
      <div class="top">
        <img class="picture" src="https://images.weserv.nl/?url=img1.gamersky.com/upimg/pic/2017/04/13/201704131635077821_tiny.jpg" alt="" mode="widthFix">
        <div class="shade"></div>
        <div class="hero-message" v-if="hero._id">
          <div class="name">{{hero.name}}</div>
          <div class="motto">{{hero.motto}}</div>
          <div class="attr">饥饿： {{hero.attr[0]}} 生命： {{hero.attr[1]}} 精神： {{hero.attr[2]}}</div>
          <div class="hurt">空手伤害： {{hero.attr[3]}}</div>
        </div>
      </div>
      <div class="content-body">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: '',
      hero: {},
      heros: []
    }
  },
  onLoad (options) {
    this.type = options.type
  },
  async mounted () {
    const result = await this.$http.get(`${this.inline}/${this.type}`)
    this.heros = result.data
    this.hero = this.heros[0]
    console.info(this.hero, 'dddddddddddddd')
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.hero-intro {
  .hero {
    .top {
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
          padding-left: 15px;
          // color: #4f5555;
          border-left: 3px solid #4f5555;
        }
      }
    }
  }
}
</style>
