<template>
  <div>
    <el-form
      ref="rss"
      :model="list"
      label-width="80px"
      style="text-aligin: center"
      :rules="newVal"
    >
      <el-form-item label="邮箱" prop="validation_email">
        <el-input
          v-model="list.validation_email"
          placeholder="请输入邮箱"
          style="width: 350px"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input
          v-model="list.code"
          placeholder="请输入验证码"
          style="width: 350px"
        ></el-input>
        <el-button
          :class="{ 'disabled-style': getCode }"
          :disabled="getCode"
          style="margin-left: 10px; height: 42px; line-height: 5px"
          type="primary"
          @click="getCodeList()"
          >{{ codeBtnWord }}</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCloses">取 消</el-button>
        <el-button type="primary" @click="emailClose">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getEmail, getLicenseEmail } from '@/api/personage/index'
export default {
  props: {
    enterprise: {
      type: String
    }
  },
  data () {
    return {
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      list: {
        validation_email: '',
        code: ''
      },
      newVal: {
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
        ]
      }
    }
  },
  mounted () {

  },
  computed: {
    getCode: {
      get () {
        if (this.waitTime === 61) {
          if (this.list.validation_email) {
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
    async getCodeList () {
      if (this.list.validation_email) {
        if (this.list.code === '') {
          delete this.list.code
        }
        const res = await getEmail(this.list)
        console.log('res', res)
        if (res === undefined) {
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
    async emailClose () {
      this.$refs.rss.validate(async (vaild) => {
        if (vaild) {
          this.list.enterprise_name = this.enterprise
          const res = await getLicenseEmail(this.list)

          if (res.code === 200) {
            this.$message.success('信息已发送，待审核')
            this.$emit('handleClose', false)
            this.$router.push('/')
          } else {
            this.$message(res.data.msg)
          }
        }
      })
    },
    handleCloses () {
      this.$emit('handleClose')
    }
  }
}
</script>
<style scoped>
</style>
