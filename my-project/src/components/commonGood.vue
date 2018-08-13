/*
 * @Author: chenxu
 * @Date: 2018-08-13 17:25:27
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-13 17:31:02
 */
<template>
  <div class="common-good">
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
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      default () {
        return {}
      }
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
    width: 126px;
    height: 106px;
    background-image: url(../../static/img/home/chacter2.png);
    .good-img {
      width: 48px;
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
  }
}
</style>
