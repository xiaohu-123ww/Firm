<template>
  <div>
    <div v-if="show">
      <div v-if="flagShow" class="position">
        <div class="position-manage">
          <el-row>
            <el-col :span="21"> 职位管理 </el-col>
            <el-col :span="3">
              <el-button
                round
                class="bt"
                style="
                  background-color: #f09667;
                  color: #fff;
                  font-size: 1px;
                  margin-top: 10px;
                "
                @click="postJob"
                >发布职位<i class="el-icon-plus"></i
              ></el-button>
            </el-col>
          </el-row>
        </div>
        <div class="position-state">
          <el-row>
            <el-col :span="3"
              ><div
                :class="{ bd: changeColor === 1 }"
                class="line"
                @click="onLine"
              >
                在线中
              </div></el-col
            >
            <el-col :span="3">
              <div
                :class="{ bd: changeColor === 2 }"
                class="line"
                @click="noOnLine"
              >
                未上线
              </div>
            </el-col>
            <el-col :span="3">
              <div
                :class="{ bd: changeColor === 3 }"
                class="line"
                @click="underReview"
              >
                审核中
              </div>
            </el-col>
            <el-col :span="8">
              <div
                :class="{ bd: changeColor === 4 }"
                class="line"
                @click="notPass"
              >
                未通过
              </div>
            </el-col>
            <el-col :span="5" class="bt">
              <el-input
                v-model="text"
                placeholder="输入职位名称/城市"
                prefix-icon="el-icon-search"
              ></el-input>
              <el-button
                style="
                  background-color: #256efd;
                  height: 33px;
                  line-height: 5px;
                  color: #fff;
                "
                >搜索</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
      <List :num="num" @hidden="hidden" />
    </div>
    <Post v-else @reset="reset" />
  </div>
</template>
<script>
import List from './list.vue'

import Post from './post.vue'

export default {
  components: { List, Post },
  data () {
    return {
      changeColor: 0,
      text: '',
      show: true,
      flagShow: true,
      num: [
        {
          id: '1',
          job: '机械臂控制工程师',
          address: '北京海淀区西小口',
          money: '8000-15000',
          month: '13薪',
          education: '5-10年 本科',
          message: '30',
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '张继科',
          time: '2022.04.08',
          onLine: '3日后下线'
        },
        {
          id: '2',
          job: '机械臂控制工程师',
          address: '北京海淀区西小口',
          money: '8000-15000',
          month: '13薪',
          education: '5-10年 本科',
          message: '30',
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '张继科',
          time: '2022.04.08',
          onLine: '3日后下线'
        },
        {
          id: '3',
          job: '机械臂控制工程师',
          address: '北京海淀区西小口',
          money: '8000-15000',
          month: '13薪',
          education: '5-10年 本科',
          message: '30',
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '张继科',
          time: '2022.04.08',
          onLine: '3日后下线'
        },
        {
          id: '4',
          job: '机械臂控制工程师',
          address: '北京海淀区西小口',
          money: '8000-15000',
          month: '13薪',
          education: '5-10年 本科',
          message: '30',
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '张继科',
          time: '2022.04.08',
          onLine: '3日后下线'
        },
        {
          id: '5',
          job: '机械臂控制工程师',
          address: '北京海淀区西小口',
          money: '8000-15000',
          month: '13薪',
          education: '5-10年 本科',
          message: '30',
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '张继科',
          time: '2022.04.08',
          onLine: '3日后下线'
        }

      ]
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    onLine () {
      this.changeColor = 1
    },
    noOnLine () {
      this.changeColor = 2
    },
    underReview () {
      this.changeColor = 3
    },
    notPass () {
      this.changeColor = 4
    },

    postJob () {
      this.show = false
    },
    reset (i) {
      this.show = i
    },
    hidden (i) {
      this.flagShow = i
    }

  }
}
</script>
<style scoped lang="scss">
.position {
  padding-left: 30px;
  height: 110px;
  background-color: #fff;
  // background-color: pink;
  .position-manage {
    height: 65px;
    // background-color: aqua;s
    line-height: 50px;
  }
  .position-state {
    height: 30px;
    // background-color: aquamarine;
    .line {
      height: 40px;
      font-size: 15px;
      width: 75px;
      // background-color: pink;
      text-align: center;
    }
    .bt {
      display: flex;
    }
  }
}
.bd {
  border-bottom: 2px solid #256efd;
  color: #256efd;
}
.position-page {
  // background-color: pink;
  width: 600px;
  margin: 0 0 30px 700px;
}
</style>
