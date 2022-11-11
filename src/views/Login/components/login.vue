<template>
  <div>
    <div class="login-content">
      <el-row>
        <el-col :span="13"
          ><div class="login-image">
            <div class="image">
              <img
                src="../../.../../../assets/picture/beijingkejigan@2x.png"
                alt=""
              />
            </div></div
        ></el-col>
        <el-col :span="11"
          ><div class="login-form">
            <div class="form">
              <div class="Qiehuan">
                <p :class="isuser == true ? 'active' : ''" @click="user">
                  账号登录
                </p>
                <p
                  :class="isuser == false ? 'active' : ''"
                  @click="cepateLogin"
                >
                  验证码登录
                </p>
              </div>
              <div v-if="show">
                <el-form
                  ref="rf"
                  :model="loginForm"
                  status-icon
                  :rules="rules"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="账号" prop="username">
                    <el-input
                      v-model="loginForm.username"
                      class="elInput"
                      placeholder="请输入账号"
                      :rows="10"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="loginForm.password"
                      :type="passw"
                      class="elInput"
                      autocomplete="off"
                      placeholder="请输入密码"
                    >
                      <i slot="suffix" :class="icon" @click="showPass"></i>
                    </el-input>
                    <div class="passw">忘记密码</div>
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      round
                      style="
                        width: 300px;
                        background-color: #256efd;
                        margin-top: 35px;
                      "
                      @click="handleLogin"
                      >登录</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="flagShow">
                <el-form
                  ref="rf"
                  :model="ruleForm"
                  status-icon
                  label-width="100px"
                  :rules="loginRules"
                  class="demo-ruleForm"
                >
                  <el-form-item label="手机号" prop="username">
                    <div style="display: flex" class="elInput">
                      <div class="elInput-photo">+86</div>
                      <el-input
                        v-model="ruleForm.username"
                        style="width: 250px; height: 50px"
                        placeholder="请输入账号"
                        :rows="10"
                      ></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="验证码" prop="password">
                    <div class="elInput" style="display: flex">
                      <el-input
                        v-model="ruleForm.password"
                        :type="passw"
                        autocomplete="off"
                        placeholder="请输入验证码"
                        style="width: 200px; height: 50px"
                      >
                      </el-input>
                      <el-button
                        :class="{ 'disabled-style': getCodeBtnDisable }"
                        :disabled="getCodeBtnDisable"
                        type="primary"
                        @click="getCode()"
                        >{{ codeBtnWord }}</el-button
                      >
                      <div></div>
                    </div>

                    <div class="passw">忘记密码</div>
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      round
                      style="
                        width: 300px;
                        background-color: #256efd;
                        margin-top: 35px;
                      "
                      @click="handleLogin"
                      >登录</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
              <div class="register">
                没有帐户？<a href="" style="color: #1890ff">立即注册</a>
              </div>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script>
// import { login } from '@/api/user'

export default {
  data () {
    // 校验手机号
    const validateUsername = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入合法的手机号'))
      } else {
        callback()
      }
    }
    return {
      isuser: true,
      loginForm: {
        username: '',
        password: ''
      },
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }]
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { max: 4, message: '长度4字符', trigger: 'blur' }
        ]
      },
      passw: 'password',
      icon: 'el-input__icon el-icon-view',
      show: true,
      flagShow: false,
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61 // 获取验证码按钮失效时间

    }
  },
  mounted () {

  },
  computed: {

    // 用于校验手机号码格式是否正确

    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get () {
        if (this.waitTime === 61) {
          if (this.ruleForm.username) {
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
    cepateLogin () {
      this.isuser = false
      this.show = false
      this.flagShow = true
    },
    user () {
      this.isuser = true
      this.show = true
      this.flagShow = false
    },
    showPass () {
      if (this.passw === 'text') {
        this.passw = 'password'
        // 更换图标
        this.icon = 'el-input__icon el-icon-view'
      } else {
        this.passw = 'text'
        this.icon = 'el-input__icon el-icon-loading'
      }
    },
    async handleLogin () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          try {
            await this.$store.dispatch('user/fetchLogin', this.loginForm)

            if (this.$store.state.user.token) {
              this.$message.success('登录成功')
              this.$router.push('/dashboard')
            }
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    // 验证码
    async getCode () {
      // if (this.ruleForm.mobile) {
      //   this.mobile = this.ruleForm.mobile

      //   const res = await getverification(this.mobile)

      //   if (res.code === 200) {
      //     this.$message({
      //       message: '验证码已发送，请稍候...',
      //       type: 'success',
      //       center: true
      //     })
      //   }

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

</script>
<style scoped lang="scss">
.login-content {
  width: 100%;
  height: 600px;
  background-color: #f5f5f5;
  padding: 40px;
  .login-image {
    width: 100%;
    height: 525px;
    // background-color: pink;
    padding-top: 55px;
    .image {
      width: 578px;
      height: 406px;
      // background-color: aqua;
      margin: 0 auto;
      border: 1px dashed #999;
    }
  }
  .login-form {
    width: 100%;
    height: 550px;
    // background-color: red;
    .form {
      width: 450px;
      height: 480px;
      background-color: #fff;
      border-radius: 20px;
      padding-top: 40px;
    }
  }
}
.login-footer {
  width: 100%;
}
.Qiehuan {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  // background-color: pink;
}
.Qiehuan p {
  width: 40%;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
.Qiehuan .active {
  width: 40%;
  text-align: center;
  font-size: 20px;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
  color: #1890ff;
  cursor: pointer;
}
.demo-ruleForm {
  margin-top: 50px;
}
.el-input__inner {
  height: 35px !important;
}
::v-deep input.el-input__inner {
  height: 38px;
}
::v-deep .el-input__icon {
  height: 45px;
}
.passw {
  // background-color: pink;
  padding-left: 245px;
  font-size: 13px;
  color: #d09d8a;
  line-height: 5px;
  margin-top: 15px;
}
.register {
  // background-color: pink;
  text-align: center;
  margin-top: 30px;
  font-size: 14.5px;
  color: #999;
}
::v-deep input.el-input__inner {
  border: 0;
}
.elInput {
  width: 300px;
  height: 40px;
  border: 1px solid rgb(220, 223, 230);
  border-radius: 5px;
  .elInput-photo {
    width: 50px;
    height: 26px;
    // background-color: pink;
    margin-top: 8px;
    border-right: 1px solid rgb(220, 223, 230);
    text-align: center;
    font-size: 16px;
    line-height: 26px;
  }
}
.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
::v-deep button.el-button.el-button--primary.is-disabled.disabled-style {
  border: 0;
  border-radius: 0;
  border-left: 1px solid rgb(220, 223, 230);
}
</style>
