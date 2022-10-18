<template>
  <div class="talents">
    <div class="talents-recommend">人才管理</div>
    <div class="recommend">
      <el-row>
        <el-col :span="2"
          ><div
            class="grid-content"
            :class="{ bg: backgroundColor === 1 }"
            @click="change"
          >
            新招呼（7）
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content"
            :class="{ bg: backgroundColor === 2 }"
            @click="changeJAVA"
          >
            未回复（8）
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content"
            :class="{ bg: backgroundColor === 3 }"
            @click="robot"
          >
            沟通中（3）
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content"
            :class="{ bg: backgroundColor === 4 }"
            @click="vision"
          >
            已约面（8）
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content"
            :class="{ bg: backgroundColor === 5 }"
            @click="visionss"
          >
            不合适（8）
          </div></el-col
        >

        <el-col :span="13" style="padding-left: 400px; display: flex">
          <el-input
            v-model="text"
            placeholder="输入职位名称/城市"
            prefix-icon="el-icon-search"
            style=""
          >
          </el-input>
          <el-button type="primary" style="height: 30px; line-height: 2px"
            >搜索</el-button
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
      backgroundColor: 1,
      text: ''
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    change () {
      this.backgroundColor = 1
      this.$emit('change', true)
    },
    changeJAVA () {
      this.backgroundColor = 2
      this.$emit('changeJava', true)
    },
    robot () {
      this.backgroundColor = 3
      this.$emit('changeRobot', true)
    },
    vision () {
      this.backgroundColor = 4
      this.$emit('changevision', true)
    },
    visionss () {
      this.backgroundColor = 5
    }
  }
}
</script>
<style scoped lang="scss">
.talents {
  height: 100px;
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
    height: 35px;
    font-size: 15px;
  }
}
.bg {
  border-bottom: 2px solid #256efd;
  color: #256efd;
}
</style>
