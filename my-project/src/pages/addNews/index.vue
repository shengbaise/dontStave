// 新增动态
<template>
  <div class="add-news">
    <view class="comment">
      <textarea :adjust-position="false" class="comment-content" v-model="news" placeholder="评论" />
      <mp-uploader
        @click.native="test"
        class="upload-img"
        :maxLength=1
        @upLoadSuccess="upLoadSuccess"
        @upLoadFail="upLoadFail"
        @uploadDelete="uploadDelete"
        :showTip=false :count=1></mp-uploader>
    </view>
  </div>
</template>

<script>
import mpUploader from 'mpvue-weui/src/uploader'

export default {
  data () {
    return {
      content: null,
      editorOption: {},
      news: '',
      file: null
    }
  },
  components: {
    mpUploader
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '添加动态'
    })
  },
  computed: {
    randomName () {
      // let time = new Date()
      // return md5(time)
    }
  },
  methods: {
    test () {
      wx.chooseImage({
        success (res) {
          const tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              user: 'test'
            },
            success (res) {
              const data = res.data
              console.info(121, data)
              // do something
            }
          })
        }
      })
    },
    uploadDelete () {},
    upLoadFail () {},
    upLoadSuccess (successRes) {
      console.info(successRes)
    },
    onEditorBlur () { // 失去焦点事件
    },
    onEditorFocus () { // 获得焦点事件
    },
    onEditorChange () { // 内容改变事件
    }
  }
}
</script>

<style lang="scss">
.add-news {
  .weui-uploader {
    margin-top: 20px;
    .weui-uploader__input {
      width: 68px;
      height: 68px;
    }
  }
}
</style>


<style lang="scss" scoped>
.add-news {
  .comment {
    padding: 12px;
    box-sizing: border-box;
    .comment-content {
      padding: 12px;
      border-radius: 4px;
      width:100%;
      height:68px;
      border: 1px solid #ededed;
      box-sizing:border-box;
      font-size:14px;
    }
  }
}
</style>

