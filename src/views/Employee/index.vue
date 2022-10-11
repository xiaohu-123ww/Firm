<template>
  <div class="employee-container">
    <span class="employee-text">
      <Navbar :title="title" />
      人才搜索
    </span>
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Employee',
  components: { Navbar },
  data () {
    return {
      title: '人才搜索'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
