<template>
  <div>
    <Navbar :title="title" :icon="icon" />
    <Message />
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
import Message from './components/message.vue'
export default {
  name: 'Information',
  components: { Navbar, Message },
  data () {
    return {
      title: '人才信息',
      icon: 'el-icon-collection-tag'
    }
  }
}
</script>
<style scoped>
</style>
