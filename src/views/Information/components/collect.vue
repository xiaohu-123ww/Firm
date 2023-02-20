<!-- eslint-disable vue/valid-v-on -->
<template>
  <div>
    <el-card class="collect">
      <div class="collect-header">
        <div style="font-weight: 700; width: 95%">我的收藏</div>
        <!-- <div style="color: #256efd">
          更多<i class="el-icon-arrow-right"></i>
        </div> -->
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="user_name" label="姓名" min-width="5%">
          </el-table-column>
          <el-table-column prop="age" label="年龄" min-width="5%">
            <template slot-scope="scope"> {{ scope.row.age }}岁</template>
          </el-table-column>

          <el-table-column
            prop="work_date"
            label="工作年限"
            min-width="6%"
            style="text-align: center"
          >
            <template slot-scope="scope"> {{ scope.row.work_date }}年</template>
          </el-table-column>
          <el-table-column
            prop="job_experience"
            label="工作经历"
            min-width="16%"
          >
          </el-table-column>
          <el-table-column prop="eduction" label="学校/学历" min-width="16%">
          </el-table-column>
          <el-table-column prop="status.name" label="沟通状态" min-width="6%">
          </el-table-column>
          <el-table-column prop="join_date" label="收藏时间" min-width="8%">
          </el-table-column>
          <el-table-column label="操作" min-width="5%">
            <template scope="scope">
              <el-button
                type="text"
                style="color: #1989fa"
                @click.native="changeDelte(scope.row.user_id)"
                >取消收藏</el-button
              >
            </template>
          </el-table-column>
          <el-table-column min-width="5%" label="更多">
            <template scope="scope">
              <!-- -->
              <!-- <el-button
                type="text"
                style="color: #1989fa"
                @click.native="changeDelte(scope.row.user_id)"
                >简历详情</el-button
              >
              <el-button
                type="text"
                style="color: #1989fa"
                @click.native="changeDelte(scope.row.user_id)"
                >打招呼</el-button
              > -->
              <!-- <el-select
                v-model="model"
                placeholder=""
                @click.native="hello(scope.row.user_id)"
              >
                <el-option label="简历详情" value="简历详情"></el-option>
                <el-option label="打招呼" value="打招呼"></el-option>
              </el-select> -->
              <el-dropdown>
                <span class="el-dropdown-link" style="color: #1989fa">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="scope.row.user_id"
                    @click.native="hello(scope.row.user_id)"
                    >打招呼</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="dropdown(scope.row.user_id)"
                    >简历详情</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" min-width="5%">
            <template scope="scope">
              <el-button
                type="text"
                style="color: #1989fa"
                @click.native="changeDelte(scope.row.user_id)"
                >取消收藏</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </el-card>
    <Dialog :id="id" :dialog-visible="dialogVisible" @reset="reset" />
  </div>
</template>
<script>
import { getDelete } from '@/api/information/index'
import Dialog from '@/views/Employee/components/dialog.vue'
import axios from 'axios'
export default {
  components: { Dialog },
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: false,
      id: 0,
      // tableData: []
      list: {
        id: 0
      },
      model: ''
    }
  },
  mounted () {

  },
  computed: {

  },

  methods: {
    // 打招呼
    dropdown (i) {
      console.log('123', i)
      this.$emit('newResume', i)
    },
    hello (id) {
      this.dialogVisible = true
      this.id = id
      console.log(id)
      // this.$emit('replacement')
    },
    // 取消收藏i
    async changeDelte (id) {
      console.log('123', id)
      // this.list.id = id
      const res = await getDelete(id)
      console.log('取消', res)
      this.$message.success(res.data.msg)
      // axios.delete(`https://znzz.tech/enterprise/collections/${id}/`).then(function (response) {
      //   console.log(response)
      // })
      this.$emit('reset')
    },
    reset (i) {
      this.dialogVisible = i
      this.$emit('replacement')
      // this.flagShow = i
      // this.flag = i
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
    display: flex;
  }
}
.el-col.el-col-1 {
  color: #256efd !important;
}
</style>
