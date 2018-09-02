function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
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
