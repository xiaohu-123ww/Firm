<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style scoped lang="scss">
#app .sidebar-container .el-menu a li:hover span {
  color: #fff;
}
</style>
