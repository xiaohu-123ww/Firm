<template>
  <div>
    <el-form
      ref="email"
      :model="formList"
      label-width="80px"
      :rules="photoList"
    >
      <el-form-item label="真实姓名" prop="name">
        <el-input
          v-model="formList.name"
          placeholder="请输入真实姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="card_id">
        <el-input v-model="formList.card_id"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="numbers">
        <el-input
          v-model="numbers"
          placeholder="请输入手机号码"
          style="width: 260px"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="number_code">
        <el-input
          v-model="formList.number_code"
          placeholder="请输入验证码"
          style="width: 260px"
        ></el-input>
        <el-button
          :class="{ 'disabled-style': getCodeBtnDisable }"
          :disabled="getCodeBtnDisable"
          style="margin-left: 10px; height: 40px; line-height: 5px"
          type="primary"
          @click="getCodes()"
          >{{ codeBtnWord }}</el-button
        >
      </el-form-item>
      <el-form-item style="margin: 40px 0px 0px 336px">
        <el-button type="primary">取消</el-button>
        <el-button @click="handleEmail">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getverification, getAuthenList } from '@/api/personage/index'
export default {
  props: {
    formList: {
      type: Object
    },
    numbers: {
      type: String
    }
  },
  data () {
    return {
      photoList: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        card_id: [{ required: true, message: '请输入身份证ID', trigger: 'blur' },
        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确' }],
        // numbers: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
        // {
        //   validator: function (rule, value, callback) {
        //     if (/^1[34578]\d{9}$/.test(value) === false) {
        //       callback(new Error('请输入正确的手机号'))
        //     } else {
        //       callback()
        //     }
        //   }, trigger: 'blur'
        // }],
        number_code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },

      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61 // 获取验证码按钮失效时间
    }
  },
  computed: {
    getCodeBtnDisable: {
      get () {
        if (this.waitTime === 61) {
          if (this.numbers) {
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
  watch: {
    numbers (newVal, oldVal) {
      this.formList.number = newVal
      console.log('newVal', newVal, this.formList.number)
    }
  },
  methods: {
    async getCodes () {
      if (this.numbers) {
        this.mobile = this.numbers

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
    handleEmail () {
      console.log(1)

      this.$refs.email.validate(async (vaild) => {
        if (vaild) {
          this.formList.number = this.numbers
          const res = await getAuthenList(this.formList)
          console.log('实名认证', res)
          if (res.code === 1003) {
            this.$message.success(res.data.msg)
            this.$emit('handleEmail', this.formList)
          }
          if (res.code === 1004) {
            this.$message.error(res.data.msg)
          }
          if (res.code === 200) {
            this.$message.success('实名认证成功')
            this.$emit('handleEmail', this.formList)
          } else {
            this.$message.error(res.data.msg)
          }
        }
      })
    }
  }

}
</script>
<style scoped>
</style>
