<template>
    <div class="oss-upload-container">
        <el-upload
                action=""
                class="avatar-uploader"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>


<script>
// import OSS from 'ali-oss'

export default {
  name: 'ossUpload',
  props: {
    // 要上传的文件夹的名称
    dirName: {
      type: String,
      default: ''
    },
    // 要上传的图片的名称，根据不同的分类进行拼接
    imgName: {
      type: String,
      default: 'test'
    },
    // 已有图片，需要传图片地址
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return
      }
      this.toUpload(file)
      return false
    },
    /**
     * oss上传
     * @param file
     */
    toUpload (file) {
      // oss配置
      // const client = new OSS({
      //   endpoint: 'oss-cn-beijing.aliyuncs.com',
      //   accessKeyId: 'LTAIhKopVjzlM2aM',
      //   accessKeySecret: 'y36JkWELbKx1AjUMHfT64KPEMfWIqs',
      //   bucket: 'stavebox'
      // })
      // // 图片路径拼接，dirName其实就是定义存在oss的哪个虚拟文件夹下的
      // let imgType = file.type.split('/')[1]
      // let fileName = this.dirName + '/' + this.imgName + '.' + imgType
      // // 将文件流上传至oss
      // client.put(fileName, file)
      //   .then(res => {
      //     const imageUrl = 'http://img.fireleaves.cn/' + res.name
      //     this.$emit('upload-img', imageUrl)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    }
  }
}
</script>
<style lang="scss">
    .oss-upload-container {
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 18px;
            color: #8c939d;
            width: 64px;
            height: 64px;
            line-height: 64px;
            text-align: center;
        }

        .avatar {
            width: 64px;
            height: 64px;
            display: block;
        }
    }
</style>
