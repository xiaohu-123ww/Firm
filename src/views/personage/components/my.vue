<template>
  <div class="my">
    <div class="my-card">
      <el-row>
        <el-col :span="3">
          <div class="card-image">
            <img
              :src="disposeImg(list.logo)"
              alt=""
              style="width: 80px; height: 80px"
            />
          </div>
        </el-col>
        <el-col :span="17">
          <p style="font-size: 18px">{{ list.name }}</p>
          <div class="text">
            <span class="spann">企业编号：{{ list.uid }}</span>
            <span style="margin-left: 20px">{{ list.join_date }} 加入</span>
          </div>
        </el-col>
        <el-col :span="4" style="line-height: 80px">
          <el-button style="background-color: #256efd; color: #fff"
            >离开企业</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getPersonal } from '@/api/personage/index'
export default {
  data () {
    return {
      list: {}
    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await getPersonal()
      console.log('res', res)
      this.list = res.data.data
    }
  }
}
</script>
<style scoped lang="scss">
.my {
  height: 120px;
  background-color: #fff;
  margin: 50px;
}
.my-card {
  // width: 100%;
  height: 80px;
  padding: 20px 20px;
  // border-radius: 18px;

  .card-image {
    width: 80px;
    height: 80px;
    background-color: burlywood;
  }
  .text {
    font-size: 14px;
    color: #999;
    .spann {
      padding-right: 30px;
      // background-color: green;
      border-right: 1px solid #999;
    }
  }
}
</style>
