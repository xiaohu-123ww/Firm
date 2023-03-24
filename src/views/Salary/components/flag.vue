<template>
  <div>
    <el-dialog
      title="面试详情"
      :visible.sync="flags"
      width="30%"
      :before-close="close"
    >
      <div v-if="flags" class="particulars">
        <div>
          <div class="particulars-title">
            <div class="particulars-img">
              <img :src="disposeImg(num.hr.avatar)" alt="" class="img" />
            </div>
            <div>
              <div
                style="font-size: 18px; margin-bottom: 8px; font-weight: 700"
              >
                {{ num.hr.name }}
              </div>
              <div style="font-size: 14px; color: #999">
                面试岗位：{{ num.position }}
              </div>
            </div>
          </div>
          <p>面试时间：{{ num.start_time }} - {{ num.end_time }}</p>
          <p>面试地点：{{ num.address }}</p>
          <p>联系人：{{ num.contactor }}</p>
          <p>联系电话：{{ num.contact }}</p>
          <p>注意事项：{{ num.notice }}</p>
          <p>
            面试结果：<span style="color: red">{{ num.result }}</span>
          </p>
          <p v-if="num.memo">备注：{{ num.memo }}</p>
          <!-- <p>面试结果：<span style="color: red">未完成</span></p> -->
        </div>
      </div></el-dialog
    >
  </div>
</template>
<script>
export default {
  props: {
    flags: {
      type: Boolean
    },
    num: {
      type: Object
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
      this.$emit('reset2', false)
    }
  }
}
</script>
<style scoped lang="scss">
.particulars {
  width: 100%;
  // height: 200px;
  // background-color: pink;
  // border-bottom: 1px solid #c0c0c0;
  .particulars-title {
    width: 100%;
    height: 50px;
    // background-color: aqua;
    display: flex;
    .particulars-img {
      width: 50px;
      height: 50px;
      // background-color: blanchedalmond;
      border-radius: 100px;
      overflow: hidden;
      margin-right: 16px;
      .img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
::v-deep .el-dialog__header {
  background: #fff !important;
  // height: 60px;
  // padding: 30px;
}
</style>
