<template>
  <div>
    <div class="init">
      <p title="连接融云" />
      <el-input v-model="appkey" placeholder="请输入您的 appkey"></el-input>
      <el-input v-model="token" placeholder="请输入您的 token"></el-input>
      <el-input v-model="targetId" placeholder="请输入您的 targetId"></el-input>
      <el-button type="primary" @click="initRongCloud">初始化连接</el-button>

      <div class="rong-show-box">
        <p v-for="data in showDatas" :key="data">
          {{ data }}
        </p>
      </div>
    </div>
    <div slot="footer"></div>

    <!-- <RongCloud ref="send" :states="states" /> -->
  </div>
</template>

<script>
import { init } from '@/utils/Rongyun.js'
export default {
  data () {
    return {
      appkey: 'x18ywvqfxzbbc', // 这是我们之前保存的 appkey *重要
      token: 'LjTUM4RRd77AC0wBYe7EXv87vDsupqPVId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com', // token 可以多次生成 之前也有介绍过  111
      targetId: '222',
      // token: 'T49ETEn2ClzAC0wBYe7EXu1myZApMOIDId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com', // 222
      // targetId: '111', // 你要给谁发送消息 目标ID
      showDatas: []
    }
  },
  methods: {
    addPromptInfo (prompt, userId = null) {
      const _this = this

      const avatarList = [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2988245209,2476612762&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3684587473,1286660191&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=26&gp=0.jpg'
      ]

      // 真实环境是通过登录 后台接口返回的 token 拿到的用户信息  我在这为为了模拟 所以给初始化后的用户随机生成一个头像
      const avatar = avatarList[Math.floor(Math.random() * (3 + 1))]
      _this.showDatas.push(prompt)
      const timer = setInterval(() => {
        if (userId) {
          clearInterval(timer) // 路由跳转后销毁定时器
          _this.$store.commit('SET_MEMBER', { // 保存用户信息
            userId: userId,
            avatar: avatar
          })
          _this.$store.commit('SET_TARGETID', _this.targetId) // 保存目标ID
          _this.$router.push({ name: 'RongCloud' })
        }
      }, 500)
    },
    initRongCloud () {
      var appkey = this.appkey
      var token = this.token
      if (!appkey || !token) {
        alert('appkey 和 token 不能为空')
      } else {
        // 这个init 是我们之前撸的 `utils.js`
        init({
          appkey: appkey,
          token: token
        }, this.addPromptInfo)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '~@/scss/utils';
.init-button {
  position: fixed !important;
  bottom: vw(30px);
  left: 50%;
  transform: translateX(-50%);
}

.rong-show-box {
  margin-top: vw(100px);
  text-align: center;
}
</style>

