<template>
  <div>
    <div v-if="show">
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
                <img
                  src="../../../assets/img/touxiang.png"
                  alt=""
                  style="height: 30px; width: 30px"
                />
              </div>
            </el-col>
            <el-col :span="1"
              ><div style="font-size: 13px">{{ item.name }}</div></el-col
            >
            <el-col :span="18"
              ><div style="font-size: 13px; color: #676767">
                发布时间：{{ item.time }}
              </div></el-col
            >

            <el-col :span="4" class="list-button">
              <div class="list-button">
                <el-button class="list-my-bt" round @click="details"
                  ><Item icon="xiugai" />修改</el-button
                >
                <el-button class="list-my-bt" round
                  ><Item icon="exit" />下线</el-button
                >
                <el-button class="list-my-bt" round
                  ><Item icon="fuzhi" />复制</el-button
                >
              </div>
            </el-col></el-row
          >
        </div>
      </div>
      <Page class="position-page" :total="total" @handleSize="handleSize" />
    </div>
    <Details v-else />
  </div>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
import Details from './details.vue'
import Page from './page.vue'
export default {
  components: { Item, Details, Page },
  props: {
    num: {
      type: Array
    }
  },
  data () {
    return {
      show: true,
      list: [
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

      ],
      total: 100
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    // 第几页
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
    .list-button {
      // background-color: #25fd9f;
      .list-my-bt {
        font-size: 12px;
        height: 32px;
        width: 60px;
        padding: 5px 10px;

        // background-color: #256efd;
        margin: 5px;
      }
    }
  }
}
.position-page {
  // background-color: pink;
  width: 600px;
  margin: 0 0 30px 700px;
}
</style>
