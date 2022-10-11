<template>
  <div class="setting-container">
    <Navbar :title="title" :icon="icon" />
    人才推荐
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Setting',
  components: { Navbar },
  data () {
    return {
      title: '人才推荐',
      icon: 'tui'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
