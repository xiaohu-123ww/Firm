<template>
  <div style="hieght: 100%">
    <div class="register">
      <img
        src="../../assets/image/logo1.png"
        alt=""
        style="height: 60px; margin: 15px 50px"
      />
    </div>
    <div class="box">
      <div class="firm">
        <el-row>
          <el-col :span="7">
            <div style="display: flex">
              <div style="margin: 12px 8px 12px 80px">
                <img
                  v-if="details"
                  src="../../assets/picture/dui@2x.png"
                  alt=""
                  style="width: 20px; height: 20px"
                />
                <img
                  v-if="!details"
                  src="../../assets/picture/36.png"
                  alt=""
                  style="width: 25px; height: 20px"
                />
              </div>
              <div style="margin: 12px 0px; color: rgb(185, 189, 197)">
                <a href="javascript:;" @click="firm"> 加入企业</a>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <i
              class="el-icon-arrow-right"
              style="
                margin: 12px 8px 12px 40px;
                font-size: 20px;
                color: rgb(185, 189, 197);
              "
            ></i>
          </el-col>
          <el-col :span="7">
            <div style="display: flex">
              <div style="margin: 12px 8px 12px 80px">
                <img
                  v-if="job"
                  src="../../assets/picture/dui@2x.png"
                  alt=""
                  style="width: 20px; height: 20px"
                />
                <img
                  v-if="!job"
                  src="../../assets/picture/36.png"
                  alt=""
                  style="width: 25px; height: 20px"
                />
              </div>
              <div style="margin: 12px 0px; color: rgb(185, 189, 197)">
                <a href="javascript:;" @click="authentication">实名认证</a>
              </div>
            </div></el-col
          >
          <el-col :span="2">
            <i
              class="el-icon-arrow-right"
              style="
                margin: 12px 8px 12px 40px;
                font-size: 20px;
                color: rgb(185, 189, 197);
              "
            ></i>
          </el-col>
          <el-col :span="6">
            <div style="display: flex">
              <div style="margin: 12px 8px 12px 80px">
                <img
                  v-if="enterprisess"
                  src="../../assets/picture/dui@2x.png"
                  alt=""
                  style="width: 20px; height: 20px"
                />
                <img
                  v-if="!enterprisess"
                  src="../../assets/picture/36.png"
                  alt=""
                  style="width: 25px; height: 20px"
                />
              </div>
              <div style="margin: 12px 0px; color: rgb(185, 189, 197)">
                <a href="javascript:;" @click="enterprise"> 企业认证</a>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="padding: 90px 150px">
        <el-form ref="rf" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="企业名称" prop="qw">
            <el-select
              v-model="form.enterprise_name"
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <!-- remote-method封装好的钩子函数。当用户在输入框中输入内容的时候，会触发这个函数的执行，
   把输入框对应的值作为参数带给回调函数，loading的意思就是远程搜索的时候等待的时间，即：加载中-->
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务" prop="job">
            <el-input v-model="form.job" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="企业地址" prop="address">
            <el-select
              v-model="form.address"
              placeholder="请选择活企业注册地"
              style="width: 500px"
            >
              <div style="display: flex">
                <div style="width: 150px">
                  <el-option
                    v-for="item in cityAll"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    disabled
                    @mousemove.native="cityChange(item)"
                  >
                  </el-option>
                </div>
                <div tyle="width: 150px">
                  <el-option
                    v-for="item in town"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </div>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="企业类型" prop="field">
            <el-select
              v-model="form.field"
              placeholder="请选择活动区域"
              style="width: 500px"
            >
              <el-option
                v-for="(item, index) in IndustryList"
                :key="index"
                :label="index"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin: 40px 0px 0px 336px">
            <el-button type="primary">取消</el-button>
            <el-button @click="nextStep">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getFirm } from '@/api/register/index'
import { getCity } from '@/api/bai/index'
import { getIndustryField } from '@/api/department/online'
export default {
  components: {},
  data () {
    return {
      details: false,
      job: false,
      enterprisess: false,
      form: {
        qw: '',
        enterprise_name: '',
        job: '',
        address: '',
        field: ''

      },
      show: true,
      cityAll: [],
      town: [],
      rules: {
        qw: [
          { required: true, message: '请输入关键字', trigger: ['blur', 'change'] }
        ],
        job: [
          { required: true, message: '请填写职位', trigger: 'blur' }
        ],
        field: [
          { required: true, message: '请选择企业类型', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择企业注册地', trigger: 'change' }
        ]
      },
      IndustryList: {},
      options: []

    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getCityList()
    this.getIndustry()
  },
  methods: {
    firm () {
      this.details = true
    },
    authentication () {
      this.job = true
    },
    enterprise () {
      this.enterprisess = true
    },
    async down () {
      console.log(1)
      this.show = false
      const res = await getFirm(this.form.qw)
      console.log('res', res)
    },
    // 城市
    async getCityList () {
      const { data } = await getCity()
      console.log('城市', data)
      this.cityAll = data.data
      console.log(this.cityAll)
    },
    // 市
    cityChange (i) {
      console.log(i)
      this.town = i.children
    },
    async getIndustry () {
      const { data } = await getIndustryField()
      console.log('行业领域', data)
      this.IndustryList = data
    },
    nextStep () {
      this.$refs.rf.validate((vaild) => {

      })
    },
    remoteMethod (query) {
      // 如果用户输入内容了，就发请求拿数据，远程搜索模糊查询
      if (query !== '') {
        // 开始拿数据喽
        // 这里模拟发请求，res就当成发请求返回来的数据吧。
        // const res = [
        //   {
        //     label: '孙悟空',
        //     value: 500
        //   },
        //   {
        //     label: '孙尚香',
        //     value: 18
        //   },
        //   {
        //     label: '沙和尚',
        //     value: 1000
        //   },
        //   {
        //     label: '沙师弟',
        //     value: 999
        //   }
        // ]
        // this.loading = false // 拿到数据喽
        // // 然后把拿到的所有数据，首先进行一个过滤，把有关联的过滤成一个新数组给到options使用
        // this.options = res.filter((item) => {
        //   // indexOf等于0代表只要首个字匹配的，如：搜索 王 王小虎数据会被过滤出来，但是 小虎王的数据不会被过滤出来。因为indexOf等于0代表以什么开头
        //   // return item.label.toLowerCase().indexOf(query.toLowerCase()) == 0

        //   // indexOf大于-1代表的是，只要有这个字出现的即可，如：搜索 王 王小虎、小虎王、小王虎都会被过滤出来。因为indexOf找不到才会返回-1，
        //   // 大于-1说明只要有就行，不论是不是开头也好，中间也好，或者结尾也好
        //   return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
        // })
        // } else {

        // }
      }
    }
  }
}

</script>
<style scoped lang="scss">
.register {
  height: 100px;
  background-color: rgb(33, 58, 107);
}
.box {
  width: 900px;
  margin: 0 auto;
  background-color: pink;
  height: 600px;
  margin-top: 80px;
  .firm {
    width: 100%;
    background-color: rgb(243, 246, 249);
    height: 40px;
  }
}
::v-deep label.el-form-item__label {
  line-height: 50px !important;
}
::v-deep input.el-input__inner {
  height: 45px;
}
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
</style>
