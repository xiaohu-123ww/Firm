<template>
  <div>
    <div v-if="vanish">
      <div v-if="show">
        <div v-if="flagShow" class="position">
          <div class="position-manage">
            <el-row>
              <el-col :span="21"> 职位管理 </el-col>
              <el-col :span="3">
                <el-button
                  round
                  class="bt"
                  style="
                    background-color: #f09667;
                    color: #fff;
                    font-size: 1px;
                    margin-top: 10px;
                  "
                  @click="postJob"
                  >发布职位<i class="el-icon-plus"></i
                ></el-button>
              </el-col>
            </el-row>
          </div>
          <div class="position-state">
            <el-row>
              <el-col :span="3"
                ><a href="javascript:;"
                  ><div
                    :class="{ bd: changeColor === 1 }"
                    class="line"
                    @click="onLine"
                  >
                    在线中
                  </div></a
                ></el-col
              >
              <el-col :span="3">
                <a href="javascript:;">
                  <div
                    :class="{ bd: changeColor === 2 }"
                    class="line"
                    @click="noOnLine"
                  >
                    未上线
                  </div></a
                >
              </el-col>
              <el-col :span="3">
                <a href="javascript:;">
                  <div
                    :class="{ bd: changeColor === 3 }"
                    class="line"
                    @click="underReview"
                  >
                    审核中
                  </div></a
                >
              </el-col>
              <el-col :span="8">
                <a href="javascript:;">
                  <div
                    :class="{ bd: changeColor === 4 }"
                    class="line"
                    @click="notPass"
                  >
                    未通过
                  </div></a
                >
              </el-col>
              <el-col :span="5" class="bt">
                <el-input
                  v-model="text"
                  placeholder="输入职位名称/城市"
                  prefix-icon="el-icon-search"
                ></el-input>
                <el-button
                  style="
                    background-color: #256efd;
                    height: 33px;
                    line-height: 5px;
                    color: #fff;
                  "
                  @click="fullnameChange"
                  >搜索</el-button
                >
              </el-col>
            </el-row>
          </div>
        </div>
        <el-empty
          v-if="lodingState"
          description="暂无数据"
          style="margin-top: 150px"
        ></el-empty>
        <div>
          <div
            v-if="loading"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgb(244, 246, 249)"
            style="height: 700px; font-size: 100px"
          ></div>
          <div v-else>
            <List
              class="detailClass"
              :num="num"
              :button-on-line="buttonOnLine"
              :button-no-on-line="buttonNoOnLine"
              :button-under-review="buttonUnderReview"
              :button-not-pass="buttonNotPass"
              @hidden="hidden"
              @succeed="succeed"
              @line="line"
              @hiddenList="hiddenList"
              @amend="amend"
              @copy="copy"
            />
            <Page
              v-if="state"
              class="position-page"
              :total="total"
              :limit="limit"
              :offset="offset"
              @handleSize="handleSize"
              @handleCurrentChange="handleCurrentChange"
            />
          </div>
        </div>
      </div>
      <Post v-else @reset="reset" />
    </div>
    <Msg v-if="hiddenAsymc" :job-amend="jobAmend" @reset="reset2" />
    <Copy v-if="nan" :copy-list="copyList" @ret="ret" />
  </div>
</template>
<script>
import List from './list.vue'
import Page from './page.vue'
import Post from './post.vue'
import Msg from './msg.vue'
import Copy from './copy.vue'
import { getOnline, getfullnameCity } from '@/api/department/online'

export default {
  components: { List, Post, Page, Msg, Copy },
  data () {
    return {
      changeColor: 1,
      text: '',
      show: true,
      flagShow: true,
      num: [

      ],
      status: 0,
      total: 0,
      loading: false,
      lodingState: false,
      limit: 5,
      offset: 1,
      state: false,
      buttonOnLine: false,
      buttonNoOnLine: false,
      buttonUnderReview: false,
      buttonNotPass: false,
      jobAmend: {},
      hiddenAsymc: false,
      vanish: true,
      nan: false,
      copyList: {}

    }
  },
  mounted () {

  },
  computed: {

  },

  created () {
    this.getOnlineList()
  },
  methods: {
    // 在线中
    onLine () {
      this.changeColor = 1
      this.getOnlineList()
    },
    // 未上线
    async noOnLine () {
      this.changeColor = 2

      this.loading = true
      this.status = 3
      const res = await getOnline(this.status, this.limit)
      console.log('未上线', res)
      if (res.data.data.results.length === 0) {
        this.lodingState = true
        this.state = false
      } else {
        this.lodingState = false
        this.state = true
        this.buttonNoOnLine = true
        this.buttonOnLine = false
        this.buttonUnderReview = false
        this.buttonNotPass = false
      }
      this.total = res.data.data.count
      this.num = res.data.data.results
      this.loading = false
    },
    // 审核
    async underReview () {
      this.changeColor = 3
      this.loading = true
      this.status = 1
      const res = await getOnline(this.status, this.limit)
      console.log('审核', res)
      if (res.data.data.results.length === 0) {
        this.lodingState = true
        this.state = false
      } else {
        this.lodingState = false
        this.state = true
        this.buttonNoOnLine = false
        this.buttonOnLine = false
        this.buttonUnderReview = true
        this.buttonNotPass = false
      }
      this.total = res.data.data.count
      this.num = res.data.data.results
      this.loading = false
    },
    // 未通过
    async notPass () {
      this.changeColor = 4
      this.loading = true
      this.status = 0
      const res = await getOnline(this.status, this.limit)
      console.log('未通过', res)
      if (res.data.data.results.length === 0) {
        this.lodingState = true
        this.state = false
      } else {
        this.lodingState = false
        this.state = true
        this.buttonNoOnLine = false
        this.buttonOnLine = false
        this.buttonUnderReview = false
        this.buttonNotPass = true
      }
      this.total = res.data.data.count
      this.num = res.data.data.results
      this.loading = false
    },

    postJob () {
      this.show = false
    },
    reset (i) {
      this.show = i
      if (this.changeColor === 1) {
        this.getOnlineList()
      } else if (this.changeColor === 2) {
        this.noOnLine()
      } else if (this.changeColor === 3) {
        this.underReview()
      } else {
        this.notPass()
      }
    },
    // 职位详情
    async hidden (i) {
      this.flagShow = i
      this.state = false
    },
    hiddenList (i) {
      this.flagShow = i
      this.state = true
    },
    async getOnlineList () {
      this.loading = true
      this.status = 2
      const res = await getOnline(this.status, this.limit)
      console.log('在线中', res)
      if (res.data.data.results.length === 0) {
        this.lodingState = true
        this.state = false
      } else {
        this.lodingState = false
        this.state = true
        this.buttonOnLine = true
        this.buttonNoOnLine = false
        this.buttonUnderReview = false
        this.buttonNotPass = false
      }
      this.total = res.data.data.count
      this.num = res.data.data.results
      this.loading = false
    },
    // 每页条数
    handleSize (page) {
      console.log('条数', page)
      this.limit = page
      if (this.changeColor === 1) {
        this.onLine()
      } else if (this.changeColor === 2) {
        this.noOnLine()
      } else if (this.changeColor === 3) {
        this.underReview()
      } else if (this.changeColor === 4) {
        this.notPass()
      }
    },
    // 第几页
    async handleCurrentChange (val) {
      console.log(val)
      this.offset = val
      this.off = (val - 1) * this.limit
      if (this.text === '') {
        if (this.changeColor === 1) {
          this.status = 2
          const res = await getOnline(this.status, this.limit, this.off)
          console.log('在线中', res)
          this.total = res.data.data.count
          this.num = res.data.data.results
        } else if (this.changeColor === 2) {
          this.status = 3
          const res = await getOnline(this.status, this.limit, this.off)
          console.log('未上线', res)
          this.total = res.data.data.count
          this.num = res.data.data.results
        } else if (this.changeColor === 3) {
          this.changeColor = 3
          this.status = 1
          const res = await getOnline(this.status, this.limit, this.off)
          console.log('审核', res)
          this.total = res.data.data.count
          this.num = res.data.data.results
        } else if (this.changeColor === 4) {
          this.status = 0
          const res = await getOnline(this.status, this.limit, this.offset)
          console.log('未通过', res)
          this.total = res.data.data.count
          this.num = res.data.data.results
        }
      } else {
        if (this.changeColor === 1) {
          this.status = 2
          const res = await getfullnameCity(this.status, this.limit, this.off, this.text)
          console.log('在线中', res)
          this.total = res.data.data.count
          this.num = res.data.data.results
        } else if (this.changeColor === 2) {
          this.status = 3
          const res = await getfullnameCity(this.status, this.limit, this.off, this.text)
          console.log('未上线', res)
          this.total = res.data.data.count
          this.num = res.data.data.results
        } else if (this.changeColor === 3) {
          this.status = 1
          const res = await getfullnameCity(this.status, this.limit, this.off, this.text)
          console.log('审核', res)
          this.total = res.data.data.count
          this.num = res.data.data.results
        } else if (this.changeColor === 4) {
          this.status = 0
          const res = await getfullnameCity(this.status, this.limit, this.offset, this.text)
          console.log('未通过', res)
          this.total = res.data.data.count
          this.num = res.data.data.results
        }
      }
    },
    // 搜索
    async getfullname () {
      const { data } = await getfullnameCity(this.status, this.limit, this.offset, this.text)
      console.log('搜素', data)
      if (data.data.results.length !== 0) {
        this.lodingState = false
        this.state = true
        this.num = data.data.results
      } else {
        this.lodingState = true
        this.state = false
        this.num = []
      }
    },
    // 搜索
    async fullnameChange () {
      if (this.text !== '') {
        if (this.changeColor === 1) {
          this.status = 2
          this.getfullname()
        } else if (this.changeColor === 2) {
          this.status = 3
          this.getfullname()
        } else if (this.changeColor === 3) {
          this.status = 1
          this.getfullname()
        } else if (this.changeColor === 4) {
          this.status = 0
          this.getfullname()
        }
      } else {
        this.$message.error('搜索数据为空 ! 请去输入吧')
      }
    },
    // 职位下线
    succeed () {
      this.onLine()
    },
    // 职位上线
    line () {
      this.noOnLine()
      // this.onLine()
    },
    amend (item) {
      console.log(item)
      this.jobAmend = item
      console.log(this.jobAmend)
      this.vanish = false
      this.hiddenAsymc = true
    },
    reset2 () {
      this.vanish = true
      this.hiddenAsymc = false
    },
    copy (item) {
      this.vanish = false
      this.nan = true
      this.copyList = item
    },
    ret () {
      this.vanish = true
      this.nan = false
    }
  }
}
</script>
<style scoped lang="scss">
.position {
  padding-left: 30px;
  height: 110px;
  background-color: #fff;
  // background-color: pink;
  .position-manage {
    height: 65px;
    // background-color: aqua;s
    line-height: 65px;
    font-weight: 700;
  }
  .position-state {
    height: 30px;
    // background-color: aquamarine;
    .line {
      height: 40px;
      font-size: 15px;
      width: 75px;
      // background-color: pink;
      text-align: center;
    }
    .bt {
      display: flex;
    }
  }
}
.bd {
  border-bottom: 2px solid #256efd;
  color: #256efd;
}
.position-page {
  // background-color: pink;
  width: 600px;
  margin: 0 0 30px 700px;
}
</style>
