<template>
  <div>
    <div class="details-position">
      <el-row>
        <el-col :span="22"> 简历详情</el-col>
        <el-col :span="2">
          <el-button
            class="list-my-bt"
            type="text"
            style="margin-left: 45px; font-size: 20px"
            @click="resetForm"
            ><Item icon="KHCFDC" /></el-button
        ></el-col>
      </el-row>
    </div>
    <div class="card">
      <el-row>
        <el-col :span="18">
          <div class="image">
            <div class="my">
              <el-row>
                <el-col :span="4">
                  <div class="img">
                    <img
                      :src="disposeImg(resumeList.image)"
                      alt=""
                      style="width: 110px; height: 110px; border-radius: 100px"
                    />
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="text">
                    <div class="text-one">
                      <span style="margin: 0px 30px 0px 16px">{{
                        resumeList.name
                      }}</span>
                      <span style="color: rgb(118 120 122)">{{
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
              <el-empty
                v-if="jobList.length === 0"
                description="暂无数据"
              ></el-empty>
            </div>
            <div class="job">
              <div class="one">个人优势</div>
              <div
                class="like-text"
                style="white-space: pre-line; margin-right: 15px"
                v-html="text"
              ></div>
              <el-empty v-if="text === null" description="暂无数据"></el-empty>
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
                    <el-col :span="6" style="color: rgb(118 120 122)"
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
                  style="
                    margin-bottom: 18px;
                    white-space: pre-line;
                    margin-right: 15px;
                  "
                  class="like-text"
                  v-html="item.position_info.job_desc"
                ></div>
              </div>
              <el-empty
                v-if="workList.length === 0"
                description="暂无数据"
              ></el-empty>
            </div>
            <div class="job">
              <div class="one">教育经历</div>
              <div v-for="item in experiences" :key="item.id" class="education">
                <el-row style="margin-bottom: 25px">
                  <el-col :span="18" style="font-weight: 800">{{
                    item.education_info.school
                  }}</el-col>
                  <el-col :span="6" style="color: rgb(118 120 122)"
                    >{{ item.start_date }}- {{ item.end_date }}</el-col
                  >
                </el-row>
                <div style="margin-bottom: 18px">
                  <span
                    style="
                      padding-right: 40px;
                      border-right: 1px solid rgb(207, 212, 215);
                    "
                    >{{ item.degree }}</span
                  >
                  <span style="margin-left: 30px">{{
                    item.education_info.major
                  }}</span>
                </div>
              </div>
              <el-empty
                v-if="experiences.length === 0"
                description="暂无数据"
              ></el-empty>
            </div>
            <div class="job">
              <div class="one">项目经历</div>
              <div v-for="item in project" :key="item.id" class="three">
                <div style="margin-bottom: 18px">
                  <el-row>
                    <el-col :span="18">
                      <div style="font-weight: 800">
                        {{ item.project_info.project_name }}
                      </div>
                    </el-col>
                    <el-col :span="6" style="color: rgb(118 120 122)"
                      >{{ item.start_date }} -{{ item.end_date }}</el-col
                    >
                  </el-row>
                </div>

                <div style="margin-bottom: 18px">工作描述：</div>
                <div
                  style="
                    margin-bottom: 18px;
                    white-space: pre-line;
                    margin-right: 15px;
                  "
                  class="like-text"
                  v-html="item.project_info.project_desc"
                ></div>
              </div>
              <el-empty
                v-if="project.length === 0"
                description="暂无数据"
              ></el-empty>
            </div>
            <div class="job" style="border: 0">
              <div class="one">资格证书</div>
              <div v-for="item in certification" :key="item.id">
                <el-row class="qualification">
                  <el-col :span="8">
                    <div
                      style="
                        width: 200px;
                        height: 100px;
                        background-color: pink;
                      "
                    >
                      <img
                        :src="disposeImg(item.cert_info.sample)"
                        alt=""
                        style="width: 200px; height: 100px"
                      />
                    </div>
                  </el-col>
                  <el-col
                    :span="10"
                    style="font-weight: 800; line-height: 100px"
                    >{{ item.cert_info.cert_name }}-{{
                      item.cert_info.cert_level
                    }}</el-col
                  >
                  <el-col :span="6" style="color: rgb(118 120 122)">{{
                    item.cert_date
                  }}</el-col>
                </el-row>
              </div>
              <el-empty
                v-if="certification.length === 0"
                description="暂无数据"
              ></el-empty>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="numList"
            style="
              background-color: rgb(37, 110, 253);
              color: #fff;
              margin: 60px;
              width: 200px;
            "
            @click="downItem"
            ><Item icon="xiazai" />下载简历</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getJob, getLike, getwork, getExperiences, getProject, getCertification } from '@/api/setting/index'
import { getIntroduction } from '@/api/firm'
import Item from '@/layout/components/Sidebar/Item'
import axios from 'axios'

export default {
  props: {
    resumeList: {
      type: Object
    },
    pid: {
      type: Number
    }

  },
  components: { Item },
  data () {
    return {
      jobList: [],
      text: '',
      workList: [],
      dec: '',
      experiences: [],
      project: [],
      certification: [],
      numList: true
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
      const arr = this.workList.map(item => item.position_info.job_desc)
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    },
    commendList () {
      // this.commend.content是后端传回来的文本数据，就是要对这个数据进行处理
      const arr = this.project.map(item => item.project_info.project_desc)
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    }

  },
  created () {
    this.getJobList()
    this.getText()
    this.getWorkList()
    this.getExperiencesList()
    this.getProjectList()
    this.getCertificationList()
    this.numss()
  },
  methods: {
    async numss () {
      console.log('this.resumeList.cvfile', this.resumeList)
      if (this.resumeList.cvfile === '') {
        this.numList = false
      }
    },
    // 求职意向
    async getJobList () {
      const res = await getJob(this.pid)
      console.log('求职意向', res)

      this.jobList = res.data.data
    },
    // 优势
    async getText () {
      const res = await getLike(this.pid)
      console.log('优势', res)
      this.text = res.data.data
    },
    // 工作
    async getWorkList () {
      const res = await getwork(this.pid)
      console.log('工作', res)
      this.workList = res.data.data
      // this.dec = res.data.data.position_info.job_desc
    },
    // 教育经历
    async getExperiencesList () {
      const res = await getExperiences(this.pid)
      console.log('教育经历', res)
      this.experiences = res.data.data
      console.log(this.experiences)
    },
    // 项目经历
    async getProjectList () {
      const res = await getProject(this.pid)
      console.log('项目经历', res)
      this.project = res.data.data
    },
    // 证书
    async getCertificationList () {
      const res = await getCertification(this.pid)
      console.log('证书', res)
      this.certification = res.data.data
    },
    downItem () {
      if (this.resumeList.cvfile !== '') {
        var downloadPath = `https://znzz.tech/loc/${this.resumeList.cvfile}`
        var downloadLink = document.createElement('a')
        downloadLink.style.display = 'none' // 使其隐藏
        downloadLink.href = downloadPath
        downloadLink.download = ''
        downloadLink.click()
        document.body.removeChild(downloadLink)
      } else {
        // this.$message.success('暂无简历可下载')
        this.numList = false
      }
    },
    // 跳转
    resetForm () {
      console.log(123)
      this.$emit('titleList')
    }
  }

}

</script>
<style scoped lang="scss">
.details-position {
  height: 60px;
  background-color: #fff;
  line-height: 60px;
  padding-left: 30px;
  font-weight: 700;
}
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
        margin-bottom: 50px;
      }
      .education {
        // margin-top: 30px;
        font-size: 17px;
        margin-left: 50px;
        margin-bottom: 50px;
      }
      .qualification {
        margin-top: 30px;
        margin-left: 50px;
        margin-bottom: 50px;
      }
    }
  }
}
</style>
