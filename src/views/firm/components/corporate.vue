<template>
  <div>
    <el-card class="corporate">
      <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px">
        企业图片
      </div>
      <el-upload
        action="#"
        :before-upload="handleInfoPic"
        :on-success="handleSuccess"
        :http-request="testUpload"
        list-type="picture-card"
        :file-list="showPicList"
        :on-exceed="handleExceed"
        :limit="5"
        accept=".png,.jpeg,.jpg"
      >
        <i slot="default" class="el-icon-plus" />
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
              ><i class="el-icon-zoom-in"
            /></span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
              ><i class="el-icon-delete"
            /></span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" append-to-body title="图片预览">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <div class="text">1.最多上传5张图片</div>
      <div class="text" style="margin-top: 3px">
        2.图片格式须为：jpg、jpeg、png,每张大小不能超过10M
      </div>

      <el-button round class="bt" @click="DropOut">退出编辑</el-button>
      <el-button
        round
        class="bt"
        style="background-color: #256efd; color: #fff"
        @click="confirm"
        >确定</el-button
      >
    </el-card>
  </div>
</template>
<script>
import { getImage, getImageDelete, getFirm, getCorporateImage, getCorporateImageDelete } from '@/api/firm/index'
export default {
  data () {
    return {
      dialogImageUrl: '', // 图片操作对话框上的图片
      dialogVisible: false, // 图片操作对话框可见性
      infopics: [], // 所需上传图片组 => 存储base64
      picName: '', // 图片名称
      showPicList: [],
      leg: 0, // 所需展示图片组 => 存储图片文件
      img: {
        image: ''
      },
      list: {
        image: []
      }

    }
  },
  created () {
    this.getListNum()
  },
  methods: {
    async getListNum () {
      const res = await getImage()
      console.log('res', res)
      const image = res.data.data.images.map(item => item.image)
      const images = image.map(item => this.disposeImg(item))
      const bb = images.map(item => ({

        url: item
      }))
      this.showPicList = bb

      console.log('this.showPicList', bb)
      const aa = res.data.data.images.length
      this.leg = 6 - aa
      console.log(this.leg)
    },
    // 0.3.1 上传图片 => 点击上传触发
    handleInfoPic (file) {
      const isLtSize = file.size / 1024 / 1024 < 4
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 4MB!')
      }
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isJPG2 && !isPNG) this.$message.error('请上传格式为 png, jpg, jpeg 的图片！')
      this.picName = file.name
      console.log('file', file)
      return isJPG || isJPG2 || isPNG
    },
    // 0.3.2 提交请求
    async testUpload (file) {
      var formData = new FormData()
      formData.append('image', file.file)
      const res = await getFirm(formData)
      console.log('res', res)
      if (res.code === 200) {
        this.$message.success('图片选择成功')
        const image = res.data.data.image
        this.list.image.push(image)
        console.log(this.list)
      } else {
        this.message.error(res.data.msg)
      }
    },
    // 0.3.3 图片上传成功加入数据
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      this.showPicList = fileList
      const reader = new FileReader()
      reader.readAsDataURL(file.raw) // 图片文件转 base64
      reader.onload = () => {
        this.infopics.push({
          name: this.picName,
          url: reader.result
        })
      }
    },
    // 0.3.4 图片移除操作
    async handleRemove (file) {
      console.log(file)
      this.img.image = file.url.slice(22)
      console.log('123', this.img)
      const res = await getImageDelete(this.img)
      console.log('移除', res)
      this.$message.success('移除图片成功')
      this.getListNum()
    },
    // 0.3.5 图片浏览操作
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed (file, fileList) {
      // console.log(file, fileList);
      this.$message.error('上传失败，限制上传数量5张图片！')
    },
    // 确定
    async confirm () {
      const res = await getCorporateImage(this.list)
      console.log('上传成功', res)
      this.$message.success('上传图片成功，图片审核中')
      this.$emit('reset', 0)
    },
    // 退出编辑
    async DropOut () {
      console.log(this.list)
      const res = await getCorporateImageDelete(this.list)
      console.log('退出编辑', res)
      this.$message.success('退出编辑成功，信息不会被保存')
      this.$emit('reset', 0)
    }

  }
}
</script>
<style scoped lang="scss">
.corporate {
  margin: 30px;
  border-radius: 18px;
  padding: 20px 50px;
}
.text {
  font-size: 12px;
  margin-top: 10px;
  color: #999;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 130px;
  text-align: center;
  border-radius: 40px;
  padding-top: 10px;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
.bt {
  height: 35px;
  padding: 10px;
  width: 80px;
  margin-top: 30px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 148px;
  height: 148px;
}
::v-deep .el-upload.el-upload--picture-card {
  border-radius: 40px !important;
}
::v-deep img.el-upload-list__item-thumbnail {
  border-radius: 40px;
}
::v-deep .el-dialog__header {
  background: #fff !important;
  // height: 60px;
  // padding: 30px;
}
</style>
