Page({
  data: {
    visible: false,
    versionOptions: [
      {name: 'DST', value: '联机版(DST)'},
      {name: 'DS', value: '单机版(DS)'},
      {name: 'ROG', value: '巨人统治(ROG)'},
      {name: 'SW', value: '船难(SW)'},
      {name: 'HAMLET', value: '哈姆雷特(HAMLET)'}
    ],
    currentVersion: ''
  },
  handleOpen () {
    this.setData({
      visible: true,
      currentVersion: wx.getStorageSync('currentVersion') || 'DST'
    })
  },
  handleClose () {
    this.setData({
      visible: false
    })
  },
  okSelect () {
    wx.setStorageSync('currentVersion', this.data.currentVersion || 'DST')
    this.handleClose()
    this.triggerEvent('handle-select')
  },
  selectVersion (event) {
    const dataset = event.currentTarget.dataset
    const version = dataset.version
    this.setData({
      currentVersion: version
    })
  }
})
