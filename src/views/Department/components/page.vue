<template>
  <div>
    <div class="block">
      <el-pagination
        background
        :current-page="offset"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        layout="  prev, pager, next,sizes, jumper,total"
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
    },
    limit: {
      type: Number
    },
    offset: {
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
      this.$emit('handleSize', val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)

      this.$emit('handleCurrentChange', val)
    }
  }

}
</script>
<style scoped>
</style>
