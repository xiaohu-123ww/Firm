<template>
  <div>
    <el-card class="corporate">
      <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
        企业图片
      </div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="5"
        :on-exceed="handleExceed"
        :before-upload="handleInfoPic"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <div class="text">1.最多上传5张图片</div>
      <div class="text" style="margin-top: 3px">
        2.图片格式须为：jpg、jpeg、png,每张大小不能超过10M
      </div>
      <div style="font-size: 18px; font-weight: 700; margin: 50px 0 20px">
        企业视屏
      </div>
      <el-upload
        class="avatar-uploader"
        action="#"
        :data="{ FoldPath: '上传目录', SecretKey: '安全验证' }"
        :on-progress="uploadVideoProcess"
        :on-success="handleVideoSuccess"
        :before-upload="beforeUploadVideo"
        :show-file-list="false"
        :headers="headers"
        :limit="5"
        :on-exceed="handleExceeds"
      >
        <video
          v-if="videoForm.showVideoPath !== '' && !videoFlag"
          :src="videoForm.showVideoPath"
          class="avatar video-avatar"
          controls="controls"
        >
          您的浏览器不支持视频播放
        </video>
        <i
          v-else-if="videoForm.showVideoPath == '' && !videoFlag"
          class="el-icon-plus avatar-uploader-icon"
        ></i>
        <el-progress
          v-if="videoFlag == true"
          type="circle"
          :percentage="videoUploadPercent"
          style="margin-top: 7px"
        ></el-progress>
      </el-upload>
      <div class="text">1.最多上传1个视屏</div>
      <div class="text" style="margin-top: 3px">
        2.视屏格式为:Mp4,不可超过50MB
      </div>

      <el-button round class="bt" @click="onClick">退出编辑</el-button>
      <el-button
        round
        class="bt"
        style="background-color: #256efd; color: #fff"
        @click="submit"
        >确定</el-button
      >
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: '' // 回显的变量
      },
      headers: {}
    }
  },
  methods: {
    // 图片
    handleInfoPic (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG && !isPNG && !isJPG2) this.$message.error('请上传格式为 png, jpeg,jpg 的图片！')
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG || isPNG || isLt2M || isJPG2
    },
    handleExceed (file, fileList) {
      // console.log(file, fileList);
      this.$message.error('上传失败，限制上传数量5张图片以内！')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 上传前回调 视频
    beforeUploadVideo (file) {
      var fileSize = file.size / 1024 / 1024 < 50 // 控制大小  修改50的值即可
      if (
        [
          'video/mp4'
          // 'video/ogg',
          // 'video/flv',
          // 'video/avi',
          // 'video/wmv',
          // 'video/rmvb',
          // 'video/mov'
        ].indexOf(file.type) === -1 // 控制格式
      ) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!fileSize) {
        this.$message.error('视频大小不能超过50MB')
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess (event, file, fileList) { // 注意在data中添加对应的变量名
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0

      console.log(res)
      // 后台上传数据
      if (res.success === true) {
        this.videoForm.showVideoPath = res.data.url // 上传成功后端返回视频地址 回显
      } else {
        this.$message.error('上传失败！')
      }
    },
    handleExceeds (file, fileList) {
      // console.log(file, fileList);
      this.$message.error('上传失败，限制上传数量1个视屏！')
    },

    onClick () {
      this.$emit('reset', 0)
    },
    submit () {
      this.$emit('reset', 0)
    }
  }
}

</script>
<style scoped lang="scss">
.corporate {
  margin: 30px;
  border-radius: 18px;
  padding: 20px 50px;
}
.text {
  font-size: 12px;
  margin-top: 10px;
  color: #999;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 178px;
  text-align: center;
  border-radius: 40px;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
.bt {
  height: 35px;
  padding: 10px;
  width: 80px;
  margin-top: 30px;
}
</style>
