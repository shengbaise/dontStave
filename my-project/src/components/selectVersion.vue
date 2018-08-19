<template>
  <div class="select-version">
    <div class="version-list">
      <div class="title">版本选择</div>
      <radio-group class="version-group" @bindchange="radioChange">
        <label class="radio" v-for="(item, index) in items" :key="index">
          <input class="input-item" type="radio" :value="item.name" :checked="item.checked"/>{{item.value}}
        </label>
      </radio-group>
      <div class="ok">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {name: 'DST', value: '联机版(DST)', checked: 'true'},
        {name: 'DS', value: '单机版(DS)'},
        {name: 'ROG', value: '巨人统治(ROG)'},
        {name: 'SW', value: '船难(SW)'}
      ]
    }
  },
  methods: {
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
    }
  }
}
</script>
<style lang="scss">
.select-version {
  radio .wx-radio-input{
    border-radius: 30rpx;
    height: 30rpx;
    width: 30rpx;
  }
}
</style>
<style scoped lang="scss">
.select-version {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.3);
  .version-list {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
    height: 40%;
    overflow: scroll;
    background-color: white;
    border-radius: 4px;
    .title {
      padding-left: 10px;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #DCDFE6;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      box-sizing: content-box;
    }
    .version-group {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .radio {
        padding: 12px;
        padding-bottom: 0;
        color: rgba(0,0,0,.54);
      }
    }
    .ok {
      text-align: right;
      color: #43a047;
      font-size: 14px;
      padding-top: 15px;
      padding-right: 25px;
    }
  }
}
</style>
