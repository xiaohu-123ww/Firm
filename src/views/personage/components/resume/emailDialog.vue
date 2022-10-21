<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="emailShow"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="rf" :model="ruleForm" label-width="80px">
          <el-form-item label="邮箱">
            <el-input
              v-model="ruleForm.email"
              placeholder="请输入邮箱"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input
              v-model="ruleForm.emialCode"
              placeholder="请输入验证码"
              style="width: 260px"
            ></el-input>
            <el-button class="button" style="margin-left: 8px"
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
    emailShow: {
      type: Boolean
    }
  },
  data () {
    return {
      ruleForm: {
        emial: '',
        emialCode: ''
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
