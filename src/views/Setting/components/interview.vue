<template>
  <el-dialog
    title="面试邀约"
    :visible.sync="flagShow"
    width="40%"
    :before-close="close"
  >
    <el-form
      ref="rf"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动时间" required>
        <el-col :span="10">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-date-picker
              v-model="ruleForm.date2"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="面试方式" prop="model">
        <el-radio-group v-model="ruleForm.model">
          <el-radio-button label="线下"
            ><Item icon="添加" />线下面试</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="面试地点" prop="address">
        <el-input v-model="ruleForm.address" style="width: 430px"></el-input>
      </el-form-item>
      <el-form-item label="注意事项" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          type="textarea"
          style="width: 300px"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
export default {
  props: {
    flagShow: {
      type: Boolean
    }
  },
  components: { Item },
  data () {
    return {
      ruleForm: {
        data1: '',
        data2: '',
        model: '',
        address: '',
        name: '',
        desc: ''
      },
      rules: {
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        model: [
          { required: true, message: '请选择面试方式', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入面试地点', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填注意事项', trigger: 'blur' }
        ]

      }
    }
  },

  methods: {
    async close () {
      await this.$refs.rf.validate()
      await this.$emit('reset', false)
      this.ruleForm.date1 = ''
      this.ruleForm.date2 = ''
      this.ruleForm.model = ''
      this.ruleForm.address = ''
      this.ruleForm.anme = ''
      this.ruleForm.desc = ''
    }
  }
}
</script>
<style scoped lang="scss">
</style>
