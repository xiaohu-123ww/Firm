<template>
  <div>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgb(244, 246, 249)"
      style="height: 500px; font-size: 100px; backgroung-color: pink"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean
    }
  },
  data () {
    return {

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
