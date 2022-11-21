<!-- eslint-disable vue/valid-v-on -->
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
            <template scope="scope">
              <el-button
                type="text"
                style="color: #1989fa"
                @click.native="changeDelte(scope.row.id)"
                >取消收藏</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getDelete } from '@/api/information/index'
export default {
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      // tableData: []
      list: {
        id: 0
      }
    }
  },
  mounted () {

  },
  computed: {

  },

  methods: {
    async changeDelte (id) {
      console.log(id)
      this.list.id = id
      const res = await getDelete(this.list)
      console.log('取消', res)
      this.$message.success(res.data.msg)
      this.$emit('reset')
    }
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
