<template>
  <div>
    <div v-for="item in list" :key="item.id" class="recommend">
      <div class="recommend-my">
        <el-row>
          <el-col :span="1"
            ><div class="recommend-img">
              <img
                :src="disposeImg(item.image)"
                class="image"
                @click="resume(item.user_id)"
              /></div
          ></el-col>
          <el-col :span="8"
            ><div class="recommend-message">
              <div class="message-name">
                <a href="javascript:;">
                  <div
                    class="text"
                    style="margin-left: 10px"
                    @click="resume(item.user_id)"
                  >
                    {{ item.user_name }}
                  </div>
                </a>
                <div style="margin-right: 15px; font-size: 19px">
                  <Item :icon="item.sex === 1 ? 'nan' : 'nv'"></Item>
                </div>
                <div v-if="online[item.id] === 0" class="onLine">当前在线</div>
                <div v-if="online[item.id] === 1" class="onLine">今日在线</div>
                <div v-if="online[item.id] === 2" class="onLine">近一周</div>
                <div v-if="online[item.id] === 3" class="onLine">近两周</div>
                <div v-if="online[item.id] === 4" class="onLine">近一个月</div>
                <div v-if="online[item.id] === 5" class="onLine">近两个月</div>
                <div v-if="online[item.id] === 6" class="onLine">近三个月</div>
                <div v-if="online[item.id] === 7" class="onLine">近六个月</div>
                <div v-if="online[item.id] === 8" class="onLine">
                  六个月以前
                </div>
              </div>
              <div class="message-age">
                <div class="age-four">{{ item.age }}岁</div>
                <div class="age-four four">{{ item.work_date }}年</div>
                <div class="age-four four">{{ item.education.name }}</div>
                <div style="margin-left: 10px">{{ item.status.name }}</div>
              </div>
              <div class="message-age" style="margin-top: 3px">
                <div class="age-four">
                  {{
                    item.position_class_data.city.name
                      ? item.position_class_data.city.name
                      : '期望城市'
                  }}
                </div>
                <div class="age-four four">
                  求职职位：{{
                    item.position_class_data.position_class.name
                      ? item.position_class_data.position_class.name
                      : '职位'
                  }}
                </div>
                <div class="age-four four">
                  {{
                    item.position_class_data.salary.length !== 0
                      ? item.position_class_data.salary
                      : '薪资'
                  }}
                </div>
              </div>
            </div></el-col
          >
          <el-col :span="12"
            ><div class="recommend-time">
              <div
                v-for="(itemss, index) in item.job_experience"
                :key="index"
                class="recommend-experience"
              >
                <div class="experience-time">
                  {{ itemss.start_date }}-{{ itemss.end_date }}
                </div>
                <div class="experience-firm">{{ itemss.enterprise }}</div>
                <div>{{ itemss.position }}</div>
              </div>
            </div></el-col
          >
          <el-col :span="3"
            ><div v-if="!item.job" class="recommend-bt">
              <el-button
                round
                class="recommend-button"
                @click="talk(item.user_id)"
                ><Item icon="zhaohu" /> 打招呼
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="technical-ability">
        <el-row>
          <el-col :span="18"
            ><div class="technical">
              <div
                v-for="(skills, index) in item.job_keywords"
                :key="index"
                class="ability"
              >
                {{ skills.name }}
              </div>
              <!-- <div
                v-if="item.job"
                style="font-size: 13px; color: #a2a2a2; line-height: 30px"
              >
                沟通职位：机械工程师
              </div> -->
            </div></el-col
          >
          <!-- <el-col :span="6"
            ><div v-if="item.state1" class="bg-purple-light">
              <Item icon="点" />
              {{ item.state1 }}
            </div>
            <div v-if="item.job" class="">
              <el-button
                class="chnical right"
                :class="{ left: communication === true }"
                round
                style="
                  color: #2891fa;
                  background-color: #e6f1fc;
                  border: 1px solid #acd5fd;
                "
                >已收藏</el-button
              >

              <el-button
                v-if="show"
                round
                class="chnical"
                style="
                  color: #0d975e;
                  background-color: #f1fffd;
                  border: 1px solid #cef4e2;
                  padding-left: 13px;
                "
                >提醒对方</el-button
              >
              <el-button
                v-if="call"
                round
                class="chnical"
                style="
                  color: #0d975e;
                  background-color: #f1fffd;
                  border: 1px solid #cef4e2;
                  padding-left: 13px;
                "
                >可以聊</el-button
              >
              <el-button
                v-if="communication"
                round
                class="chnical"
                style="
                  color: #0d975e;
                  background-color: #f1fffd;
                  border: 1px solid #cef4e2;
                  padding-left: 13px;
                "
                >要简历</el-button
              >
              <el-button
                v-if="communication"
                round
                class="chnical"
                style="
                  color: #f2e52f;
                  background-color: #fff;
                  border: 1px solid #f6e79d;
                "
                @click="interview"
                >约面试</el-button
              >
              <el-button
                v-if="face"
                round
                class="chnical"
                style="
                  color: #0d975e;
                  background-color: #f1fffd;
                  border: 1px solid #cef4e2;
                  padding-left: 13px;
                "
                @click="particulars(item)"
                >面试详情</el-button
              >
              <el-button
                round
                class="chnical"
                style="
                  color: #d55948;
                  background-color: #fce6e6;
                  border: 1px solid #fcc9c4;
                "
                >不合适</el-button
              >
            </div>
          </el-col> -->
        </el-row>
        <el-row> </el-row>
      </div>
    </div>
    <Dialog :dialog-visible="dialogVisible" @reset="reset" />
    <Interview :flag-show="flagShow" @reset="reset" />
    <Particulars :flag="flag" :arr="arr" @reset="reset" />
  </div>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
import Dialog from './dialog.vue'
import Interview from './interview.vue'
import Particulars from './particulars.vue'
import { getInterests } from '@/api/setting/index'
export default {
  components: { Item, Dialog, Interview, Particulars },
  props: {
    list: {
      type: Array
    },
    show: {
      type: Boolean
    },
    call: {
      type: Boolean
    },
    communication: {
      type: Boolean
    },
    face: {
      type: Boolean
    },
    position: {
      type: Number
    },
    online: {
      type: Object
    }

  },
  data () {
    return {
      dialogVisible: false,
      flagShow: false,
      flag: false,
      arr: {}
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    changeDialog () {
      this.dialogVisible = true
      console.log(1)
    },
    reset (i) {
      this.dialogVisible = i
      this.flagShow = i
      this.flag = i
    },
    interview () {
      this.flagShow = true
    },
    particulars (i) {
      this.flag = true
      this.arr = i
      console.log(i)
    },
    // 沟通
    async talk (id) {
      console.log(id, this.position)
      const res = await getInterests(id, this.position)
      console.log('res', res)
      this.$message.success(res.data.msg)
    },
    resume (id) {
      console.log(id)
      this.$emit('newResume', id)
    }
  }
}
</script>
<style scoped lang="scss">
.recommend {
  height: 140px;
  background-color: #fff;
  margin: 20px 30px;
  border-radius: 20px;
  overflow: hidden;
  .recommend-my {
    height: 100px;
    // background-color: blueviolet;
    border-bottom: 2px solid #f8f8f8;
    padding: 13px 20px;
    .recommend-img {
      width: 45px;
      height: 45px;
      // background-color: pink;
      margin-top: 12px;
      border-radius: 100px;
      overflow: hidden;
      .image {
        width: 45px;
        height: 45px;
      }
    }
    .recommend-message {
      height: 70px;
      width: 100%;
      // background-color: pink;
      .message-name {
        height: 30px;
        width: 100%;
        // background-color: aqua;
        display: flex;
        .text {
          font-size: 17px;
          margin-right: 10px;
        }
        .onLine {
          width: 70px;
          height: 23px;
          background-color: #f1fffd;
          color: #119954;
          font-size: 13px;
          line-height: 18px;
          text-align: center;
          border: 1px solid #ace9ca;
        }
      }
      .message-age {
        height: 20px;
        width: 100%;
        // background-color: darkgreen;
        // margin-top: 5px;
        display: flex;
        color: #808080;
        font-size: 13px;
        .age-four {
          // width: 50px;
          height: 16px;
          padding: 0px 10px;
          // background-color: darkgreen;
          border-right: 1px solid #808080;
        }
        .four {
          text-align: center;
        }
      }
    }
    .recommend-time {
      height: 70px;
      // background-color: #119954;
      margin-top: 5px;
      .recommend-experience {
        height: 20px;
        // background-color: rgb(169, 83, 97);
        color: #a3a3a3;
        display: flex;
        font-size: 13px;
        // line-height: 20px;
        .experience-time {
          height: 100%;
          width: 150px;
          // background-color: blue;
          margin-right: 10px;
        }
        .experience-firm {
          height: 100%;
          width: 200px;
          // background-color: rgb(0, 251, 255);
          margin-right: 10px;
          color: black;
        }
      }
    }
    .recommend-bt {
      margin-left: 40px;
      // background-color: pink;
      text-align: center;
      .recommend-button {
        width: 70px;
        height: 30px;
        border: 1px solid #acd5fe;
        background-color: #e6f1fc;
        color: #218dfa;
        // line-height: 1px;
        padding: 6px 2px;
        font-size: 12px;
      }
    }
  }
  .technical-ability {
    height: 40px;
    width: 100%;
    // background-color: #119954;

    // display: flex;

    .technical {
      // background-color: pink;

      display: flex;
      padding: 7px 20px;
      .ability {
        // width: 50px;
        // height: 25px;
        padding: 0px 5px;
        background-color: #f3f7ff;
        // border-radius: 20px;
        text-align: center;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        color: #799ce3;
        margin-right: 15px;
      }
    }
    .bg-purple-light {
      // background-color: #218dfa;
      height: 25px;
      font-size: 13px;
      padding-left: 225px;
      // text-align: center;
      line-height: 25px;
      color: #b2b2b2;
    }
  }
}
.chnical {
  // background-color: pink;
  margin-top: 4px;
  font-size: 13px;
  width: 73px;
  height: 28px;
  line-height: 3px;
  padding-left: 15px;
}
.right {
  margin-left: 80px;
}
.left {
  margin-left: 5px;
}
</style>
