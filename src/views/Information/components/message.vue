<!-- eslint-disable no-redeclare -->
<template>
  <div>
    <div class="message">
      <div class="message-text">人才信息</div>
      <div style="display: flex">
        <el-form label-width="80px" style="">
          <el-row>
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="keywords"
                  prefix-icon="el-icon-search"
                  style="width: 200px"
                  placeholder="请输入关键字"
                ></el-input></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light" style="display: flex">
                <el-date-picker
                  v-model="start_time"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                ></el-date-picker>
                <div style="margin-right: 30px; color: #c0c0c0">──</div>
                <el-date-picker
                  v-model="end_time"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                >
                </el-date-picker></div
            ></el-col>

            <!-- <el-col :span="6"
            ><div class="grid-content bg-purple">
             </el-date-picker></div
          ></el-col> -->
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-select v-model="status" placeholder="不限">
                  <el-option
                    v-for="item in statuss"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select></div
            ></el-col>
          </el-row>
        </el-form>
        <el-button
          type="primary"
          round
          style="height: 30px; background-color: #256efd; padding-top: 8px"
          @click="amend"
          >搜索</el-button
        >
      </div>
    </div>
    <Collect :table-data="tableData" @reset="reset" />
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
</template>
<script>
import Collect from './collect.vue'
import { getList, getListOne, getListTwo, getListThree, getListFour, getListFive, getListSex, getLists, getListOnes, getListTwos, getListThrees, getListFours, getListFives, getListSexs, getListss } from '@/api/information/index'
export default {
  components: { Collect },
  data () {
    return {
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
          id: 0,
          name: '待沟通'
        },
        {
          id: 1,
          name: '接收者未回复'
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
        }, {
          id: 5,
          name: '不限'
        }

      ],
      state: false

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
      this.getLikeJob()
      this.amend()
    },
    async handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('handleCurrentChange', val)
      this.offset = this.limit * (val - 1)
      const { data } = await getList(this.limit, this.offset)
      console.log('收藏', data)
      this.$emit('reset', data.data.count)
      this.tableData = data.data.results
      this.total = data.data.count
      this.state = true
      console.log(this.tableData)
      for (var i = 0; i < this.tableData.length; i++) {
        // console.log(i)
        this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
      }
      this.amends()
    },
    async getLikeJob () {
      const { data } = await getList(this.limit)
      console.log('收藏', data)
      this.$emit('reset', data.data.count)
      this.tableData = data.data.results
      this.total = data.data.count
      this.state = true
      console.log(this.tableData)
      for (var i = 0; i < this.tableData.length; i++) {
        // console.log(i)
        this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
      }
    },
    async amend () {
      // console.log(this.keywords, this.start_time, this.end_time, this.status)

      if (this.keywords !== '' && this.end_time === '' && this.start_time === '' && this.status === '') {
        const res = await getListTwo(this.limit, this.keywords)
        console.log('res1', res)
        this.tableData = res.data.data.results
        for (var i = 0; i < this.tableData.length; i++) {
          // console.log(i)
          this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
        }
        if (res.data.data.count === 0) {
          this.state = false
        }
        // this.start_time = ''
        // this.end_time = ''
      } else if (this.keywords !== '' && this.end_time !== '' && this.start_time !== '' && this.status === '') {
        this.start_time = this.changeDateTo(this.start_time)
        this.end_time = this.changeDateTo(this.end_time)

        const res = await getListFour(this.limit, this.start_time, this.end_time, this.keywords)
        console.log('res1', res)
        this.tableData = res.data.data.results
        for (var a = 0; a < this.tableData.length; a++) {
          // console.log(i)
          this.tableData[a].join_date = this.changeDate(this.tableData[a].join_date)
        }
        if (res.data.data.count === 0) {
          this.state = false
        }
        // this.start_time = ''
        // this.end_time = ''
      } else if (this.keywords === '' && this.end_time !== '' && this.start_time !== '' && this.status !== '') {
        this.start_time = this.changeDateTo(this.start_time)
        this.end_time = this.changeDateTo(this.end_time)

        const res = await getListThree(this.limit, this.status, this.start_time, this.end_time)
        console.log('res1', res)
        this.tableData = res.data.data.results
        for (var s = 0; s < this.tableData.length; s++) {
          // console.log(i)
          this.tableData[s].join_date = this.changeDate(this.tableData[s].join_date)
        }
        if (res.data.data.count === 0) {
          this.state = false
        }
        // this.start_time = ''
        // this.end_time = ''
      } else if (this.keywords !== '' && this.end_time === '' && this.start_time === '' && this.status !== '') {
        if (this.status === 5) {
          const res = await getListOne(this.limit, this.keywords)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var d = 0; d < this.tableData.length; d++) {
            // console.log(i)
            this.tableData[d].join_date = this.changeDate(this.tableData[d].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        } else {
          const res = await getListFive(this.limit, this.status, this.keywords)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var c = 0; c < this.tableData.length; c++) {
            // console.log(i)
            this.tableData[c].join_date = this.changeDate(this.tableData[c].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        }
        // this.start_time = ''
        // this.end_time = ''
      } else if (this.keywords === '' && this.end_time === '' && this.start_time === '' && this.status !== '') {
        if (this.status === 5) {
          this.getLikeJob()
        } else {
          const res = await getListSex(this.limit, this.status)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var f = 0; f < this.tableData.length; f++) {
            // console.log(i)
            this.tableData[f].join_date = this.changeDate(this.tableData[f].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        }
        // this.start_time = ''
        // this.end_time = ''
      }

      if (this.start_time !== '' && this.end_time !== '' && this.keywords !== '' && this.status !== '') {
        if (this.status === 5) {
          this.start_time = this.changeDateTo(this.start_time)
          this.end_time = this.changeDateTo(this.end_time)

          const res = await getListFour(this.limit, this.start_time, this.end_time, this.keywords)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var n = 0; n < this.tableData.length; n++) {
            // console.log(i)
            this.tableData[n].join_date = this.changeDate(this.tableData[n].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        } else {
          this.start_time = this.changeDateTo(this.start_time)
          this.end_time = this.changeDateTo(this.end_time)

          const res = await getLists(this.limit, this.status, this.start_time, this.end_time, this.keywords)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var w = 0; w < this.tableData.length; w++) {
            // console.log(i)
            this.tableData[w].join_date = this.changeDate(this.tableData[w].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        }
        // this.start_time = ''
        // this.end_time = ''
      }
    },
    async amends () {
      // console.log(this.keywords, this.start_time, this.end_time, this.status)

      if (this.keywords !== '' && this.end_time === '' && this.start_time === '' && this.status === '') {
        const res = await getListTwos(this.limit, this.offset, this.keywords)
        console.log('res1', res)
        this.tableData = res.data.data.results
        for (var i = 0; i < this.tableData.length; i++) {
          // console.log(i)
          this.tableData[i].join_date = this.changeDate(this.tableData[i].join_date)
        }
        if (res.data.data.count === 0) {
          this.state = false
        }
        // this.start_time = ''
        // this.end_time = ''
      } else if (this.keywords !== '' && this.end_time !== '' && this.start_time !== '' && this.status === '') {
        this.start_time = this.changeDateTo(this.start_time)
        this.end_time = this.changeDateTo(this.end_time)

        const res = await getListFours(this.limit, this.offset, this.start_time, this.end_time, this.keywords)
        console.log('res1', res)
        this.tableData = res.data.data.results
        for (var a = 0; a < this.tableData.length; a++) {
          // console.log(i)
          this.tableData[a].join_date = this.changeDate(this.tableData[a].join_date)
        }
        if (res.data.data.count === 0) {
          this.state = false
        }
        // this.start_time = ''
        // this.end_time = ''
      } else if (this.keywords === '' && this.end_time !== '' && this.start_time !== '' && this.status !== '') {
        this.start_time = this.changeDateTo(this.start_time)
        this.end_time = this.changeDateTo(this.end_time)

        const res = await getListThrees(this.limit, this.offset, this.status, this.start_time, this.end_time)
        console.log('res1', res)
        this.tableData = res.data.data.results
        for (var s = 0; s < this.tableData.length; s++) {
          // console.log(i)
          this.tableData[s].join_date = this.changeDate(this.tableData[s].join_date)
        }
        if (res.data.data.count === 0) {
          this.state = false
        }
        // this.start_time = ''
        // this.end_time = ''
      } else if (this.keywords !== '' && this.end_time === '' && this.start_time === '' && this.status !== '') {
        if (this.status === 5) {
          const res = await getListOnes(this.limit, this.offset, this.keywords)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var d = 0; d < this.tableData.length; d++) {
            // console.log(i)
            this.tableData[d].join_date = this.changeDate(this.tableData[d].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        } else {
          const res = await getListFives(this.limit, this.offset, this.status, this.keywords)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var c = 0; c < this.tableData.length; c++) {
            // console.log(i)
            this.tableData[c].join_date = this.changeDate(this.tableData[c].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        }
        // this.start_time = ''
        // this.end_time = ''
      } else if (this.keywords === '' && this.end_time === '' && this.start_time === '' && this.status !== '') {
        if (this.status === 5) {
          this.getLikeJob()
        } else {
          const res = await getListSexs(this.limit, this.offset, this.status)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var f = 0; f < this.tableData.length; f++) {
            // console.log(i)
            this.tableData[f].join_date = this.changeDate(this.tableData[f].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        }
        // this.start_time = ''
        // this.end_time = ''
      }

      if (this.start_time !== '' && this.end_time !== '' && this.keywords !== '' && this.status !== '') {
        if (this.status === 5) {
          this.start_time = this.changeDateTo(this.start_time)
          this.end_time = this.changeDateTo(this.end_time)

          const res = await getListFours(this.limit, this.offset, this.start_time, this.end_time, this.keywords)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var n = 0; n < this.tableData.length; n++) {
            // console.log(i)
            this.tableData[n].join_date = this.changeDate(this.tableData[n].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        } else {
          this.start_time = this.changeDateTo(this.start_time)
          this.end_time = this.changeDateTo(this.end_time)

          const res = await getListss(this.limit, this.offset, this.status, this.start_time, this.end_time, this.keywords)
          console.log('res1', res)
          this.tableData = res.data.data.results
          for (var w = 0; w < this.tableData.length; w++) {
            // console.log(i)
            this.tableData[w].join_date = this.changeDate(this.tableData[w].join_date)
          }
          if (res.data.data.count === 0) {
            this.state = false
          }
        }
        // this.start_time = ''
        // this.end_time = ''
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
    margin-right: 130px;
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
</style>
