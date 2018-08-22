/*
 * @Author: chenxu
 * @Date: 2018-08-14 19:36:50
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 19:54:53
 */
<template>
  <div class="common-detail">
    <div class="console" v-if="reason && (type === 15 || type === 16 || type === 27)">
      <div class="key">影响理智:</div>
      <div class="value">{{reason}}</div>
    </div>
    <div class="console" v-if="warm && type === 16">
      <div class="key">保暖:</div>
      <div class="value">{{warm}}</div>
    </div>
    <div class="console" v-if="moistureCloth && type === 16">
      <div class="key">防潮:</div>
      <div class="value">{{moistureCloth}}</div>
    </div>
    <div class="console" v-if="heat && type === 16">
      <div class="key">隔热:</div>
      <div class="value">{{heat}}</div>
    </div>
    <div class="console" v-if="defense && (type === 12 || type === 16 || type === 27)">
      <div class="key">防御:</div>
      <div class="value">{{defense}}</div>
    </div>
    <div class="console" v-if="moisture && type === 12">
      <div class="key">防潮:</div>
      <div class="value">{{moisture}}</div>
    </div>
    <div class="console" v-if="console">
      <div class="key"> 生成代码：</div>
      <div class="value">{{console}}</div>
    </div>
    <div class="description">
      <h3 class="title">介绍</h3>
      <!-- <p class="content">{{desc}}</p> -->
      <div v-html="desc" class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    console: {
      type: String,
      default () {
        return ''
      }
    },
    desc: {
      type: String,
      default () {
        return ''
      }
    },
    // 防御力
    defense: {
      type: Number,
      default () {
        return 0
      }
    },
    // 防潮力
    moisture: {
      type: Number,
      default () {
        return 0
      }
    },
    type: {
      type: Number,
      default () {
        return 0
      }
    },
    // 影响理智
    reason: {
      type: Number,
      default () {
        return 0
      }
    },
    // 隔热
    heat: {
      type: Number,
      default () {
        return 0
      }
    },
    // 衣物防潮
    moistureCloth: {
      type: Number,
      default () {
        return 0
      }
    },
    // 保暖
    warm: {
      type: Number,
      default () {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.common-detail {
  .description {
    .title {
      font-size: 16px;
      font-weight: 600;
      text-align: left;
    }
    .content {
      padding: 12px 12px 12px 0;
      color: #333;
      font-size: 14px;
      text-align: left;
    }
  }
  .console {
    align-items: center;
    margin-bottom: 12px;
    padding-right: 12px;
    height: 36px;
    border-radius: 4px;
    border-left: 4px solid #666;
    background-color: #f9f9f9;
    color: #999;
    font-size: 14px;
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-between;
    .key {
      padding-left: 10px;
    }
    .value {
      color: #333;
    }
  }
}
</style>
