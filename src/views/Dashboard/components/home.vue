<template>
  <div class="home">
    <div class="header">
      <div class="my" style="background-color: #fff">我的沟通</div>
      <div class="Communication">
        <div v-for="item in chunk" :key="item.id" class="chunk">
          <div class="chunk-nn">{{ item.title }}</div>
          <div class="text">{{ item.number }}</div>
        </div>
      </div>
    </div>
    <div class="header">
      <div class="my">
        <el-row>
          <el-col :span="21"><div class="">我的职位</div></el-col>
          <el-col :span="2">
            <el-button
              round
              class="bt"
              style="background-color: #f09667; color: #fff"
              @click="$router.push('/department')"
              >发布职位<i class="el-icon-plus"></i></el-button
          ></el-col>
        </el-row>
      </div>
      <div class="Communication">
        <div v-for="item in position" :key="item.id" class="chunk">
          <div class="chunk-nn">{{ item.title }}</div>
          <div class="text">{{ item.number }}</div>
        </div>
      </div>
    </div>
    <el-card class="card">
      <div class="my">
        <el-row>
          <el-col :span="23"><div>我的面试</div></el-col>
          <el-col :span="1">
            <el-button type="text"
              >更多<i class="el-icon-arrow-right"></i></el-button
          ></el-col>
        </el-row>
      </div>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="日期" width="250" prop="start_time">
            <!-- <div>{{ changeDate(start_time) }}</div> -->
          </el-table-column>
          <el-table-column prop="interviewer_info.avatar" width="80">
            <template scope="scope">
              <img
                :src="disposeImg(scope.row.interviewer_info.avatar)"
                width="50"
                height="50"
                class="img"
                style="border-radius: 50%; overflow: hidden"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="interviewer_info.name"
            label="姓名"
            width="300"
          >
          </el-table-column>
          <el-table-column prop="position_name" label="备注"> </el-table-column>
          <el-table-column label="操作">
            <el-button type="text" size="medium">详情</el-button>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>
<script>
import { getPersonal, getInterviewsShort, getMyComm } from '@/api/dashboard/index'

export default {
  data () {
    return {
      chunk: [
        {
          id: 1,
          title: '最新消息',
          number: 37
        },
        {
          id: 2,
          title: '沟通未回复',
          number: 5
        },
        {
          id: 3,
          title: '沟通中',
          number: 10
        },
        {
          id: 4,
          title: '我的收藏',
          number: 5
        }
      ],
      position: [
        {
          id: 1,
          title: '在线职位',
          number: 32
        },
        {
          id: 2,
          title: '7天内到期',
          number: 13
        },
        {
          id: 3,
          title: '审核中',
          number: 7
        }
      ],
      tableData: []
    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getJobList()
    this.getInterview()
    this.getCommn()
  },
  methods: {
    // 我的职位
    async getJobList () {
      const { data } = await getPersonal()
      console.log('我的职位', data)
      this.position[0].number = data.data.due
      this.position[1].number = data.data.examine
      this.position[2].number = data.data.online
    },
    // 我的面试
    async getInterview () {
      const { data } = await getInterviewsShort()
      console.log('我的面试', data)
      this.tableData = data
      for (var i = 0; i < this.tableData.length; i++) {
        console.log(i)
        this.tableData[i].start_time = this.changeDate(this.tableData[i].start_time)
      }
    },
    // 我的沟通
    async getCommn () {
      const { data } = await getMyComm()
      console.log('我的沟通', data)
      this.chunk[0].number = data.new
      this.chunk[1].number = data.waiting
      this.chunk[2].number = data.comming
      this.chunk[3].number = data.collection
    }

  }
}
</script>
<style scoped lang="scss">
.home {
  // height: 810px;
  // background-color: pink;
  padding: 30px;
  .header {
    height: 150px;
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    .my {
      height: 50px;
      // background-color: blueviolet;

      line-height: 50px;
      padding-left: 29px;
      font-weight: 700;

      .bt {
        margin-right: 10px;
      }
    }
    .Communication {
      height: 110px;
      // background-color: cadetblue;
      display: flex;
      padding-left: 100px;
      .chunk {
        // width: 100px;
        // background-color: blueviolet;
        margin: 0 80px;
        text-align: center;

        .chunk-nn {
          height: 30px;
          // background-color: aqua;
          line-height: 30px;
          color: #949494;
          font-size: 14px;
        }
        .text {
          // background-color: aqua;
          // font-weight: 700;
          font-size: 50px;
        }
      }
    }
  }
  .card {
    border-radius: 20px;
    .my {
      height: 50px;
      // background-color: blueviolet;
      padding-left: 9px;
      font-weight: 700;
      .grid-content {
        padding-top: 12px;
      }
    }
    .column {
      color: #64affa;
    }
  }
}
</style>
