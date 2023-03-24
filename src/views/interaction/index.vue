<template>
  <div>
    <Navbar :title="title" :icon="icon" />
    <Communication />
  </div>
</template>
<script>
import Navbar from '@/layout/components/Navbar.vue'
import Communication from './components/communication.vue'
export default {
  name: 'Interaction',
  components: { Navbar, Communication },
  data () {
    return {
      title: '互动消息',
      icon: '互动'
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {

  }
}
</script>
<style scoped>
</style>
