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
@import "./static/font/iconfont.wxss";
@import "./static/wxss/common.wxss";
@import "./static/font_game/iconfont.wxss";

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
.common-materials {
  display: flex;
  justify-content: space-around;
  padding-bottom: 60px;
  font-size: 12px;
}
.materials {
  padding-top: 2px;
  padding-bottom: 18px;
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
  // align-items: center;
}
.material-item {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 30px;
  font-size: 12px;
}
.material {
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  font-size: 16px;
  .material-img {
    height: 36px;
    width: 36px;
  }
  .material-img-tool {
    width: 32px;
  }
}
.top {
  height: 32px;
  margin-top: -12px;
  margin-right: -12px;
  text-align: right;
  .top-tip {
    color: #999;
    font-size: 12px;
  }
  .top-img {
    width: 32px;
  }
}
.no-data, .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #999;
}
.switch {
  position:absolute;
  padding:12px 24px;
  top:0;
  right:0;
  height:32rpx;
  width:32rpx;
}
.select-sort {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.3);
  .sort-list {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
    // height: 40%;
    overflow: scroll;
    background-color: white;
    border-radius: 4px;
    .title {
      padding: 16px 0 12px 10px;
      border-bottom: 1px solid #DCDFE6;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      box-sizing: content-box;
    }
    .sort-group {
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
      padding-bottom: 10px;
      padding-right: 25px;
    }
  }
}
.select-sort {
  radio .wx-radio-input{
    border-radius: 30rpx;
    height: 30rpx;
    width: 30rpx;
  }
}
</style>
