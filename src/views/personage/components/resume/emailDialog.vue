<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="emailShow"
      width="40%"
      :before-close="handleCloses"
    >
      <div>
        <el-form ref="rf" :model="ruleForm" label-width="80px" :rules="rules">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="ruleForm.email"
              placeholder="请输入邮箱"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入验证码"
              style="width: 260px"
            ></el-input>
            <el-button
              :class="{ 'disabled-style': getCodeBtnDisable }"
              :disabled="getCodeBtnDisable"
              style="margin-left: 10px; height: 33px; line-height: 5px"
              type="primary"
              @click="getCode()"
              >{{ codeBtnWord }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="emailClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getEmail, getEmailBound } from '@/api/personage/index'
export default {
  props: {
    emailShow: {
      type: Boolean
    },
    email: {
      type: String
    },
    emailList: {
      type: String
    }
  },
  data () {
    return {
      ruleForm: {
        email: '',
        code: ''
      },
      forbid: false,
      rules: {
        email: [
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
      },
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61 // 获取验证码按钮失效时间
    }
  },
  computed: {

    // 用于校验手机号码格式是否正确/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    phoneNumberStyle () {
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!reg.test(this.ruleForm.email)) {
        return false
      }
      return true
    },
    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get () {
        if (this.waitTime === 61) {
          if (this.phoneNumberStyle) {
            if (this.ruleForm.email) {
              return false
            }
          }

          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set () { }

    }

  },
  watch: {
    email: {
      handler (val) {
        console.log(val)
        this.ruleForm.email = val
      },
      immediate: true
    },
    emailList (newVal, oldVal) {
      console.log(newVal)
      this.ruleForm.email = newVal
    }
  },
  mounted () {

  },
  methods: {
    // 确定
    async emailClose () {
      console.log(this.ruleForm)
      const res = await getEmailBound(this.ruleForm.email, this.ruleForm.code)
      console.log('邮箱', res)
      if (res.code === 200) {
        this.$message.success('邮箱绑定成功')
        this.$emit('submit', false, this.ruleForm.email)
        this.$emit('reset', false)
      } else {
        this.$message.error(res.data.msg)
      }
      this.ruleForm.email = ''
      this.ruleForm.code = ''
    }, // 取消
    handleClose () {
      this.$confirm('确定取消邮箱绑定吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.$emit('submit', false)
        this.$emit('reset', false)
        this.ruleForm.email = ''
        this.ruleForm.code = ''
      })
    },
    handleCloses () {
      this.$emit('submit', false)
      this.$emit('reset', false)
      this.ruleForm.email = ''
      this.ruleForm.code = ''
    },
    // 验证码
    async getCode () {
      if (this.ruleForm.email) {
        if (this.ruleForm.code === '') {
          delete this.ruleForm.code
        }
        const res = await getEmail(this.ruleForm)
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
    }
  }
}

</script>
<style scoped lang="scss">
.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
</style>
