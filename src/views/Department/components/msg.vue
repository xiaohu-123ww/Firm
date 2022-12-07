<template>
  <div class="post">
    <div class="post-job">发布职位</div>
    <el-card class="post-card">
      <div>
        <el-form
          ref="rf"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="职位名称"
            prop="fullname"
            style="width: 600px; height: 35px"
          >
            <el-input
              v-model="ruleForm.fullname"
              placeholder="请输入职位名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作性质" prop="jobNature" style="height: 35px">
            <el-radio-group v-model="ruleForm.jobNature">
              <el-radio
                v-for="(item, index) in nature"
                :key="index"
                :label="index"
                @change="radio(item)"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="职位描述"
            prop="job_content"
            style="width: 900px; height: 160px; margin-bottom: 30px"
          >
            <quill-editor
              ref="myQuillEditor"
              v-model="ruleForm.job_content"
              :options="editorOption"
              class="quill"
              @focus="onEditorFocus($event)"
              @blur="onEditorBlur($event)"
              @change="onEditorChange($event)"
            >
              <div id="toolbar" slot="toolbar">
                <button><Item icon="fanone" /></button>
                <button><Item icon="fantwo" /></button>
                <select class="ql-font" title="字体">
                  <option value="SimSun">宋体</option>
                  <option value="SimHei">黑体</option>
                  <option value="Microsoft-YaHei">微软雅黑</option>
                  <option value="KaiTi">楷体</option>
                  <option value="FangSong">仿宋</option>
                  <option value="Arial">Arial</option>
                </select>
                <!-- Add a bold button -->
                <select class="ql-font" title="字体大小">
                  <option value="10px">10px</option>
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px" selected>16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                </select>
                <button><Item icon="jiu" /></button>
                <button class="ql-bold" title="加粗">Bold</button>
                <button class="ql-italic" title="斜体">Italic</button>
                <button class="ql-underline" title="下划线">underline</button>

                <!--Add list -->
                <button
                  class="ql-list"
                  value="ordered"
                  title="有序列表"
                ></button>
                <button
                  class="ql-list"
                  value="bullet"
                  title="无序列表"
                ></button>
                <!-- Add font size dropdown -->

                <!-- Add subscript and superscript buttons -->

                <select class="ql-align" value="align" title="对齐"></select>
                <button class="ql-image" title="图片"></button>
                <button class="ql-video" title="视频"></button>
                <button class="ql-link" title="链接"></button>
                <!-- You can also add your own -->
              </div>
            </quill-editor>
          </el-form-item>
          <el-form-item label="岗位类型" prop="pst_class" style="height: 35px">
            <el-select
              v-model="ruleForm.pst_class"
              placeholder="请选择岗位类型"
              style="margin-top: 0px"
            >
              <div style="display: flex">
                <div>
                  <el-option
                    v-for="(item, index) in optionss"
                    :key="index"
                    :label="index"
                    :value="index"
                    disabled
                    @mousemove.native="tradeChange(item)"
                  >
                  </el-option>
                </div>
                <div>
                  <el-option
                    v-for="(item, index) in tradelist"
                    :key="index"
                    :label="index"
                    :value="index"
                    disabled
                    @mousemove.native="serchPostChange(item)"
                  >
                  </el-option>
                </div>
                <div>
                  <el-option
                    v-for="(item, index) in positionJobList"
                    :key="index"
                    :label="index"
                    :value="item"
                    @click.native="jobChange(item)"
                  >
                  </el-option>
                </div>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="行业类型" prop="field" style="height: 35px">
            <el-select
              v-model="ruleForm.field"
              placeholder="请选择行业类型"
              style="margin-top: 0px; width: 600px"
              multiple
              @change="fieldChange"
            >
              <div style="display: flex">
                <div style="width: 150px">
                  <el-option
                    v-for="(item, index) in IndustryList"
                    :key="index"
                    :label="index"
                    :value="index"
                    disabled
                    @mousemove.native="industryChange(item)"
                  >
                  </el-option>
                </div>
                <div>
                  <el-option
                    v-for="(item, index) in field"
                    :key="index"
                    :label="index"
                    :value="item"
                  >
                  </el-option>
                </div>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="学历要求" required style="height: 35px">
            <div style="display: flex">
              <el-form-item prop="education">
                <el-select
                  v-model="ruleForm.education"
                  placeholder="初中以下"
                  style="width: 300px; margin-right: 50px"
                >
                  <el-option
                    v-for="(item, index) in educationalRequirements"
                    :key="index"
                    :value="item"
                    :label="index"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="job_experience">
                <el-select
                  v-model="ruleForm.job_experience"
                  placeholder="经验不限"
                  style="width: 300px"
                >
                  <el-option
                    v-for="(item, index) in experienceList"
                    :key="index"
                    :value="item"
                    :label="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>

          <el-form-item
            label="职位关键字"
            prop="jobkeywords"
            style="height: 40px"
          >
            <el-select
              v-model="ruleForm.jobkeywords"
              placeholder="请选择职位关键字"
              style="margin-top: 0px; width: 600px"
              multiple
              @change="jobWorksChange"
            >
              <div style="display: flex">
                <div style="width: 200px">
                  <el-option
                    v-for="item in works"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    disabled
                    @mousemove.native="worksChange(item)"
                  >
                  </el-option>
                </div>
                <div>
                  <el-option
                    v-for="item in worksChildren"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </div>
              </div>
            </el-select>
          </el-form-item>

          <el-form-item
            label="工作地点"
            prop="address"
            style="width: 600px; height: 35px"
          >
            <el-input
              v-model="ruleForm.address"
              placeholder="请输入工作地点"
              @click.native="jobAddres"
            ></el-input>
          </el-form-item>
          <el-form-item required style="height: 40px" label="薪资福利">
            <div style="display: flex">
              <el-form-item prop="salary_min" style="color: rgb(220, 223, 230)">
                <el-input
                  v-model="ruleForm.salary_min"
                  style="width: 220px; margin-right: 5px"
                  placeholder="最低薪资"
                ></el-input>
              </el-form-item>
              <el-col :span="1" style="color: rgb(220, 223, 230)">K</el-col>
              <el-col :span="1" style="color: rgb(220, 223, 230)">——</el-col>

              <el-form-item prop="salary_max" style="color: rgb(220, 223, 230)">
                <el-input
                  v-model="ruleForm.salary_max"
                  style="width: 220px; margin-right: 5px"
                  placeholder="最高薪资"
                ></el-input>
              </el-form-item>
              <el-col :span="1" style="color: rgb(220, 223, 230)">K</el-col>
              <el-col :span="1" style="color: rgb(220, 223, 230)">——</el-col>

              <el-form-item prop="salary_unit">
                <el-select
                  v-model="ruleForm.salary_unit"
                  placeholder="12薪"
                  style="width: 260px"
                >
                  <el-option
                    v-for="(item, index) in unit"
                    :key="index"
                    :lable="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="职位福利" prop="tag" style="height: 40px">
            <el-select
              v-model="ruleForm.tag"
              multiple
              placeholder="请选择职位福利"
              class="box"
              style="width: 600px"
              @change="welfareChange"
            >
              <el-option
                v-for="item in welfareList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div
            style="
              width: 800px;
              display: flex;
              line-height: 50px;
              padding-right: 10px;
            "
          >
            <el-form-item
              label="招聘人数"
              prop="number_of_employers"
              style="width: 600px"
            >
              <el-input
                v-model="ruleForm.number_of_employers"
                placeholder="请输入招聘人数"
              ></el-input>
            </el-form-item>
            <div style="margin-left: 10px; color: #c0c0c0">人</div>
          </div>
          <el-form-item
            label="简历邮箱"
            prop="email"
            style="width: 600px; height: 35px"
          >
            <el-input
              v-model="ruleForm.email"
              placeholder="请输入简历邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="资格证书" style="width: 600px">
            <el-select
              v-model="ruleForm.certificationInfo_id"
              placeholder="请选择资格证书"
              prop="value"
              multiple
              style="width: 900px"
              @change="certificate"
              @click.native="getList"
              @remove-tag="removeLabels"
            >
              <div style="display: flex">
                <div style="width: 150px">
                  <el-option
                    v-for="(item, index) in certList"
                    :key="index"
                    :label="index"
                    :value="index"
                    disabled
                    @mousemove.native="industryNum(item)"
                  >
                  </el-option>
                </div>
                <div>
                  <el-option
                    v-for="item in fieldNan"
                    :key="item.cert_id"
                    :label="item.cert_name"
                    :value="item.cert_id"
                    @mousemove.native="fieldNum(item.cert_id)"
                    >{{ item.cert_name }}-{{ item.cert_level }}
                  </el-option>
                </div>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="elBackground" round @click="submitForm"
              >保存</el-button
            >
            <el-button round @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <Bai
      :dialog="dialog"
      :adcode-list="adcodeList"
      @dialogReset="dialogReset"
    />
  </div>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
import Bai from '@/components/bai/index.vue'
import { getShowClass, getIndustryField, getRequirement, getJobkeywords, getwelfare, getCertList, getMake, getFullnameList } from '@/api/department/online'
export default {
  props: {
    jobAmend: {
      type: Object,
      default: () => { }
    }

  },
  components: {
    Item,
    Bai
  },
  data () {
    return {
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      show: false,
      changeLeftBackground: 1,
      changeBackground: 1,
      ruleForm: {
        // 名称
        fullname: '',
        // 工作性质
        job_nature: '',
        // 职位描述
        job_content: '',
        // 岗位类型
        pst_class: '',
        // 行业类型
        field: [],
        // 学历要求
        education: '',
        // 经验
        job_experience: '',
        // 职位关键字
        jobkeywords: [],
        // 工作地点
        address: '',
        // 薪资
        salary_min: '',
        salary_max: '',
        // 几薪
        salary_unit: '',
        // 职位福利
        tag: [],
        // 人数
        number_of_employers: '',
        // 邮箱
        email: '',
        // 资格证书
        certificationInfo_id: [],

        // 地点adcode
        adcode: '',
        // 详细地址
        adcode_detail: '',
        // 经度
        longitude: '',
        // 纬度
        latitude: '',
        jobNature: '',
        id: 0

      },
      list: {
        // 名称
        fullname: '',
        // 工作性质
        job_nature: '',
        // 职位描述
        job_content: '',
        // 岗位类型
        pst_class: '',
        // 行业类型
        field: [],
        // 学历要求
        education: '',
        // 经验
        job_experience: '',
        // 职位关键字
        jobkeywords: [],
        // 工作地点
        address: '',
        // 薪资
        salary_min: '',
        salary_max: '',
        // 几薪
        salary_unit: '',
        // 职位福利
        tag: [],
        // 人数
        number_of_employers: '',
        // 邮箱
        email: '',
        // 资格证书
        certificationInfo_id: [],

        // 地点adcode
        adcode: '',
        // 详细地址
        adcode_detail: '',
        // 经度
        longitude: '',
        // 纬度
        latitude: '',
        id: 0
      },
      optionss: {},
      tradelist: {},
      // 职位
      positionJobList: {},
      IndustryList: {},
      field: {},

      editor: null, // 富文本编辑器对象
      content: '', // 富文本编辑器默认内容
      editorOption: {
        // 富文本编辑器配置，顶部的工具栏
        modules: {
          toolbar: '#toolbar'

        },
        theme: 'snow', // 主题
        placeholder: '请输入正文'
      },
      rules: {
        job_content: [
          { required: true, message: '请输入职位描述', trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: '请输入职位名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        jobNature: [
          { required: true, message: '请选择工作性质', trigger: 'change' }
        ],
        pst_class: [
          { required: true, message: '请选择岗位类型', trigger: 'change' }
        ],
        field: [
          { required: true, message: '请选择岗位类型', trigger: 'change' }
        ],
        education: [
          { required: true, message: '请选择学历/经验', trigger: 'change' }
        ],
        job_experience: [
          { required: true, message: '请选择经验', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择工作地点', trigger: 'change' }

        ],
        salary_min: [
          { required: true, message: '请输入薪资范围', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              const boolean = new RegExp('^[1-9][0-9]*$').test(value)
              // console.log(boolean)
              if (!boolean) {
                cb(new Error('只能输入整数'))
              } else {
                cb()
              }
            }
          }
        ],
        salary_max: [
          { required: true, message: '请输入薪资范围', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              const boolean = new RegExp('^[1-9][0-9]*$').test(value)
              // console.log(boolean)
              if (!boolean) {
                cb(new Error('只能输入整数'))
              } else {
                cb()
              }
            }
          }
        ],
        salary_unit: [
          { required: true, message: '请选择几薪', trigger: 'change' }
        ],
        number_of_employers: [
          { required: true, message: '请输入招聘人数', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              const boolean = new RegExp('^[1-9][0-9]*$').test(value)
              // console.log(boolean)
              if (!boolean) {
                cb(new Error('只能输入整数'))
              } else {
                cb()
              }
            }
          }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        tag: [
          { required: true, message: '请选择职位福利', trigger: 'change' }
        ],
        jobkeywords: [
          { required: true, message: '请选择职位关键字', trigger: 'change' }
        ],
        certificationInfo_id: [
          { required: true, message: '请选择资格证书', trigger: 'change' }
        ]
      },
      options: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      unit: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],

      dialog: false,
      educationalRequirements: {},
      experienceList: {},
      works: [],
      worksChildren: [],
      welfareList: [],
      fieldNan: [],
      certList: {},
      nature: {},
      hidden: false,
      adcodeList: {},
      fullnames: { fullname: '' }

    }
  },
  watch: {
    jobAmend: {
      handler (newVal, oldVal) {
        console.log(newVal)
        // this.ruleForm = newVal
        this.ruleForm.fullname = newVal.fullname
        this.ruleForm.jobNature = newVal.job_nature.name
        this.ruleForm.job_nature = newVal.job_nature.id
        this.ruleForm.address = newVal.adcode.second + newVal.adcode.third + newVal.adcode_detail
        this.ruleForm.salary_min = newVal.salary_min
        this.ruleForm.salary_max = newVal.salary_max
        this.ruleForm.longitude = newVal.longitude
        this.ruleForm.latitude = newVal.longitude
        this.ruleForm.salary_unit = newVal.salary_unit
        this.ruleForm.tag = newVal.tag.map(item => item.id)
        this.ruleForm.job_content = newVal.job_content

        this.ruleForm.education = newVal.education.id
        this.ruleForm.job_experience = newVal.job_experience.name

        this.ruleForm.number_of_employers = newVal.number_of_employers
        this.ruleForm.email = newVal.email
        // 行业类型
        const firm = newVal.field.map(item => item.children)
        this.ruleForm.field = firm.map(item => item.name)
        // 岗位类型
        this.ruleForm.pst_class = newVal.pst_class.name
        // 职位关键字
        const job = newVal.jobkeywords.map(item => item.children)
        this.ruleForm.jobkeywords = job.map(item => item.name)
        // 资格证书
        const jobJob = newVal.certificationInfo_id.map(item => item.name)
        const bb = new Set(jobJob)
        this.ruleForm.certificationInfo_id = Array.from(bb)
        console.log('2', this.ruleForm.certificationInfo_id)

        this.ruleForm.longitude = newVal.longitude
        this.ruleForm.latitude = newVal.latitude
        this.adcodeList = newVal
      },
      deep: true,
      immediate: true

    }
  },
  created () {
    this.getPostList()
    this.getIndustry()
    this.jobRequirement()
    this.getWorks()
    this.getwelfareChange()
    this.getCert()
  },
  mounted () {
    this.editor = this.$refs.myQuillEditor.quill
  },
  beforeDestroy () {
    this.editor = null
    delete this.editor
  },
  computed: {

  },

  methods: {
    submitForm () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          this.fullnames.fullname = this.ruleForm.fullname
          this.fullnames.pid = this.jobAmend.id
          console.log(this.fullnames)
          const res1 = await getFullnameList(this.fullnames)
          console.log('res1', res1)
          if (res1.code === 200) {
            this.list.fullname = this.ruleForm.fullname
            this.list.job_nature = this.ruleForm.job_nature
            this.list.job_content = this.ruleForm.job_content
            // 行业
            const firm = this.jobAmend.field.map(item => item.children)
            const aa = firm.map(item => item.name)
            const bb = this.ruleForm.field
            if (bb.toString() === aa.toString()) {
              const cc = firm.map(item => item.id)

              this.list.field = cc
              console.log('cc', this.list.field)
            } else {
              if (aa[0] === bb[0]) {
                bb[0] = firm[0].id
              }
              if (aa[1] === bb[1]) {
                bb[1] = firm[1].id
              }
              if (aa[1] === bb[0]) {
                bb[0] = firm[1].id
              }
              this.list.field = Array.from(new Set(bb))
              console.log('aa', this.list.field)
            }
            // 岗位
            const num = this.jobAmend.pst_class.name
            if (this.ruleForm.pst_class === num) {
              this.list.pst_class = this.jobAmend.pst_class.id
            } else {
              this.list.pst_class = this.ruleForm.pst_class
            }
            const jobNum = this.jobAmend.job_experience.name
            if (this.ruleForm.job_experience === jobNum) {
              this.list.job_experience = this.jobAmend.job_experience.id
            } else {
              this.list.job_experience = this.ruleForm.job_experience
            }
            this.list.education = this.ruleForm.education
            this.list.email = this.ruleForm.email
            this.list.number_of_employers = this.ruleForm.number_of_employers
            // 福利
            this.list.tag = this.ruleForm.tag
            const jobs = this.jobAmend.jobkeywords.map(item => item.children)
            console.log('job', jobs)
            const ss = jobs.map(item => item.name)
            const nn = this.ruleForm.jobkeywords
            if (ss.toString() === nn.toString()) {
              const cc = jobs.map(item => item.id)
              this.list.jobkeywords = cc
              console.log('ss', this.list.jobkeywords)
            } else {
              if (ss[0] === nn[0]) {
                nn[0] = jobs[0].id
              }
              if (ss[1] === nn[1]) {
                nn[1] = jobs[1].id
              }
              if (nn[1] === ss[0]) {
                nn[0] = jobs[0].id
              }
              if (nn[2] === ss[0]) {
                nn[2] = jobs[0].id
              }
              if (nn[3] === ss[0]) {
                nn[3] = jobs[0].id
              }
              // if (nn[2] === ss[3]) {
              //   nn[0] = jobs[3].id
              // }
              // if (nn[2] === ss[4]) {
              //   nn[0] = jobs[4].id
              // }
              // if (nn[3] === ss[4]) {
              //   nn[0] = jobs[4].id
              // }
              this.list.jobkeywords = nn
              console.log('nn', this.list.jobkeywords)
            }
            const adrsss = this.jobAmend.adcode.second + this.jobAmend.adcode.third + this.jobAmend.adcode_detail
            if (adrsss === this.ruleForm.address) {
              this.list.adcode = this.jobAmend.adcode.adcode
              this.list.adcode_detail = this.jobAmend.adcode_detail
            } else {
              this.list.adcode = this.ruleForm.adcode
              this.list.adcode_detail = this.ruleForm.adcode_detail
            }
            this.list.longitude = this.ruleForm.longitude
            this.list.latitude = this.ruleForm.latitude
            this.list.id = this.jobAmend.id
            this.list.salary_min = this.ruleForm.salary_min
            this.list.salary_max = this.ruleForm.salary_max
            this.list.salary_unit = this.ruleForm.salary_unit
            console.log('222', this.list)
            const id = this.ruleForm.certificationInfo_id
            console.log('123', this.ruleForm.certificationInfo_id)
            const jobJob = this.jobAmend.certificationInfo_id.map(item => item)
            console.log('jobjob', jobJob)
            // for (var i = 0; i < id.length; i++) {
            //   if (id[i] === jobJob[i])
            // }
            if (this.hidden === false) {
              const jobJob = this.jobAmend.certificationInfo_id.map(item => item.id)
              this.list.certificationInfo_id = jobJob
            } else {
              this.list.certificationInfo_id = id
            }
            const name = this.ruleForm.certificationInfo_id
            const res = await getMake(this.list)
            console.log('修改职位', res)
            this.$message.success('职位修改成功')
            this.$emit('reset4', true)
            this.clear()
          } else {
            this.$message.error(res1.data.msg)
          }
        }
      })
      // this.$emit('reset', true)
    },
    resetForm () {
      this.$confirm('确定取消职位修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.$emit('reset4')
      })
    },
    // 准备富文本编辑器
    onEditorReady (editor) { },
    // 富文本编辑器 失去焦点事件
    onEditorBlur (editor) { },
    // 富文本编辑器 获得焦点事件
    onEditorFocus (editor) { },
    // 富文本编辑器 内容改变事件
    onEditorChange (editor) {
      console.log(editor)
    },
    // 行业类型最多可选择三个数据
    bindChange (e) {
      if (e.length > 3) {
        this.$message.warning('最多可选择三个行业类型')
        this.ruleForm.value.splice(-1)
      }
    },
    // 职位福利最多可选择五个
    welfareChange (e) {
      if (e.length > 5) {
        this.$message.warning('最多可选择五个职位福利')
        this.ruleForm.tag.splice(-1)
      }
    },
    // 资格证书
    handleClick () {
      console.log(1)
      this.show = true
    },
    qualificationChange (i) {
      console.log(i)
      this.credentials = i.children
      this.changeLeftBackground = i.value
    },
    credentialsChange (name, value) {
      this.ruleForm.credentials = name
      this.changeBackground = value
    },
    // 关闭
    close () {
      this.show = false
    },
    jobAddres () {
      this.dialog = true
      this.adcodeList = this.jobAmend
      console.log(1)
    },
    dialogReset (i, address, adcode, addressAll, locations) {
      console.log(i, address, adcode, addressAll, locations)
      this.dialog = i
      this.ruleForm.address = address
      this.ruleForm.adcode = adcode
      this.ruleForm.adcode_detail = addressAll

      this.ruleForm.longitude = locations.lng
      this.ruleForm.latitude = locations.lat
    },

    // 岗位
    async getPostList () {
      const { data } = await getShowClass()
      console.log('岗位', data)
      this.optionss = data
    },

    tradeChange (index) {
      console.log('index', index)
      this.tradelist = index
    },

    serchPostChange (index) {
      console.log('index1', index)
      this.positionJobList = index
    },
    jobChange (item) {
      console.log('123', item)
      this.ruleForm.pst_class = item
    },
    // 行业领域分类
    async getIndustry () {
      const { data } = await getIndustryField()
      console.log('行业领域', data)
      this.IndustryList = data
    },
    industryChange (item) {
      console.log('1121', item)
      this.field = item
    },
    fieldChange (e) {
      console.log('hangye', e)
      if (e.length > 3) {
        this.$message.warning('最多可选择三个行业类型')
        this.ruleForm.field.splice(-1)
      }
      console.log(this.ruleForm.field)
    },
    // 其他要求
    async jobRequirement () {
      const { data } = await getRequirement()
      console.log('其他要求', data)
      this.educationalRequirements = data.education
      this.experienceList = data.job_experience
      this.nature = data.job_nature
    },
    // 职位关键字
    async getWorks () {
      const { data } = await getJobkeywords()
      console.log('职位关键字', data)
      this.works = data.data
    },
    worksChange (item) {
      console.log(item)
      this.worksChildren = item.children
    },
    jobWorksChange (e) {
      if (e.length > 5) {
        this.$message.warning('最多可选择五个职位关键字')
        this.ruleForm.jobkeywords.splice(-1)
      }
    },
    // 福利
    async getwelfareChange () {
      const { data } = await getwelfare()
      console.log('福利', data)
      this.welfareList = data.data
    },
    // 系统证书
    async getCert () {
      const { data } = await getCertList()
      console.log('系统证书列表', data)
      this.certList = data
    },
    industryNum (items) {
      console.log(items)
      this.fieldNan = items.map(item => ({
        cert_name: item.cert_name + '-' + item.cert_level,
        cert_id: item.cert_id

      }))
    },
    fieldNum (item) {

    },
    certificate (e) {
      console.log(e)
      console.log(this.ruleForm.certificationInfo_id)
      if (e.length > 6) {
        this.$message.warning('最多可选择六个资格证书')
        this.ruleForm.certificationInfo_id.splice(-1)
      }
    },
    radio (item) {
      console.log(item)
      this.ruleForm.job_nature = item
    },
    clear () {
      this.ruleForm.fullname = ''
      this.ruleForm.job_nature = ''
      this.ruleForm.job_content = ''
      this.ruleForm.pst_class = ''
      this.ruleForm.field = []
      this.ruleForm.education = ''
      this.ruleForm.job_experience = ''
      this.ruleForm.jobkeywords = []
      this.ruleForm.address = ''
      this.ruleForm.salary_min = ''
      this.ruleForm.salary_max = ''
      this.ruleForm.salary = ''
      this.ruleForm.tag = []
      this.ruleForm.number_of_employers = ''
      this.ruleForm.email = ''
      this.ruleForm.certificationInfo_id = []
      this.ruleForm.adcode = ''
      this.ruleForm.adcode_detail = ''
      this.ruleForm.longitude = ''
      this.ruleForm.latitude = ''
      this.ruleForm.jobNature = ''
    },
    getList () {
      this.hidden = true
      this.$message.success('避免信息错误，请重新选择资格证书')
      this.ruleForm.certificationInfo_id = []
      this.list.certificationInfo_id = this.ruleForm.certificationInfo_id
    },
    removeLabels (val) {
      // const jobJob = this.jobAmend.certificationInfo_id.map(item => item)

      for (var i = 0; i < this.jobAmend.certificationInfo_id.length; i++) {
        if (this.jobAmend.certificationInfo_id[i].name === val) {
          console.log('123', this.jobAmend.certificationInfo_id[i])
          const aa = this.jobAmend.certificationInfo_id[i].id
          this.jobAmend.certificationInfo_id.splice(this.jobAmend.certificationInfo_id[i].id === aa, 1)
          console.log('val', this.jobAmend.certificationInfo_id)
        }
      }
    }

  }
}
</script>
<style scoped lang="scss">
.post {
  .post-job {
    height: 60px;
    background-color: #fff;
    line-height: 60px;
    padding-left: 30px;
    font-weight: 700;
  }
  .post-card {
    margin: 20px;
    border-radius: 20px;
    position: relative;
    .credentials {
      position: absolute;
      bottom: 221px;
      left: 118px;
      width: 700px;
      height: 350px;
      background-color: #fff;
      border: 1px solid #ece9e9;
      overflow: hidden;
      border-radius: 20px;
      .credentials-title {
        height: 50px;
        // background-color: aqua;
        line-height: 50px;
        padding-left: 30px;
        border-bottom: 1px solid #ece9e9;
        font-weight: 700;
        .el-icon-close {
          margin-left: 560px;
          color: #c0c0c0;
        }
      }
      .credentials-content {
        height: 230px;
        // background-color: rgb(96, 56, 63);

        border-bottom: 1px solid #ece9e9;
        display: flex;
        .credentials-name {
          width: 150px;
          background-color: #ece9e9;
          height: 100%;
          // padding-left: 30px;
          .credentials-name-one {
            width: 100%;
            height: 40px;
            // background-color: aqua;
            line-height: 40px;
            font-size: 15px;
            text-align: center;
            font-weight: 700;
          }
        }
        .credentials-son {
          margin: 20px;
          .credentials-son-num {
            width: 500px;
            height: 25px;
            // background-color: aqua;
            padding: 0 25px;
            .grid-content {
              width: 200px;
              height: 30px;
              background-color: #ece9e9;
              border-radius: 15px;
              text-align: center;
              font-size: 14px;
              line-height: 30px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .credentials-footer {
        width: 100%;
        height: 100%;
        padding-top: 15px;
        text-align: center;
      }
    }
  }
  .ql-font {
    width: 70px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #ece9e9;
    margin-right: 10px;
  }
}

::v-deep .el-input__inner {
  border-radius: 10px;
  // height: 45px;
}
#toolbar {
  border: 0;
  border-bottom: 1px solid #ece9e9;
}
::v-deep .ql-toolbar.ql-snow + .ql-container.ql-snow {
  border: 0;
}

::v-deep .quill {
  border-radius: 20px;
  // background-color: red;
  border: 1px solid #ece9e9;
  height: 160px;
  // overflow: hidden;
}
.liBackground {
  background-color: #fff;
}
.elBackground {
  background-color: #256efd;
  color: #fff;
}
.liColor {
  border: 1px solid #4382fd;
  color: #4382fd;
  background-color: #e6f1fc !important;
}
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
::v-deep .ql-editor {
  height: 100px;
}
</style>
