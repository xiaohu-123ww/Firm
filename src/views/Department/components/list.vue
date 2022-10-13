<template>
  <div>
    <div v-for="item in num" :key="item.id" class="list">
      <div class="list-context">
        <el-row>
          <el-col :span="10"
            ><div class="bg-purple">
              <div class="bg-purple-nn">
                <span style="font-size: 18px; margin-right: 10px">{{
                  item.job
                }}</span>
                <span style="font-size: 12px; color: #676767">{{
                  item.address
                }}</span>
              </div>
              <div class="bg-purple-sss">
                <span
                  style="font-size: 14px; color: #fe6b49; margin-right: 10px"
                  >{{ item.money }} {{ item.month }}</span
                >
                <span style="font-size: 12px; color: #676767">{{
                  item.education
                }}</span>
              </div>
            </div></el-col
          >
          <el-col :span="11"
            ><div class="bg-purple-light">
              <div class="bg-purple-bty">
                <div class="text">新消息</div>
                <div style="font-size: 38px">{{ item.message }}</div>
              </div>
            </div></el-col
          >
          <el-col :span="1"
            ><div class="bg-purpl-el">
              <el-button class="elButton"
                ><Item icon="aixin" class="Icon" /> 职位取消</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="list-my">
        <el-row>
          <el-col :span="1">
            <div class="list-image">
              <img :src="item.image" alt="" style="height: 30px; width: 30px" />
            </div>
          </el-col>
          <el-col :span="1"
            ><div style="font-size: 13px">{{ item.name }}</div></el-col
          >
          <el-col :span="20"
            ><div style="font-size: 13px; color: #676767">
              发布时间：{{ item.time }}
            </div></el-col
          >
          <el-col :span="1"
            ><el-button class="list-my-bt"
              ><Item icon="fuzhi" class="Icon" /> 复制</el-button
            ></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
export default {
  components: { Item },
  props: {
    num: {
      type: Array
    }
  },
  data () {
    return {

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
.list {
  height: 120px;
  background-color: #fff;
  margin: 12px 10px;
  border-radius: 20px;
  overflow: hidden;
  // border: 1px solid #f9f7f7;
  .list-context {
    height: 75px;
    // background-color: aqua;
    border-bottom: 2px solid #f9f7f7;
    .bg-purple {
      height: 70px;
      // background-color: blueviolet;
      padding: 10px 0 0 20px;
      line-height: 30px;
      .bg-purple-nn {
        height: 29px;
        // background-color: pink;
      }
      .bg-purple-sss {
        height: 29px;
        // background-color: red;
      }
    }
    .bg-purple-light {
      height: 70px;
      // background-color: pink;
      // padding-top: 20px;
      .bg-purple-bty {
        width: 70px;
        height: 70px;
        // background-color: aqua;
        text-align: center;
        padding-top: 5px;
        .text {
          color: #676767;
          font-size: 14px;
          height: 20px;
          // background-color: red;
          line-height: 20px;
        }
      }
    }
    .bg-purpl-el {
      height: 70px;
      // background-color: chocolate;
      width: 170px;
      line-height: 70px;
      text-align: center;
      .elButton {
        background-color: #256efd;
        line-height: 10px;
        color: #fff;
        border-radius: 20px;
        font-size: 12px;
      }
    }
  }
  .list-my {
    height: 45px;
    // background-color: #256efd;
    padding-left: 20px;
    line-height: 33px;
    .list-image {
      height: 30px;
      width: 30px;
      // background-color: bisque;
      border-radius: 50px;
      overflow: hidden;
      margin-top: 3px;
    }
    .list-my-bt {
      font-size: 12px;
      border-radius: 20px;
      height: 34px;
      width: 80px;
      // line-height: 0.5px;
      margin-top: 5px;
    }
  }
}
</style>
