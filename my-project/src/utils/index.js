// function formatNumber (n) {
//   const str = n.toString()
//   return str[1] ? str : `0${str}`
// }

export const formatDate = (time) => {
  // 获取当前时间
  const date = time ? new Date(parseInt(time)) : new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  const nowDate = year + '-' + month + '-' + day
  return nowDate
}

/* eslint-disable */
export const isEmail = (email) => {
  return RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(email)
}
/* eslint-enable */

export const isPhone = (phone) => {
  return RegExp(/^1[34578]\d{9}$/.test(phone))
}

export const getImgDetail = (src) => {
  let detailItem = ''
  const characters = src.split('/')
  const character = characters[characters.length - 1][0]
  const natureArray = ['G']
  const recipeArray = ['F']
  const scienceTechnologys = ['S']
  const animInfos = ['A']

  if (natureArray.indexOf(character) > -1) {
    detailItem = 'natureInfoDetail'
    return detailItem
  }
  if (recipeArray.indexOf(character) > -1) {
    detailItem = 'recipeDetail'
    return detailItem
  }
  if (scienceTechnologys.indexOf(character) > -1) {
    detailItem = 'scienceTechnologyDetail'
    return detailItem
  }
  if (animInfos.indexOf(character) > -1) {
    detailItem = 'animInfoDetail'
    return detailItem
  }

  return detailItem
}

export const formatUrl = (src) => {
  let urlParam = ''
  if (['S'].indexOf(src[0]) > -1) {
    urlParam = 'Sciences'
  }
  if (['F'].indexOf(src[0]) > -1) {
    urlParam = 'Foods'
  }
  if (['N'].indexOf(src[0]) > -1) {
    urlParam = 'Creatures'
  }
  if (['A', 'G'].indexOf(src[0]) > -1) {
    urlParam = 'animReward'
  }
  return `http://img.fireleaves.cn/${urlParam}/${src}.png`
}

export const getDetailItem = (comp) => {
  let urlParam = ''
  let src = ''
  if (['S'].indexOf(comp[0]) > -1) {
    urlParam = 'scienceTechnologyDetail'
    src = `http://img.fireleaves.cn/Sciences/${comp}.png`
  }
  if (['F'].indexOf(comp[0]) > -1) {
    urlParam = 'recipeDetail'
    src = `http://img.fireleaves.cn/Foods/${comp}.png`
  }
  if (['G'].indexOf(comp[0]) > -1) {
    urlParam = 'natureInfoDetail'
    src = `http://img.fireleaves.cn/animReward/${comp}.png`
  }
  if (['A'].indexOf(comp[0]) > -1) {
    urlParam = 'animInfoDetail'
    src = `http://img.fireleaves.cn/Creatures/${comp}.png`
  }
  return {urlParam, src}
}

export const shareApp = (res) => {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: '掌上饥荒',
    path: '/pages/index/main',
    imageUrl: 'http://img.fireleaves.cn/SomeLabel/share.png'
  }
}

// export default {
//   formatNumber,
//   formatTime,
//   getImgDetail
// }
