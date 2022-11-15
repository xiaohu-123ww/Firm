<template>
  <div>
    <el-dialog
      title="沟通职位"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
    >
      <el-radio
        v-for="item in firm"
        :key="item.name"
        v-model="radio"
        :label="item.id"
        style="height: 40px; margin-left: 40px"
        >{{ item.name }}</el-radio
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeReset">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getEnterprise } from '@/api/setting/index'
import { getInterests } from '@/api/setting/index'
export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    id: {
      type: Number
    }
  },
  data () {
    return {
      radio: '',

      firm: []
    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getJob()
  },
  methods: {
    closeReset () {
      this.$confirm('确定取消吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { this.$emit('reset', false) })
    },
    async close () {
      console.log(this.radio)
      const res = await getInterests(this.id, this.radio)
      console.log('res', res)
      this.$message.success(res.data.msg)
      this.$emit('reset', false)
    },
    async getJob () {
      const { data } = await getEnterprise()
      console.log('job', data)
      this.firm = data.data
    }
  }
}
</script>
<style scoped lang="scss">
</style>
