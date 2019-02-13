/*
 * @Author: chenxu
 * @Date: 2018-08-13 17:25:27
 * @Last Modified by: chenxu
 * @Last Modified time: 2019-02-13 20:42:33
 */
<template>
  <div class="common-good" @click="toDetail()">
    <div class="good-img-container">
      <img class="background-image" src="/static/img/home/chacter2.png" alt="" mode="aspectFit">
      <img class="good-img" :src="good.src" alt="" mode="aspectFit">
    </div>
    <div class="desciption">
      <div class="name">{{good.name}}</div>
      <div class="alis">{{good.alis}}</div>
      <div v-if="good.attr && (type === 'science' || good.type === 34)" class="attrs">
        <div><span class="aggressivity">攻击力：</span>{{good.attr[0]}}</div>
        <div><span class="durable">耐久：</span>{{good.attr[1]}}</div>
      </div>
      <div v-if="good.attr && type === 'recipe'" class="food-attrs">
        <div class="food-attr" v-for="(foodAttrImg, index) in foodAttrImgs" :key="index">
          <img class="food-attr-img" :src="foodAttrImg" alt="" mode="aspectFit">
          <div class="attr-content" v-if="good.attr[index] > 10000">无限</div>
          <div class="attr-content" v-else>{{good.attr[index]}}</div>
        </div>
      </div>
      <div v-if="good.attr && type === 'animal'" class="animal-attrs">
        <div>
          <span class="hurt">伤害：<span v-show="good.attr[0] || good.attr[0] === 0">{{good.attr[0]}} </span></span>
          <span class="live">生命值：<span v-show="good.attr[1] || good.attr[1] === 0">{{good.attr[1]}}</span></span>
        </div>
        <div class="speed" v-if="hasSpeed">
          <span class="speed-item">行走速度：<span v-show="good.attr[2] || good.attr[2] === 0">{{good.attr[2]}} </span> </span>
          <span class="speed-item">奔跑速度：<span v-show="good.attr[3] || good.attr[3] === 0">{{good.attr[3]}}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uploadImg from '@/components/uploadImg'

export default {
  props: {
    hasSpeed: {
      type: Boolean,
      default: true
    },
    good: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: String,
      default () {
        return 'animal'
      }
    }
  },
  components: {
    uploadImg
  },
  data () {
    return {
      foodAttrImgs: [
        'http://img.fireleaves.cn/SomeLabel/image.jpg',
        'http://img.fireleaves.cn/SomeLabel/image%20%281%29.jpg',
        'http://img.fireleaves.cn/SomeLabel/image%20%282%29.jpg',
        '/static/img/food/notFresh.png'
      ]
    }
  },
  methods: {
    toDetail () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.common-good {
  position: relative;
  width: 100%;
  height: 130px;
  border-bottom: 1px solid #DCDFE6;
  .good-img-container {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 120px;
    height: 103px;
    // background-image: url(../../static/img/home/chacter2.png);
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .background-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 103px;
    }
    .good-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-height: 48px;
      min-width: 48px;
      max-width: 64px;
      max-height: 64px;
    }
  }
  .desciption {
    position: absolute;
    top: 12.5px;
    left: 145px;
    width: calc(100% - 145px);
    .name {
      font-size: 17px;
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
    .food-attrs {
      display: flex;
      flex-flow: nowrap row;
      .food-attr {
        margin-right: 12px;
        .food-attr-img {
          width: 20px;
          height: 20px;
          padding: 2px 12px;
        }
        .attr-content {
          text-align: center;
          font-size: 12px;
          padding: 2px 12px;
          color: #fff;
          background-color: #915842;
          border-radius: 4px;
        }
      }
    }
    .animal-attrs {
      font-size: 14px;
      color: #999;
      .speed {
        padding-top: 6px;
      }
      .speed-item, .hurt, .live {
        display: inline-block;
        padding-right: 14px;
      }
    }
  }
}
</style>
