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
          <el-table-column prop="user_name" label="姓名" width="125">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="125">
          </el-table-column>

          <el-table-column prop="work_date" label="工作年限" width="150">
          </el-table-column>
          <el-table-column prop="job_experience" label="工作经历" width="180">
          </el-table-column>
          <el-table-column prop="eduction" label="学校/学历" width="220">
          </el-table-column>
          <el-table-column prop="status.name" label="沟通状态" width="180">
          </el-table-column>
          <el-table-column prop="join_date" label="收藏时间" width="180">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <el-button type="text" style="color: #1989fa">取消收藏</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getList } from '@/api/information/index'
export default {
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      // tableData: []
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
