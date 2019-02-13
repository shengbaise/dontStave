<!-- 地理奇遇 -->
<template>
  <div class="geographically-adventures">
    <img class="banner-img" :src="item.imgSrc" alt="" mode="widthFix">
    <div class="resource" v-if="item.type === 'map'">
      <div class="no-rare-container">
        <div class="resource-large">
          <p class="title">丰富资源</p>
          <div class="imgs">
            <img v-for="(src, index) in large" :src="src" alt="" :key="index" mode="widthFix">
          </div>
        </div>
        <div class="see-occasionally">
          <p class="title">偶见资源</p>
          <div class="imgs">
            <img v-for="(src, index) in common" :src="src" alt="" :key="index" mode="widthFix">
          </div>
        </div>
      </div>
      <div class="rare-container">
        <p class="title">稀有资源</p>
        <div class="imgs">
          <img v-for="(src, index) in rare" :src="src" alt="" :key="index" mode="widthFix">
        </div>
      </div>
    </div>
    <div class="article">
      <p class="name">{{item.name}}</p>
      <section v-html="content" class="desc"></section>
    </div>
  </div>
</template>

<script>
import { shareApp } from '@/utils/index.js'

export default {
  data () {
    return {
      item: {},
      url: 'http://fireleaves.cn/staveImg/',
      content: '',
      large: {},
      common: {},
      rare: {}
    }
  },
  onShareAppMessage (res) {
    return shareApp(res)
  },
  methods: {
    /* eslint-disable */
    imgArr (val) {
      return val.map(function (val) {
        switch (val) {
          case 'bhs': //白桦树
             return "http://fireleaves.cn/staveImg/bhshu.png";
              break;
          case 'yhc': //萤火虫
              return "http://fireleaves.cn/staveImg/231.png"
              break;
          case 'mglei': //蘑菇
              return "http://fireleaves.cn/staveImg/mglei.png"
              break;
          case 'ksz': //空树桩
              return "http://fireleaves.cn/staveImg/kszhuang.png"
              break;
          case 'shuzhi': //树枝
              return "http://fireleaves.cn/staveImg/shuzhi.png"
              break;
          case 'jgcong':  //浆果丛
              return "http://fireleaves.cn/staveImg/jgcong.png"
              break;
          case 'ysd':  //鼹鼠洞
              return "http://fireleaves.cn/staveImg/ysdong.png"
              break;
          case 'hua':  //花
              return "http://fireleaves.cn/staveImg/421.png"
              break;
          case 'dzshu':  //多枝树
              return "http://fireleaves.cn/staveImg/dzshu.png"
              break;
          case 'mzjgc':  //蜜汁浆果丛
              return "http://fireleaves.cn/staveImg/mzjgc.png"
              break;
          case 'cnm':  //草泥马
              return "http://fireleaves.cn/staveImg/xiaocnm.png"
              break;
          case 'cao':
              return "http://fireleaves.cn/staveImg/170.png"
              break;
          case 'glm':  //咕噜米
               return "http://fireleaves.cn/staveImg/glmi.png"
              break;
          case 'juli':  //岩石
              return "http://fireleaves.cn/staveImg/juli.png"
              break;
          case 'klsddz':  //坎普斯的包裹
              return "http://fireleaves.cn/staveImg/klsddz.png"
              break;
          case 'tujiu':  //秃鹫
              return "http://fireleaves.cn/staveImg/tujiu.png"
              break;
          case 'xrz':  //仙人掌
              return "http://fireleaves.cn/staveImg/xrzhang.png"
              break;
          case 'yanshi':  //岩石
              return "http://fireleaves.cn/staveImg/yanshi.png"
              break;
          case 'gouwo':
              return "http://fireleaves.cn/staveImg/fgcao.png"
              break;
          case 'gutou':
              return "http://fireleaves.cn/staveImg/gutou.png"
              break;
          case 'jingji':
              return "http://fireleaves.cn/staveImg/jingji.png"
              break;
          case 'chitang':
              return "http://fireleaves.cn/staveImg/chitang.png"
              break;
          case 'xiaodianyang':
              return "http://fireleaves.cn/staveImg/xiaodianyang.png"
              break;
          case 'cqshu':
              return "http://fireleaves.cn/staveImg/cqshu.png"
              break;
          case 'fengcao':
              return "http://fireleaves.cn/staveImg/fengcao.png"
              break;
          case 'gjnc':
              return "http://fireleaves.cn/staveImg/gjnc.png"
              break;
          case 'hmgu':
              return "http://fireleaves.cn/staveImg/hmgu.png"
              break;
          case 'hongmgs':
              return "http://fireleaves.cn/staveImg/hongmgs.png"
              break;
          case 'jianshu':
              return "http://fireleaves.cn/staveImg/jianshu.png"
              break;
          case 'lanmgs':
              return "http://fireleaves.cn/staveImg/lanmgs.png"
              break;
          case 'lanmogu':
              return "http://fireleaves.cn/staveImg/lanmogu.png"
              break;
          case 'lmgu':
              return "http://fireleaves.cn/staveImg/lmgu.png"
              break;
          case 'lvmgs':
              return "http://fireleaves.cn/staveImg/lvmgs.png"
              break;
          case 'lwcao':
              return "http://fireleaves.cn/staveImg/lwcao.png"
              break;
          case 'mbxiang':
              return "http://fireleaves.cn/staveImg/mbxiang.png"
              break;
          case 'mbyan':
              return "http://fireleaves.cn/staveImg/mbyan.png"
              break;
          case 'mubei':
              return "http://fireleaves.cn/staveImg/mubei.png"
              break;
          case 'mylx':
              return "http://fireleaves.cn/staveImg/mylx.png"
              break;
          case 'pxwo':
              return "http://fireleaves.cn/staveImg/pxwo.png"
              break;
          case 'qblj':
              return "http://fireleaves.cn/staveImg/qblj.png"
              break;
          case 'shadui':
              return "http://fireleaves.cn/staveImg/shadui.png"
              break;
          case 'shisun':
              return "http://fireleaves.cn/staveImg/shisun.png"
              break;
          case 'xiaocnm':
              return "http://fireleaves.cn/staveImg/xiaocnm.png"
              break;
          case 'xiaocs':
              return "http://fireleaves.cn/staveImg/xiaocs.png"
              break;
          case 'xiaodxzz':
              return "http://fireleaves.cn/staveImg/xiaodxzz.png"
              break;
          case 'xiaogjn':
              return "http://fireleaves.cn/staveImg/xiaogjn.png"
              break;
          case 'xiaoheiniao':
              return "http://fireleaves.cn/staveImg/xiaoheiniao.png"
              break;
          case 'xiaohongniao':
              return "http://fireleaves.cn/staveImg/xiaohongniao.png"
              break;
          case 'xiaoniu':
              return "http://fireleaves.cn/staveImg/xiaoniu.png"
              break;
          case 'xiaoslx':
              return "http://fireleaves.cn/staveImg/xiaoslx.png"
              break;
          case 'xiaosrf':
              return "http://fireleaves.cn/staveImg/xiaosrf.png"
              break;
          case 'xiaozz':
              return "http://fireleaves.cn/staveImg/xiaozz.png"
              break;
          case 'xjshu':
              return "http://fireleaves.cn/staveImg/xjshu.png"
              break;
          case 'xrzhang':
              return "http://fireleaves.cn/staveImg/xrzhang.png"
              break;
          case 'xyren':
              return "http://fireleaves.cn/staveImg/xyren.png"
              break;
          case 'yrwu':
              return "http://fireleaves.cn/staveImg/yrwu.png"
              break;
          case 'ysdong':
              return "http://fireleaves.cn/staveImg/ysdong.png"
              break;
          case 'yuanshi':
              return "http://fireleaves.cn/staveImg/yuanshi.png"
              break;
          case 'srfc':
              return "http://fireleaves.cn/staveImg/srfc.png"
              break;
          case 'yzwu':
              return "http://fireleaves.cn/staveImg/yzwu.png"
              break;
          case 'zhshu':
              return "http://fireleaves.cn/staveImg/zhshu.png"
              break;
          case 'zzluan':
              return "http://fireleaves.cn/staveImg/zzluan.png"
              break;
          case 'suizhi':
              return "http://fireleaves.cn/staveImg/244.png"
              break;
          case 'hlb':
              return "http://fireleaves.cn/staveImg/hlb.png"
              break;
          case 'mifeng':
              return "http://fireleaves.cn/staveImg/347.png"
              break;
          case 'hudie':
              return "http://fireleaves.cn/staveImg/hudie.png";
              break;
          case 'tuzi':
              return "http://fireleaves.cn/staveImg/Rabbit.png";
              break;
          case 'jinkuai':
              return "http://fireleaves.cn/staveImg/279.png";
              break;
          case 'suishi':
              return "http://fireleaves.cn/staveImg/244.png";
              break;
          case 'bianbian':
              return "http://fireleaves.cn/staveImg/435.png";
              break;
          case 'jinkuang':
              return "http://fireleaves.cn/staveImg/jinkuang.png";
              break;
          case 'bzzhu':
              return "http://fireleaves.cn/staveImg/bzzhu.png";
              break;
          case 'cpdcljq':
              return "http://fireleaves.cn/staveImg/cpdcljq.png";
              break;
          case 'dxjz':
              return "http://fireleaves.cn/staveImg/dxjz.png";
              break;
          case 'hlxz':
              return "http://fireleaves.cn/staveImg/hlxz.png";
              break;
          case 'mydz':
              return "http://fireleaves.cn/staveImg/mydz.png";
              break;
          case 'tlqiang':
              return "http://fireleaves.cn/staveImg/tlqiang.png";
              break;
          case 'xiaoygxn':
              return "http://fireleaves.cn/staveImg/xiaoygxn.png";
              break;
          case 'ygdx':
              return "http://fireleaves.cn/staveImg/ygdx.png";
              break;
          case 'yghua':
              return "http://fireleaves.cn/staveImg/yghua.png";
              break;
          case 'ygwkxjd':
              return "http://fireleaves.cn/staveImg/ygwkxjd.png";
              break;
          case 'zrfz':
              return "http://fireleaves.cn/staveImg/zrfz.png";
              break;
          }
        })
    }
  },
  onLoad (options) {
    this.item = JSON.parse(options.item)
    if (this.item.type === 'map') {
      this.large = this.imgArr(this.item.large)
      this.common = this.imgArr(this.item.common)
      this.rare = this.imgArr(this.item.rare)
    }

    /* eslint-disable */
    this.content = this.item.desc.replace(/\<p/g, '<p style="letter-spacing: 2px;margin-top: 16px;" mode="aspectFit"')
    /* eslint-enable */
  }
}
</script>
<style>
page {
  height: 100%;
  width: 100%;
  background-color: #37474f;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>
<style lang="scss" scoped>
.geographically-adventures {
  background-color: #37474f;
  height: 100%;
  .banner-img {
    width: 100%;
  }
  .article {
    padding: 24px;
    color: #e0e0e0;
    background-color: #37474f;
    .name {
      padding-bottom: 8px;
      font-size: 20px;
      border-bottom: 1px solid #58626b;
    }
    .desc {
      font-size: 14px;
    }
  }
  .resource {
    margin-top: -10px;
    color: #999;
    font-size: 12px;
    display: flex;
    flex-flow: nowrap row;
    .title {
      padding-bottom: 10px;
    }
    .no-rare-container {
      display: flex;
      flex-flow: nowrap column;
      flex: 1;
      .resource-large {
        padding: 8px;
        background-color: #282a36;
      }
      .see-occasionally {
        padding: 8px;
        background-color: rgb(88, 98, 107);
      }
    }
    .rare-container {
      width: 30%;
      padding: 8px;
      background-color: #334347;
    }
  }
  .imgs {
    display: flex;
    flex-flow: wrap row;
    align-items: center;
    img {
      margin-left: 3px;
      margin-bottom: 3px;
      height: 32px;
      width: 32px;
    }
  }
}
</style>
