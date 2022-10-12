<template>
  <div>
    <div class="block">
      <el-pagination
        background
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="100"
        layout="  prev, pager, next,sizes, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number
    }
  },
  data () {
    return {
      currentPage4: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage4 = val
      console.log(this.currentPage4)
      this.$emit('handleSize', this.currentPage4)
    }
  }

}
</script>
<style scoped>
</style>
