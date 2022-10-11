<template>
  <div class="permission-container">
    <span class="permission-text">
      <Navbar :title="title" :icon="icon" />
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
      title: '互动消息',
      icon: 'el-icon-chat-dot-round'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
