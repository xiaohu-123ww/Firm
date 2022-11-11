<template>
  <div>
    <el-card class="card">
      <div style="font-size: 18px; font-weight: 700; margin: 0 32px 20px">
        头像
      </div>
      <div style="margin: 40px">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="handleInfoPic"
          :http-request="testUpload"
          :on-success="uploadSuccess"
        >
          <img
            v-if="testImage"
            :src="testImage"
            style="width: 178px; height: 178px; border-radius: 100px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </div>
      <p style="font-size: 15px; margin: 30px 25px">
        用户名 <span style="margin-left: 50px">张先生</span>
      </p>
      <p style="margin: 20px 38px; font-size: 15px">
        姓名 <span style="margin-left: 50px">张三丰</span>
      </p>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="昵称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入昵称"
            style="width: 400px; margin-right: 10px"
          ></el-input>
          <span style="color: #999; font-size: 10px">*只对求职者可见</span>
        </el-form-item>
        <el-form-item label="职务" prop="job">
          <el-input
            v-model="form.job"
            placeholder="请填写职务，让求职者更加了解您的身份"
            style="width: 400px; margin-right: 10px"
          ></el-input>
          <span style="color: #999; font-size: 10px">*只对求职者可见</span>
        </el-form-item>
        <el-form-item>
          <el-button round class="bt" @click="onClick">退出编辑</el-button>
          <el-button
            round
            class="bt"
            style="background-color: #256efd; color: #fff"
            @click="submit"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      testImage: null,
      form: {
        name: '',
        job: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请填写职务，让求职者更加了解您的身份', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
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
    testUpload (content) {
      console.log(content)
      content.onSuccess()
    },
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.testImage = URL.createObjectURL(file.raw)
    },
    async submit () {
      await this.$refs.form.validate()
      await this.$message.success('保存成功')
    },
    onClick () {
      this.$emit('reset', 1)
    }
  }

}

</script>
<style scoped lang="scss">
.card {
  margin: 20px;
  border-radius: 18px;
  padding: 30px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
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
i.el-icon-plus.avatar-uploader-icon {
  border: 1px dashed rgb(197, 196, 196);
  border-radius: 100px;
}
</style>
