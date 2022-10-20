<template>
  <div>
    <el-card class="profile">
      <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="" style="margin-bottom: 50px" prop="textarea">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业介绍</span>
            </div>
            <el-input
              v-model="form.textarea"
              type="textarea"
              placeholder="请输入内容"
              maxlength="2000"
              show-word-limit
              style="width: 1000px"
            >
            </el-input>
            <div style="color: #999; font-size: 13px; margin-top: 8px">
              请确保发布的信息真实、准确且不侵犯任何第三方权益，否则本平台有权依据《用户服务协议》约定作出相应处理
            </div>
          </el-form-item>
          <el-form-item label="" style="margin-bottom: 50px">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: black">企业成立时间</span>
            </div>
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="选择日期"
              style="width: 200px"
            ></el-date-picker>
            年
          </el-form-item>
          <el-form-item label="">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: black">官方地址</span>
            </div>
            <el-input
              v-model="form.address"
              style="width: 300px"
              placeholder="请输入官方地址"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 30px">
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
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        textarea: '',
        date1: '',
        address: ''
      },
      rules: {
        textarea: [
          { required: true, message: '请输入公司介绍', trigger: 'blur' },
          { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    onClick () {
      this.$emit('reset', 0)
    }, submit () {
      this.$refs.form.validate()
    }
  }
}
</script>
<style scoped lang="scss">
.profile {
  margin: 30px;
  border-radius: 18px;
  padding: 50px;
}
</style>
