<template>
  <div>
    <div class="resume">简历详情</div>
    <div class="card">
      <el-row>
        <el-col :span="18">
          <div class="image">
            <div class="my">
              <el-row>
                <el-col :span="4">
                  <div class="img">
                    <img :src="disposeImg(resumeList.image)" alt="" />
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="text">
                    <div class="text-one">
                      <span style="margin: 0px 30px 0px 16px">{{
                        resumeList.name
                      }}</span>
                      <span style="color: rgb(207, 212, 215)">{{
                        resumeList.status
                      }}</span>
                    </div>
                    <div class="text-one">
                      <span class="resumeList">{{ resumeList.sex }}</span>
                      <span class="resumeList">{{ resumeList.age }}</span>
                      <span class="resumeList">{{
                        resumeList.year === null ? '无经验' : resumeList.year
                      }}</span>
                      <span class="resumeList">{{ resumeList.education }}</span>
                    </div>
                    <div class="text-one">
                      <span class="resumeList">{{
                        resumeList.phone_number
                      }}</span>
                      <span class="resumeList" style="border: 0">{{
                        resumeList.email
                      }}</span>
                    </div>
                    <!-- <div>123</div>
                    <div>123</div> -->
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="job">
              <div class="one">求职意向</div>
              <div v-for="item in jobList" :key="item.id" class="job-two">
                <div
                  style="font-weight: 800; font-size: 18px; margin-bottom: 18px"
                >
                  {{ item.position_class }}
                </div>
                <div class="two">
                  <el-row>
                    <el-col :span="12">
                      <div>
                        期望薪资：{{ item.salary_min }} - {{ item.salary_max }}
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div>期望城市：{{ item.city }}</div>
                    </el-col>
                  </el-row>
                </div>
                <div class="two">
                  <el-row>
                    <el-col :span="12">
                      <div>工作性质：{{ item.job_nature }}</div>
                    </el-col>
                    <el-col :span="12">
                      <div>期望行业：{{ item.field }}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <div class="job">
              <div class="one">个人优势</div>
              <div class="like-text" v-html="text"></div>
            </div>
            <div class="job">
              <div class="one">工作经历</div>
              <div v-for="item in workList" :key="item.id" class="three">
                <div style="margin-bottom: 18px">
                  <el-row>
                    <el-col :span="18">
                      <div style="font-weight: 800">
                        {{ item.position_info.position_name }}
                      </div>
                    </el-col>
                    <el-col :span="6" style="color: rgb(207, 212, 215)"
                      >{{ item.start_date }} -{{ item.end_date }}</el-col
                    >
                  </el-row>
                </div>
                <div style="margin-bottom: 18px">
                  <span
                    style="
                      padding-right: 40px;
                      border-right: 1px solid rgb(207, 212, 215);
                    "
                    >{{ item.position_info.position_class_name }}</span
                  >
                  <span style="margin-left: 30px">{{
                    item.position_info.field_name
                  }}</span>
                </div>
                <div style="margin-bottom: 18px">工作描述：</div>
                <div
                  style="margin-bottom: 18px"
                  class="like-text"
                  v-html="item.position_info.job_desc"
                ></div>
              </div>
            </div>
            <div class="job">
              <div class="one">教育经历</div>
              <div class="education">
                <el-row>
                  <el-col :span="12">1</el-col>
                  <el-col :span="12">2</el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="5">2</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getJob, getLike, getwork } from '@/api/setting/index'
export default {
  props: {
    resumeList: {
      type: Object
    }
  },
  data () {
    return {
      jobList: [],
      text: '',
      workList: [],
      dec: ''
    }
  },
  mounted () {

  },
  computed: {
    commendContent () {
      // this.commend.content是后端传回来的文本数据，就是要对这个数据进行处理
      const arr = this.text
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    },
    commend () {
      // this.commend.content是后端传回来的文本数据，就是要对这个数据进行处理
      const arr = this.workList.position_info.job_desc
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    }

  },
  created () {
    this.getJobList()
    this.getText()
    this.getWorkList()
  },
  methods: {
    // 求职意向
    async getJobList () {
      const res = await getJob()
      console.log('求职意向', res)

      this.jobList = res.data.data
    },
    // 优势
    async getText () {
      const res = await getLike()
      console.log('优势', res)
      this.text = res.data.data
    },
    // 工作
    async getWorkList () {
      const res = await getwork()
      console.log('工作', res)
      this.workList = res.data.data
      // this.dec = res.data.data.position_info.job_desc
    }
  }
}
</script>
<style scoped lang="scss">
.resume {
  height: 50px;
  background-color: #fff;
  line-height: 50px;
  padding-left: 30px;
  font-weight: 700;
}
.card {
  margin: 20px 30px;
  height: auto;
  background-color: #fff;
  border-radius: 20px;

  .image {
    height: auto;
    border-right: 1px solid rgb(207, 212, 215);

    // background-color: pink;
    .my {
      height: 150px;
      // background-color: pink;
      border-bottom: 1px solid rgb(207, 212, 215);
      padding: 0px 50px;
      .img {
        width: 110px;
        height: 110px;
        background-color: red;
        margin-top: 20px;
        border-radius: 100px;
      }
      .text {
        // background-color: aqua;
        height: 150px;
        padding-top: 30px;
        font-size: 17px;
        .text-one {
          margin-bottom: 12px;
          .resumeList {
            padding: 0px 15px;
            border-right: 1px solid rgb(207, 212, 215);
          }
        }
      }
    }
    .job {
      height: 100%;
      margin-top: 10px;
      padding-left: 56px;
      border-bottom: 1px solid rgb(207, 212, 215);
      .one {
        height: 30px;
        // background-color: pink;
        line-height: 30px;
        font-weight: 800;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .job-two {
        height: 140px;
        // background-color: aqua;
        padding: 20px 50px;
        margin-bottom: 25px;
        font-size: 16px;
        .two {
          margin-bottom: 18px;
        }
      }
      .like-text {
        line-height: 30px;
        margin-bottom: 60px;
        margin-left: 50px;
      }
      .three {
        padding-left: 50px;
        font-size: 17px;
        margin-bottom: 30px;
      }
      .education {
      }
    }
  }
}
</style>
