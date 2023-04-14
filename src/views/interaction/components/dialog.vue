<template>
  <div>
    <el-dialog title="" :visible.sync="visible" width="25%" :show-close="false">
      <div class="box">
        <h3 style="color: black">确定与对方交换电话吗?</h3>

        <p style="color: rgb(98, 98, 98); font-size: 14px; line-height: 20px">
          确定后，电话请求将发送至对方，对方同意后将会彼此看到手机号
        </p>
      </div>
      <div slot="footer">
        <el-button @click="dialog">取 消</el-button>
        <el-button
          type="primary"
          style="background-color: #409eff; color: #fff"
          @click="confirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    dialog () {
      console.log('13132')
      this.$emit('padlock')
    },
    confirm () {
      this.$emit('phoneNumber')
    }

  }
}
</script>
<style scoped lang="scss">
::v-deep .el-dialog__header {
  height: 160px;
  background-image: url('../../../assets/image/bei1.png');
  background-size: 100% 160px;
}
.box {
  padding-left: 30px;
  // border-bottom: 1px solid #e6e3e3;
}
::v-deep .el-dialog__footer {
  text-align: center;
}
// ::v-deep .el-dialog {
//   display: flex;
//   flex-direction: column;
//   margin: 0 !important;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   /*height:600px;*/
//   max-height: calc(100% - 200px);
//   max-width: calc(100% - 30px);
// }
// ::v-deep .el-dialog .el-dialog__body {
//   flex: 1;
//   overflow: auto;
// }
</style>
