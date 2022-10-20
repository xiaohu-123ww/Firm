<template>
  <div class="my">
    <div class="my-card">
      <el-row>
        <el-col :span="3">
          <div class="card-image"></div>
        </el-col>
        <el-col :span="17">
          <p style="font-size: 18px">北京XXXX科技有限公司</p>
          <div class="text">
            <span class="spann">企业编号：0000001</span>
            <span style="margin-left: 20px">2022年3月21日加入</span>
          </div>
        </el-col>
        <el-col :span="4" style="line-height: 80px">
          <el-button style="background-color: #256efd; color: #fff"
            >离开企业</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
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
<style scoped lang="scss">
.my {
  height: 120px;
  background-color: #fff;
  margin: 50px;
}
.my-card {
  // width: 100%;
  height: 80px;
  padding: 20px 20px;
  // border-radius: 18px;

  .card-image {
    width: 80px;
    height: 80px;
    background-color: burlywood;
  }
  .text {
    font-size: 14px;
    color: #999;
    .spann {
      padding-right: 30px;
      // background-color: green;
      border-right: 1px solid #999;
    }
  }
}
</style>
