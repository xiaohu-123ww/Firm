<template>
  <div class="salary-container">
    <Navbar :title="title" :icon="icon" />
    <Person />
    <Talents />
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
import Talents from './components/talents.vue'
import Person from './components/person.vue'
export default {
  name: 'Salary',
  components: { Navbar, Person, Talents },
  data () {
    return {
      title: '人才管理',
      icon: 'el-icon-user'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
