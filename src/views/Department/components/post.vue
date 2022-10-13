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
          <el-form-item label="职位名称" prop="name" style="width: 600px">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入职位名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作性质" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="全职"></el-radio>
              <el-radio label="兼职"></el-radio>
              <el-radio label="实习"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="职位描述"
            prop="content"
            style="width: 900px; height: 160px"
          >
            <quill-editor
              ref="myQuillEditor"
              v-model="ruleForm.content"
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
          <el-form-item label="岗位类型" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
              style="width: 300px"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业类型" prop="value">
            <el-select
              v-model="ruleForm.value"
              multiple
              placeholder="请选择职业技能"
              class="box"
              style="width: 400px"
              @change="bindChange"
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
          <el-form-item label="学历要求" prop="education">
            <el-select
              v-model="ruleForm.education"
              placeholder="初中以下"
              style="width: 300px; margin-right: 10px"
            >
              <el-option label="初中以下" value="1"></el-option>
              <el-option label="高中以下" value="2"></el-option>
              <el-option label="大学" value="3"></el-option>
            </el-select>
            <el-select
              v-model="ruleForm.experience"
              placeholder="经验不限"
              style="width: 300px"
            >
              <el-option label="经验不限" value="shanghai"></el-option>
              <el-option label="一年工作经验" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="职位关键字">
            <el-select
              v-model="ruleForm.job"
              multiple
              placeholder="请选择职业关键字"
              class="box"
              style="width: 400px"
            >
              <el-option
                v-for="item in keyWord"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="工作地点" prop="address" style="width: 600px">
            <el-input
              v-model="ruleForm.address"
              placeholder="请输入工作地点"
            ></el-input>
          </el-form-item>
          <el-form-item label="薪资范围" prop="money">
            <el-select
              v-model="ruleForm.money"
              placeholder="1千以下"
              style="width: 200px; margin-right: 10px"
            >
              <el-option label="1千以下" value="1"></el-option>
              <el-option label="2千以下" value="2"></el-option>
              <el-option label="3千以下" value="3"></el-option>
            </el-select>
            --
            <el-select
              v-model="ruleForm.lastMoney"
              placeholder="1千以下"
              style="width: 200px; margin: 0 15px"
            >
              <el-option label="1千以下" value="1"></el-option>
              <el-option label="2千以下" value="2"></el-option>
              <el-option label="3千以下" value="3"></el-option>
            </el-select>
            x
            <el-select
              v-model="ruleForm.salary"
              placeholder="12薪"
              style="width: 200px; margin-left: 10px"
            >
              <el-option label="12薪" value="1"></el-option>
              <el-option label="13薪" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位福利">
            <el-select
              v-model="ruleForm.welfare"
              multiple
              placeholder="请选择职位福利"
              class="box"
              style="width: 400px"
              @change="welfareChange"
            >
              <el-option
                v-for="item in welfare"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
            <el-form-item label="招聘人数" prop="people" style="width: 600px">
              <el-input
                v-model="ruleForm.people"
                placeholder="请输入招聘人数"
              ></el-input>
            </el-form-item>
            <div style="margin-left: 10px; color: #c0c0c0">人</div>
          </div>
          <el-form-item label="简历邮箱" prop="email" style="width: 600px">
            <el-input
              v-model="ruleForm.email"
              placeholder="请输入简历邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="资格证书" style="width: 600px">
            <el-input
              v-model="ruleForm.credentials"
              placeholder="请选择职位证书"
              @click.native="handleClick"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="elBackground" round @click="submitForm"
              >保存并发布</el-button
            >
            <el-button round @click="resetForm">预览</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="show" class="credentials">
        <div class="credentials-title">
          资格证书
          <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="credentials-content">
          <div class="credentials-name">
            <a href="JavaScript:;">
              <div
                v-for="item in qualification"
                :key="item.value"
                class="credentials-name-one"
                :class="{ liBackground: changeLeftBackground == item.value }"
                @click="qualificationChange(item, item.label)"
              >
                {{ item.label }}
              </div>
            </a>
          </div>
          <div class="credentials-son">
            <div class="credentials-son-num">
              <el-row>
                <el-col v-for="item in credentials" :key="item.value" :span="12"
                  ><a href="JavaScript:;"
                    ><div
                      class="grid-content"
                      :class="{ liColor: changeBackground == item.value }"
                      @click="credentialsChange(item.label, item.value)"
                    >
                      {{ item.label }}
                    </div></a
                  ></el-col
                >
              </el-row>
            </div>
          </div>
        </div>
        <div class="credentials-footer">
          <el-button class="elBackground" round>保存并发布</el-button>
          <el-button round>预览</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
export default {
  components: { Item },
  data () {
    return {
      show: false,
      changeLeftBackground: 1,
      changeBackground: 1,
      ruleForm: {
        // 名称
        name: '',
        // 工作性质
        resource: '',
        // 职位描述
        content: '',
        // 岗位类型
        region: '',
        // 行业类型
        value: '',
        // 学历要求
        education: '',
        // 经验
        experience: '',
        // 职位关键字
        job: '',
        // 工作地点
        address: '',
        // 薪资
        money: '',
        lastMoney: '',
        // 几薪
        salary: '',
        // 职位福利
        welfare: '',
        // 人数
        people: '',
        // 邮箱
        email: '',
        // 资格证书
        credentials: ''
      },
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
        name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择工作性质', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择岗位类型', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请选择岗位类型', trigger: 'change' }
        ],
        education: [
          { required: true, message: '请选择学历/经验', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入工作地点', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请选择薪资范围/几薪', trigger: 'change' }
        ],
        people: [
          { required: true, message: '请输入招聘人数', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入简历邮箱', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
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
      keyWord: [
        {
          value: '机器人',
          label: '机器人'
        },
        {
          value: 'java工程师',
          label: 'java工程师'
        },
        {
          value: '前端工程师',
          label: '前端工程师'
        }
      ],
      welfare: [
        {
          value: '五险一金',
          label: '五险一金'
        },
        {
          value: '年终奖',
          label: '年终奖'
        },
        {
          value: '节日福利',
          label: '节日福利'
        },
        {
          value: '体检',
          label: '体检'
        },
        {
          value: '弹性福利',
          label: '弹性福利'
        },
        {
          value: '餐补福利',
          label: '餐补福利'
        }

      ],
      qualification: [
        {
          value: '1',
          label: '物联网证书',
          children: [{
            value: '1',
            label: '物联网系统工程师-初级'
          }, {
            value: '2',
            label: '物联网系统工程师-中级'
          }, {
            value: '3',
            label: '物联网系统工程师-高级'
          }]
        },
        {
          value: '2',
          label: '机械工程师证书',
          children: [{
            value: '1',
            label: '机械工程师资格证-初级'
          }, {
            value: '2',
            label: '机械工程师资格证-中级'
          }, {
            value: '3',
            label: '机械工程师资格证-高级'
          }]
        }
      ],
      credentials: [
        {
          value: '1',
          label: '物联网系统工程师-初级'
        }, {
          value: '2',
          label: '物联网系统工程师-中级'
        }, {
          value: '3',
          label: '物联网系统工程师-高级'
        }
      ]

    }
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
      this.$refs.rf.validate()
      // this.$emit('reset', true)
    },
    resetForm () {
      this.$refs.rf.validate()
      this.$emit('reset', true)
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
        this.ruleForm.welfare.splice(-1)
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
</style>
