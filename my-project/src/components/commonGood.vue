/*
 * @Author: chenxu
 * @Date: 2018-08-13 17:25:27
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 17:16:44
 */
<template>
  <div class="common-good" @click="toDetail()">
    <div class="good-img-container">
      <img class="good-img" :src="good.src" alt="" mode="widthFix">
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
          <img class="food-attr-img" :src="foodAttrImg" alt="" mode="widthFix">
          <div class="attr-content">{{good.attr[index]}}</div>
        </div>
      </div>
      <div v-if="good.attr && type === 'animal'" class="animal-attrs">
        <div>
          <span>伤害：{{good.attr[0]}} </span>
          <span>生命值：{{good.attr[1]}}</span>
        </div>
        <div class="speed">
          <span>行走速度：{{good.attr[2]}} </span>
          <span>奔跑速度：{{good.attr[3]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      foodAttrImgs: [
        'https://images.weserv.nl/?url=img1.gamersky.com/image2015/12/20151211zh_4/image002_S.jpg',
        'https://images.weserv.nl/?url=img1.gamersky.com/image2015/12/20151211zh_4/image004_S.jpg',
        'https://images.weserv.nl/?url=img1.gamersky.com/image2015/12/20151211zh_4/image006_S.jpg',
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
  display: flex;
  flex-flow: nowrap row;
  padding: 10px;
  border-bottom: 1px solid #DCDFE6;
  .good-img-container {
    position: relative;
    width: 126px;
    height: 106px;
    background-image: url(../../static/img/home/chacter2.png);
    .good-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 68px;
    }
  }
  .desciption {
    margin-left: 15px;
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
      justify-content: center;
      .food-attr {
        margin-right: 12px;
        .food-attr-img {
          width: 20px;
          padding: 2px 12px;
        }
        .attr-content {
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
    }
  }
}
</style>
