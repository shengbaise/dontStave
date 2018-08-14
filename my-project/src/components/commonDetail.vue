/*
 * @Author: chenxu
 * @Date: 2018-08-14 19:36:50
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-14 19:54:53
 */
<template>
  <div class="common-detail">
    <div class="console">
      <div class="key"> 生成代码：</div>
      <div class="value">{{console}}</div>
    </div>
    <div class="description">
      <h3 class="title">介绍</h3>
      <p class="content">{{desc}}</p>
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
