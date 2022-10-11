<template>
  <div class="department-container">
    <span class="department-text">
      <Navbar :title="title" />
      职位中心
    </span>
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Department',
  components: { Navbar },
  data () {
    return {
      title: '职位中心'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
