<template>
  <div class="permission-container">
    <span class="permission-text">
      <Navbar :title="title" />
      互动消息
    </span>
  </div>
</template>
<script>

import Navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Permission',
  components: { Navbar },
  data () {
    return {
      title: '互动消息'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
