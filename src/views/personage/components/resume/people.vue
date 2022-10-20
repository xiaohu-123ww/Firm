<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="peopleShow"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="rf" :model="ruleForm" label-width="80px">
          <el-form-item label="姓名">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入姓名"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input
              v-model="ruleForm.identityCard"
              placeholder="请输入身份证号码"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              v-model="ruleForm.photo"
              placeholder="请输入手机号码"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input
              v-model="ruleForm.photoEm"
              placeholder="请输入验证码"
              style="width: 260px"
            ></el-input>
            <el-button type="primary" style="margin-left: 8px" class="button"
              >验证码</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          style="background-color: #256efd; color: #fff"
          @click="handleClose"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    peopleShow: {
      type: Boolean
    }
  },
  data () {
    return {
      ruleForm: {
        photo: '',
        photoEm: '',
        name: '',
        identityCard: ''
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    handleClose () {
      this.$emit('reset', false)
    }
  }
}
</script>
<style scoped lang="scss">
.button {
  width: 70px;
  height: 33px;
  padding: 10px;
  background-color: #256efd;
  color: #fff;
}
</style>
