<!-- eslint-disable vue/prop-name-casing -->
<template>
  <div>
    <el-dialog
      title="面试详情"
      :visible.sync="flag"
      width="40%"
      :before-close="close"
    >
      <div v-if="flag">
        <div v-if="!show">
          <div class="particulars">
            <div class="particulars-title">
              <div class="particulars-img">
                <img :src="disposeImg(firm.hr.avatar)" alt="" class="img" />
              </div>
              <div>
                <div
                  style="font-size: 18px; margin-bottom: 8px; font-weight: 700"
                >
                  {{ firm.hr.name }}
                </div>
                <div style="font-size: 14px; color: #999">
                  面试岗位：{{ firm.position }}
                </div>
              </div>
              <el-button
                v-if="interviews.length !== 0"
                type="text"
                style="margin-left: 170px"
                icon="el-icon-view"
                class="num"
                @click="interviewList"
                >面试记录</el-button
              >
            </div>
            <p>面试时间：{{ firm.start_time }} - {{ firm.end_time }}</p>
            <p>面试地点：{{ firm.address }}</p>
            <p>联系人：{{ firm.contactor }}</p>
            <p>联系电话：{{ firm.contact }}</p>
            <p>注意事项：{{ firm.notice }}</p>
            <p>
              面试结果：<span style="color: red">{{ firm.result }}</span>
            </p>
            <p v-if="firm.memo">备注：{{ firm.memo }}</p>
            <!-- <p>面试结果：<span style="color: red">未完成</span></p> -->
          </div>
          <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="20"
        style="margin: 10px 0 0 300px"
      >
      </el-pagination> -->
          <span
            v-if="
              firm.result === '已取消' || firm.result === '待评价'
                ? false
                : true
            "
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              v-if="firm.result === '待定' ? true : false"
              style="background-color: #256efd; color: #fff; margin: 20px 200px"
              @click="submit"
              >再次邀约</el-button
            >
            <el-button
              v-if="firm.result === '未开始' ? true : false"
              style="background-color: #256efd; color: #fff; margin: 20px 200px"
              @click="deleteList"
              >取消面试</el-button
            >
          </span>

          <el-form
            v-if="firm.result === '待评价'"
            ref="interview"
            :model="interview"
            label-width="80px"
            :rules="rules"
            style="border-top: 1px solid #c0c0c0"
          >
            <el-form-item
              label="面试结果"
              style="margin-top: 20px"
              prop="interview_result"
            >
              <el-radio-group v-model="interview.interview_result">
                <el-radio label="0">未通过</el-radio>
                <el-radio label="1">已通过</el-radio>
                <el-radio label="2">待定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="interview.memo"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="margin-left: 200px"
                @click="confirm"
                >确定</el-button
              >
              <el-button @click="resetSubmit">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="show" class="particulars">
          <div>
            <div class="particulars-title">
              <div class="particulars-img">
                <img :src="disposeImg(num.hr.avatar)" alt="" class="img" />
              </div>
              <div>
                <div
                  style="font-size: 18px; margin-bottom: 8px; font-weight: 700"
                >
                  {{ num.hr.name }}
                </div>
                <div style="font-size: 14px; color: #999">
                  面试岗位：{{ num.position }}
                </div>
              </div>
            </div>
            <p>面试时间：{{ num.start_time }} - {{ num.end_time }}</p>
            <p>面试地点：{{ num.address }}</p>
            <p>联系人：{{ num.contactor }}</p>
            <p>联系电话：{{ num.contact }}</p>
            <p>注意事项：{{ num.notice }}</p>
            <p>
              面试结果：<span style="color: red">{{ num.result }}</span>
            </p>
            <p v-if="num.memo">备注：{{ num.memo }}</p>
            <!-- <p>面试结果：<span style="color: red">未完成</span></p> -->
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getFirmData, getFirmDelete, getFirm } from '@/api/salarys/index'

export default {

  props: {
    flag: {
      type: Boolean
    },
    interviews: {
      type: Array
    },
    firm: {
      type: Object
    }

  },
  data () {
    return {
      radio: '',
      radioArray: ['机械工程师', 'JAVA工程师', '工业机器人工程师', '机器视觉工程师'],
      interview: {
        interview_result: '',
        memo: ''
      },
      rules: {
        interview_result: [
          { required: true, message: '请选择面试结果', trigger: 'change' }
        ]
      },
      show: false,
      total: 0,
      num: {}

    }
  },
  mounted () {

  },
  computed: {

  },
  watch: {

  },
  created () {
    // this.getFirm()
  },
  methods: {
    close () {
      // this.$emit('reset', false)
      // console.log(this.arr)
      this.$emit('reset1')
      this.show = false
    },
    submit () {
      this.$emit('submit')
    },
    resetSubmit () {
      this.close()
    },
    confirm () {
      this.$refs.interview.validate(async (valid) => {
        if (valid) {
          if (this.interview.memo === '') {
            delete this.interview.memo
          }
          const res = await getFirmData(this.firm.id, this.interview)
          console.log('面试结果', res)
          this.$emit('reset1')
        }
      })
    },
    async deleteList () {
      const res = await getFirmDelete(this.firm.id)
      console.log('取消', res)
      this.$emit('reset1')
      this.show = false
    },
    async interviewList () {
      // this.show = true
      console.log(this.interviews.length)
      this.total = this.interviews.length * 10
      console.log(this.total)
      const res = await getFirm(this.interviews[0])
      console.log('面试详情', res)
      this.num = res.data
      this.show = true
    },
    async handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      const id = this.interviews[val - 1]
      const res = await getFirm(id)
      console.log('面试详情', res)
      this.num = res.data
    }

  }
}
</script>
<style scoped lang="scss">
.particulars {
  width: 100%;
  // height: 200px;
  // background-color: pink;
  // border-bottom: 1px solid #c0c0c0;
  padding-left: 12px;
  .particulars-title {
    width: 100%;
    height: 50px;
    // background-color: aqua;
    display: flex;
    .particulars-img {
      width: 50px;
      height: 50px;
      // background-color: blanchedalmond;
      border-radius: 100px;
      overflow: hidden;
      margin-right: 16px;
      .img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
::v-deep textarea.el-textarea__inner {
  height: 90px !important;
  width: 350px;
}
::v-deep .el-dialog__header {
  background: #fff !important;
  // height: 60px;
  // padding: 30px;
}
::v-deep .el-button--text:hover {
  color: #409eff;
  // border: ;
  border-color: transparent;
  // background-color: transparent;
}
</style>
