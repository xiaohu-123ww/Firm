<template>
  <div class="department-container">
    <Navbar :title="title" :icon="icon" />
    职位中心
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'

export default {
  name: 'Department',
  components: { Navbar },
  data () {
    return {
      title: '职位中心',
      icon: 'biao'
    }
  }
}
</script>

<style lang="scss" scoped>
.department-container {
  position: relative;
}
</style>
