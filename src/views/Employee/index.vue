<template>
  <div class="employee-container">
    <span class="employee-text">
      <Navbar :title="title" :icon="icon" />
      <Search />
    </span>
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
import Search from './components/search.vue'
export default {
  name: 'Employee',
  components: { Navbar, Search },
  data () {
    return {
      title: '人才搜索',
      icon: 'sou'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
