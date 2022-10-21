<template>
  <div class="login-container">
    <Login />
    <div class="login-from">
      <el-row>
        <el-col :span="5">
          <div
            class="login-span"
            style="margin-bottom: 20px; color: #999; font-size: 13px"
          >
            企业服务
          </div>
          <div class="login-span">智能制造技能培训</div>
          <div class="login-span">产业合作</div>
          <div class="login-span">人力资源服务</div>
        </el-col>
        <el-col :span="9">
          <div
            class="login-span"
            style="margin-bottom: 20px; color: #999; font-size: 13px"
          >
            联系我们
          </div>
          <div class="login-span">企业服务热线 186-1021-8901</div>
          <div class="login-span">企业邮箱 talent@shiyenet.com.cn</div>
          <div class="login-span">工作时间 10：00-18：00</div>
        </el-col>
        <el-col :span="8">
          <div class="login-firm">
            <img src="../../assets/picture/logo.png" alt="" />
          </div>
          <div class="image">
            <div class="login-znzz">
              <img src="../../assets/picture/douyin@2x.png" alt="" />
              <div style="font-size: 13px">抖音</div>
            </div>
            <div class="login-znzz">
              <img src="../../assets/picture/xiaochengxu@2x.png" alt="" />
              <div style="font-size: 13px">小程序</div>
            </div>
            <div class="login-znzz">
              <img src="../../assets/picture/dingyuehao@2x.png" alt="" />
              <div style="font-size: 13px">订阅号</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <Footer class="footer" />
  </div>
</template>
<script>
import Login from './components/login.vue'
import Footer from '@/views/footer/index.vue'
export default {
  components: { Login, Footer },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.login-container {
  // background-image: url('../../assets/image/logoback.png');
  width: 100%;
  height: 100vh;
  background-color: #fff;

  position: relative;
  .login-from {
    padding: 30px 160px;
    .login-span {
      height: 35px;
      // background-color: pink;
      font-size: 14px;
    }
    .login-firm {
      width: 100%;
      height: 50px;
      // background-color: rgb(194, 192, 255);
    }
    .image {
      width: 100%;
      height: 120px;
      // background-color: blueviolet;
      display: flex;
      .login-znzz {
        width: 95px;
        height: 120px;
        margin-top: 10px;
        // background-color: brown;
        text-align: center;
        margin-right: 43px;
        color: #666;
      }
    }
  }
  .footer {
    height: 30px;
    background-color: #fff;
    text-align: center;
    color: #a4a6a8;
    font-size: 15px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
