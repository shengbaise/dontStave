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
  ],
  'FOOD_ATTR': [
    {
      url: 'http://img.fireleaves.cn/SomeLabel/image.jpg',
      attr: 'hungry'
    }, {
      url: 'http://img.fireleaves.cn/SomeLabel/image%20%281%29.jpg',
      attr: 'hp'
    }, {
      url: 'http://img.fireleaves.cn/SomeLabel/image%20%282%29.jpg',
      attr: 'san'
    }, {
      url: '/static/img/food/notFresh.png',
      attr: 'fresh'
    }
  ],
  SCIENCE_ATTRIBUTES: [
    {
      name: '防御',
      key: 'defense',
      unit: '' 
    },
    {
      name: '影响理智',
      key: 'san',
      unit: '/ 分钟' 
    },
    {
      name: '防潮',
      key: 'dampproof',
      unit: '' 
    },
    {
      name: '隔热',
      key: 'thermalInsulation',
      unit: '' 
    },
    {
      name: '保暖',
      key: 'keepWarm',
      unit: '' 
    }
  ],
  FOOD_ATTRIBUTES: [
    {
      name: '优先级',
      key: 'priority',
      unit: '' 
    },
    {
      name: '烹饪时间',
      key: 'cookingTime',
      unit: '' 
    },
    {
      name: '温度影响',
      key: 'temperature',
      unit: '' 
    }
  ],
  NATURE_ATTRIBUTES: [
    {
      name: '防御',
      key: 'defense',
      unit: '' 
    },
    {
      name: '影响理智',
      key: 'san',
      unit: '/ 分钟' 
    },
    {
      name: '防潮',
      key: 'dampproof',
      unit: '' 
    },
    {
      name: '隔热',
      key: 'thermalInsulation',
      unit: '' 
    },
    {
      name: '保暖',
      key: 'keepWarm',
      unit: '' 
    }
  ],
  ANIMAL_ATTRIBUTES: [
    {
      name: '攻击间隔',
      key: 'attackInterval',
      unit: '' 
    },
    {
      name: '攻击范围',
      key: 'attackRange',
      unit: '' 
    },
    {
      name: '主动攻击',
      key: 'isActiveAttack',
      unit: '',
      handleData: (value, item) => {
        return !!value ? '是' : '否'
      }
    },
    {
      name: '团队协作',
      key: 'isTeamWork',
      unit: '',
      handleData: (value, item) => {
        return !!value ? '是' : '否'
      }
    },
    {
      name: '影响理智',
      key: 'sanAffect',
      unit: '/ 分钟'
    }
  ],
  MODLE_NAME: [
    {
      value: 'materials',
      label: '制作'
    }, {
      value: 'foods',
      label: '食谱'
    }, {
      value: 'anims',
      label: '生物'
    }, {
      value: 'natures',
      label: '自然'
    }, {
      value: 'heros',
      label: '人物'
    }, {
      value: 'geographys',
      label: '地理'
    }
  ]
}

export const $c = (key) => {
  if (!key) return
  return arr[key]
}

export const $c2 = (arr, key) => {
  const item = arr.find(v => v.value === key)
  return item.label
}
