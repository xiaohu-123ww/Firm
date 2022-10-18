<template>
  <div>
    <el-dialog
      title="面试详情"
      :visible.sync="flag"
      width="30%"
      :before-close="close"
    >
      <div class="particulars">
        <div class="particulars-title">
          <div class="particulars-img">
            <img src="../../../assets/img/touxiang.png" alt="" class="img" />
          </div>
          <div>
            <div style="font-size: 18px; margin-bottom: 8px; font-weight: 700">
              洛先生
            </div>
            <div style="font-size: 12px; color: #c0c0c0">
              面试岗位：机械臂控制工程师
            </div>
          </div>
        </div>
        <p>面试时间：2022-05-06 10：00-12：00</p>
        <p>面试地点：北京市海淀区西小口66号中关村东升科技园北岭BB-2楼</p>
        <span>联系人：洛先生</span>
        <span style="margin-left: 80px">联系电话：132 9920 0929</span>
        <p>注意事项：携带简历</p>
        <p v-if="arr.interview">
          面试结果：<span style="color: red">已完成</span>
        </p>
        <p v-else>面试结果：<span style="color: red">未完成</span></p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="arr.interview"
          style="background-color: #256efd; color: #fff"
          @click="close"
          >再次邀约</el-button
        >
        <el-button
          v-else
          style="background-color: #256efd; color: #fff"
          @click="close"
          >取消面试</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    flag: {
      type: Boolean
    },
    arr: {
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
      this.$emit('reset', false)
      console.log(this.arr)
    }
  }
}
</script>
<style scoped lang="scss">
.particulars {
  width: 100%;
  // height: 200px;
  // background-color: pink;
  border-bottom: 1px solid #c0c0c0;
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
</style>
