<!-- 机制 -->
<template>
  <div class="game-mechanism">
    <div class="role mechanism" @click="toDetail(0)">
      <i class="iconfont icon icon-xindiantu"></i>
      <section class="section">
        <h1 class="title">角色</h1>
        <p class="content">饱食度，血量，湿度 & 体温，中毒，人物解锁...</p>
      </section>
    </div>
    <div class="food mechanism" @click="toDetail(1)">
      <i class="iconfont icon icon-shiwu-"></i>
      <section class="section">
        <h1 class="title">食物</h1>
        <p class="content">营养度，优先级 & 温度，速度，照明...</p>
      </section>
    </div>
    <div class="mechanism nature" @click="toDetail(2)">
      <i class="iconfont icon icon-ziran-1"></i>
      <section class="section">
        <h1 class="title">自然</h1>
        <p class="content">昼夜，月相 & 四季，天气，气温</p>
      </section>
    </div>
    <div class="mechanism animal">
      <i class="iconfont icon icon-github"></i>
      <section class="section">
        <h1 class="title">动物</h1>
        <!--<p style="color:#666666;">仇恨，罪恶，习性 & 攻击间隔，理智影响(暂未开放)</p>-->
        <p class="content">暂未开放</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '游戏机制'
    })
  },
  methods: {
    toDetail (type) {
      wx.navigateTo({
        url: `/pages/gameMechanismDetail/main?type=${type}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.game-mechanism {
  background-color: #f5f5f5;
  padding: 12px 12px 0 12px;
  .mechanism {
    position: relative;
    width: calc(100% -24px);
    height: 133px;
    border-radius: 6px;
    box-shadow: 0 4px 8px #acacac;
    border: 1px solid #acacac;
    margin-bottom: 16px;
    .icon {
      position: absolute;
      font-size: 52px;
      left: 15%;
      top: 50%;
      transform: translateY(-50%);
    }
    .section {
      position: absolute;
      right: 10%;
      top: 50%;
      transform: translateY(-50%);
      width: 40%;
      text-align: center;
      .title {
        font-size: 20px;
        font-weight: 600;
      }
      .content {
        margin: 12px 0 0;
        font-size: 12px;
      }
    }
  }
  .role {
    background-image: linear-gradient(60deg,#29323c,#485563);
    .title {
      color: #d0d0d0;
    }
    .content {
      color: #999;
    }
    .icon {
      color: #fff;
    }
  }
  .food {
    background-image: linear-gradient(60deg,#8e0115,#b11c32);
    .title {
      color: #EBC76F;
    }
    .content {
      color:#CC704A
    }
    .icon {
      color: rgb(235, 199, 111);
    }
  }
  .nature {
    background-color: #8aa286;
    .title {
      color: white;
    }
    .content {
      color:#D5DED3;
    }
    .icon {
      color: #fff;
    }
  }
  .animal {
    background-color: #dcd9d4;
    background-image: linear-gradient(180deg,hsla(0,0%,100%,.5) 0,rgba(0,0,0,.5)),radial-gradient(at 50% 0,hsla(0,0%,100%,.1) 0,rgba(0,0,0,.5) 50%);
    background-blend-mode: soft-light,screen;
    .title {
      color: #333333;
    }
    .content {
      color: #666666;
    }
    .icon {
      color: rgb(33, 33, 33);
    }
  }
}
</style>
