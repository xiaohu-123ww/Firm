<template>
  <el-dialog
    title="面试邀约"
    :visible.sync="flagShow"
    width="40%"
    :before-close="closes"
  >
    <el-form
      ref="rf"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="面试时间" prop="value1">
        <!-- <el-col :span="10">
          <el-form-item prop="start_time">
            <el-date-picker
              v-model="ruleForm.start_time"
              type="datetime"
              placeholder="选择日期时间"
              :picker-options="forbiddenTime"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="11">
          <el-form-item prop="end_time">
            <el-date-picker
              v-model="ruleForm.end_time"
              type="datetime"
              placeholder="选择日期"
              style="width: 100%"
              :picker-options="forbiddenTime"
            ></el-date-picker>
          </el-form-item> </el-col
      > -->
        <el-date-picker
          v-model="ruleForm.value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="options"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="面试方式" prop="model">
        <el-radio-group v-model="ruleForm.model">
          <el-radio-button label="线下"
            ><Item icon="添加" />线下面试</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="面试地点" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactor">
        <el-input v-model="ruleForm.contactor"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contact">
        <el-input v-model="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="注意事项" prop="notice">
        <el-input v-model="ruleForm.notice" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">发送面试</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
import { getInterview } from '@/api/salarys/index'
import { getDetail } from '@/api/department/online'
export default {
  props: {
    flagShow: {
      type: Boolean
    },
    interviewer: {
      type: Number
    },
    positionList: {
      type: Number
    },
    addresss: {
      type: String
    }
  },
  components: { Item },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入合法的手机号'))
      } else {
        callback()
      }
    }
    return {
      options: {
        // 时间不能大于当前时间

        disabledDate: (time) => {
          return Date.now() - 3600 * 1000 * 24 > time.getTime()
        }

      },
      // forbiddenTime: { // 禁用当前日期之前的日期
      //   disabledDate (time) {
      //     // Date.now()是javascript中的内置函数，它返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。
      //     return time.getTime() < Date.now() - 8.64e7
      //   }
      // },
      ruleForm: {
        start_time: '',
        end_time: '',
        contact: '',
        address: '',
        contactor: '',
        notice: '',
        model: '线下',
        value1: []
      },
      rules: {
        start_time: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        end_time: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        model: [
          { required: true, message: '请选择面试方式', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入面试地点', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur' }
        ],
        contactor: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        notice: [
          { required: true, message: '请填注意事项', trigger: 'blur' }
        ],
        contact: [{ required: true, trigger: 'blur', validator: validateUsername }],
        value1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]

      }
    }
  },
  created () {
    // this.getAddress()
  },
  mounted () {
    // this.getAddress()
  },
  watch: {
    addresss: {
      handler (newVal, oldVal) {
        this.ruleForm.address = newVal
        console.log(newVal, this.ruleForm.address)
        // this.ruleForm.address = newVal
        // console.log('this.ruleForm.address', this.ruleForm.address)
      },
      deep: false,
      immediate: true
    }

  },
  methods: {
    closes () {
      this.$emit('ret', false)
      this.clear()
    },
    close () {
      this.$emit('reset', false)
      this.clear()
    },
    clear () {
      this.ruleForm.start_time = ''
      this.ruleForm.end_time = ''
      this.ruleForm.contact = ''
      this.ruleForm.contactor = ''
      this.ruleForm.notice = ''
      this.ruleForm.value1 = []
      // this.ruleForm.address = ''
    },
    submit () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          this.ruleForm.interviewer = this.interviewer
          this.ruleForm.position = this.positionList
          console.log(this.changeDateTo(this.ruleForm.value1[0]))
          const time = this.changeDateTo(this.ruleForm.value1[0])
          console.log(time)
          this.ruleForm.start_time = time
          const end = this.changeDateTo(this.ruleForm.value1[1])
          this.ruleForm.end_time = end
          console.log(this.ruleForm)
          // delete this.ruleForm.value1
          const res = await getInterview(this.ruleForm)
          console.log('约面试', res)
          this.$message.success('已发送给求职者')
          this.$emit('reset', false)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep {
  textarea.el-textarea__inner {
    width: 100%;
  }
}
</style>
