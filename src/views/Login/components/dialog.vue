
<template>
  <div v-if="sends">
    <el-dialog
      title="微信扫码登录"
      :visible.sync="sends"
      width="35%"
      :before-close="handleClose"
    >
      <div class="flex-box">
        <div
          style="border: 1px solid rgb(214 209 209); width: 30vh; height: 30vh"
        >
          <img :src="tick" alt="" style="width: 100%" />
        </div>
      </div>
      <div
        style="
          width: 100%;
          height: 100%;
          text-align: center;
          margin-top: 50px;
          font-weight: 700;
          fomt-size: 18px;
        "
      >
        扫描二维码并关注公众号，即可开启扫码登录功能
      </div>
    </el-dialog>
    <!-- <div
      style="height: 50px; font-size: 18px; line-height: 50px; margin-top: 20px"
    >
      微信扫码登录
    </div> -->
    <!-- <hr /> -->
  </div>
</template>
<script>

import { wxLogin, wxTicket, getLogin } from '@/api/wx'
import { setToken } from '@/utils/auth'
export default {
  // components: { VueQr },
  props: {
    sends: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      wx: {},
      tick: '',
      list: {
        code: null
      },
      task: null
    }
  },
  computed: {

  },
  mounted () {
    // this.creatQrCode() // 创建二维码
  },
  created () {
    // this.createQrcode()
    this.num()
  },
  methods: {
    handleClose () {
      clearInterval(this.task)
      this.$emit('weChatClone')
    },
    async createQrcode () {
      const { data } = await wxLogin()
      console.log('微信二维码', data.data)
      this.wx = data.data
      this.tick = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${data.data.ticket}`
      this.task = setInterval(async () => {
        const { data } = await wxTicket(this.wx.login_scene)
        console.log('是否登录', data)
        // this.list = data

        if (data.openid !== '' && data.phone !== null) {
          this.list.phone = data.phone
          this.list.openid = data.openid

          const res = await getLogin(this.list)

          // console.log('data1', data1)
          console.log('扫码了122', res)
          if (res.code === 1000) {
            setToken(res.skey)
            if (res.is_hr === true) {
              console.log('1779')
              setToken(res.skey)
              this.$router.push('/dashboard')
              clearInterval(this.task)
            } else {
              this.$message.success('此账号不是hr账户,请尝试其他登录方式')
              // console.log('不是hr')
              // setToken(res.skey)
              this.$emit('HrTrue')
              clearInterval(this.task)
            }
            // this.$router.push('/dashboard')
            // clearInterval(this.task)
          } else {
            this.$message.success(res.data.msg)
          }
        } else if (data.openid !== '' && data.phone === null) {
          console.log('1233')
          this.$emit('getPhoto', data.openid)
          this.$message.success('扫码成功，绑定下手机号吧')
          clearInterval(this.task)
        }
      }, 1000)
    },
    async initMap () {
      console.log(121324)
      // if (this.list.phone === null || this.phone === '') {
      //   console.log(123)
      //   this.$emit('getPhoto', data.openid)
      //   this.$message.success('扫码成功，绑定下手机号吧')
      // }
      // clearInterval(task)
    },

    num () {
      const aa = [1, 2, 3, 4, 5, 6]
      const bb = [5, 3, 2]
      const cc = []
      for (var i = 0; i < aa.length; i++) {
        for (var j = 0; j < bb.length; j++) {
          // console.log(aa[i], bb[j])
          if (aa[i] === bb[j]) {
            cc.push(aa[i])
            console.log(cc)
          }
        }
      }
    }

  }

}

</script>
<style scoped lang="scss">
.flex-box {
  // background-color: pink;
  // padding: 0px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-dialog > .el-dialog__body {
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
}
::v-deep .el-dialog__title {
  color: #1657d8;
}
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
::v-deep .el-dialog__header {
  background: #fff !important;
  // height: 60px;
  // padding: 30px;
}
</style>
