<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="peopleShow"
      width="40%"
      :before-close="handleCloses"
    >
      <div>
        <el-form ref="rf" :model="ruleForm" label-width="80px" :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入姓名"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="card_id">
            <el-input
              v-model="ruleForm.card_id"
              placeholder="请输入身份证号码"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="number">
            <el-input
              v-model="ruleForm.number"
              placeholder="请输入手机号码"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="number_code">
            <el-input
              v-model="ruleForm.number_code"
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
        <el-button @click="handle">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAuthenList, getverification } from '@/api/personage/index'
export default {
  props: {
    peopleShow: {
      type: Boolean
    }
  },
  data () {
    return {
      ruleForm: {
        number: '',
        number_code: '',
        name: '',
        card_id: ''
      },
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        card_id: [{ required: true, message: '请输入身份证ID', trigger: 'blur' },
        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确' }],
        number: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
        {
          validator: function (rule, value, callback) {
            if (/^1[34578]\d{9}$/.test(value) === false) {
              callback(new Error('请输入正确的手机号'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }],
        number_code: [
          { required: true, message: '验证码不能为空' },
          { max: 4, message: '验证码必须是4个字符', trigger: 'blur' }
        ]

      }
    }
  },
  computed: {

    // 用于校验手机号码格式是否正确

    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get () {
        if (this.waitTime === 61) {
          if (this.ruleForm.number) {
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
  mounted () {

  },
  methods: {
    handleCloses () {
      this.$refs.rf.clearValidate()
      this.$emit('reset', false)
      this.ruleForm.number = ''
      this.ruleForm.number_code = ''
      this.ruleForm.name = ''
      this.ruleForm.card_id = ''
    },
    handleClose () {
      this.$refs.rf.validate(async (vaild) => {
        if (vaild) {
          const res = await getAuthenList(this.ruleForm)
          console.log('实名认证', res)
          if (res.code === 1001) {
            this.$message.error(res.data.data.msg)
          }
          if (res.code === 200) {
            this.$message.success(res.data.data.msg)
            this.$emit('reset', false)
            this.number = ''
            this.number_code = ''
            this.name = ''
            this.card_id = ''
          }
        }
      })
      // this.$emit('reset', false)
    },
    async getCode () {
      if (this.ruleForm.number) {
        this.mobile = this.ruleForm.number

        const res = await getverification(this.mobile)

        if (res.code === 200) {
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
    handle () {
      this.$refs.rf.clearValidate()
      this.$emit('reset', false)
      this.ruleForm.number = ''
      this.ruleForm.number_code = ''
      this.ruleForm.name = ''
      this.ruleForm.card_id = ''
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
