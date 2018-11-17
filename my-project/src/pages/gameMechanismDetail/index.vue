<template>
  <div class="game-mechanism-detail">
    <div class="mechainsm-list">
      <div class="item" :class="{ 'item-spread': currentIndex === index }" v-for="(item, index) in currentRules" :key="item.id">
        <div class="item-title" @click="retract()" v-if="currentIndex === index">
          <p class="title">{{item.header}}</p>
          <span class="retract"><i class="icon-shouqi iconfont icon"></i></span>
          <!-- <span @click="spread(index)" class="retract" v-else ><i class="icon-zhankai iconfont icon"></i></span> -->
        </div>
        <div class="item-title" v-else @click="spread(index)">
          <p class="title">{{item.header}}</p>
          <!-- <span class="retract" v-if="currentIndex === index" @click="retract()"><i class="icon-shouqi iconfont icon"></i></span> -->
          <span class="retract"><i class="icon-zhankai iconfont icon"></i></span>
        </div>
        <div class="desc" v-if="currentIndex === index">
          <p>{{item.desc}}</p>
          <div class="button" @click="toArticleDetail(item.id)">详细资料</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    /* eslint-disable */
    return {
      roleRule :[{
        header: "饥饿",
        desc : "“饥饿”是角色的基本属性之一，在游戏中以“胃”图标表示，它决定了角色是否挨饿。饥饿值一天下降75点。",
        id : "2018030501",
        isShow: false
      },
      {
        header: "生命",
        desc : "“生命”是角色的基本属性之一，在游戏中以“心”图标表示，它是唯一决定角色是否死亡的指标。",
        id : "2018030502",
        isShow: false
      },
      {
        header: "精神",
        desc : "“精神”是角色的基本属性之一，在游戏中以“脑”图标表示，它决定了角色的精神状态。",
        id : "2018030503",
        isShow: false
      },
      {
        header: "湿度",
        desc : "“湿度”是角色的基本属性之一，在游戏中以“雨滴”图标表示，它决定了角色的受潮状态。",
        id : "2018030504",
        isShow: false
      },
      {
        header: "速度",
        desc : "“速度”是角色的基本属性之一，在游戏Hud中无法看到具体数值，它决定了角色的移动速度。",
        id : "2018030505",
        isShow: false
      },
      {
        header: "体温",
        desc : "“体温”是角色的基本属性之一，在游戏中用数值表示(前提是启用mod)，它决定了角色的温度状态。",
        id : "2018030506",
        isShow: false
      },
      {
        header: "冻结",
        desc : "“冻结”是一种状态，角色体温值低于0°时或者因为湿度值过大感知温度低于0°时就会进入冻结状态。",
        id : "2018030507",
        isShow: false
      },
      {
        header: "过热",
        desc : "“过热”是一种状态，角色体温值高于70°时就会进入过热状态。",
        id : "2018030508",
        isShow: false
      },
      {
        header: "中毒",
        desc : "“中毒”是一种状态，受到带毒性的生物攻击或者接触自然带毒环境就会中毒。角色中毒后会慢慢失去生命和精神，持续3天。",
        id : "2018030509",
        isShow: false
      },
      {
        header: "角色解锁",
        desc : "单机版里角色解锁的方式有两种，一种是通用的经验值解锁，一种是角色特殊解锁方式。每生存一天就能获得20点经验值，死亡时结算，但是冒险模式无法获得经验值。经验值是可以累加的(即多次)，并且解锁角色不会消耗经验值(这意味着生存总计128天即可解锁所有通过经验值解锁的角色)。",
        id : "20180305010",
        isShow: false
      }],
      foodRule :[{
        header: "食物分类",
        desc : "饥荒中的食物按照处理方法我们可以分为生食材、熟食材、风干食材、料理和非食材共五类，按照属性分类我们可以分为肉类、蛋类、鱼类、果类、菜类、乳类、蜜类和其他类共八类。",
        id : "2018030601",
        isShow: false
      },
      {
        header: "食材营养度",
        desc : "饥荒中大多数食材都有营养度，而营养度也是烹饪料理中很重要的部分，即游戏中通过判断是否满足营养度要求，是否含有限定食材，是否含有禁用物以及比较各食谱优先级高低来产出料理。",
        id : "2018030602",
        isShow: false
      },
      {
        header: "料理优先级",
        desc : "在饥荒食谱中，除了营养度，优先级也是很重要的一部分。所有料理都会有自己的优先级，在都满足要求的情况下，系统会比较所有满足要求料理的优先级高低，选择最高优先级的料理产出，如果优先级相同，就随机抽取其中之一。",
        id : "2018030603",
        isShow: false
      },
      {
        header: "食物与饥饿",
        desc : "饥饿值是饥荒人物三大属性之一，饥饿值会随时间不断下降，普通人物在正常情况下一游戏天消耗75饥饿值，低于0时人物血量会不断降低。",
        id : "2018030604",
        isShow: false
      },
      {
        header: "食物与生命",
        desc : "生命是饥荒人物三大属性之一，正常情况下生命值不会随着时间下降，但可能会因为体温、湿度、食物（部分）、受攻击、中毒、烧伤而减少，当生命值减少到0时，人物会死亡。",
        id : "2018030605",
        isShow: false
      },
      {
        header: "食物与精神",
        desc : "精神是饥荒人物三大属性之一，又称san、理智和脑残等，精神值在正常情况下不会随时间而下降，却可能会因为光照，靠近生物，潮湿，食物，装备，武器，跳虫洞，陆地等降低。",
        id : "2018030606",
        isShow: false
      },
      {
        header: "食物与温度",
        desc : "温度是饥荒游戏机制里很重要的一部分，温度过高或过低都会使得人物持续降低生命值直到温度降低或升高到适宜温度或人物死亡。因此温度会间接关系到人物的生死。",
        id : "2018030607",
        isShow: false
      },
      {
        header: "食物与速度",
        desc : "速度是饥荒游戏人物的一项属性，提高速度可以加快人物探图进程，有助于人物战斗时的走位。提高人物速度的方法有手持步行手杖或瞬移手杖、佩戴魔光护符、喝咖啡、吃烤熟咖啡豆。",
        id : "2018030608",
        isShow: false
      },
      {
        header: "食物与照明",
        desc : "照明是饥荒游戏中很重要的一部分，在无其他提高精神值或降低精神值的装备、生物等干扰下，夜间一旦正常情况下的人物离开了光源，会以每分钟50点降低精神值，并且黑暗即查理第一次会在5到10秒的任意时间进行攻击，以后会间隔5到11秒中的随机数来临进行攻击，查理会在人物下一次靠近光源时离开。",
        id : "2018030609",
        isShow: false
      }],
      natureRule :[{
        header: "昼夜",
        desc : "游戏里一天为8分钟，日期盘分为16个小格（时间片），每小格30秒。有白天，黄昏，夜晚三个阶段。夏季白天时间不断增加，秋季会将夏季增长的白天时间慢慢减少，冬季夜晚时间不断增加，春季会将冬季增长的夜晚时间慢慢减少",
        id : "2018030610",
        isShow: false
      },
      {
        header: "月相",
        desc : "月相是指月亮的变化，一些生物和建筑会随着月亮的变化而变化，猪人会在满月时变成猪狼人。",
        id : "2018030611",
        isShow: false
      },
      {
        header: "梦魇循环",
        desc : "梦魇循环是遗迹魔法不断变化状态的过程。梦魇灯座和梦魇裂隙随着循环开关，无论玩家的精神高低都会产生暗影生物。",
        id : "2018030612",
        isShow: false
      },
      {
        header: "地震",
        desc : "地震是在洞穴跟遗迹里发生的自然事件，也可以被下列事物触发：点燃火药、蛞蝓黏液、甲壳石墩和蛞蝓龟。使用传送法杖或巨人铃铛以及攻击巨型触手也会触发地震。地震会使得矿物从天而降（使得某些资源不再有限），但是大部分的资源会在掉到地上时砸毁。",
        id : "2018030613",
        isShow: false
      },
      {
        header: "火山喷发（SW独有）",
        desc : "火山在SW中自然生成于深海生态群落中，玩家进入火山内部。它在所有季节都可以被当作光源。火山通常生成在地图的边界处，当玩家朝它靠近时，镜头会拉远直到玩家能够看见它的全貌。",
        id : "2018030614",
        isShow: false
      },
      {
        header: "气候",
        desc : "饥荒中的气候有，雷电，雨，雪，强风等（SW特有）。",
        id : "2018030615",
        isShow: false
      },
      {
        header: "植物（DST独有）",
        desc : "植物变异，再生，疾病是DST中的植物新机制。",
        id : "2018030616",
        isShow: false
      },
      {
        header: "四季",
        desc : "游戏有4个季节，分别是春季，夏季，秋季，冬季。春季有20天，夏季有16天，秋季有20天，冬季有16天。一年为72天。",
        id : "2018030617",
        isShow: false
      }],
      /* eslint-enable */
      title: '',
      currentIndex: -1,
      type: '',
      currentRules: []
    }
  },
  onLoad (options) {
    this.type = options.type
    this.currentRules = this.type === 'roleRule' ? this.roleRule : this.type === 'foodRule' ? this.foodRule : this.natureRule
    this.title = options.title
    wx.setNavigationBarTitle({
      title: `${this.title}详细机制`
    })
  },
  methods: {
    spread (index) {
      this.currentIndex = index
    },
    retract () {
      this.currentIndex = -1
    },
    toArticleDetail (id) {
      wx.navigateTo({
        url: `/pages/articleDetail/main?id=${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.game-mechanism-detail {
  // box-shadow: 0 4px 8px #acacac;
  background-color: #f5f5f5;
  padding: 12px;
  .item-spread {
    box-shadow: 0 4px 8px #acacac;
    margin: 16px;
  }
  .item {
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    // box-shadow: 0 4px 8px #acacac;
    // margin: 16px;
    color: rgba(0,0,0,.87);
    font-size: 14px;
    .item-title {
      position: relative;
      height: 48px;
      padding: 0 24px;
      line-height: 48px;
      box-sizing: border-box;
      .retract, .title {
        display: inline-block;
      }
      .retract {
        position: absolute;
        right: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.54);
      }
    }
    .desc {
      padding: 16px 12px;
      background-color: #eee;
      color: #666;
      .button {
        margin-top: 12px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #607d8b;
        color: #fff;
        box-sizing: border-box;
        box-shadow: 0 4px 8px #acacac;
      }
    }
    .icon {
      font-size: 20px;
    }
  }
}
</style>
