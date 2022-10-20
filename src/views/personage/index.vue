<template>
  <div>
    <Nava :num="num" />
    <Head />
  </div>
</template>
<script>
import Nava from './components/nava.vue'
import Head from './components//head.vue'
export default {
  components: { Nava, Head },
  data () {
    return {
      num: 2
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

