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
