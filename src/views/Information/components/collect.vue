<template>
  <div>
    <el-card class="collect">
      <div class="collect-header">
        <el-row>
          <el-col :span="23" style="font-weight: 700">我的收藏</el-col>
          <el-col :span="1" style=""
            >更多<i class="el-icon-arrow-right"></i
          ></el-col>
        </el-row>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="100">
          </el-table-column>

          <el-table-column prop="month" label="工作年限" width="120">
          </el-table-column>
          <el-table-column prop="job" label="工作经历" width="300">
          </el-table-column>
          <el-table-column prop="school" label="学校/学历" width="200">
          </el-table-column>
          <el-table-column prop="state" label="沟通状态" width="180">
          </el-table-column>
          <el-table-column prop="date" label="收藏时间" width="180">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <el-button type="text" style="color: #1989fa">取消收藏</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>ge
<script>
export default {
  data () {
    return {
      tableData: [{
        name: '洛东',
        age: 18,
        month: '2年',
        job: '机械工程师 北京****科技有限公司',
        school: '北京智能学院 本科',
        state: '待沟通',
        date: '2022-05-02'

      }, {
        name: '张三',
        age: 20,
        month: '2年',
        job: '机械工程师 北京****科技有限公司',
        school: '北京智能学院 本科',
        state: '待沟通',
        date: '2022-05-02'
      }, {
        name: '李四',
        age: 18,
        month: '2年',
        job: '机械工程师 北京****科技有限公司',
        school: '北京智能学院 本科',
        state: '待沟通',
        date: '2022-05-02'

      }, {
        name: '王小虎',
        age: 18,
        month: '2年',
        job: '机械工程师 北京****科技有限公司',
        school: '北京智能学院 本科',
        state: '待沟通',
        date: '2022-05-02'

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
.collect {
  margin: 20px;
  border-radius: 18px;
  .collect-header {
    height: 30px;
    // background-color: pink;
    line-height: 30px;
    margin-bottom: 10px;
  }
}
.el-col.el-col-1 {
  color: #256efd !important;
}
</style>
