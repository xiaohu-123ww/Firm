<template>
  <div class="salary-container">
    <Navbar :title="title" :icon="icon" />人才管理
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Salary',
  components: { Navbar },
  data () {
    return {
      title: '人才管理',
      icon: 'el-icon-user'
    }
  }
}
</script>

<style lang="scss" scoped>
.salary-container {
}
</style>
