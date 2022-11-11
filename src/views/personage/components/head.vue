<template>
  <div class="ta">
    <div class="talents">
      <div class="talents-recommend">个人中心</div>
      <div class="recommend">
        <el-row>
          <el-col :span="2"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 1 }"
                @click="change"
              >
                基本信息
              </div></a
            ></el-col
          >
          <el-col :span="2">
            <a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 2 }"
                @click="changeJAVA"
              >
                安全中心
              </div></a
            ></el-col
          >
          <!-- <el-col :span="3"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 3 }"
                @click="robot"
              >
                我的企业
              </div></a
            ></el-col
          > -->
        </el-row>
      </div>
    </div>
    <Information v-if="state === 1" @reset="reset" />
    <Safety v-if="state === 2" />
    <!-- <My v-if="state === 3" /> -->
  </div>
</template>
<script>
import Information from './information.vue'
import Safety from './safety.vue'
// import My from './my.vue'
export default {
  components: { Information, Safety },
  data () {
    return {
      backgroundColor: 1,
      state: 1

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    change () {
      this.backgroundColor = 1
      this.state = 1
    },
    changeJAVA () {
      this.backgroundColor = 2
      this.state = 2
    },
    robot () {
      this.backgroundColor = 3
      this.state = 3
    },
    reset (i) {
      this.state = 1
    }
  }
}
</script>
<style scoped lang="scss">
.talents {
  height: 110px;
  padding-left: 30px;
  background-color: #fff;
  .talents-recommend {
    height: 65px;
    // background-color: pink;
    line-height: 65px;
    font-weight: 700;
  }
  .recommend {
    height: 35px;
    width: 100%;
    // background-color: aqua;
  }
  .grid-content {
    text-align: center;
    height: 45px;
    font-size: 15px;
  }
}
.bg {
  border-bottom: 2px solid #256efd;
  color: #256efd;
}
.card {
  margin: 20px;
}
</style>
