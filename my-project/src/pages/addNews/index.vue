// 新增动态
<template>
  <div class="add-news">
    <view class="comment">
      <textarea :adjust-position="false" class="comment-content" v-model="news" placeholder="评论" />
      <!-- <oss-upload
        :imgName="randomName"
        :imageUrl="titleSrc"
        dirName="Article"
        @upload-img="handler"></oss-upload> -->
      <!-- <input type="file"> -->
      <view class="weui-uploader__input-box">
        +
        <input class="weui-uploader__input js_file" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="" bindtap='uploader' name="images"></input>
      </view>
    </view>
  </div>
</template>

<script>
import md5 from 'md5-js'
// import { quillEditor } from 'vue-quill-editor'
import ossUpload from '@/components/ossUpload.vue'

export default {
  data () {
    return {
      content: null,
      editorOption: {},
      news: ''
    }
  },
  components: {
    ossUpload
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '添加动态'
    })
  },
  computed: {
    randomName () {
      let time = new Date()
      return md5(time)
    }
  },
  methods: {
    onEditorBlur () { // 失去焦点事件
    },
    onEditorFocus () { // 获得焦点事件
    },
    onEditorChange () { // 内容改变事件
    }
  }
}
</script>

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

