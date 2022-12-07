<template>
  <div>
    <el-form
      ref="nickname"
      :model="nickname"
      label-width="80px"
      :rules="nicknames"
    >
      <el-form-item label="企业名称">
        <el-input v-model="enterprise" style="width: 400px" disabled></el-input>
      </el-form-item>

      <el-form-item label="营业执照" prop="imag_url">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="handleInfoPic"
          :http-request="testUpload"
          :on-success="uploadSuccess"
        >
          <img
            v-if="image_url"
            :src="image_url"
            style="width: 178px; height: 178px; border-radius: 100px"
          />

          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <div style="margin-top: 20px; color: rgb(177 177 179)">
          图片格式须为:jpg、jpeg、 png，每张大小不超过10M
        </div>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 375px" @click="handle">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getImage, getLicense } from '@/api/register'
export default {
  props: {
    enterprise: {
      type: String
    }
  },
  data () {
    return {
      nicknames: {
        image_url: [
          { required: true, message: '请选择营业执照', trigger: 'change' }
        ]
      },
      nickname: {
        enterprise_name: '',
        image_url: ''
      },
      image_url: ''
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    handleInfoPic (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isJPG2 && !isPNG) this.$message.error('请上传格式为 png, jpg, jpeg 的图片！')
      return isJPG || isJPG2 || isPNG
    },
    async testUpload (file) {
      var formData = new FormData()
      formData.append('image', file.file)
      const res = await getImage(formData)
      console.log('res', res)
      if (res.code === 200) {
        this.$message.success(res.data.msg)
        this.nicknames.image_url = res.data.data.image
      } else {
        this.message.error(res.data.msg)
      }
    },
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.image_url = URL.createObjectURL(file.raw)
    },
    handle () {
      this.$emit('handle')
    },
    async submit () {
      this.nicknames.enterprise_name = this.enterprise
      const res = await getLicense(this.nicknames)
      console.log('营业执照', res)
      if (res.code === 200) {
        this.$message.success('信息发送成功，待审核')
        this.$router.push('/')
      } else {
        this.$message(res.data.msg)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
::v-deep .el-upload.el-upload--text {
  background-color: #eeeef5;
}
</style>
