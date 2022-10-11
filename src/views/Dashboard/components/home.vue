<template>
  <div class="home">
    <div class="header">
      <div class="my">我的沟通</div>
      <div class="Communication">
        <div v-for="item in chunk" :key="item.id" class="chunk">
          <div class="chunk-nn">{{ item.title }}</div>
          <div class="text">{{ item.number }}</div>
        </div>
      </div>
    </div>
    <div class="header">
      <div class="my">我的职位</div>
      <div class="Communication">
        <div v-for="item in position" :key="item.id" class="chunk">
          <div class="chunk-nn">{{ item.title }}</div>
          <div class="text">{{ item.number }}</div>
        </div>
      </div>
    </div>
    <el-card class="card">
      <div class="my">我的面试</div>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="250">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="300">
          </el-table-column>
          <el-table-column prop="address" label="备注"> </el-table-column>
          <el-table-column label="操作">
            <el-button type="text" size="medium">详情</el-button>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>
<script>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '线下面试：机械工程师',
        operate: '详情'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '线下面试：机械工程师',
        operate: '详情'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '线下面试：机械工程师',
        operate: '详情'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '线下面试：机械工程师',
        operate: '详情'
      }]
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {

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
    }
    .Communication {
      height: 110px;
      // background-color: cadetblue;
      display: flex;
      padding-left: 100px;
      .chunk {
        width: 100px;
        // background-color: blueviolet;
        margin: 0 80px;

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
      height: 40px;
      // background-color: blueviolet;
      padding-left: 9px;
      font-weight: 700;
    }
    .column {
      color: #64affa;
    }
  }
}
</style>
