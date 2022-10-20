<template>
  <div class="ta">
    <div class="talents">
      <div class="talents-recommend">人才推荐</div>
      <div class="recommend">
        <el-row>
          <el-col :span="2"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 1 }"
                @click="change"
              >
                机械臂工程师
              </div></a
            ></el-col
          >
          <el-col :span="2"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 2 }"
                @click="changeJAVA"
              >
                JAVA工程师
              </div></a
            ></el-col
          >
          <el-col :span="3"
            ><a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 3 }"
                @click="robot"
              >
                机械机器人工程师
              </div></a
            ></el-col
          >
          <el-col :span="2">
            <a href="javascript:;">
              <div
                class="grid-content"
                :class="{ bg: backgroundColor === 4 }"
                @click="vision"
              >
                机器视觉设计师
              </div></a
            ></el-col
          >
        </el-row>
      </div>
    </div>
    <Recommend :list="list" />
  </div>
</template>
<script>
import Recommend from '../components/recommend.vue'
export default {
  components: { Recommend },
  data () {
    return {
      backgroundColor: 0,
      list: [
        {
          id: 1,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '男',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端']
        },
        {
          id: 2,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '女',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端']
        },
        {
          id: 3,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '男',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端']
        },
        {
          id: 4,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '女',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端']
        },
        {
          id: 5,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '男',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端']
        }
      ]
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    change () {
      this.backgroundColor = 1
    },
    changeJAVA () {
      this.backgroundColor = 2
    },
    robot () {
      this.backgroundColor = 3
    },
    vision () {
      this.backgroundColor = 4
    }
  }
}
</script>
<style scoped lang="scss">
.talents {
  height: 100px;
  padding-left: 30px;
  background-color: #fff;
  .talents-recommend {
    height: 65px;
    // background-color: pink;
    line-height: 65px;
    font-weight: 700;
  }
  .recommend {
    height: 35px;
    width: 100%;
    // background-color: aqua;
  }
  .grid-content {
    text-align: center;
    height: 35px;
    font-size: 15px;
  }
}
.bg {
  border-bottom: 2px solid #256efd;
  color: #256efd;
}
</style>
