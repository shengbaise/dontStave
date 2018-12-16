<template>
  <div class="introduce">
    <div class="introduce-item">
      <p class="key">游戏昵称(必填):</p>
      <input :class="{ 'red-border': !hasNickname }" @blur="handleNicknameBlur" v-model="nickname" class="value" type="text">
    </div>
    <div class="contact-item">
      <p class="contact-type">联系方式(选填一个):</p>
      <div class="contacts">
        <input :disabled="weixin" :class="{'ban': !!weixin}" placeholder="QQ" v-model="qq" class="contact" type="text">
        <input :disabled="qq" :class="{'ban': !!qq}" placeholder="微信" v-model="weixin" class="contact" type="text">
      </div>
    </div>
    <div class="personal-introduce">
      <p class="introduce-title">介绍(必填):</p>
      <textarea @blur="handlehasIntroduceBlur" :class="{ 'red-border': !hasIntroduce }" v-model="introduce" rows="4" minlength="10" maxlength="120" placeholder="想找什么样的饥友，以及关于自己的介绍，10个字以上，120字以内" class="textarea"></textarea>
    </div>
    <div class="introduce-item">
      <p class="key">账号类型:</p>
      <radio-group class="radio-box" @change="accountChange">
        <label class="radio">
          <radio checked type="radio" value="1"/>Steam
        </label>
        <label class="radio">
          <radio type="radio" value="2"/>WeGame
        </label>
      </radio-group>
    </div>
    <div class="introduce-item">
      <p class="key">性别:</p>
      <radio-group class="radio-box" @change="sexChange">
        <label class="radio">
          <radio checked type="radio" value="1"/>男
        </label>
        <label class="radio">
          <radio type="radio" value="2"/>女
        </label>
      </radio-group>
    </div>
    <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
    <div class="button" @click="commit()">提交</div>
  </div>
</template>

<script>
  import { isEmail, isPhone, getCurrentDay } from '../../utils/index.js'
  export default {
    data () {
      return {
        nickname: '',
        qq: '',
        weixin: '',
        sexType: '1',
        accountType: '1',
        introduce: '',
        errorMessage: '',
        hasNickname: true,
        hasIntroduce: true
      }
    },
    async onLoad () {
      wx.setNavigationBarTitle({
        title: '介绍'
      })
      // const result = await this.$http.get('/message/search')
      // this.allFriends = result.data.reverse()
      // this.friends = this.allFriends
      // console.info(this.friends, 'friends')
    },
    mounted () {
      this.errorMessage = ''
      this.sexType = '1'
      this.nickname = ''
      this.qq = ''
      this.weixin = ''
      this.accountType = '1'
      this.introduce = ''
      this.hasNickname = true
      this.hasIntroduce = true
    },
    methods: {
      handlehasIntroduceBlur () {
        this.hasIntroduce = !!this.introduce
      },
      handleNicknameBlur () {
        this.hasNickname = !!this.nickname
      },
      accountChange (e) {
        this.accountType = e.target.value
        console.info(e.target.value)
      },
      sexChange (e) {
        this.sexType = e.target.value
        console.info(e.target.value)
      },
      async commit () {
        if (!this.nickname) {
          this.handleNicknameBlur()
          return
        }
        this.errorMessage = ''
        if (!this.qq && !this.weixin) {
          this.errorMessage = '微信和QQ必须选填一个'
          return
        }
        if (this.qq && !RegExp(/^[1-9][0-9]{4,9}$/).test(this.qq)) {
          this.errorMessage = '请输入正确的QQ'
          return
        }
        if (this.weixin && !isEmail(this.weixin) && !isPhone(this.weixin)) {
          this.errorMessage = '请输入正确的微信号'
          return
        }
        if (!this.introduce) {
          this.handlehasIntroduceBlur()
          return
        }
        const item = {
          time: getCurrentDay(),
          contact: this.qq || this.weixin,
          contactType: this.qq ? 1 : 2,
          desc: this.introduce,
          name: this.nickname,
          sex: this.sexType,
          type: this.accountType
        }

        const result = await this.$http.post('/message/add', item)
        if (result.data.code === 0) {
          wx.navigateBack()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.introduce {
  height: 100%;
  padding: 20px;
  .error-message {
    color: red;
    font-size: 12px;
  }
  .red-border {
    border-color: red !important;
  }
  .ban {
    border-bottom: 1px dotted #e0e0e0 !important;
    opacity: 0.7;
  }
  .personal-introduce, .contact-item {
    margin-bottom: 20px;
    .introduce-title, .contact-type {
      padding-bottom: 12px;
      color: rgba(0,0,0,.54);
      font-size: 14px;
    }
    .textarea {
      height: 90px;
      font-size: 14px;
      line-height: 21px;
      // margin-top: 12px;
      margin-bottom: 12px;
      outline: none;
      text-decoration: none;
      border: 1px solid #e0e0e0;
      padding: 8px 0 8px 8px;
      width: 100%;
      border-radius: 4px;
    }
  }
  .introduce-item {
    display: flex;
    // align-items: center;
    margin-bottom: 20px;
    .key {
      height: 36px;
      line-height: 36px;
      width: 100px;
      flex-shrink: 0;
      color: rgba(0,0,0,.54);
      font-size: 14px;
    }
    .value {
      height: 36px;
      line-height: 36px;
      box-sizing: border-box;
      width: 70%;
      border-bottom: 1px solid #e0e0e0;
      padding: 4px 8px 4px 0;
      color: #333;
      font-size: 14px;
    }
    .radio-group {
      height: 36px;
      line-height: 36px;
    }
    .radio-box {
      padding-top: 8px;
      box-sizing: border-box;
      font-size: 14px;
      .radio {
        padding-right: 12px;
      }
    }
  }
  .contacts {
    // width: 70%;
    .contact {
      // margin-left:80px;
      width: 100%;
      border-bottom: 1px solid #e0e0e0;
      padding: 4px 8px 4px 0;
      color: #333;
      font-size: 14px;
    }
  }
  .button {
    color: #fff;
    background-color: #2874f0;
    font-size:14px;
    width:80px;
    height:36px;
    line-height:36px;
    text-align:center;
    margin-top:82px;
    border-radius:4px;
    position:absolute;
    bottom:40px;
    left:50%;
    transform:translateX(-50%);
  }
}
</style>
