<template>
  <div class="setting-container">
    <span class="setting-text">
      <Navbar :title="title" />
      人才推荐
    </span>
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Setting',
  components: { Navbar },
  data () {
    return {
      title: '人才推荐'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
