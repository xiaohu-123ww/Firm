<template>
  <div>
    <div v-if="!details">
      <div class="talents">
        <div class="talents-recommend">人才管理</div>
        <div class="recommend" style="display: flex">
          <div style="display: flex; width: 72%">
            <a href="javascript:;"
              ><div
                class="grid-content"
                :class="{ bg: backgroundColor === 1 }"
                @click="change"
              >
                新招呼（{{ callss }}）
              </div>
            </a>
            <a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 2 }"
                @click="changeJAVA"
              >
                未回复（{{ Noreply }}）
              </div>
            </a>
            <a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 3 }"
                @click="robot"
              >
                沟通中（{{ communications }}）
              </div>
            </a>
            <a href="javascript:;"
              ><div
                class="grid-content"
                :class="{ bg: backgroundColor === 4 }"
                @click="vision"
              >
                已约面（{{ surface }}）
              </div>
            </a>
            <a href="javascript:;"
              ><div
                class="grid-content"
                :class="{ bg: backgroundColor === 5 }"
                @click="visionss"
              >
                不合适（{{ inappropriate }}）
              </div>
            </a>
          </div>
          <div style="display: flex">
            <el-input
              v-model="qw"
              placeholder="输入姓名搜索"
              prefix-icon="el-icon-search"
              style=""
            >
            </el-input>
            <el-button
              type="primary"
              style="height: 30px; line-height: 2px"
              @click="searchList"
              >搜索</el-button
            >
          </div>
        </div>
      </div>
      <div>
        <Talents @fast="fast" @search="search" @positionList="positionList" />
        <Loading :loading="loading" />
      </div>
      <div v-if="!loading">
        <el-empty
          v-if="list.length === 0"
          description="暂无信息"
          style="height: 500px"
        ></el-empty>
        <div v-else>
          <List
            :list="list"
            :show="show"
            :call="call"
            :face="face"
            :position="position"
            :communication="communication"
            @chat="chat"
            @reject="reject"
            @interests="interests"
            @newResume="newResume"
            @chating="chating"
          />
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
    <Recommendsss v-if="details" :resume-list="resumeList" :pid="pids" />
  </div>
</template>
<script>
import { getNewList, getWaitingList, getCommuniCatingList, getRejectedList, getInterviewList, getNewLists, getWaitingLists, getCommuniCatingLists, getRejectedLists, getInterviewLists, getState } from '@/api/salarys/index'
import Talents from './talents.vue'
import Loading from './loading.vue'
import List from './list.vue'
import Recommendsss from '../../Setting/components/resumeDetails'
import { getResume } from '@/api/setting/index'
import { getCandidate } from '@/api/employee/index'
import { getRetrivel, getRetrivelList } from '@/api/employee/index'
import { getEnterprise } from '@/api/setting/index'
export default {
  components: { Talents, Loading, List, Recommendsss },
  data () {
    return {
      pids: '',
      backgroundColor: 1,
      qw: '',
      total: 100,
      limit: 5,
      offset: 1,
      lists: {

      },
      loading: false,
      list: [],
      show: false,
      call: false,
      communication: false,
      face: false,
      position: false,
      details: false,
      resumeList: {},
      num: {},
      pid: 0,
      callss: 0,
      Noreply: 0,
      communications: 0,
      surface: 0,
      inappropriate: 0

    }
  },
  mounted () {
    // this.getNew()
  },
  computed: {

  },
  created () {
    this.getJob()
    this.getStateList()
  },
  methods: {
    positionList (id) {
      this.pid = id
      console.log('this.pid', this.pid)
      this.getNew()
    },
    async fast (id) {
      // this.loading = true
      console.log('id', id)
      this.pid = id
      console.log('id', this.pid)
      // this.getNew()
    },
    async getStateList () {
      const res = await getState()
      console.log('res123', res)
      this.callss = res.data.new
      this.Noreply = res.data.waiting
      this.communications = res.data.communicating
      this.surface = res.data.interviewed
      this.inappropriate = res.data.rejected
    },
    async getJob () {
      const { data } = await getEnterprise()
      console.log('job', data)
      const list = Object.values(data.data)
      console.log('123', list)
      // if (JSON.stringify(data) === '{}') {
      //   console.log(2)
      //   // this.$message.success('暂无上线职位，去上线招聘岗位吧')
      // } else {
      //   console.log(123)
      //   //
      // }
      if (list.length === 0) {
        console.log(1)
        this.$confirm('暂无上线职位，去上线招聘岗位吧', '提示', {
          confirmButtonText: '确定', // 确认按钮的文字显示
          type: 'warning',
          center: true, // 文字居中显示
          showCancelButton: false, // 不显示取消按钮
          showClose: false, // 是否显示右上角的x
          closeOnClickModal: false
        }).then(() => {
          this.pid = 0
          this.$router.push('/department')
        })
      } else {
        console.log(2)
        // this.pid = list[0].id
        // console.log('122', this.pid)
      }
    },
    change () {
      this.backgroundColor = 1
      this.getNew()
    },
    async search (list) {
      console.log('12344', list, this.pid)
      this.num = list
      if (this.qw !== '') {
        this.num.qw = this.qw
      }
      if (this.pid !== 0) {
        this.num.pid = this.pid
      }
      this.lists = this.num
      if (this.backgroundColor === 1) {
        this.getNew()
      } else if (this.backgroundColor === 2) {
        this.changeJAVA()
      } else if (this.backgroundColor === 3) {
        this.robot()
      } else if (this.backgroundColor === 4) {
        this.vision()
      } else if (this.backgroundColor === 5) {
        this.visionss()
      }
    },
    async searchList () {
      if (this.qw !== '') {
        this.num.qw = this.qw
      }
      this.lists = this.num
      if (this.backgroundColor === 1) {
        this.getNew()
      } else if (this.backgroundColor === 2) {
        this.changeJAVA()
      } else if (this.backgroundColor === 3) {
        this.robot()
      } else if (this.backgroundColor === 4) {
        this.vision()
      } else if (this.backgroundColor === 5) {
        this.visionss()
      }
    },
    // 未回复
    async changeJAVA () {
      this.backgroundColor = 2
      this.loading = true
      // await this.getJob()
      console.log('113', this.pid)
      if (this.pid === 0) {
        this.list = []
        this.loading = false
      } else {
        this.lists.pid = this.pid
        const res = await getWaitingList(this.limit, this.lists)
        console.log('未回复', res)
        this.list = res.data.results
        // this.Noreply = res.data.results.length
        this.loading = false
        this.show = false
        this.call = true
        this.communication = false
        this.position = false
        this.face = false
        this.total = res.data.count
      }
    },
    async robot () {
      this.backgroundColor = 3
      this.loading = true
      // await this.getJob()
      console.log('113', this.pid)
      if (this.pid === 0) {
        this.list = []
        this.loading = false
      } else {
        this.lists.pid = this.pid
        const res = await getCommuniCatingList(this.limit, this.lists)
        console.log('沟通中', res)
        this.list = res.data.results
        // this.communications = res.data.results.length
        this.loading = false
        this.show = false
        this.call = false
        this.communication = true
        this.position = false
        this.face = false
        this.total = res.data.count
      }
    },
    async vision () {
      this.backgroundColor = 4
      this.loading = true
      // await this.getJob()
      console.log('113', this.pid)
      if (this.pid === 0) {
        this.list = []
        this.loading = false
      } else {
        this.lists.pid = this.pid
        console.log('113', this.lists)
        const res = await getInterviewList(this.limit, this.lists)
        console.log('已约面', res)
        this.list = res.data.results
        // this.surface = res.data.results.length
        this.loading = false
        this.show = false
        this.call = false
        this.communication = false
        this.position = false
        this.face = true
        this.total = res.data.count
      }
    },
    async visionss () {
      this.backgroundColor = 5
      this.loading = true
      // await this.getJob()
      console.log('113', this.pid)
      if (this.pid === 0) {
        this.list = []
        this.loading = false
      } else {
        this.lists.pid = this.pid
        const res = await getRejectedList(this.limit, this.lists)
        console.log('不合适', res)
        this.list = res.data.results
        // this.inappropriate = res.data.results.length
        this.loading = false
        this.show = false
        this.call = false
        this.communication = false
        this.face = false
        this.position = true
        this.total = res.data.count
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('handleSize', val)
      this.limit = val
      if (this.backgroundColor === 1) {
        this.getNew()
      } else if (this.backgroundColor === 2) {
        this.changeJAVA()
      } else if (this.backgroundColor === 3) {
        this.robot()
      } else if (this.backgroundColor === 4) {
        this.vision
      } else if (this.backgroundColor === 5) {
        this.visionss()
      }
    },
    async handleCurrentChange (val) {
      console.log(`当前页: ${val}`)

      this.$emit('handleCurrentChange', val)
      this.offset = val
      const off = this.limit * (val - 1)
      if (this.backgroundColor === 1) {
        this.loading = true
        // await this.getJob()
        console.log('113', this.pid)
        if (this.pid === 0) {
          this.list = []
          this.loading = false
        } else {
          this.lists.pid = this.pid
          const res = await getNewLists(this.limit, off, this.lists)
          console.log('新招呼', res)
          this.list = res.data.results
          this.loading = false
          this.show = true
          this.call = false
          this.communication = false
          this.position = false
          this.face = false
          this.total = res.data.count
        }
      } else if (this.backgroundColor === 2) {
        this.backgroundColor = 2
        this.loading = true
        // await this.getJob()
        console.log('113', this.pid)
        if (this.pid === 0) {
          this.list = []
          this.loading = false
        } else {
          this.lists.pid = this.pid
          const res = await getWaitingLists(this.limit, off, this.lists)
          console.log('未回复', res)
          this.list = res.data.results
          this.loading = false
          this.show = false
          this.call = true
          this.communication = false
          this.position = false
          this.face = false
          this.total = res.data.count
        }
      } else if (this.backgroundColor === 3) {
        this.backgroundColor = 3
        this.loading = true
        // await this.getJob()
        console.log('113', this.pid)
        if (this.pid === 0) {
          this.list = []
          this.loading = false
        } else {
          this.lists.pid = this.pid
          const res = await getCommuniCatingLists(this.limit, off, this.lists)
          console.log('沟通中', res)
          this.list = res.data.results
          this.loading = false
          this.show = false
          this.call = false
          this.communication = true
          this.position = false
          this.face = false
          this.total = res.data.count
        }
      } else if (this.backgroundColor === 4) {
        this.backgroundColor = 4
        this.loading = true
        // await this.getJob()
        console.log('113', this.pid)
        if (this.pid === 0) {
          this.list = []
          this.loading = false
        } else {
          this.lists.pid = this.pid
          const res = await getInterviewLists(this.limit, off, this.lists)
          console.log('已约面', res)
          this.list = res.data.results
          this.loading = false
          this.show = false
          this.call = false
          this.communication = false
          this.position = false
          this.face = true
          this.total = res.data.count
        }
      } else if (this.backgroundColor === 5) {
        this.backgroundColor = 5
        this.loading = true
        // await this.getJob()
        console.log('113', this.pid)
        if (this.pid === 0) {
          this.list = []
          this.loading = false
        } else {
          this.lists.pid = this.pid
          const res = await getRejectedLists(this.limit, off, this.lists)
          console.log('不合适', res)
          this.list = res.data.results
          this.loading = false
          this.show = false
          this.call = false
          this.communication = false
          this.face = false
          this.position = true
          this.total = res.data.count
        }
      }
    },
    // 新招呼
    async getNew () {
      console.log('`12`131312')
      this.loading = true
      // await this.getJob()
      console.log('113', this.pid)
      if (this.pid === 0) {
        this.list = []
        this.loading = false
      } else {
        console.log('this.pid13123', this.pid)
        this.lists.pid = this.pid
        const res = await getNewList(this.limit, this.lists)
        console.log('新招呼', res)
        this.list = res.data.results
        // this.callss = res.data.results.length
        this.loading = false
        this.show = true
        this.call = false
        this.communication = false
        this.position = false
        this.face = false
        this.total = res.data.count
      }
    },
    chat () {
      this.getNew()
      this.getStateList()
    },
    reject () {
      if (this.backgroundColor === 1) {
        this.getNew()
        this.getStateList()
      } else if (this.backgroundColor === 2) {
        this.changeJAVA()
        this.getStateList()
      } else if (this.backgroundColor === 3) {
        this.robot()
        this.getStateList()
      } else if (this.backgroundColor === 4) {
        this.vision()
        this.getStateList()
      } else if (this.backgroundColor === 5) {
        this.visionss()
        this.getStateList()
      }
    },
    interests () {
      this.changeJAVA()
      this.getStateList()
    },
    async newResume (id) {
      console.log(id)
      this.pids = id
      const res = await getResume(id, this.pid)
      console.log('简历', res)
      this.resumeList = res.data.data
      this.details = true
    },

    chating () {
      this.robot()
      this.getStateList()
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
    margin-right: 15px;
  }
}
.bg {
  border-bottom: 2px solid #256efd;
  color: #256efd;
}
</style>
