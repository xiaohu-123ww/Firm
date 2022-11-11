<template>
  <div>
    <el-dialog
      title="地址"
      :visible.sync="dialog"
      width="width"
      :before-close="dialogBeforeClose"
    >
      <div style="margin-bottom: 15px">
        <el-form ref="form" :model="list" label-width="80px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="">
                <el-select
                  v-model="list.city"
                  placeholder="省"
                  style="width: 200px; margin-left: 0px"
                >
                  <el-option
                    v-for="item in cityAll"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    @click.native="cityChange(item)"
                    >{{ item.name }}</el-option
                  >
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <el-select
                  v-model="list.address"
                  placeholder="市"
                  style="width: 200px"
                >
                  <el-option
                    v-for="item in town"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    @click.native="townChange(item)"
                    >{{ item.name }}</el-option
                  >
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="">
                <el-select
                  v-model="list.third"
                  placeholder="区/县"
                  style="margin-right: 50px"
                >
                  <el-option
                    v-for="item in prefecture"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    @click.native="prefectureChange(item.id)"
                    >{{ item.name }}</el-option
                  >
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item prop="addressAll">
            <el-input
              v-model="list.addressAll"
              placeholder="请输入详细地址"
              style="width: 450px; margin-bottom: 15px"
            ></el-input>
            <el-button
              type="primary"
              style="
                width: 90px;
                height: 30px;
                padding-top: 7px;
                margin-left: 90px;
              "
              @click="btn"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>

        <baidu-map
          class="box_map"
          :center="locations"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          :map-click="false"
          @ready="handler"
          @moving="syncCenterAndZoom"
        >
          <!-- :scroll-wheel-zoom="true" 该属性为鼠标滚轮缩放 -->
          <!-- 比例尺 -->
          <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
          <!-- 定位控件 -->
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :show-address-bar="true"
            :auto-location="true"
            @locationSuccess="locationSuccess"
          ></bm-geolocation>
          <!-- 标点 -->
          <bm-marker
            :position="{ lng: locations.lng, lat: locations.lat }"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"
          >
          </bm-marker>
        </baidu-map>
      </div>
      <div slot="footer">
        <el-button @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCity } from '@/api/bai/index'

export default {

  props: {
    dialog: {
      type: Boolean
    }
  },
  data () {
    return {

      list: {
        city: '',
        address: '',
        third: '',
        addressAll: ''
      },
      // 地图
      center: '',
      locations: {
        // 红色标点的经纬度需要设一个初始值，不然地图无法渲染处理
        lng: 0,
        lat: 0
      },
      zoom: 3,
      // 城市
      cityAll: [],
      town: [],
      prefecture: [],
      adcode: 0
    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getCityList()
  },
  methods: {
    // 地图
    handler ({ BMap, map }) {
      console.log(55, BMap, map)
      this.center = ''
      this.zoom = 15
      // 获取IP地址的经纬度，详情查看官方文档：
      // https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html#a8b42
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((res) => {
        // IP地址赋值给locations对象
        console.log('res', res)
        this.locations.lng = res.point.lng
        this.locations.lat = res.point.lat
      })
    },
    locationSuccess () {
      console.log('定位成功')
    },
    async geoTest () {
      // 调用百度地图API,根据地址获取经纬度
      // this.list.city + this.list.address ||
      const address = this.list.city + this.list.address + this.list.third + this.list.addressAll
      console.log(address)
      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: this.list.city + this.list.address + this.list.third + this.list.addressAll, // input框输入的地址
        output: 'json',
        ak: 'ZrI2HTuyRbAXHDuci4xowYtUOepEzMmK' // 你的AK秘钥
      })
        .then((json) => {
          console.log(`json success:`, json)
          this.locations = json.result.location
        })
        .catch((err) => {
          // clearTimeout(timeId);
          // if (err) {
          //   timeId = setTimeout(() => {
          //     this.geoTest();
          //   }, 2000);
          // }
          console.log(`json err:`, err)
        })
      console.log(this.city, this.address)
    },

    // 双向绑定经纬度以及缩放尺寸
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      console.log(e)
      this.locations.lng = lng
      this.locations.lat = lat
      // this.zoom = e.target.getZoom();
      this.getAddress()
    },
    async getAddress () {
      var aa = []

      aa.push(this.locations.lat)
      aa.push(this.locations.lng)
      console.log(aa)
      const res = await this.$jsonp('http://api.map.baidu.com/reverse_geocoding/v3/', {
        ak: 'ZrI2HTuyRbAXHDuci4xowYtUOepEzMmK',
        location: aa.toString(),
        output: 'json',
        pois: 1,
        callback: 'renderReverse'
      })
      console.log('122', res)
      this.list.city = res.result.addressComponent.province
      this.list.third = res.result.addressComponent.district
      this.list.address = res.result.addressComponent.city
      this.list.addressAll = res.result.addressComponent.street + res.result.addressComponent.street_number
    },
    dialogBeforeClose () {
      this.$confirm('确定取消城市选择吗? 不填写，职位数据会无法保存哦！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { this.$emit('dialogReset', false) })
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
    // 区
    townChange (item) {
      console.log(item)
      this.prefecture = item.children
    },
    // 县
    prefectureChange (adcode) {
      console.log(adcode)
      this.adcode = adcode
    },
    btn () {
      this.geoTest()
      this.$message.success('地址加载成功')
    },
    confirm () {
      const address = this.list.city + this.list.address + this.list.third + this.list.addressAll
      this.$emit('dialogReset', false, address, this.adcode, this.list.addressAll, this.locations)
      this.list.city = ''
      this.list.address = ''
      this.list.third = ''
      this.list.addressAll = ''
    }
  }
}
</script>
<style scoped lang="scss">
.box_map {
  /* margin: 30px auto; */
  width: 100%;
  height: 200px;
  background-color: #f0f;
  /* position: relative; */
}
::v-deep .el-form-item__content {
  margin-left: 0px;
}
</style>
