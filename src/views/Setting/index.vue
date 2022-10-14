<template>
  <div class="setting-container">
    <Navbar :title="title" :icon="icon" />
    <Talents />
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
import Talents from './components/talents.vue'
// import Recommend from './components/recommend.vue'
export default {
  name: 'Setting',
  components: { Navbar, Talents },
  data () {
    return {
      title: '人才推荐',
      icon: 'tui'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
