<template>
  <div>
    <el-card class="profile">
      <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item
            label=""
            style="margin-bottom: 50px"
            prop="introduction"
          >
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业介绍</span>
            </div>
            <el-input
              v-model="form.introduction"
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
          <el-form-item
            label=""
            style="margin-bottom: 50px"
            prop="establish_year"
          >
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业成立时间</span>
            </div>
            <el-date-picker
              v-model="form.establish_year"
              type="year"
              placeholder="选择日期"
              style="width: 200px"
              format="yyyy"
              value-format="yyyy"
            ></el-date-picker>
            年
          </el-form-item>
          <el-form-item label="">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: black">官方地址</span>
            </div>
            <el-input
              v-model="form.site_url"
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
import { getStatus, getIntroduction } from '@/api/firm/index'
export default {
  data () {
    return {
      form: {
        introduction: '',
        establish_year: '',
        site_url: ''
      },
      rules: {
        introduction: [
          { required: true, message: '请输入公司介绍', trigger: 'blur' },
          { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
        ],
        establish_year: [
          { required: true, message: '请选择公司注册日期', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getList()
  },
  methods: {
    onClick () {
      this.$confirm('确定退出编辑吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { this.$emit('reset', 0) })
    },
    submit () {
      this.$refs.form.validate(async (vaild) => {
        if (vaild) {
          console.log(this.form)
          // const time = this.form.establish_year
          // const establish_year = new Date(time).toLocaleDateString().slice().replace(/\//g, '-')

          // this.form.establish_year = establish_year.substr(0, 4)
          // console.log(this.form)
          if (this.form.site_url === '' || this.form.site_url === null) {
            delete this.form.site_url
          }
          console.log(this.form)
          const res = await getIntroduction(this.form)
          console.log('编辑', res)
          this.$message.success('编辑成功，内容在审核中')
          this.$emit('reset', 0)
        }
      })
    },
    async getList () {
      const { data } = await getStatus()
      console.log('res', data)
      this.form.introduction = data.data.introduction
      this.form.site_url = data.data.site_url
      const res = data.data.establish_year
      this.form.establish_year = res.toString()
      console.log(this.form)
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
