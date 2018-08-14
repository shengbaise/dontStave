export const global = {
  data () {
    return {
      inline: 'https://www.fireleaves.cn',
      // inline : 'http://localhost:3000',
      apiLine: 'https://api.fireleaves.cn' // 接口地址
      // apiLine: "/devapi", // 接口地址
    }
  },
  created () {
    this.sleep = (millisecond) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('wake')
        }, millisecond)
      })
    }
  }
}
