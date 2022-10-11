<template>
  <div class="salary-container">
    <span class="salary-text"> <Navbar :title="title" />人才管理</span>
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Salary',
  components: { Navbar },
  data () {
    return {
      title: '人才管理'
    }
  }
}
</script>

<style lang="scss" scoped>
.salary-container {
}
</style>
