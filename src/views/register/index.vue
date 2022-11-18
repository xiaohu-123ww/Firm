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
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 500px"
            >
              <!-- remote-method封装好的钩子函数。当用户在输入框中输入内容的时候，会触发这个函数的执行，
   把输入框对应的值作为参数带给回调函数，loading的意思就是远程搜索的时候等待的时间，即：加载中-->
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> -->
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
      <div v-if="showFlag" style="padding: 90px 150px">
        <el-form ref="rfs" :model="formList" label-width="80px" :rules="ruless">
          <el-form-item label="真实姓名" prop="name">
            <el-input
              v-model="formList.name"
              placeholder="请输入真实姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="card_id">
            <el-input v-model="formList.card_id"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="number">
            <el-input
              v-model="formList.number"
              placeholder="请输入手机号码"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="number_code">
            <el-input
              v-model="formList.number_code"
              placeholder="请输入验证码"
              style="width: 260px"
            ></el-input>
            <el-button
              :class="{ 'disabled-style': getCodeBtnDisable }"
              :disabled="getCodeBtnDisable"
              style="margin-left: 10px; height: 40px; line-height: 5px"
              type="primary"
              @click="getCodes()"
              >{{ codeBtnWord }}</el-button
            >
          </el-form-item>
          <el-form-item style="margin: 40px 0px 0px 336px">
            <el-button type="primary">取消</el-button>
            <el-button @click="handleClose">下一步</el-button>
          </el-form-item>
        </el-form>
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
          style="
            width: 100%;
            height: 30px;
            text-align: center;
            margin-top: 20px;
          "
        >
          您当前就职的公司 北京xxxxxx优先公司
          <el-button
            type="text"
            icon="el-icon-edit"
            style="color: rgb(32, 101, 206); margin-left: 20px"
            >更换公司</el-button
          >
        </div>
        <div class="email">
          <el-row>
            <el-col :span="12">
              <div class="email-one">
                <div class="email-two">企业邮箱认证</div>
                <div class="email-three">
                  <div class="text">通过企业邮箱认证您和企业的关系</div>
                  <div class="text">(极速审核)</div>
                  <div class="text" style="margin-top: 60px; color: red">
                    审核中
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
                  <div class="text">通过企业邮箱认证您和企业的关系</div>
                  <div class="text">(1-3个工作日)</div>
                  <div class="text" style="margin-top: 60px; color: red">
                    审核中
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
        </div>
      </div>
      <div v-if="emailss" class="emilss">
        <el-form
          ref="rss"
          :model="list"
          label-width="80px"
          style="text-aligin: center"
          :rules="newVal"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="list.email"
              placeholder="请输入邮箱"
              style="width: 350px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="list.code"
              placeholder="请输入验证码"
              style="width: 350px"
            ></el-input>
            <el-button
              :class="{ 'disabled-style': getCode }"
              :disabled="getCode"
              style="margin-left: 10px; height: 42px; line-height: 5px"
              type="primary"
              @click="getCodeList()"
              >{{ codeBtnWord }}</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button @click="handleCloses">取 消</el-button>
            <el-button type="primary" @click="emailClose">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="business" class="emilss" style="padding-top: 40px">
        <el-form ref="fr" :model="firms" label-width="80px" :rules="noung">
          <el-form-item label="企业名称" prop="enterprise_name">
            <el-input
              v-model="firms.enterprise_name"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业邮箱" prop="validation_email">
            <el-input
              v-model="firms.validation_email"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="firms.code"
              placeholder="请输入验证码"
              style="width: 400px"
            ></el-input>
            <el-button
              :class="{ 'disabled-style': getCodess }"
              :disabled="getCodess"
              style="margin-left: 10px; height: 42px; line-height: 5px"
              type="primary"
              @click="getCodeListss()"
              >{{ codeBtnWord }}</el-button
            >
          </el-form-item>
          <el-form-item label="营业执照">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :before-upload="handleInfoPic"
              :http-request="testUpload"
              :on-success="uploadSuccess"
            >
              <img
                v-if="firms.image_url"
                :src="firms.image_url"
                style="width: 178px; height: 178px; border-radius: 100px"
              />

              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div style="margin-top: 20px; color: #eeeef5">
              图片格式须为:jpg、jpeg、 png，每张大小不超过10M
            </div>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 375px" @click="handleClosess"
              >取消</el-button
            >
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="noun" class="emilss">
        <el-form
          ref="nickname"
          :model="nickname"
          label-width="80px"
          :rules="nicknames"
        >
          <el-form-item label="企业名称" prop="enterprise_name">
            <el-input
              v-model="nickname.enterprise_name"
              style="width: 400px"
            ></el-input>
          </el-form-item>

          <el-form-item label="营业执照">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :before-upload="handleInfoPic"
              :http-request="testUpload"
              :on-success="uploadSuccess"
            >
              <img
                v-if="nickname.image_url"
                :src="firms.image_url"
                style="width: 178px; height: 178px; border-radius: 100px"
              />

              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div style="margin-top: 20px; color: #eeeef5">
              图片格式须为:jpg、jpeg、 png，每张大小不超过10M
            </div>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 375px" @click="handle"
              >取消</el-button
            >
            <el-button type="primary">确定</el-button>
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
import { getverification, getAuthenList } from '@/api/personage/index'
import { getEmail, getEmailBound } from '@/api/personage/index'
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
        enterprise_name: [
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
      ruless: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
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
      newVal: {
        validation_email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { max: 6, message: '验证码必须是6个字符', trigger: 'blur' }
        ]
      },
      IndustryList: {},
      options: [],
      loading: true,
      company: true,
      formList: {
        name: '',
        card_id: '',
        number: '',
        number_code: ''
      },
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      number: false,
      showFlag: false,
      emailss: false,
      list: {
        validation_email: '',
        code: ''
      },
      business: false,
      firms: {
        enterprise_name: '',
        validation_email: '',
        code: '',
        image_url: ''
      },
      noun: false,

      noung: {
        validation_email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { max: 6, message: '验证码必须是6个字符', trigger: 'blur' }
        ],
        enterprise_name: [
          { required: true, message: '请输入关键字', trigger: ['blur', 'change'] }
        ]
      },
      nicknames: {
        enterprise_name: [
          { required: true, message: '请输入关键字', trigger: ['blur', 'change'] }
        ]
      },
      nickname: {
        enterprise_name: '',
        image_url: ''
      }

    }
  },
  mounted () {

  },
  computed: {
    getCodeBtnDisable: {
      get () {
        if (this.waitTime === 61) {
          if (this.formList.number) {
            return false
          }
          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set () { }

    },
    getCode: {
      get () {
        if (this.waitTime === 61) {
          if (this.list.validation_email) {
            return false
          }
          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set () { }

    },

    getCodess: {
      get () {
        if (this.waitTime === 61) {
          if (this.list.validation_email) {
            return false
          }
          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set () { }

    }
  },
  created () {
    this.getCityList()
    this.getIndustry()
  },
  methods: {
    firm () {
      this.details = true
      this.company = true
      this.showFlag = false
      this.number = false
      this.emailss = false
    },
    authentication () {
      this.job = true
      this.company = false
      this.showFlag = true
      this.number = false
      this.emailss = false
    },
    enterprise () {
      this.enterprisess = true
      this.company = false
      this.showFlag = false
      this.number = true
      this.emailss = false
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
      // this.$refs.rf.validate((vaild) => {
      //   if (vaild) {

      //   }
      // })
      this.company = false
      this.showFlag = true
    },
    async remoteMethod (query) {
      // 如果用户输入内容了，就发请求拿数据，远程搜索模糊查询
      if (query !== '') {
        console.log('query', query)
        const res = await getFirm(query)
        console.log('res', res)
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
    },
    async getCodes () {
      if (this.formList.number) {
        this.mobile = this.formList.number

        const res = await getverification(this.mobile)

        if (res.code === 200) {
          this.$message({
            message: '验证码已发送，请稍候...',
            type: 'success',
            center: true
          })
        }

        // 因为下面用到了定时器，需要保存this指向
        const that = this
        that.waitTime--
        that.getCodeBtnDisable = true
        this.codeBtnWord = `${this.waitTime}s 后重新获取`
        const timer = setInterval(function () {
          if (that.waitTime > 1) {
            that.waitTime--
            that.codeBtnWord = `${that.waitTime}s 后重新获取`
          } else {
            clearInterval(timer)
            that.codeBtnWord = '获取验证码'
            that.getCodeBtnDisable = false
            that.waitTime = 61
          }
        }, 1000)
      }
    },
    handleClose () {
      // this.$refs.rfs.validate(async (vaild) => {
      //   if (vaild) {
      //     const res = await getAuthenList(this.formList)
      //     console.log('实名认证', res)
      //     if (res.code === 1001) {
      //       this.$message.error(res.data.data.msg)
      //     }
      //     if (res.code === 200) {
      //       this.$message.error('实名认证成功')
      //       this.company = false
      //       this.showFlag = false
      //       this.number = true
      //     }
      //   }
      // })
      this.company = false
      this.showFlag = false
      this.number = true
      this.emailss = false
      // this.$emit('reset', false)
    },
    emailChange () {
      this.company = false
      this.showFlag = false
      this.number = false
      this.emailss = true
    },
    async getCodeList () {
      if (this.list.validation_email) {
        const res = await getEmail(this.list)
        console.log('res', res)
        if (res === undefined) {
          this.$message({
            message: '该账号已被绑定',
            type: 'error',
            center: true
          })
        } else {
          this.$message({
            message: '验证码已发送，请稍候...',
            type: 'success',
            center: true
          })
        }

        // 因为下面用到了定时器，需要保存this指向
        const that = this
        that.waitTime--
        that.getCodeBtnDisable = true
        this.codeBtnWord = `${this.waitTime}s 后重新获取`
        const timer = setInterval(function () {
          if (that.waitTime > 1) {
            that.waitTime--
            that.codeBtnWord = `${that.waitTime}s 后重新获取`
          } else {
            clearInterval(timer)
            that.codeBtnWord = '获取验证码'
            that.getCodeBtnDisable = false
            that.waitTime = 61
          }
        }, 1000)
      }
    },
    async emailClose () {
      console.log(this.ruleForm)
      const res = await getEmailBound(this.list)
      console.log('邮箱', res)
      if (res.code === 200) {
        this.$message.success('邮箱绑定成功')
        this.$emit('submit', false, this.ruleForm.email)
        this.$emit('reset', false)
      }
    }, // 取消
    handleCloses () {
      this.$confirm('确定取微信绑定吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.company = false
        this.showFlag = false
        this.number = true
        this.emailss = false
      })
    },
    getCodeListss () {

    },
    handleInfoPic (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isJPG2 && !isPNG) this.$message.error('请上传格式为 png, jpg, jpeg 的图片！')
      return isJPG || isJPG2 || isPNG
    },
    async testUpload (file) {
      var formData = new FormData()
      formData.append('image', file.file)
      // const res = await planInsert(formData)
      // console.log('res', res)
      // if (res.code === 200) {
      //   this.$message.success(res.data.msg)
      //   this.getPer()
      // } else {
      //   this.message.error(res.data.msg)
      // }
    },
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.form.image = URL.createObjectURL(file.raw)
    },
    businessLicense () {
      this.company = false
      this.showFlag = false
      this.number = false
      this.emailss = false
      this.business = false
      this.noun = true
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
</style>
