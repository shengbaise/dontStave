/*
 * @Author: chenxu
 * @Date: 2018-08-15 14:36:45
 * @Last Modified by: chenxu
 * @Last Modified time: 2018-08-15 14:45:02
 */
<template>
  <div class="detail-container">
    <div class="detail">
      <!-- <slot></slot> -->
      kkkkkkkkkkkkkkkkkkkkkkk
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-container {
  padding: 12px;
  .detail {
    position: relative;
    padding: 24px 24px 0 24px;
    background-color: #fff;
    border-radius: 6px;
    min-height: 30vh;
    border: 1px solid #e0e0e0;
    box-shadow: inset 0 4px 8px #e0e0e0;
    .attr-text {
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
}
</style>
