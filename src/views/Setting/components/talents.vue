<template>
  <div>
    <div v-if="!details" class="ta">
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
                  <div
                    class="name"
                    :class="{ bg: backgroundColor === item.id }"
                  >
                    {{ item.name }}
                  </div>
                </div></a
              ></el-col
            >
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
      <Recommend
        v-else
        :list="list"
        :position="position"
        :online="online"
        @newResume="newResume"
      />
      <el-empty
        v-if="list.length === 0"
        description="暂无数据"
        style="height: 500px"
      ></el-empty>
    </div>
    <Recommendsss v-if="details" :resume-list="resumeList" />

    <el-empty
      v-if="empty"
      description="暂无数据"
      style="height: 500px"
    ></el-empty>
  </div>
</template>
<script>
import Recommend from '../components/recommend.vue'
import { getEnterprise, getCvRecommend, getResume } from '@/api/setting/index'
import Recommendsss from './resumeDetails.vue'
export default {
  components: { Recommend, Recommendsss },
  data () {
    return {
      backgroundColor: 0,
      jobName: [],
      list: [

      ],
      position: 0,
      loading: true,
      details: false,
      resumeList: {},
      empty: false,
      online: {}
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
      this.online = data.user_online
      console.log('this.online', this.online)
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
      const list = Object.values(data.data)
      if (list.length === 0) {
        this.loading = false
        this.empty = true
      } else {
        console.log('list', list)

        this.backgroundColor = list[0].id

        this.empty = false
        this.jobName = data.data
        this.loading = false
        this.position = list[0].id
        const res = await getCvRecommend(list[0].id)
        console.log('123', res)
        this.list = res.data.data
        this.online = res.data.user_online
        console.log('this.online', this.online)
      }
    },
    // 简历详情
    async newResume (id) {
      console.log(id)
      const res = await getResume(id, this.position)
      console.log('简历', res)
      this.resumeList = res.data.data
      this.details = true
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
