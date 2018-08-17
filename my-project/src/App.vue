<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('123app created and cache logs by setStorageSync')
  }
}
</script>

<style lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
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
