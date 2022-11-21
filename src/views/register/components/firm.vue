<template>
  <div>
    <el-form ref="fr" :model="firms" label-width="80px" :rules="noung">
      <el-form-item label="企业名称">
        <el-input v-model="enterprise" style="width: 400px" disabled></el-input>
      </el-form-item>
      <el-form-item label="企业邮箱" prop="validation_email">
        <el-input
          v-model="firms.validation_email"
          style="width: 400px"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input
          v-model="firms.code"
          placeholder="请输入验证码"
          style="width: 400px"
        ></el-input>
        <el-button
          :class="{ 'disabled-style': getCodess }"
          :disabled="getCodess"
          style="margin-left: 10px; height: 42px; line-height: 5px"
          type="primary"
          @click="getCodeListss"
          >{{ codeBtnWord }}</el-button
        >
      </el-form-item>
      <el-form-item label="营业执照" prop="image_url">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="handleInfoPic"
          :http-request="testUpload"
          :on-success="uploadSuccess"
        >
          <img v-if="image" :src="image" style="width: 178px; height: 178px" />

          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <div style="margin-top: 20px; color: rgb(177 177 179)">
          图片格式须为:jpg、jpeg、 png，每张大小不超过10M
        </div>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 375px" @click="handleClosess"
          >取消</el-button
        >
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getImage, getLicenseWithEmail } from '@/api/register'
import { getEmail } from '@/api/personage/index'
export default {

  props: {
    enterprise: {
      type: String
    }
  },
  data () {
    return {
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61,
      firms: {
        enterprise_name: '',
        validation_email: '',
        code: '',
        image_url: ''
      },
      noung: {
        validation_email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { max: 6, message: '验证码必须是6个字符', trigger: 'blur' }
        ],
        enterprise_name: [
          { required: true, message: '请输入关键字', trigger: ['blur', 'change'] }
        ],
        image_url: [
          { required: true, message: '请输入邮箱地址', trigger: 'change' }
        ]

      },
      image: ''
    }
  },
  mounted () {

  },
  computed: {
    getCodess: {
      get () {
        if (this.waitTime === 61) {
          if (this.firms.validation_email) {
            return false
          }
          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set () { }

    }
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
        this.firms.image_url = res.data.data.image
      } else {
        this.message.error(res.data.msg)
      }
    },
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.image = URL.createObjectURL(file.raw)
    },
    handleClosess () {
      this.$emit('handleClosess')
    },
    async getCodeListss () {
      if (this.firms.validation_email) {
        const list = {}
        list.email = this.firms.validation_email
        const res = await getEmail(list)
        console.log('res', res)
        if (res === 1002) {
          this.$message({
            message: '该账号已被绑定',
            type: 'error',
            center: true
          })
        } else {
          this.$message({
            message: '验证码已发送，请稍候...',
            type: 'success',
            center: true
          })
        }

        // 因为下面用到了定时器，需要保存this指向
        const that = this
        that.waitTime--
        that.getCodeBtnDisable = true
        this.codeBtnWord = `${this.waitTime}s 后重新获取`
        const timer = setInterval(function () {
          if (that.waitTime > 1) {
            that.waitTime--
            that.codeBtnWord = `${that.waitTime}s 后重新获取`
          } else {
            clearInterval(timer)
            that.codeBtnWord = '获取验证码'
            that.getCodeBtnDisable = false
            that.waitTime = 61
          }
        }, 1000)
      }
    },
    submit () {
      this.$refs.fr.validate(async (valid) => {
        if (valid) {
          console.log('1')
          this.firms.enterprise_name = this.enterprise
          this.firms.code = Number(this.firms.code)
          const res = await getLicenseWithEmail(this.firms)
          console.log('邮箱', res)
          if (res.code === 200) {
            this.$message.success('发送成功，待审核')
            this.$router.push('/register')
          } else {
            this.$message(res.data.msg)
          }
        }
      })
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
::v-deep .el-upload.el-upload--text {
  width: 150px;
  height: 150px;
}
</style>
