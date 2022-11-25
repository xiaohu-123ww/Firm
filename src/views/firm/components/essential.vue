<template>
  <div>
    <el-card class="essential">
      <div class="essential-name">
        <el-row>
          <el-col :span="16">
            <div
              style="
                font-size: 18px;
                margin-bottom: 20px;
                font-weight: 700;
                margin-left: 92px;
              "
            >
              企业名称
            </div>
            <div
              style="font-size: 14px; margin-bottom: 50px; margin-left: 12px"
            >
              <el-form
                ref="firm"
                :model="list"
                label-width="80px"
                :rules="firmName"
              >
                <el-form-item prop="firm">
                  <el-input
                    v-model="list.firm"
                    placeholder="请输入企业名称"
                    style="width: 300px"
                    :disabled="state"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div
              style="
                font-size: 18px;
                margin-bottom: 20px;
                font-weight: 700;
                margin-left: 80px;
              "
            >
              <div
                style="font-size: 18px; font-weight: 700; margin-bottom: 18px"
              >
                <span style="color: red">* </span
                ><span style="color: black"> 所属行业（主业 / 副业）</span>
              </div>
            </div>
            <div style="margin-left: 8px">
              <el-form
                ref="required"
                :model="list"
                label-width="80px"
                :rules="required"
              >
                <el-col :span="8">
                  <el-form-item label="" prop="field">
                    <el-select
                      v-model="list.field"
                      placeholder="IT互联网"
                      style="width: 240px"
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
                </el-col>

                <el-col :span="11">
                  <el-form-item label="" prop="field_vice">
                    <el-select
                      v-model="list.field_vice"
                      placeholder="人力资源服务"
                      style="width: 240px"
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
                </el-col>
              </el-form>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-form
                ref="image"
                :model="list"
                label-width="80px"
                :rules="image"
              >
                <el-form-item label="">
                  <div
                    style="
                      font-size: 18px;
                      font-weight: 700;
                      margin-bottom: 10px;
                    "
                  >
                    <span style="color: red; margin-left: 10px">* </span
                    ><span style="color: black">企业LOGO</span>
                  </div>
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :before-upload="handleInfoPic"
                    :http-request="testUpload"
                    :on-success="uploadSuccess"
                  >
                    <img
                      v-if="list.logo"
                      :src="list.logo"
                      style="width: 120px"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                  <div
                    style="
                      font-size: 12px;
                      line-height: 15px;
                      color: #999;
                      margin-top: 5px;
                    "
                  >
                    <div>只能上传jpg/png文件，且不不超过5</div>
                    <div>尺寸不报销与200*200px,正方形（1：1）效果最佳</div>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-form ref="list" :model="list" label-width="80px" :rules="rules">
          <el-form-item label="" prop="nature" style="margin-bottom: 50px">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业性质</span>
            </div>
            <el-radio-group
              v-for="item in property"
              :key="item.id"
              v-model="list.nature"
              style="margin-right: 30px"
            >
              <el-radio :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="staff_size" style="margin-bottom: 50px">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业规模</span>
            </div>
            <el-radio-group
              v-for="item in scale"
              :key="item.id"
              v-model="list.staff_size"
              style="margin-right: 30px"
            >
              <el-radio :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label=""
            prop="financing_status"
            style="margin-bottom: 50px"
          >
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业上市/投融资状态</span>
            </div>
            <el-radio-group
              v-for="item in financingSate"
              :key="item.id"
              v-model="list.financing_status"
              style="margin-right: 30px"
            >
              <el-radio :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <span
              style="
                font-size: 18px;
                font-weight: 700;
                margin: 0 20px 60px 12px;
              "
              >是否想求职者展示</span
            >
            <el-switch v-model="list.is_financing_status"></el-switch>
          </el-form-item>
          <el-form-item
            label=""
            prop="registered_address"
            style="margin-bottom: 50px; margin-top: 20px"
          >
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业注册地</span>
            </div>
            <el-select
              v-model="list.registered_address"
              placeholder="北京"
              style="width: 260px; margin-left: 12px"
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
          <el-form-item style="margin-left: 10px">
            <el-button round class="bt" @click="onClick">退出编辑</el-button>
            <el-button
              round
              class="bt"
              style="background-color: #256efd; color: #fff"
              @click="submit"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getEnterprise, getEnterpriseList, getImgDelete, getWork } from '@/api/firm/index'
import { getIndustryField } from '@/api/department/online'
import { getCity } from '@/api/bai/index'
import { disposeImg } from '@/utils/disposeImg'
export default {
  data () {
    return {

      list: {
        firm: '',
        logo: '',
        field: '',
        nature: '',
        staff_size: '',
        financing_status: '',
        is_financing_status: false,
        registered_address: '',
        field_vice: ''

      },
      logo: '',
      scale: [
        {
          id: 2,
          name: '20以下'
        },
        {
          id: 3,
          name: '20-99人'
        },
        {
          id: 4,
          name: '100-299人'
        },
        {
          id: 5,
          name: '300-499人'
        },
        {
          id: 6,
          name: '500-999人'
        },
        {
          id: 7,
          name: '1000-9999人'
        },
        {
          id: 8,
          name: '10000以上'
        }

      ],
      financingSate: [
        {
          id: 1,
          name: '未融资'
        },
        {
          id: 2,
          name: '天使轮'
        },
        {
          id: 3,
          name: 'A轮'
        },
        {
          id: 4,
          name: 'B轮'
        },
        {
          id: 5,
          name: 'C轮'
        },
        {
          id: 6,
          name: 'D轮及以上'
        },
        {
          id: 7,
          name: '已上市'
        },
        {
          id: 8,
          name: '无融资计划'
        }

      ],
      property: [
        {
          id: 1,
          name: '国企'
        },
        {
          id: 2,
          name: '民营'
        },
        {
          id: 3,
          name: '合资'
        },
        {
          id: 4,
          name: '外商独资'
        },
        {
          id: 5,
          name: '股份制企业'
        },
        {
          id: 6,
          name: '上市公司'
        },
        {
          id: 7,
          name: '代表处'
        },
        {
          id: 8,
          name: '国家机关'
        }, {
          id: 9,
          name: '事业单位'
        },
        {
          id: 10,
          name: '银行'
        },
        {
          id: 11,
          name: '医院'
        },
        {
          id: 12,
          name: '学校/下级学院'
        },
        {
          id: 13,
          name: '律师事务所'
        },
        {
          id: 14,
          name: '社会团体'
        },
        {
          id: 15,
          name: '港澳台公司'
        },
        {
          id: 16,
          name: '其他'
        }

      ],
      firmName: {
        firm: { required: true, message: '请填写企业名称', trigger: 'blur' }
      },

      rules: {

        resource: [
          { required: true, message: '请选择企业性质', trigger: 'change' }
        ],
        nature: [
          { required: true, message: '请选择企业规模', trigger: 'change' }
        ],
        staff_size: [
          { required: true, message: '请选择企业规模', trigger: 'change' }
        ],
        financing_status: [
          { required: true, message: '请选择企业融资状态', trigger: 'change' }
        ],
        registered_address: [
          { required: true, message: '请选择企业注册状态', trigger: 'change' }
        ]
      },

      required: {
        field: [
          { required: true, message: '请选择所属行业', trigger: 'change' }
        ],
        field_vice: [
          { required: true, message: '请选择所属行业', trigger: 'change' }
        ]
      },
      image: {
        image: [
          { required: true, message: '请选择企业LOGO', trigger: 'change' }
        ]
      },
      lists: {
        logo: ''
      },
      IndustryList: {},
      field: {},
      cityAll: [],
      town: [],
      num: {},
      images: '',
      state: false,
      numstate: false
    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getList()
    this.getIndustry()
    this.getCityList()
  },
  methods: {
    handleInfoPic (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'

      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isJPG && !isPNG) this.$message.error('请上传格式为 png, jpeg 的图片！')
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG || isPNG || isLt2M
    },
    async testUpload (file) {
      var formData = new FormData()
      formData.append('image', file.file)
      const res = await getEnterprise(formData)
      console.log('res', res)
      if (res.code === 200) {
        this.$message.success('图片选择成功')
        const image = res.data.data.image
        this.lists.logo = image

        console.log('123', this.lists, res.data.data.image)
      } else {
        this.message.error(res.data.msg)
      }
    },
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.list.logo = URL.createObjectURL(file.raw)
    },
    submit () {
      this.$refs.firm.validate((valid) => {
        if (valid) {
          this.$refs.required.validate((valid) => {
            if (valid) {
              this.$refs.list.validate(async (vaild) => {
                if (vaild) {
                  if (this.numstate === true) {
                    if (this.list.field === this.num.field.children.name) {
                      this.list.field = this.num.field.children.id
                    }
                  }
                  if (this.numstate === true) {
                    if (this.list.field_vice === this.num.field_vice.children.name) {
                      this.list.field_vice = this.num.field_vice.children.id
                    }
                  }
                  if (this.numstate === true) {
                    if (this.list.registered_address === this.num.registered_address.name) {
                      this.list.registered_address = this.num.registered_address.id
                    }
                  }

                  if (this.list.is_financing_status === false) {
                    this.list.is_financing_status = 0
                  } else {
                    this.list.is_financing_status = 1
                  }
                  if (this.list.logo === this.images) {
                    this.list.logo = this.list.logo.slice(22)
                  } else {
                    this.list.logo = this.lists.logo
                  }

                  console.log('123', this.list)
                  const res = await getWork(this.list)
                  console.log('编辑', res)
                  this.$message.success('修改信息成功,信息审核中！')
                  this.$emit('reset', 0)
                }
              })
            }
          })
        }
      })
    },
    onClick () {
      this.$confirm('确定退出编辑吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(async () => {
        if (this.lists.logo === '') {
          const res = await getImgDelete()
          console.log('resa', res)
          this.$emit('reset', 0)
        } else {
          const res = await getImgDelete(this.lists)
          console.log('resa', res)
          this.$emit('reset', 0)
        }
      })
    },
    async getList () {
      const { data } = await getEnterpriseList()
      console.log('信息', data)
      if (data.data.length !== 0) {
        this.num = data.data
        this.numstate = true
        this.list.firm = data.data.name
        this.state = true
        this.list.field = data.data.field.children.name
        this.list.nature = data.data.nature.id
        this.list.staff_size = data.data.staff_size.id
        this.list.financing_status = data.data.financing_status.id
        const res = data.data.financing_status.is_financing_status.name
        this.list.field_vice = data.data.field_vice.children.name
        if (res === '不展示') {
          this.list.is_financing_status = false
        } else {
          this.list.is_financing_status = true
        }
        this.list.registered_address = data.data.registered_address.name
        this.images = this.disposeImg(data.data.logo)
        this.list.logo = this.disposeImg(data.data.logo)
        // this.logo = { 'url': this.images }
        // console.log('123', this.logo)
      }
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
      // if (e.length > 3) {
      //   this.$message.warning('最多可选择三个行业类型')
      //   this.ruleForm.field.splice(-1)
      // }
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
    }
  }

}

</script>
<style scoped lang="scss">
.essential {
  margin: 30px;
  border-radius: 18px;
  padding: 30px;
  .essential-name {
    height: 250px;
    // background-color: pink;
    // margin-top: 20px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
i.el-icon-plus.avatar-uploader-icon {
  border: 1px dashed rgb(197, 196, 196);
}
.avatar-uploader-icon[data-v-52c621c8] {
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
  // margin: 30px 0 0 200px;
  background-image: url('../../../assets/picture/moren@2x.png');
}
.bt {
  height: 35px;
  padding-top: 10px;
}
.el-form-item__content {
  margin-left: 0px !important;
}
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
</style>
