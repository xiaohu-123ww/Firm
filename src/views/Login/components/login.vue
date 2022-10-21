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
              <el-form
                ref="rf"
                :model="loginForm"
                status-icon
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="账号">
                  <el-input
                    v-model="loginForm.username"
                    style="width: 300px; height: 50px"
                    placeholder="请输入账号"
                    :rows="10"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input
                    v-model="loginForm.password"
                    :type="passw"
                    autocomplete="off"
                    style="width: 300px; height: 50px"
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
                    style="width: 300px; background-color: #256efd"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>

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

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      isuser: true,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {},
      passw: 'password',
      icon: 'el-input__icon el-icon-view'

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    cepateLogin () {
      this.isuser = false
    },
    user () {
      this.isuser = true
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
  margin-bottom: 35px;
}
.register {
  // background-color: pink;
  text-align: center;
  margin-top: 30px;
  font-size: 14.5px;
  color: #999;
}
</style>
