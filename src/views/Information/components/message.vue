<template>
  <div>
    <div class="message">
      <div class="message-text">人才信息</div>
      <div style="display: flex">
        <el-form :model="form" label-width="80px" style="">
          <el-row>
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="form.name"
                  prefix-icon="el-icon-search"
                  style="width: 200px"
                  placeholder="请输入关键字"
                ></el-input></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light" style="display: flex">
                <el-date-picker
                  v-model="form.date1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                ></el-date-picker>
                <div style="margin-right: 30px; color: #c0c0c0">──</div>
                <el-date-picker
                  v-model="form.date2"
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
                <el-select v-model="form.type" placeholder="不限">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select></div
            ></el-col>
          </el-row>
        </el-form>
        <el-button
          type="primary"
          round
          style="height: 30px; background-color: #256efd; padding-top: 8px"
          >搜索</el-button
        >
      </div>
    </div>
    <Collect />
    <Page class="position-page" :total="total" @handleSize="handleSize" />
  </div>
</template>
<script>
import Collect from './collect.vue'
import Page from '@/views/Department/components/page.vue'
export default {
  components: { Collect, Page },
  data () {
    return {
      keyword: '',
      form: {
        name: '',
        date1: '',
        date2: '',
        type: ''
      },
      total: 100

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    handleSize (page) {
      console.log(page)
    },
    details () {
      this.show = false
      this.$emit('hidden', false)
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
</style>
