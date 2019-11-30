const arr = {
  'MODEL_TYPES': [
    {
      tabImgUrl: '/static/img/home/entry-icon-chacter.png',
      name: '人物',
      toPath: 'heroIntro',
      type: 'hero'
    }, {
      tabImgUrl: '/static/img/home/entry-icon-thing.png',
      name: '科技',
      toPath: 'science',
      type: 'materials?version=DST'
    }, {
      tabImgUrl: '/static/img/home/entry-icon_food.png',
      name: '食谱',
      toPath: 'recipe',
      type: 'food?version=DST'
    }, {
      tabImgUrl: '/static/img/home/entry-icon_anim.png',
      name: '生物',
      toPath: 'animInfo',
      type: 'anim?version=DST'
    }, {
      tabImgUrl: '/static/img/home/entry-icon_nature.png',
      name: '自然',
      toPath: 'natureInfo',
      type: 'nature?version=DST'
    }, {
      tabImgUrl: '/static/img/home/entry-icon_rule.png',
      name: '机制',
      toPath: 'gameMechanism',
      type: ''
    }, {
      tabImgUrl: '/static/img/home/map_intro.png',
      name: '地理',
      toPath: 'geography',
      type: ''
    }
    // {
    //   tabImgUrl: '/static/img/home/activity.png',
    //   name: '活动',
    //   toPath: 'activity',
    //   type: ''
    // }
  ],
  'ARTICLE_TYPES': [
    {
      type: 0,
      label: '全部'
    }, {
      type: 1,
      label: '科普攻略'
    }, {
      type: 2,
      label: '生存技巧'
    }, {
      type: 3,
      label: '游戏更新'
    }, {
      type: 4,
      label: '官方公告'
    }, {
      type: 5,
      label: '其他'
    }
    // , {
    //   type: 6,
    //   label: '同人小说'
    // }
  ]
}

export const $c = (key) => {
  if (!key) return
  return arr[key]
}
