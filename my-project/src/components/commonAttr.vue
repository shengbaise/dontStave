<template>
  <div class="common-attr" v-show="attrs.length > 0">
    <div v-for="(attr, index) in attrs" :key="index" class="attr-text">
      <div class="key">{{attr.key}}</div>
      <div class="value">{{attr.value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    console.info(this.attrs, 'mish attrs')
  }
}
</script>

<style scoped lang="scss">
.common-attr {
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
</style>
