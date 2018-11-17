<!-- 地域列表 -->
<template>
  <div class="geographical-list">
    <div class="list">
      <div class="item" v-for="item in list" :key="item._id" 
      @click="toGeographicallyAdventures(item)">
        <!-- <div class="item-img-container"> -->
          <img class="item-img" :src="item.imgSrc" alt="" mode="widthFix">
        <!-- </div> -->
        <div class="item-description">
          <p class="name">{{item.name}}</p>
          <p class="short-desc">{{item.shortDesc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      type: 'map',
      list: [],
      data: [],
      total: 3
    }
  },
  async onLoad (options) {
    wx.setNavigationBarTitle({
      title: '地域列表'
    })
    const result = await this.$http.get(`https://www.fireleaves.cn/${options.type}`)
    this.data = result.data
    this.list = this.data
  },
  methods: {
    toGeographicallyAdventures (item) {
      wx.navigateTo({
        url: `/pages/geographicallyAdventures/main?item=${JSON.stringify(item)}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.geographical-list {
  position: relative;
  min-height: 100vh;
  padding: 30px 16px 16px 16px;
  background-color: #37474f;
  .item {
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    // padding: 10px 0;
    margin-bottom: 26px;
    .item-description {
      position: absolute;
      width: 100%;
      height: 30%;
      bottom: 0;
      border-bottom-right-radius: 6px;
      border-bottom-left-radius: 6px;
      background: linear-gradient(rgba(17, 17, 17, 0), rgba(17, 17, 17, 1));
      .name {
        margin-top: 10px;
        // padding-top: 12px;
        font-size: 14px;
        font-weight: 400;
        padding-left: 24px;
        padding-right: 12px;
        color: #fff;
        text-align: left;
      }
      .short-desc {
        padding-left: 24px;
        padding-right: 12px;
        color: #BBB;
        text-align: left;
        // margin-top: 10px;
        font-size: 12px;
      }
    }
  }
  .item-img-container {
    // width: 100%;
    // height: 150px;
    // display: inline-block;
    // background-color: red;
    // border-radius: 10px;
  }
  .item-img {
    width: 100%;
    border-radius: 6px;
  }
}
</style>
