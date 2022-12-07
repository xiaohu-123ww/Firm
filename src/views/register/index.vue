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
              <div style="margin: 12px 8px 12px 60px">
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
      <div v-if="company" style="padding: 90px 150px">
        <el-form ref="rf" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="企业名称" prop="enterprise_name">
            <el-select
              v-model="form.enterprise_name"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 500px"
            >
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
            <el-button @click="nextLast">取消</el-button>
            <el-button type="primary" @click="nextStep">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="showFlag" style="padding: 90px 150px">
        <Identity
          :form-list="formList"
          :numbers="numbers"
          @handleEmail="handleEmail"
          @lastStep="lastStep"
        />
      </div>
      <div v-if="number">
        <div
          style="
            width: 100%;
            height: 30px;
            text-align: center;
            margin-top: 20px;
            font-size: 25px;
          "
        >
          认证方式
        </div>
        <div
          v-if="inputChange"
          style="
            width: 100%;
            height: 30px;
            text-align: center;
            margin-top: 20px;
          "
        >
          您当前就职的公司 {{ form.enterprise_name }}
          <el-button
            type="text"
            icon="el-icon-edit"
            style="color: rgb(32, 101, 206); margin-left: 20px"
            @click="changeFirm"
            >更换公司</el-button
          >
        </div>
        <div v-else style="display: flex; margin: 20px 100px">
          <el-select
            v-model="form.enterprise_name"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            style="width: 500px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="numberChange">确定</el-button>
        </div>
        <div class="email">
          <div
            v-if="
              condition.email_identity_valid === true &&
              condition.license_identity_valid === true
            "
          >
            <el-row>
              <el-col :span="12">
                <div class="email-one">
                  <div class="email-two">企业邮箱认证</div>
                  <div class="email-three">
                    <div class="text">通过企业邮箱认证您和企业的关系</div>
                    <div class="text">(极速审核)</div>
                    <div
                      v-if="state"
                      class="text"
                      style="margin-top: 60px; color: red"
                    >
                      {{ state }}
                    </div>
                  </div>
                  <div>
                    <el-button
                      style="
                        width: 130px;
                        height: 35px;
                        background-color: rgb(32, 101, 206);
                        color: #fff;
                        padding-top: 10px;
                        margin-left: 70px;
                        border: 1px soild rgb(32, 101, 206);
                      "
                      @click="emailChange"
                      >去认证</el-button
                    >
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  class="email-one"
                  style="border: 1px solid rgb(217, 217, 217)"
                >
                  <div
                    class="email-two"
                    style="background-color: #fff; color: rgb(102, 102, 102)"
                  >
                    企业证件认证
                  </div>
                  <div class="email-three">
                    <div class="text">提交企业营业执照认证</div>
                    <div class="text">(1-3个工作日)</div>
                    <div
                      v-if="state"
                      class="text"
                      style="margin-top: 60px; color: red"
                    >
                      {{ state }}
                    </div>
                  </div>
                  <div>
                    <el-button
                      style="
                        width: 130px;
                        height: 35px;

                        color: rgb(32, 101, 206);
                        padding-top: 10px;
                        margin-left: 70px;
                        border: 1px soild rgb(32, 101, 206);
                      "
                      @click="businessLicense"
                      >去认证</el-button
                    >
                  </div>
                </div>
              </el-col>
            </el-row>
            <div style="margin-top: 30px">
              <div style="padding-left: 60px"><Item icon="fill" />提示</div>
              <div
                style="
                  font-size: 14px;
                  color: #897e7e;
                  padding: 10px 60px;
                  line-height: 20px;
                "
              >
                根据法规要求，在您注册成为经办人前，需确保您所提交的相关认证材料的真实性、合法性、有效性及来源于企业的授权使用，授权目的包括但不限于注册、使用企业名下的招聘者账号
              </div>
            </div>
          </div>
          <div
            v-if="
              condition.email_identity_valid === true &&
              condition.license_identity_valid === false
            "
          >
            <el-row>
              <el-col :span="24">
                <div class="email-one" style="margin: 10px auto">
                  <div class="email-two">企业邮箱认证</div>
                  <div class="email-three">
                    <div class="text">通过企业邮箱认证您和企业的关系</div>
                    <div class="text">(极速审核)</div>
                    <div
                      v-if="state"
                      class="text"
                      style="margin-top: 60px; color: red"
                    >
                      {{ state }}
                    </div>
                  </div>
                  <div>
                    <el-button
                      style="
                        width: 130px;
                        height: 35px;
                        background-color: rgb(32, 101, 206);
                        color: #fff;
                        padding-top: 10px;
                        margin-left: 70px;
                        border: 1px soild rgb(32, 101, 206);
                      "
                      @click="emailChange"
                      >去认证</el-button
                    >
                  </div>
                </div>
              </el-col>
            </el-row>
            <div style="margin-top: 30px">
              <div style="padding-left: 60px"><Item icon="fill" />提示</div>
              <div
                style="
                  font-size: 14px;
                  color: #897e7e;
                  padding: 10px 60px;
                  line-height: 20px;
                "
              >
                根据法规要求，在您注册成为经办人前，需确保您所提交的相关认证材料的真实性、合法性、有效性及来源于企业的授权使用，授权目的包括但不限于注册、使用企业名下的招聘者账号
              </div>
            </div>
          </div>

          <div
            v-if="
              condition.license_identity_valid === true &&
              condition.email_identity_valid === false
            "
          >
            <el-row>
              <el-col :span="24">
                <div
                  class="email-one"
                  style="
                    border: 1px solid rgb(217, 217, 217);
                    margin: 10px auto;
                  "
                >
                  <div
                    class="email-two"
                    style="background-color: #fff; color: rgb(102, 102, 102)"
                  >
                    企业证件认证
                  </div>
                  <div class="email-three">
                    <div class="text">提交企业营业执照认证</div>
                    <div class="text">(1-3个工作日)</div>
                    <div
                      v-if="state"
                      class="text"
                      style="margin-top: 60px; color: red"
                    >
                      {{ state }}
                    </div>
                  </div>
                  <div>
                    <el-button
                      style="
                        width: 130px;
                        height: 35px;

                        color: rgb(32, 101, 206);
                        padding-top: 10px;
                        margin-left: 70px;
                        border: 1px soild rgb(32, 101, 206);
                      "
                      @click="businessLicense"
                      >去认证</el-button
                    >
                  </div>
                </div>
              </el-col>
            </el-row>
            <div style="margin-top: 30px">
              <div style="padding-left: 60px"><Item icon="fill" />提示</div>
              <div
                style="
                  font-size: 14px;
                  color: #897e7e;
                  padding: 10px 60px;
                  line-height: 20px;
                "
              >
                根据法规要求，在您注册成为经办人前，需确保您所提交的相关认证材料的真实性、合法性、有效性及来源于企业的授权使用，授权目的包括但不限于注册、使用企业名下的招聘者账号
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="emailss" class="emilss">
          <Emailss
            :enterprise="form.enterprise_name"
            :hr="hr"
            @handleClose="handleClose"
          />
        </div>
        <div v-if="business" class="emilss" style="padding-top: 40px">
          <Firm
            :enterprise="form.enterprise_name"
            @handleClosess="handleClosess"
          />
        </div>
        <div v-if="noun" class="emilss">
          <Business :enterprise="form.enterprise_name" @handle="handle" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFirm, getCheckMethods } from '@/api/register/index'
import { getCity } from '@/api/bai/index'
import { getIndustryField } from '@/api/department/online'
import Emailss from './components/emailss.vue'
import Identity from './components/identity.vue'
import Firm from './components/firm.vue'

import Business from './components/business.vue'
import Item from '@/layout/components/Sidebar/Item'
export default {
  components: { Identity, Emailss, Firm, Business, Item },
  data () {
    return {
      hr: '',
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
      formList: {
        name: '',
        card_id: '',
        number: '',
        number_code: ''
      },
      show: true,
      cityAll: [],
      town: [],
      rules: {
        enterprise_name: [
          { required: true, message: '请输入企业名称', trigger: ['blur', 'change'] }
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
      photoList: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        card_id: [{ required: true, message: '请输入身份证ID', trigger: 'blur' },
        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确' }],
        number: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
        {
          validator: function (rule, value, callback) {
            if (/^1[34578]\d{9}$/.test(value) === false) {
              callback(new Error('请输入正确的手机号'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }],
        number_code: [
          { required: true, message: '验证码不能为空' },
          { max: 4, message: '验证码必须是4个字符', trigger: 'blur' }
        ]

      },

      IndustryList: {},
      options: [],
      loading: true,
      company: true,

      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      number: false,
      showFlag: false,
      emailss: false,

      business: false,

      noun: false,
      keyWord: [],

      check: {

      },
      condition: {},
      state: '',
      name: '',
      inputChange: true,
      numbers: ''

    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getCityList()
    this.getIndustry()
    this.getQuery()
  },
  methods: {
    async getQuery () {
      console.log('this.$route.params.id', this.$route.params.id)
      console.log('this.$route.params.id.number', this.$route.params.number)
      this.numbers = this.$route.query.numbers
      if (this.$route.params.id.enterprise_id !== '') {
        this.enterprisess = true
        this.company = false
        this.showFlag = false
        this.number = true
        this.details = true
        this.emailss = false
        this.business = false
        this.noun = false
        const id = this.$route.params.id.enterprise_id
        console.log('id', id)
        this.form.enterprise_name = id
        this.state = this.$route.params.id.status.name
        this.check.enterprise_name = this.form.enterprise_name
        const res = await getCheckMethods(this.check)
        this.hr = res.data.hr_email
        console.log('验证方式', res, this.hr)
        this.job = true
        this.condition = res.data
      }

      // const res = await getCheckMethods(id)
      // console.log('验证方式', res)
      // this.job = true
      // this.condition = res.data
    },
    firm () {
      this.details = true
      this.company = true
      this.showFlag = false
      this.number = false
      this.emailss = false
      this.business = false
      this.noun = false
    },
    authentication () {
      if (this.$route.params.id.enterprise_id !== '') {
        this.job = true
        this.company = false
        this.showFlag = true
        this.number = false
        this.emailss = false
        this.business = false
        this.noun = false
      } else {
        if (this.form.enterprise_name === '' || this.form.job === '' || this.form.address === '' || this.form.field === '') {
          this.$message.error('请先完成企业内容填写')
        } else {
          this.job = true
          this.company = false
          this.showFlag = true
          this.number = false
          this.emailss = false
          this.business = false
          this.noun = false
        }
      }
    },
    enterprise () {
      if (this.$route.params.id.enterprise_id !== '') {
        this.enterprisess = true
        this.company = false
        this.showFlag = false
        this.number = true

        this.emailss = false
        this.business = false
        this.noun = false
      } else {
        if (this.formList.name === '' || this.formList.card_id === '' || this.formList.number === '' || this.formList.number_code === '') {
          this.$message.error('请先完成实名认证')
        } else {
          this.enterprisess = true
          this.company = false
          this.showFlag = false
          this.number = true

          this.emailss = false
          this.business = false
          this.noun = false
        }
      }
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
      this.$refs.rf.validate(async (vaild) => {
        if (vaild) {
          console.log(this.form.enterprise_name)
          this.details = true
          this.company = false
          this.showFlag = true
          this.check.enterprise_name = this.form.enterprise_name
          const res = await getCheckMethods(this.check)
          console.log('验证方式', res)
          console.log('this.$route.params.id.number', this.$route.params.number)
          this.numbers = this.$route.query.number
          console.log(this.numbers)
          this.job = true
          this.condition = res.data
          this.hr = res.data.hr_email
          console.log('123', this.hr)
        }
      })
    },
    lastStep () {
      this.details = false
      this.company = true
      this.showFlag = false
    },
    async remoteMethod (query) {
      // 如果用户输入内容了，就发请求拿数据，远程搜索模糊查询
      if (query !== '') {
        this.loading = true
        setTimeout(async () => {
          this.loading = false
          const res = await getFirm(query)
          console.log('res', res)
          const list = res.data.Data
          if (list !== null && res.code !== 1001) {
            this.keyWord = list.map(item => {
              return { value: item.Name, label: item.Name }
            })
          }
          this.options = this.keyWord.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },

    // 实名认证
    async handleEmail (name) {
      this.company = false
      this.showFlag = false
      this.number = true
      this.emailss = false
      this.job = true
      this.formList = name
      this.enterprisess = true
    },
    emailChange () {
      this.company = false
      this.showFlag = false
      this.number = false
      this.emailss = true
    },

    handleClose () {
      this.company = false
      this.showFlag = false
      this.number = true
      this.emailss = false
      this.business = false
      this.noun = false
    },
    getCodeListss () {

    },

    businessLicense () {
      this.company = false
      this.showFlag = false
      this.number = false
      this.emailss = false
      if (this.condition.license_with_email === true) {
        this.business = true
        console.log(1)
      } else {
        this.noun = true
        console.log(2)
      }
    },
    handleClosess () {
      this.company = false
      this.showFlag = false
      this.number = true
      this.emailss = false
      this.business = false
      this.noun = false
    },
    handle () {
      this.company = false
      this.showFlag = false
      this.number = true
      this.emailss = false
      this.business = false
      this.noun = false
    },
    async numberChange () {
      // console.log(1)
      // this.form.enterprise_name = this.name
      // this.inputChange = true
      this.check.enterprise_name = this.form.enterprise_name
      const res = await getCheckMethods(this.check)
      console.log('验证方式', res)
      this.job = true
      this.condition = res.data
      this.hr = res.data.hr_email
      console.log('123', this.hr)
    },
    changeFirm () {
      this.inputChange = false
      console.log(1)
    },
    inChange () {

    },
    nextLast () {
      this.$router.push('/')
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
  // background-color: pink;
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
.email {
  width: 100%;
  height: 500px;
  // background-color: aqua;
  padding-top: 45px;
  .email-one {
    width: 280px;
    height: 340px;
    border: 1px solid rgb(32, 101, 206);
    margin-left: 110px;
    .email-two {
      height: 80px;
      background-color: rgb(32, 101, 206);
      font-size: 20px;
      color: #fff;
      text-align: center;
      line-height: 80px;
    }
    .email-three {
      height: 180px;
      // background-color: pink;
      margin: 10px 15px;
      border-bottom: 1px solid rgb(217, 217, 217);
      .text {
        font-size: 15px;
        text-align: center;
        margin-bottom: 10px;
        margin-top: 20px;
        color: rgb(116, 119, 116);
      }
    }
  }
}
.emilss {
  width: 100%;
  height: 100%;
  // background-color: blue;
  padding: 100px 0px 0px 150px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
::v-deep .el-upload.el-upload--text {
  background-color: #eeeef5;
}
.none {
  pointer-events: none;
}
</style>
