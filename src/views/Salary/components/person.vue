<template>
  <div>
    <div class="talents">
      <div class="talents-recommend">人才管理</div>
      <div class="recommend">
        <el-row>
          <el-col :span="2">
            <a href="javascript:;"
              ><div
                class="grid-content"
                :class="{ bg: backgroundColor === 1 }"
                @click="change"
              >
                新招呼（7）
              </div></a
            ></el-col
          >
          <el-col :span="2"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 2 }"
                @click="changeJAVA"
              >
                未回复（8）
              </div></a
            ></el-col
          >
          <el-col :span="2"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 3 }"
                @click="robot"
              >
                沟通中（3）
              </div></a
            ></el-col
          >
          <el-col :span="2"
            ><a href="javascript:;"
              ><div
                class="grid-content"
                :class="{ bg: backgroundColor === 4 }"
                @click="vision"
              >
                已约面（8）
              </div></a
            ></el-col
          >
          <el-col :span="2"
            ><a href="javascript:;"
              ><div
                class="grid-content"
                :class="{ bg: backgroundColor === 5 }"
                @click="visionss"
              >
                不合适（8）
              </div></a
            ></el-col
          >

          <el-col :span="12" style="padding-left: 420px; display: flex">
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

        <div></div>
      </div>
    </div>
    <div>
      <Talents />
      <Loading :loading="loading" />
    </div>
    <div v-if="!loading">
      <el-empty
        v-if="list.length === 0"
        description="暂无信息"
        style="height: 500px"
      ></el-empty>
      <div v-else>
        <!-- <List :list="list" /> -->
        <el-pagination
          background
          :current-page="offset"
          :page-sizes="[5, 10, 20]"
          :page-size="limit"
          layout="prev, pager, next,sizes, jumper,total"
          :total="total"
          style="margin: 0px 0px 20px 300px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getNewList, getWaitingList, getCommuniCatingList, getRejectedList } from '@/api/salarys/index'
import Talents from './talents.vue'
import Loading from './loading.vue'
// import List from './list.vue'
export default {
  components: { Talents, Loading },
  data () {
    return {
      backgroundColor: 1,
      text: '',
      total: 100,
      limit: 5,
      offset: 1,
      lists: {},
      loading: false,

      list: []
    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getNew()
  },
  methods: {
    change () {
      this.backgroundColor = 1
      this.getNew()
    },
    // 未回复
    async changeJAVA () {
      this.backgroundColor = 2
      this.loading = true
      const res = await getWaitingList(this.limit, this.lists)
      console.log('未回复', res)
      this.list = res.data.results
      this.loading = false
    },
    robot () {
      this.backgroundColor = 3
    },
    vision () {
      this.backgroundColor = 4
    },
    visionss () {
      this.backgroundColor = 5
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('handleSize', val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)

      this.$emit('handleCurrentChange', val)
    },
    // 新招呼
    async getNew () {
      this.loading = true
      const res = await getNewList(this.limit, this.lists)
      console.log('新招呼', res)
      this.list = res.data.results
      this.loading = false
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
