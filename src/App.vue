<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getStates } from '@/api/user'
export default {
  name: 'App',
  created () {
    this.start()
  },
  mounted () {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    // window.onbeforeunload = function (e) {
    //   const storage = window.localStorage
    //   storage.clear()
    // }
  },
  methods: {
    start () {
      console.log('token', this.$store.state.user.token)
      if (this.$store.state.user.token) {
        setInterval(async () => {
          const res = await getStates()
          console.log('状态', res)
        }, 300000)
      }
    }

  }
}
</script>
<style scoped lang="scss">
</style>
