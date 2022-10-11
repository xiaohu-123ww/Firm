<template>
  <div>
    <Navbar :title="title" />
    人才信息
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Information',
  components: { Navbar },
  data () {
    return {
      title: '人才信息'
    }
  }
}
</script>
<style scoped>
</style>
