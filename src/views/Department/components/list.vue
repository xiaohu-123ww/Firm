<template>
  <div>
    <div v-if="show" id="detailClass">
      <div v-for="item in num" :key="item.id" class="list">
        <div class="list-context">
          <el-row>
            <el-col :span="10"
              ><div class="bg-purple">
                <div class="bg-purple-nn">
                  <span
                    style="font-size: 18px; margin-right: 10px"
                    @click="details(item.id)"
                    ><a href="javascript:;">{{ item.fullname }}</a></span
                  >
                  <span style="font-size: 12px; color: #676767"
                    >{{ item.adcode.second }}{{ item.adcode.third }}</span
                  >
                </div>
                <div class="bg-purple-sss">
                  <span
                    style="font-size: 14px; color: #fe6b49; margin-right: 10px"
                    >{{ item.salary_min }} - {{ item.salary_max }}
                    {{ item.salary_unit }}薪</span
                  >
                  <span style="font-size: 12px; color: #676767">{{
                    item.job_experience.name
                  }}</span>
                </div>
              </div></el-col
            >
            <el-col :span="7"
              ><div class="bg-purple-light">
                <div class="bg-purple-bty">
                  <div class="text">新消息</div>
                  <div style="font-size: 38px">{{ item.message }}</div>
                </div>
              </div></el-col
            >
            <el-col :span="5"
              ><div class="bg-purpl-el">
                <el-button
                  v-if="buttonOnLine"
                  class="elButton"
                  style="margin-left: 215px"
                  @click="refresh(item)"
                  ><Item icon="el-icon-refresh" class="Icon" />
                  职位刷新</el-button
                >

                <el-button
                  v-if="buttonNoOnLine || buttonNotPass"
                  class="elButton"
                  style="margin-left: 242px"
                  ><Item icon="copy" class="Icon" /> 复制</el-button
                >

                <el-button
                  v-if="buttonUnderReview"
                  class="elButton"
                  style="margin-left: 215px"
                  @click="deleteJob(item.id)"
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
                  alt=""
                  style="height: 30px; width: 30px"
                  :src="disposeImg(item.users.image)"
                />
              </div>
            </el-col>
            <el-col :span="1"
              ><div style="font-size: 13px">{{ item.users.name }}</div></el-col
            >
            <el-col :span="17"
              ><div style="font-size: 13px; color: #676767">
                发布时间：{{
                  parseTime(new Date(item.create_time).toLocaleString())
                }}
              </div></el-col
            >

            <el-col :span="5" class="list-button">
              <div class="list-button">
                <el-button
                  v-if="buttonOnLine || buttonNoOnLine || buttonNotPass"
                  class="list-my-bt"
                  round
                  @click="Amend(item.id)"
                  ><Item icon="xiugai" />修改</el-button
                >
                <el-button
                  v-if="buttonOnLine"
                  class="list-my-bt"
                  round
                  @click="jobOut(item.id, item.fullname)"
                  ><Item icon="exit" />下线</el-button
                >
                <el-button
                  v-if="buttonNoOnLine || buttonNotPass"
                  class="list-my-bt"
                  round
                  @click="JobTopThread(item.id)"
                  ><Item icon="exit" />上线</el-button
                >
                <el-button
                  v-if="buttonOnLine"
                  class="list-my-bt"
                  round
                  @click="copyJob(item.id)"
                  ><Item icon="fuzhi" />复制</el-button
                >
                <el-button
                  v-if="buttonNoOnLine || buttonNotPass"
                  class="list-my-bt"
                  round
                  @click="deleteJob(item.id)"
                  ><Item icon="shanchu" />删除</el-button
                >
              </div>
              <div v-if="buttonUnderReview || buttonNotPass">
                <el-button
                  class="list-my-bt"
                  round
                  style="margin-left: 146px"
                  @click="details"
                  ><Item icon="xiugai" />复制</el-button
                >
              </div>
            </el-col></el-row
          >
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="loading"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgb(244, 246, 249)"
        style="height: 700px; font-size: 100px"
      ></div>
      <Details v-else :particulars="particulars" @reset="reset" />
    </div>
    <el-dialog
      title="职位刷新"
      :visible.sync="dialogVisible"
      width="28%"
      :before-close="jobNext"
    >
      <div style="margin: 10px 20px">
        <div style="font-size: 14px">
          <span style="font-weight: 700; font-size: 18px">刷新职位：</span
          ><span style="color: rgb(37, 110, 253)">{{ fullname }}</span>
        </div>
        <div style="margin: 20px 0; font-size: 14px">
          <span style="font-weight: 700; font-size: 18px">刷新时间：</span
          ><span style="color: rgb(37, 110, 253)">{{ timeStr }}</span>
        </div>
        <div style="margin: 20px 0; font-size: 14px">
          <span style="font-weight: 700; font-size: 18px">刷新次数：</span
          ><span style="color: rgb(37, 110, 253)">{{ strs }}</span>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="jobNext">取 消</el-button>
        <el-button type="primary" @click="elButton">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
import Details from './details.vue'
import { getPostPosition, getTapeOut, getPositionCopy, getTopThread, getJobDelete, getDetail, getPositionMakeAmend } from '@/api/department/online'
// import disposeImg from '@/utils/disposeImg'
export default {
  components: { Item, Details },
  props: {
    num: {
      type: Array
    },
    buttonOnLine: {
      type: Boolean
    },
    buttonNoOnLine: {
      type: Boolean
    },
    buttonUnderReview: {
      type: Boolean
    },
    buttonNotPass: {
      type: Boolean
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
      tapJob: {
        id: 0
      },
      job: {
        id: '',
        times: 7
      },

      particulars: {},
      loading: false,
      dialogVisible: false,
      id: 0,
      fullname: '',
      timeStr: '',
      strs: 0,
      amendJob: {}
    }
  },
  watch: {

  },
  mounted () {

  },
  computed: {

  },

  methods: {
    // 第几页
    // 详情
    async details (id) {
      this.show = false
      this.$emit('hidden', false)
      this.loading = true
      const res = await getDetail(id)
      console.log('详情', res)
      this.loading = false
      this.particulars = res.data.data
    },
    getList () {
      console.log(this.disposeImg)
    },
    // 刷新职位
    async refresh (item) {
      this.dialogVisible = true
      this.id = item.id
      this.fullname = item.fullname
      const myDate = new Date()
      const str = myDate.toTimeString()
      this.timeStr = str.substring(0, 8)
      if (item.last_refresh_time === 0) {
        this.$message.error('此职位刷新次数已上限!')
        this.dialogVisible = false
      }
      this.strs = item.last_refresh_time
    },
    async elButton () {
      const res = await getPostPosition(this.id)
      console.log('刷新', res)
      if (res.code === 200) {
        this.$message.success('刷新成功')
        this.dialogVisible = false
      } else if (res.code === 1002) {
        this.$message.error(res.data.msg)
        this.dialogVisible = false
      }
    },
    jobNext () {
      this.$confirm(`确定职位刷新吗吗？`, '刷新', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = false
      })
    },
    // 下线
    async jobOut (id, fullname) {
      this.$confirm(`确定是否下线“${fullname}”职位吗？`, '下线', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.tapJob.id = id
        console.log(this.tapJob)
        const res = await getTapeOut(this.tapJob)
        console.log('下线', res)
        if (res.code === 200) {
          this.$message.success(res.data.msg)
          this.$emit('succeed')
        } else if (res.code === 1001) {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 复制
    async copyJob (id) {
      const res = await getPositionCopy(id)
      console.log('复制', res)
      if (res.code === 200) {
        this.$message.success('复制成功')
        this.$emit('copy', res.data.data)
      } else if (res.code === 1001) {
        this.$message.error('error')
      }
    },
    // 职位上线
    async JobTopThread (id) {
      this.job.id = id
      const res = await getTopThread(this.job)
      console.log('职位上线', res)
      if (res.code === 200) {
        this.$message.success(res.data.msg)
        this.$emit('line')
      } else if (res.code === 1001) {
        this.$message.error(res.data.msg)
      }
    },
    // 职位取消 职位删除
    deleteJob (item) {
      this.$confirm('确定要进行此操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const id = item
        const res = await getJobDelete(id)
        console.log('删除', res)
        if (res.code === 200) {
          this.$message.success(res.data.msg)
          this.$emit('line')
        } else if (res.code === 1002) {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 返回
    reset (i) {
      this.$emit('hiddenList', i)
      this.show = true
    },
    async Amend (id) {
      const { data } = await getPositionMakeAmend(id)
      console.log('修改职位', data)
      this.amendJob = data.data
      this.$emit('amend', this.amendJob)
    }

  }
}
</script>
<style scoped lang="scss">
.list {
  height: 120px;
  background-color: #fff;
  margin: 20px 30px;
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
      padding: 10px 0 0 40px;
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
    padding-left: 40px;
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
