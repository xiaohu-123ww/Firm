<template>
  <div>
    <el-card class="sa">
      <div>
        <div class="box">
          <div class="safety">
            <el-row>
              <el-col :span="7"
                ><div class="grid-content bg-purple">手机号</div></el-col
              >
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  +86 {{ photo }}
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button class="bg" round @click="photoChange"
                    >解绑</el-button
                  >
                </div></el-col
              >
            </el-row>
          </div>
          <div class="safety">
            <el-row>
              <el-col :span="7"
                ><div class="grid-content bg-purple">邮箱</div></el-col
              >
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  {{ email }}
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button class="bg" round @click="emailChange"
                    >解绑</el-button
                  >
                </div></el-col
              >
            </el-row>
          </div>
          <div class="safety">
            <el-row>
              <el-col :span="7"
                ><div class="grid-content bg-purple">密码</div></el-col
              >
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  为了您的账户安全，建议您定期修改密码
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button class="bg" round @click="changePassword"
                    >修改</el-button
                  >
                </div></el-col
              >
            </el-row>
          </div>
          <div class="safety">
            <el-row>
              <el-col :span="7"
                ><div class="grid-content bg-purple">微信</div></el-col
              >
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  {{ weChat ? weChat : '微信账号' }}
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button v-if="weChat === ''" type="primary" @click="chat"
                    >绑定</el-button
                  >
                  <el-button v-else class="bg" round @click="weChange"
                    >解绑</el-button
                  >
                </div></el-col
              >
            </el-row>
          </div>
          <div class="safety">
            <el-row>
              <el-col :span="7"
                ><div class="grid-content bg-purple">实名认证</div></el-col
              >
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  {{ people }}
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button class="bg" round @click="peopleChange"
                    >解绑</el-button
                  >
                </div></el-col
              >
            </el-row>
          </div>
        </div>
        <PhotoDialog :is-show="isShow" @reset="reset" />
        <EmailDialog :email-show="emailShow" @reset="reset" />
        <Password :show="show" @reset="reset" />
        <Chat :we-chat-show="weChatShow" @reset="reset" />
        <People :people-show="peopleShow" @reset="reset" />
        <el-dialog
          title="解绑微信"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <div class="text">
            解除绑定后，将不能再使用微信登录智能招聘网，确认解绑吗？
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              style="background-color: #256efd; color: #fff"
              @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import PhotoDialog from './resume/photoDialog.vue'
import EmailDialog from './resume/emailDialog.vue'
import Password from './resume/password.vue'
import Chat from './resume/weChat'
import People from './resume/people.vue'

export default {
  components: { PhotoDialog, EmailDialog, Password, Chat, People },
  data () {
    return {
      photo: '12889933456',
      email: '12345678@163.com',
      weChat: '123',
      isShow: false,
      emailShow: false,
      show: false,
      weChatShow: false,
      dialogVisible: false,
      people: '姓名：张三丰 身份证：1392341998******14',
      peopleShow: false

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    photoChange () {
      this.isShow = true
    },
    reset (i) {
      this.isShow = i
      this.emailShow = i
      this.show = i
      this.weChatShow = i
      this.peopleShow = i
    },
    emailChange () {
      this.emailShow = true
    },
    changePassword () {
      this.show = true
    },
    chat () {
      this.weChatShow = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    weChange () {
      this.dialogVisible = true
    },
    peopleChange () {
      this.peopleShow = true
    }

  }
}
</script>
<style scoped lang="scss">
.box {
  // background-color: pink;
  width: 800px;
  margin-left: 200px;
  .safety {
    height: 70px;
    // background-color: blueviolet;
    line-height: 70px;
    font-size: 17px;
    margin-bottom: 15px;
    .bg-purple {
      font-weight: 700;
    }
  }
}

.text {
  font-size: 15px;
  color: black;
  margin: 10px;
}
.bg {
  color: #1989fa;
  background-color: #e6f1fc;
  border: 1px solid #a3d0fd;
}
</style>
