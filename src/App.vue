<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getStates } from '@/api/user'
import { init } from '@/utils/Rongyun.js'
export default {
  name: 'App',
  data () {
    return {
      appkey: 'x18ywvqfxzbbc', // 这是我们之前保存的 appkey *重要
      // token: 'LjTUM4RRd77AC0wBYe7EXv87vDsupqPVId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com', // token 可以多次生成 之前也有介绍过  111
      // targetId: '222',
      token: 'T49ETEn2ClzAC0wBYe7EXu1myZApMOIDId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com', // 222
      targetId: '111', // 你要给谁发送消息 目标ID
      showDatas: []
    }
  },
  created () {
    // this.start()
    this.timer = window.setInterval(() => {
      this.start()
      // setTimeout(this.start(), 0)
      // 每三分钟执行 6000*10 * 3
    }, 300000)
    // this.timers = window.setInterval(() => {
    //   this.Rong()
    //   // setTimeout(this.start(), 0)
    //   // 每三分钟执行 6000*10 * 3
    // }, 300)
  },
  mounted () {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    // window.onbeforeunload = function (e) {
    //   const storage = window.localStorage
    //   storage.clear()
    // }
  },
  methods: {
    async start () {
      // console.log('token', this.$store.state.user.token)
      if (this.$store.state.user.token) {
        // setInterval(async () => {
        const res = await getStates()
        console.log('状态', res)
        // }, 30)
      }
    },
    Rong () {
      // console.log('token', this.$store.getters.token)
      if (this.$store.state.user.token) {
        // setInterval(async () => {
        // console.log('1`2`3`')
        this.initRongCloud()
        // }, 10)
      }
    },
    addPromptInfo (prompt, userId = null) {
      const _this = this

      // const avatarList = [
      //   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=26&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2988245209,2476612762&fm=26&gp=0.jpg',
      //   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg',
      //   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3684587473,1286660191&fm=26&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=26&gp=0.jpg'
      // ]

      // 真实环境是通过登录 后台接口返回的 token 拿到的用户信息  我在这为为了模拟 所以给初始化后的用户随机生成一个头像
      // const avatar = avatarList[Math.floor(Math.random() * (3 + 1))]
      const avatar = 'https://znzz.tech/loc/static/img/1 (2)_30e4b8e4.jpg'
      _this.showDatas.push(prompt)
      const timer = setInterval(() => {
        if (userId) {
          clearInterval(timer) // 路由跳转后销毁定时器
          _this.$store.commit('SET_MEMBER', { // 保存用户信息
            userId: userId,
            avatar: avatar
          })
          _this.$store.commit('SET_TARGETID', _this.targetId)

          // this.$store.commit('SET_ANSWER', _this.showDatas)// 保存目标ID
          _this.states = true

          console.log('_this.$store.state.memberInfo', _this.$store.state.num.memberInfo, userId, _this.showDatas)
          // this.$refs.send.sendMessage()

          // this.num()
          // this.$emit('res')

          // _this.$router.push({ name: 'RongCloud' })
        }
      }, 500)
    },

    initRongCloud () {
      var appkey = this.appkey
      var token = this.token
      if (!appkey || !token) {
        // alert('appkey 和 token 不能为空')
      } else {
        // 这个init 是我们之前撸的 `utils.js`
        init({
          appkey: appkey,
          token: token
        }, this.addPromptInfo)
        // getFriendsFromService()
        // init.Conversation.then(conversationList => {
        //   console.log('获取会话列表成功', conversationList)
        // }).catch(error => {
        //   console.log('获取会话列表失败: ', error.code, error.msg)
        // })
        // im.Conversation.getList().then(conversationList => {
        //   console.log('获取会话列表成功', conversationList)
        // }).catch(error => {
        //   console.log('获取会话列表失败: ', error.code, error.msg)
        // })
      }
    }

  }
}
</script>
<style scoped lang="scss">
</style>
