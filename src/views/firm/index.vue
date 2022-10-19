<template>
  <div>
    <Nava :show="false" />
    <HomePage />
  </div>
</template>
<script>
import Nava from './components/nava.vue'
import HomePage from './components/homepage.vue'
export default {
  components: { Nava, HomePage },
  data () {
    return {
      show: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style scoped>
</style>
