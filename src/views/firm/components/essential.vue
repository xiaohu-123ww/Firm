<template>
  <div>
    <el-card class="essential">
      <div class="essential-name">
        <el-row>
          <el-col :span="16">
            <div style="font-size: 18px; margin-bottom: 10px; font-weight: 700">
              企业名称
            </div>
            <div style="font-size: 14px; margin-bottom: 50px">
              <el-form
                ref="firm"
                :model="list"
                label-width="80px"
                :rules="ruless"
              >
                <el-form-item prop="firm">
                  <el-input
                    v-model="list.firm"
                    placeholder="请输入企业名称"
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="font-size: 18px; margin-bottom: 10px; font-weight: 700">
              所属行业（主业 / 副业）
            </div>
            <div>
              <el-form
                ref="required"
                :model="list"
                label-width="80px"
                :rules="required"
              >
                <el-col :span="8">
                  <el-form-item label="" prop="industry">
                    <el-select v-model="list.industry" placeholder="IT互联网">
                      <el-option label="IT互联网" value="1"></el-option>
                      <el-option label="销售" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="11">
                  <el-form-item label="" prop="job">
                    <el-select v-model="list.job" placeholder="人力资源服务">
                      <el-option label="人力资源服务" value="1"></el-option>
                      <el-option label="UI" value="2"></el-option>
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
                <el-form-item label="" prop="image">
                  <div style="font-size: 18px; font-weight: 700">
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
                      v-if="list.testImage"
                      :src="list.testImage"
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
          <el-form-item label="" prop="resource" style="margin-bottom: 50px">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业性质</span>
            </div>
            <el-radio-group
              v-for="(item, index) in property"
              :key="index"
              v-model="list.resource"
              style="margin-right: 30px"
            >
              <el-radio :label="item">{{ item }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="people" style="margin-bottom: 50px">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业规模</span>
            </div>
            <el-radio-group
              v-for="(item, index) in scale"
              :key="index"
              v-model="list.people"
              style="margin-right: 30px"
            >
              <el-radio :label="item">{{ item }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="financing" style="margin-bottom: 50px">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业上市/投融资状态</span>
            </div>
            <el-radio-group
              v-for="(item, index) in financingSate"
              :key="index"
              v-model="list.financing"
              style="margin-right: 30px"
            >
              <el-radio :label="item">{{ item }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <span
              style="font-size: 18px; font-weight: 700; margin: 0 20px 50px 0"
              >是否想求职者展示</span
            >
            <el-switch v-model="list.show"></el-switch>
          </el-form-item>
          <el-form-item label="" prop="financing" style="margin-bottom: 50px">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
              <span style="color: red">* </span
              ><span style="color: black">企业注册地</span>
            </div>
            <el-select v-model="list.address" placeholder="北京">
              <el-option label="北京" value="1"></el-option>
              <el-option label="上海" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
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
</template>item
<script>
export default {
  data () {
    return {

      list: {
        firm: '',
        industry: '',
        job: '',
        testImage: null,
        resource: '',
        people: '',
        financing: '',
        show: false,
        address: ''
      },
      scale: ['20以下', '20-99人', '100-299人', '300-499人', '1000-9999人', '10000以上'],
      financingSate: ['未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上', '已上市', '不需要融资'],
      property: ['国企', '外企独资', '代表处', '合资', '民营', '股份制企业', '上市公司', '国家机关', '事业单位', '银行', '医院', '学校/下级院校', '律师事务所', '社会团体', '港澳台公司', '其他'],
      rules: {

        resource: [
          { required: true, message: '请选择企业性质', trigger: 'change' }
        ],
        people: [
          { required: true, message: '请选择企业规模', trigger: 'change' }
        ],
        financing: [
          { required: true, message: '请选择企业融资状态', trigger: 'change' }
        ]
      },
      ruless: {
        firm: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1到 30 个字符', trigger: 'blur' }
        ]
      },
      required: {
        industry: [
          { required: true, message: '请选择所属行业', trigger: 'change' }
        ],
        job: [
          { required: true, message: '请选择所属行业', trigger: 'change' }
        ]
      },
      image: {
        image: [
          { required: true, message: '请选择企业LOGO', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {

  },
  computed: {

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
    testUpload (content) {
      console.log(content)
      content.onSuccess()
    },
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.list.testImage = URL.createObjectURL(file.raw)
    },
    submit () {
      this.$refs.list.validate()
      this.$refs.firm.validate()
      this.$refs.required.validate()
      this.$refs.image.validate()
    },
    onClick () {
      this.$emit('reset', 0)
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
    height: 210px;
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
</style>
