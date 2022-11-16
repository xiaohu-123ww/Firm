<template>
  <div class="ta">
    <div class="talents">
      <div class="talents-recommend">人才推荐</div>
      <div class="recommend" style="overflow: auto">
        <el-row>
          <el-col v-for="item in jobName" :key="item.id" :span="3"
            ><a href="javascript:;">
              <div
                style="padding: 5px 20px 0px"
                class="grid-content"
                @click="change(item.id)"
              >
                <div class="name" :class="{ bg: backgroundColor === item.id }">
                  {{ item.name }}
                </div>
              </div></a
            ></el-col
          >
          <!-- <el-col :span="3"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 2 }"
                @click="changeJAVA"
              >
                JAVA工程师
              </div></a
            ></el-col
          >
          <el-col :span="3"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 3 }"
                @click="robot"
              >
                机械机器人工程师
              </div></a
            ></el-col
          >
          <el-col :span="3">
            <a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 4 }"
                @click="vision"
              >
                机器视觉设计师
              </div></a
            ></el-col
          > -->
        </el-row>
      </div>
    </div>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgb(244, 246, 249)"
      style="height: 700px; font-size: 100px"
    ></div>
    <Recommend v-else :list="list" :position="position" />
    <el-empty
      v-if="list.length === 0"
      description="暂无数据"
      style="height: 500px"
    ></el-empty>
  </div>
</template>
<script>
import Recommend from '../components/recommend.vue'
import { getEnterprise, getCvRecommend } from '@/api/setting/index'
export default {
  components: { Recommend },
  data () {
    return {
      backgroundColor: 0,
      jobName: [],
      list: [

      ],
      position: 0,
      loading: true
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
    async change (i) {
      this.backgroundColor = i
      this.position = i
      const { data } = await getCvRecommend(i)
      console.log('列表', data)
      this.list = data.data
      this.loading = false
    },
    // changeJAVA () {
    //   this.backgroundColor = 2
    // },
    // robot () {
    //   this.backgroundColor = 3
    // },
    // vision () {
    //   this.backgroundColor = 4
    // },
    // 岗位
    async getJob () {
      const { data } = await getEnterprise()
      console.log('岗位', data)

      this.backgroundColor = data.data[0].id
      this.jobName = data.data
      this.loading = false
      this.position = data.data[0].id
      const res = await getCvRecommend(data.data[0].id)
      this.list = res.data.data
    }
    // 列表
    //     async getCvRecom(){
    // const {data}
    //     }
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
    // background-color: pink;
    padding: 0px 5px;
    height: 35px;
    font-size: 15px;
  }
}
.bg {
  border-bottom: 2px solid #256efd;
  color: #256efd;
}
.name {
  padding: 0px 5px 10px;
  // background-color: #256efd;
}
</style>
