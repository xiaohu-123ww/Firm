<template>
  <div>
    <div class="login-content">
      <el-row>
        <el-col :span="13"
          ><div class="login-image">
            <div class="image">
              <img
                src="../../.../../../assets/picture/beijingkejigan@2x.png"
                alt=""
              />
            </div></div
        ></el-col>
        <el-col :span="11"
          ><div class="login-form">
            <div class="form"></div></div
        ></el-col>
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
.login-content {
  width: 100%;
  height: 600px;
  background-color: #f5f5f5;
  padding: 40px;
  .login-image {
    width: 100%;
    height: 525px;
    // background-color: pink;
    padding-top: 55px;
    .image {
      width: 578px;
      height: 406px;
      // background-color: aqua;
      margin: 0 auto;
      border: 1px dashed #999;
    }
  }
  .login-form {
    width: 100%;
    height: 550px;
    // background-color: red;
    .form {
      width: 520px;
      height: 525px;
      background-color: #fff;
      border-radius: 20px;
    }
  }
}
.login-footer {
  width: 100%;
}
</style>
