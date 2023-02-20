<!-- eslint-disable no-redeclare -->
<template>
  <div>
    <div v-if="detailss">
      <div class="message">
        <div class="message-text">人才信息</div>
        <div style="display: flex">
          <div style="width: 90%">
            <el-form
              label-width="80px"
              style="display: flex; justify-content: space-evenly"
            >
              <div class="grid-content bg-purple">
                <el-input
                  v-model="keywords"
                  prefix-icon="el-icon-search"
                  style="width: 200px"
                  placeholder="请输入关键字"
                ></el-input>
              </div>
              <!-- <div>
                <el-date-picker
                  v-model="start_time"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div>
                <el-date-picker
                  v-model="end_time"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div> -->
              <div class="block">
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 400px"
                  :picker-options="options"
                >
                </el-date-picker>
              </div>
              <!-- <div class="block">
                <el-date-picker
                  v-model="end_time"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']"
                >
                </el-date-picker>
              </div> -->

              <div class="grid-content bg-purple-light">
                <el-select v-model="status" placeholder="不限" clearable>
                  <el-option
                    v-for="item in statuss"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-form>
          </div>
          <div>
            <el-button
              type="primary"
              round
              style="height: 30px; background-color: #256efd; padding-top: 8px"
              @click="amend"
              >搜索</el-button
            >
          </div>
        </div>
      </div>
      <Collect
        :table-data="tableData"
        @reset="reset"
        @newResume="newResume"
        @replacement="replacement"
      />
      <el-pagination
        v-if="state"
        background
        :current-page="offset"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        layout="  prev, pager, next,sizes, jumper,total"
        :total="total"
        style="margin: 0px 0px 30px 500px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!--  :pid="pid"
      :resume-list="resumeList" -->
    <Recommend
      v-if="!detailss"
      :resume-list="resumeList"
      :pid="pid"
      @titleList="titleList"
    />
  </div>
</template>
<script>
import Recommend from '@/views/Setting/components/resumeDetails.vue'
import { getResume } from '@/api/setting/index'
import Collect from './collect.vue'
import { getTime, getList, getListOne, getListTwo, getListThree, getListFour, getListFive, getListSex, getLists, getListOnes, getListTwos, getListThrees, getListFours, getListFives, getListSexs, getListss, getListNum } from '@/api/information/index'
export default {
  components: { Collect, Recommend },
  data () {
    return {
      options: {
        // 时间不能大于当前时间
        disabledDate: time => {
          return time.getTime() > Date.now()
        },
        selectableRange: '00:00:00 - 23:59:59'
      },

      time: {},
      resumeList: {},
      pid: 0,
      detailss: true,
      status: '',
      keywords: '',
      start_time: '',
      end_time: '',
      total: 0,
      limit: 5,
      offset: 1,
      tableData: [],
      statuss: [
        {
          id: -1,
          name: '不限'
        },
        {
          id: 0,
          name: '待沟通'
        },
        {
          id: 1,
          name: '未回复'
        },
        {
          id: 2,
          name: '沟通中'
        },
        {
          id: 3,
          name: '已约面'
        },
        {
          id: 4,
          name: '不合适'
        }

      ],
      state: false,
      condition: ''

    }
  },
  mounted () {

  },
  created () {
    this.getLikeJob()
  },
  computed: {

  },
  watch: {
    start_time (val, oldVal) {
      if (!val) {
        this.value1 = new Date()
      }
    },
    end_time (val, oldVal) {
      if (!val) {
        this.value1 = new Date()
      }
    }
  },
  methods: {
    replacement () {
      if (this.offset === 1) {
        this.handleSizeChange()
      } else {
        this.handleCurrentChange()
      }
    },
    // numDate () {
    //   this.time = {}
    // },
    async newResume (id) {
      this.pid = id
      const res = await getResume(id)
      console.log('简历', res)
      this.resumeList = res.data.data

      this.detailss = false
    },
    titleList () {
      this.detailss = true
      // this.getLikeJob()
    },
    details () {
      this.show = false
      this.$emit('hidden', false)
    },
    reset (i) {
      this.getLikeJob()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('handleSize', val)
      this.limit = this.val
      if (this.keywords !== '' || this.time[0] !== undefined || this.status !== '') {
        this.amend()
      } else {
        this.getLikeJob()
      }
    },
    async handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('handleCurrentChange', val)
      this.offset = this.limit * (val - 1)
      if (this.keywords !== '' || this.time[0] !== undefined || this.status !== '') {
        this.amends()
      } else {
        // console.log(`当前页: ${val}`)
        // this.$emit('handleCurrentChange', val)
        // this.offset = this.limit * (val - 1)
        const { data } = await getList(this.limit, this.offset)
        console.log('收藏', data)
        this.$emit('reset', data.data.count)
        this.tableData = data.data.results
        this.total = data.data.count
        this.state = true
        console.log(this.tableData)
        if (data.data.count !== 0) {
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        }
      }
    },
    async getLikeJob () {
      const { data } = await getList(this.limit)
      console.log('收藏', data)
      this.$emit('reset', data.data.count)
      this.tableData = data.data.results
      this.total = data.data.count
      if (data.data.count !== 0) {
        this.state = true
      }
      console.log(this.tableData)
      if (!data) {
        for (var i = 0; i < this.tableData.length; i++) {
          // console.log(i)
          this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
        }
      }
    },
    async amend () {
      if (!this.time) {
        this.time = {}
      }
      if (this.status === -1) {
        this.condition = ''
      } else {
        this.condition = this.status
      }
      // console.log(this.time[0])
      if (this.keywords !== '' && this.time[0] !== undefined && this.status !== '') {
        console.log(1232, this.start_time, this.end_time)
        this.start_time = this.changeDate(this.time[0])
        this.end_time = this.changeDate(this.time[1])
        const { data } = await getLists(this.limit, this.condition, this.start_time, this.end_time, this.keywords)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords !== '' && this.time[0] === undefined && this.status !== '') {
        console.log(1234)

        const { data } = await getListOne(this.limit, this.condition, this.keywords)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords === '' && this.time[0] !== undefined && this.status !== '') {
        console.log(1234)
        this.start_time = this.changeDate(this.time[0])
        this.end_time = this.changeDate(this.time[1])
        const { data } = await getListThree(this.limit, this.condition, this.start_time, this.end_time)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords !== '' && this.time[0] !== undefined && this.status === '') {
        console.log(1234)
        this.start_time = this.changeDate(this.time[0])
        this.end_time = this.changeDate(this.time[1])
        const { data } = await getListFour(this.limit, this.start_time, this.end_time, this.keywords)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords === '' && this.time[0] !== undefined && this.status === '') {
        console.log(1234)
        this.start_time = this.changeDate(this.time[0])
        this.end_time = this.changeDate(this.time[1])
        const { data } = await getListNum(this.limit, this.start_time, this.end_time)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      // getListTwo
      if (this.keywords !== '' && this.time[0] === undefined && this.status === '') {
        console.log(1234)
        // this.start_time = this.changeDate(this.time[0])
        // this.end_time = this.changeDate(this.time[1])
        const { data } = await getListTwo(this.limit, this.keywords)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords === '' && this.time[0] === undefined && this.status !== '') {
        console.log(1234)
        // this.start_time = this.changeDate(this.time[0])
        // this.end_time = this.changeDate(this.time[1])
        const { data } = await getListSex(this.limit, this.condition)
        console.log('res', data)
        this.state = true
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords === '' && this.time[0] === undefined && this.status === '') {
        this.getLikeJob()
      }
    },
    // async amends () {
    //   // console.log(this.keywords, this.start_time, this.end_time, this.status)

    //   if (this.keywords !== '' && this.time.length === 0 && this.status === '') {
    //     const res = await getListTwos(this.limit, this.offset, this.keywords)
    //     console.log('res1', res)
    //     this.tableData = res.data.data.results
    //     // for (var i = 0; i < this.tableData.length; i++) {
    //     //   // console.log(i)
    //     //   this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
    //     // }
    //     if (res.data.data.count === 0) {
    //       this.state = false
    //       for (var i = 0; i < this.tableData.length; i++) {
    //         // console.log(i)
    //         this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
    //       }
    //     }
    //     // this.start_time = ''
    //     // this.end_time = ''
    //   } else if (this.keywords !== '' && this.time.length !== 0 && this.status === '') {
    //     this.start_time = this.changeDate(this.time[0])
    //     this.end_time = this.changeDate(this.time[1])

    //     const res = await getListFours(this.limit, this.offset, this.start_time, this.end_time, this.keywords)
    //     console.log('res1', res)
    //     this.tableData = res.data.data.results
    //     // for (var a = 0; a < this.tableData.length; a++) {
    //     //   // console.log(i)
    //     //   this.tableData[a].join_date = this.changeDate(this.tableData[a].join_date)
    //     // }
    //     if (res.data.data.count === 0) {
    //       this.state = false
    //       for (var a = 0; a < this.tableData.length; a++) {
    //         // console.log(i)
    //         this.tableData[a].join_date = this.changeDate(this.tableData[a].join_date)
    //       }
    //     }
    //     // this.start_time = ''
    //     // this.end_time = ''
    //   } else if (this.keywords === '' && this.time.length !== 0 && this.status !== '') {
    //     this.start_time = this.changeDate(this.time[0])
    //     this.end_time = this.changeDate(this.time[1])

    //     const res = await getListThrees(this.limit, this.offset, this.status, this.start_time, this.end_time)
    //     console.log('res1', res)
    //     this.tableData = res.data.data.results
    //     // for (var s = 0; s < this.tableData.length; s++) {
    //     //   // console.log(i)
    //     //   this.tableData[s].join_date = this.changeDate(this.tableData[s].join_date)
    //     // }
    //     if (res.data.data.count === 0) {
    //       this.state = false
    //       for (var s = 0; s < this.tableData.length; s++) {
    //         // console.log(i)
    //         this.tableData[s].join_date = this.changeDate(this.tableData[s].join_date)
    //       }
    //     }
    //     // this.start_time = ''
    //     // this.end_time = ''
    //   } else if (this.keywords !== '' && this.time.length === 0 && this.status !== '') {
    //     if (this.status === 5) {
    //       const res = await getListOnes(this.limit, this.offset, this.status, this.keywords)
    //       console.log('res1', res)
    //       this.tableData = res.data.data.results
    //       // for (var d = 0; d < this.tableData.length; d++) {
    //       //   // console.log(i)
    //       //   this.tableData[d].join_date = this.changeDate(this.tableData[d].join_date)
    //       // }
    //       if (res.data.data.count === 0) {
    //         this.state = false
    //         for (var d = 0; d < this.tableData.length; d++) {
    //           // console.log(i)
    //           this.tableData[d].join_date = this.changeDate(this.tableData[d].join_date)
    //         }
    //       }
    //     } else {
    //       const res = await getListFives(this.limit, this.offset, this.status, this.keywords)
    //       console.log('res1', res)
    //       this.tableData = res.data.data.results
    //       // for (var c = 0; c < this.tableData.length; c++) {
    //       //   // console.log(i)
    //       //   this.tableData[c].join_date = this.changeDate(this.tableData[c].join_date)
    //       // }
    //       if (res.data.data.count === 0) {
    //         this.state = false
    //         for (var c = 0; c < this.tableData.length; c++) {
    //           // console.log(i)
    //           this.tableData[c].join_date = this.changeDate(this.tableData[c].join_date)
    //         }
    //       }
    //     }
    //     // this.start_time = ''
    //     // this.end_time = ''
    //   } else if (this.keywords === '' && this.time.length === 0 && this.status !== '') {
    //     if (this.status === 5) {
    //       this.getLikeJob()
    //     } else {
    //       const res = await getListSexs(this.limit, this.offset, this.status)
    //       console.log('res1', res)
    //       this.tableData = res.data.data.results
    //       // for (var f = 0; f < this.tableData.length; f++) {
    //       //   // console.log(i)
    //       //   this.tableData[f].join_date = this.changeDate(this.tableData[f].join_date)
    //       // }
    //       if (res.data.data.count === 0) {
    //         this.state = false
    //         for (var f = 0; f < this.tableData.length; f++) {
    //           // console.log(i)
    //           this.tableData[f].join_date = this.changeDate(this.tableData[f].join_date)
    //         }
    //       }
    //     }
    //     // this.start_time = ''
    //     // this.end_time = ''
    //   }

    //   if (this.start_time !== '' && this.time.length !== 0 && this.status !== '') {
    //     if (this.status === 5) {
    //       this.start_time = this.changeDate(this.time[0])
    //       this.end_time = this.changeDate(this.time[1])

    //       const res = await getListFours(this.limit, this.offset, this.start_time, this.end_time, this.keywords)
    //       console.log('res1', res)
    //       this.tableData = res.data.data.results
    //       // for (var n = 0; n < this.tableData.length; n++) {
    //       //   // console.log(i)
    //       //   this.tableData[n].join_date = this.changeDate(this.tableData[n].join_date)
    //       // }
    //       if (res.data.data.count === 0) {
    //         this.state = false
    //         for (var n = 0; n < this.tableData.length; n++) {
    //           // console.log(i)
    //           this.tableData[n].join_date = this.changeDate(this.tableData[n].join_date)
    //         }
    //       }
    //     } else {
    //       this.start_time = this.changeDate(this.time[0])
    //       this.end_time = this.changeDate(this.time[1])

    //       const res = await getListss(this.limit, this.offset, this.status, this.start_time, this.end_time, this.keywords)
    //       console.log('res1', res)
    //       this.tableData = res.data.data.results
    //       // for (var w = 0; w < this.tableData.length; w++) {
    //       //   // console.log(i)
    //       //   this.tableData[w].join_date = this.changeDate(this.tableData[w].join_date)
    //       // }
    //       if (res.data.data.count === 0) {
    //         this.state = false
    //         for (var w = 0; w < this.tableData.length; w++) {
    //           // console.log(i)
    //           this.tableData[w].join_date = this.changeDate(this.tableData[w].join_date)
    //         }
    //       }
    //     }
    //     // this.start_time = ''
    //     // this.end_time = ''
    //   }
    // }
    //

    // 点击页码的搜索条件列表
    async amends () {
      if (!this.time) {
        this.time = {}
      }
      if (this.status === -1) {
        this.condition = ''
      } else {
        this.condition = this.status
      }
      if (this.keywords !== '' && this.time[0] !== undefined && this.status !== '') {
        console.log(1232, this.start_time, this.end_time)
        this.start_time = this.changeDate(this.time[0])
        this.end_time = this.changeDate(this.time[1])
        //  limit, offset, status, start_time, end_time, keywords
        const { data } = await getListss(this.limit, this.offset, this.condition, this.start_time, this.end_time, this.keywords)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords !== '' && this.time[0] === undefined && this.status !== '') {
        console.log(1234)

        const { data } = await getListOnes(this.limit, this.offset, this.condition, this.keywords)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords === '' && this.time[0] !== undefined && this.status !== '') {
        console.log(1234)
        this.start_time = this.changeDate(this.time[0])
        this.end_time = this.changeDate(this.time[1])
        const { data } = await getListThrees(this.limit, this.offset, this.condition, this.start_time, this.end_time)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords !== '' && this.time[0] !== undefined && this.status === '') {
        console.log(1234)
        this.start_time = this.changeDate(this.time[0])
        this.end_time = this.changeDate(this.time[1])
        const { data } = await getListFours(this.limit, this.offset, this.start_time, this.end_time, this.keywords)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords === '' && this.time[0] !== undefined && this.status === '') {
        console.log(1234)
        this.start_time = this.changeDate(this.time[0])
        this.end_time = this.changeDate(this.time[1])
        const { data } = await getTime(this.limit, this.offset, this.start_time, this.end_time)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      // getListTwo
      if (this.keywords !== '' && this.time[0] === undefined && this.status === '') {
        console.log(1234)
        // this.start_time = this.changeDate(this.time[0])
        // this.end_time = this.changeDate(this.time[1])
        const { data } = await getListTwos(this.limit, this.offset, this.keywords)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords === '' && this.time[0] === undefined && this.status !== '') {
        console.log(1234)
        // this.start_time = this.changeDate(this.time[0])
        // this.end_time = this.changeDate(this.time[1])
        const { data } = await getListSexs(this.limit, this.offset, this.condition)
        console.log('res', data)
        this.tableData = data.data.results
        this.total = data.data.count
        if (data.data.count !== 0) {
          this.state = true
          this.tableData = data.data.results
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        } else {
          this.state = false
        }
      }
      if (this.keywords === '' && this.time[0] === undefined && this.status === '') {
        const { data } = await getList(this.limit, this.offset)
        console.log('收藏', data)
        this.$emit('reset', data.data.count)
        this.tableData = data.data.results
        this.total = data.data.count
        // this.$emit('reset', data.data.count)
        // this.state = true
        console.log(this.tableData)
        if (data.data.count !== 0) {
          this.state = true
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.tableData.length; i++) {
            // console.log(i)
            this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
          }
        }
      }
    }
  }
}

</script>
<style scoped lang="scss">
.message {
  height: 100px;
  width: 100%;
  background-color: #fff;
  padding-left: 30px;
  .message-text {
    height: 55px;
    // background-color: pink;
    line-height: 55px;
    font-weight: 700;
  }
  .grid-content {
    // margin-right: 130px;
  }
}
.position-page {
  // background-color: pink;
  width: 600px;
  margin: 0 0 30px 700px;
}
::v-deep .el-input--prefix .el-input__inner {
  height: 34px;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 200px;
}
::v-deep .el-pagination span:not([class*='suffix']) {
  line-height: 32px;
  margin-left: 10px;
}
</style>
