<template>
  <div class="department-container">
    <Navbar :title="title" :icon="icon" />
    <Position />
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
import Position from './components/position.vue'
export default {
  name: 'Department',
  components: { Navbar, Position },
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
