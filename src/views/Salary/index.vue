<template>
  <div class="salary-container">
    <Navbar :title="title" :icon="icon" />
    <Person />
    <!-- <Talents
      :show="show"
      :call="call"
      :communication="communication"
      :face="face"
    /> -->
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'

import Person from './components/person.vue'
export default {
  name: 'Salary',
  components: { Navbar, Person },
  data () {
    return {
      title: '人才管理',
      icon: '人才信息'

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
