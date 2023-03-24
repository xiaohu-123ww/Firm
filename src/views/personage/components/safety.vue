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
                  +86 {{ photo ? photo : '去绑定手机号吧' }}
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button class="bg" round @click="photoChange">{{
                    photo ? '解绑' : '绑定'
                  }}</el-button>
                </div></el-col
              >
            </el-row>
          </div>
          <!-- <div class="safety">
            <el-row>
              <el-col :span="7"
                ><div class="grid-content bg-purple">邮箱</div></el-col
              >
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  {{ email ? email : '绑定邮箱吧' }}
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button class="bg" round @click="emailChange">{{
                    email ? '解绑' : '绑定'
                  }}</el-button>
                </div></el-col
              >
            </el-row>
          </div> -->
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
          <!-- <div class="safety">
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
          </div> -->
          <div class="safety">
            <el-row>
              <el-col :span="7"
                ><div class="grid-content bg-purple">实名认证</div></el-col
              >
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  姓名：{{ name ? name : 'XXX' }}
                  <span style="margin-left: 10px"
                    >身份证号：{{ card_id ? card_id : 'XXXXXXXX' }}</span
                  >
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-button
                    v-if="name && card_id"
                    class="bg"
                    round
                    @click="peopleNum"
                    >解绑</el-button
                  >
                  <el-button v-else class="bg" round @click="peopleChange"
                    >绑定</el-button
                  >
                </div></el-col
              >
            </el-row>
          </div>
        </div>
        <PhotoDialog :is-show="isShow" @reset="reset" />
        <EmailDialog :email-show="emailShow" @reset="reset" />
        <Password :show="show" :num="num" @reset="reset" />
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
import { getAuthentication, getAuthen } from '@/api/personage/index'
export default {
  components: { PhotoDialog, EmailDialog, Password, Chat, People },
  data () {
    return {
      photo: '',
      email: '',
      weChat: '',
      isShow: false,
      emailShow: false,
      show: false,
      weChatShow: false,
      dialogVisible: false,
      people: '',
      peopleShow: false,
      card_id: '',
      name: '',
      num: '',
      list: {

      }

    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.getList()
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
      this.getList()
    },
    emailChange () {
      this.emailShow = true
    },
    async getList () {
      const { data } = await getAuthentication()
      console.log('安全信息', data)
      this.list = data.data
      this.photo = data.data.phone_number
      this.email = data.data.email
      this.name = data.data.real_name_authentication.name
      this.card_id = data.data.real_name_authentication.card_id
      this.num = data.data.phone_number
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
    },
    // 解绑
    async peopleNum () {
      const res = await getAuthen()
      console.log('res', res)
      this.$message.success('实名认证解绑成功')
      this.getList()
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
::v-deep .el-dialog__header {
  background: #fff !important;
  // height: 60px;
  // padding: 30px;
}
</style>
