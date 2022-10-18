<template>
  <div>
    <el-dialog
      title="沟通职位"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
    >
      <el-radio
        v-for="item in radioArray"
        :key="item"
        v-model="radio"
        :label="item"
        style="height: 40px"
        >{{ item }}</el-radio
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      radio: '',
      radioArray: ['机械工程师', 'JAVA工程师', '工业机器人工程师', '机器视觉工程师']
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    close () {
      this.$emit('reset', false)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
