// function formatNumber (n) {
//   const str = n.toString()
//   return str[1] ? str : `0${str}`
// }

export const getCurrentDay = () => {
  // 获取当前时间
  const date = new Date()
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
  if (['G', 'N'].indexOf(src[0]) > -1) {
    urlParam = 'animReward'
  }
  if (['A'].indexOf(src[0]) > -1) {
    urlParam = 'Creatures'
  }
  return `http://img.fireleaves.cn/${urlParam}/${src}.png`
}

// export default {
//   formatNumber,
//   formatTime,
//   getImgDetail
// }
