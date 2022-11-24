<template>
  <div>
    <Nava :flag-show="show" @reset="reset" />
    <el-card v-if="show" class="homePage">
      <div class="homePage-text">完善企业主页信息，更快的了解您的企业</div>
      <div v-for="(item, index) in list" :key="index" class="homePage-content">
        <el-row>
          <el-col :span="1"
            ><div class="content">
              <img
                require
                :src="item.img"
                style="width: 30px; height: 30px"
              /></div
          ></el-col>
          <el-col :span="21">
            <div style="font-weight: 700; margin-bottom: 8px; font-size: 19px">
              {{ item.text }}
            </div>
            <div style="font-size: 13px; color: #999">
              {{ item.content }}
            </div>
            <div
              v-if="item.state === 0"
              style="
                font-size: 10px;
                color: #999;
                margin-top: 8px;
                color: #e46a6a;
              "
            >
              *{{ item.text }}内容未审核通过
            </div>
            <div
              v-if="item.state === 1"
              style="
                font-size: 10px;
                color: #999;
                margin-top: 8px;
                color: #d67f32;
              "
            >
              审核中
            </div>
            <div
              v-if="item.state === 2"
              style="
                font-size: 10px;
                color: #999;
                margin-top: 8px;
                color: #d67f32;
              "
            >
              已通过
            </div>
          </el-col>
          <el-col :span="2"
            ><div>
              <el-button
                round
                style="
                  color: #1989fa;
                  background-color: #e6f1fc;
                  border: 1px solid #a3d0fd;
                  height: 35px;
                  padding-top: 10px;
                "
                @click="onClick(item.id)"
                >编辑</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
    </el-card>
    <Essential v-if="status === 1" @reset="reset" />
    <Profile v-if="status === 2" @reset="reset" />
    <WorkFare v-if="status === 3" @reset="reset" />
    <Corporate v-if="status === 4" @reset="reset" />
  </div>
</template>
<script>
import Nava from './nava.vue'
import b1 from '@/assets/picture/dui@2x.png'
import b2 from '@/assets/picture/zhuyi@2x.png'
import b3 from '@/assets/picture/cuo@2x.png'
// 企业形象
import Corporate from './corporate.vue'
// 基本信息
import Essential from './essential.vue'
// 企业介绍
import Profile from './profile.vue'
// 工作福利
import WorkFare from './workfare.vue'
import { getStatusList } from '@/api/firm/index'
export default {
  components: { Corporate, Essential, Profile, WorkFare, Nava },
  data () {
    return {
      status: 0,
      show: true,
      flagShow: false,
      list: [
        {
          id: 1,
          img: '',
          text: '基本信息',
          content: ' 真实完整的基本信息，是求职者了解企业的第一步',
          state: 0
        },
        {
          id: 2,
          img: '',
          text: '企业介绍',
          content: '详细描述企业成立时间、业务发展等，同时 告诉大家企业有何魅力',
          state: 0
        },
        {
          id: 3,
          img: '',
          text: '工作福利',
          content: '工作时间和福利待遇等仅为求职者参考，不代表企业所有只为状况',
          state: 0
        },
        {
          id: 4,
          img: '',
          text: '企业形象',
          content: '亮眼的视频和图片是企业品牌建设的第一步',
          state: 0
        }
      ]
    }
  },
  mounted () {
    this.getList()
    this.getImg()
  },
  computed: {

  },
  methods: {
    getImg () {

    },
    onClick (id) {
      console.log(id)
      this.status = id
      this.show = false
    },
    reset (i) {
      this.status = i
      this.show = true
      this.getList()
    },
    async getList () {
      const { data } = await getStatusList()
      console.log('res', data)
      this.list[0].state = data.data.status
      this.list[1].state = data.data.status_introduction
      this.list[2].state = data.data.status_work
      this.list[3].state = data.data.status_corporate
      this.list.forEach(item => {
        if (item.state === 0) {
          item.img = b3
        } else if (item.state === 1) {
          item.img = b2
        } else {
          item.img = b1
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.homePage {
  margin: 20px;
  padding: 0 50px;
  border-radius: 18px;
  .homePage-text {
    height: 50px;
    // background-color: pink;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 20px;
  }
  .homePage-content {
    height: 100px;
    // background-color: aqua;
    // text-align: center;
    padding-top: 20px;
    margin: 0 50px;

    border-bottom: 1px solid #f5f5f5;
    .content {
      width: 30px;
      height: 30px;
      // margin-left: 10px;
      // background-color: aquamarine;
    }
  }
}
</style>
