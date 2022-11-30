<template>
  <el-card class="workface">
    <div>
      <el-form
        ref="rf"
        :model="list"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="">
          <div style="font-size: 18px; font-weight: 700; margin-bottom: 10px">
            <span style="color: red">* </span
            ><span style="color: black">企业地址</span>
          </div>
          <div style="margin-bottom: 15px">
            <el-row>
              <el-col :span="6">
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
                      @click.native="cityChange(item, item.name)"
                      >{{ item.name }}</el-option
                    >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="">
                  <el-select
                    v-model="list.addressAll"
                    placeholder="市"
                    style="width: 200px"
                  >
                    <el-option
                      v-for="item in town"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      @click.native="townChange(item, item.name)"
                      >{{ item.name }}</el-option
                    >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
                      @click.native="prefectureChange(item.adcode, item.name)"
                      >{{ item.name }}</el-option
                    >
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item prop="addressAll">
            <el-input
              id="searchAddress"
              v-model="list.address"
              placeholder="请输入详细地址"
              style="width: 450px; margin-bottom: 15px"
            ></el-input>
          </el-form-item>

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
        </el-form-item>
        <el-form-item prop="work_time">
          <div style="font-size: 18px; font-weight: 700; margin: 20px 0">
            <span style="color: red">* </span
            ><span style="color: black">工作时间</span>
          </div>
          <el-radio-group v-model="list.work_time">
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="6"
                  ><el-form-item>
                    <el-radio
                      label="固定工作时间"
                      style="width: 200px; line-height: 30px"
                    ></el-radio></el-form-item
                ></el-col>
                <el-col :span="9"
                  ><el-form-item>
                    <el-time-picker
                      v-model="list.work_time_start"
                      :disabled="list.work_time === '弹性工作时间'"
                      placeholder="开始时间"
                      style="width: 100%"
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                    ></el-time-picker></el-form-item
                ></el-col>
                <el-col :span="1">123</el-col>
                <el-col :span="8"
                  ><el-form-item>
                    <el-time-picker
                      v-model="list.work_time_end"
                      :disabled="list.work_time === '弹性工作时间'"
                      placeholder="结束时间"
                      style="width: 100%"
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                    ></el-time-picker></el-form-item
                ></el-col>
              </el-row>
            </div>
            <el-radio label="弹性工作时间"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="rest_time_status">
          <div style="font-size: 18px; font-weight: 700; margin: 20px 0">
            <span style="color: red">* </span
            ><span style="color: black">休息时间</span>
          </div>
          <el-radio-group
            v-for="item in rest"
            :key="item.id"
            v-model="list.rest_time_status"
          >
            <el-radio :label="item.id" style="margin-right: 20px">{{
              item.name
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="work_overtime_status">
          <div style="font-size: 18px; font-weight: 700; margin: 20px 0">
            <span style="color: red">* </span
            ><span style="color: black">加班时间</span>
          </div>
          <el-radio-group
            v-for="item in overtime"
            :key="item.id"
            v-model="list.work_overtime_status"
          >
            <el-radio :label="item.id" style="margin-right: 20px">{{
              item.name
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" prop="tags" style="height: 40px">
          <div style="font-size: 18px; font-weight: 700; margin: 20px 0">
            <span style="color: red">* </span
            ><span style="color: black">福利标签</span>
          </div>
          <el-select
            v-model="list.tags"
            multiple
            placeholder="请选择职位福利"
            class="box"
            style="width: 800px"
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
        <el-form-item style="margin-top: 110px">
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
</template>

<script>
import { getCity } from '@/api/bai/index'
import { getWorkSystem, getWorkSystemAmend } from '@/api/firm/index'
import { getwelfare } from '@/api/department/online'
import Baidusss from '@/components/bai/components/baidu/index.vue'
export default {
  data () {
    return {
      center: '',
      locations: {
        // 红色标点的经纬度需要设一个初始值，不然地图无法渲染处理
        lng: 0,
        lat: 0
      },
      zoom: 3,

      list: {
        city: '',
        address: '',
        addressAll: '',
        work_time: '',
        work_time_status: '',
        rest_time_status: '',
        work_overtime_status: '',
        tags: [],
        third: '',
        ascode: '',
        lat: '',
        lng: '',
        work_time_start: '',
        work_time_end: '',
        new_tags: []

      },
      add: '',

      rest: [
        {
          id: 1,
          name: '周末双休'
        }, {
          id: 2,
          name: '单休'
        },
        {
          id: 3,
          name: '大小周'
        },
        {
          id: 4,
          name: '排班轮休'
        }

      ],
      overtime: [
        {
          id: 1,
          name: '不加班'
        },
        {
          id: 2,
          name: '偶尔加班'
        },
        {
          id: 3,
          name: '有偿加班'
        }
      ],

      rules: {
        city: [
          { required: true, message: '请选择城市', trigger: 'change,blur' }
        ],
        addressAll: [
          { required: true, message: '请选择区域', trigger: 'change,blur' }
        ],
        address: [
          { required: true, message: '请输入具体地址', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        work_time: [
          { required: true, message: '请选择工作时间', trigger: 'change' }
        ],

        rest_time_status: [
          { required: true, message: '请选择休息时间', trigger: 'change' }
        ],
        work_overtime_status: [
          { required: true, message: '请选择加班时间', trigger: 'change' }
        ],
        tags: [
          { required: true, message: '请选择职位福利', trigger: 'change' }
        ]
      },
      welfareList: [],
      // 城市
      cityAll: [],
      town: [],
      prefecture: [],
      adcode: 0,
      historyList: ''

    }
  },
  created () {
    this.geoTest()
    this.getAddress()
    this.getList()
    this.getCityList()
    this.getwelfareChange()
  },
  methods: {
    // 地图
    geocAddress (point) {
      const that = this
      var geoc = new BMap.Geocoder()
      geoc.getLocation(point, function (geocInfo) {
        // 设置基本信息
        var addressInfo = geocInfo.addressComponents
        // console.log(point.lat);
        // console.log(addressInfo.province);
        // console.log(addressInfo.city);
        // console.log(addressInfo.district);
        let address = addressInfo.street + addressInfo.streetNumber
        if (geocInfo.surroundingPois.length > 0) {
          address = address + geocInfo.surroundingPois[0].title
        }
        console.log(addressInfo.province + addressInfo.city + addressInfo.district + address)
        that.list.city = addressInfo.province
        that.list.addressAll = addressInfo.city
        that.list.third = addressInfo.district
        that.historyList = addressInfo.province + addressInfo.city + addressInfo.district + address
        console.log('this.historyList', that.historyList)
        that.getHistoryList()
        // that.list.address = address
      })
    },
    async getHistoryList () {
      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: this.historyList, // input框输入的地址
        output: 'json',
        ak: 'ZrI2HTuyRbAXHDuci4xowYtUOepEzMmK' // 你的AK秘钥
      })
        .then((json) => {
          console.log(`json1212`, json)
          this.locations = json.result.location
          console.log(' this.locations', this.locations)
          this.getAddress()
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
      // this.geoTest()
      // that.list.addressAll = address
    },

    // 地图
    handler ({ BMap, map }) {
      console.log(55, BMap, map)
      const that = this
      this.center = ''
      this.zoom = 15
      // 获取IP地址的经纬度，详情查看官方文档：
      // https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html#a8b42
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((res) => {
        // IP地址赋值给locations对象
        console.log('res', res)
        // this.locations.lng = res.point.lng
        // this.locations.lat = res.point.lat
      })
      /** 点击地图创建坐标事件End */

      /** 搜索地址Start */
      // 建立一个自动完成的对象
      var ac = new BMap.Autocomplete({
        input: 'searchAddress',
        location: map
      })
      // 鼠标点击下拉列表后的事件
      ac.addEventListener('onconfirm', function (e) {
        map.clearOverlays()
        var local = new BMap.LocalSearch(map, {
          // 智能搜索

          onSearchComplete: function (res) {
            console.log('122', res, map)

            const poi = res.getPoi(0) // 获取第一个智能搜索的结果
            var searchpt = poi.point // 获取坐标
            map.centerAndZoom(searchpt, 16)
            map.addOverlay(new BMap.Marker(searchpt))
            that.geocAddress(searchpt)
            return searchpt
          }

        })
        // 搜索词
        var searchValue = e.item.value

        console.log('123', searchValue)

        local.search(
          searchValue.province +
          searchValue.city +
          searchValue.district +
          searchValue.street +
          searchValue.business
        )
        sessionStorage.setItem('address', searchValue.business)
        return local
      })

      /** 搜索地址End */
    },
    locationSuccess () {
      console.log('定位成功')
    },
    async geoTest () {
      // 调用百度地图API,根据地址获取经纬度
      // this.list.city + this.list.address ||
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
    // 修改地址
    btn () {
      this.geoTest()
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
      // this.list.address = res.result.addressComponent.street + res.result.addressComponent.street_number
      // res.result.addressComponent.street + res.result.addressComponent.street_number
      this.list.addressAll = res.result.addressComponent.city
      this.list.ascode = res.result.addressComponent.adcode
    },
    onClick () {
      this.$confirm('确定退出编辑吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { this.$emit('reset', 0) })
    },
    submit () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          // console.log(1)
          // console.log(this.list)

          if (this.list.work_time === '弹性工作时间') {
            this.list.work_time_status = '2'
            delete this.list.work_time_start
            delete this.list.work_time_end
          } else {
            this.list.work_time_status = '1'

            // this.list.work_time_start = this.changeDateToStr1(this.list.work_time_start)
            // this.list.work_time_end = this.changeDateToStr1(this.list.work_time_end)
          }
          this.list.lng = this.locations.lng
          this.list.lat = this.locations.lat
          // if (this.list.tags) { console.log(this.list) }
          // // this.list.ascode = this.adcode

          // if (this.adcode === 0) {
          //   console.log(123)
          // }
          console.log(this.list.ascode)
          const res = await getWorkSystemAmend(this.list)

          console.log('res', res)
          this.$message.success('修改信息成功，内容在审核中')
          this.$emit('reset', 0)
        }
      })
    },

    // 城市
    async getCityList () {
      const { data } = await getCity()
      console.log('城市', data)
      this.cityAll = data.data
      console.log(this.cityAll)
    },
    // 市
    async cityChange (i, name) {
      console.log(i)
      this.town = i.children
      this.list.address = ''
      this.list.third = ''
      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: name, // input框输入的地址
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
    },
    // 区
    async townChange (item, name) {
      console.log(item)
      this.prefecture = item.children

      this.list.third = ''
      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: this.list.city + name, // input框输入的地址
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
    },
    // 县
    async prefectureChange (adcode, name) {
      console.log(adcode)
      this.adcode = adcode
      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: this.list.city + this.list.addressAll + name, // input框输入的地址
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
    },
    // 信息
    async getList () {
      const { data } = await getWorkSystem()
      console.log('工作制度', data)
      this.list.city = data.data.address.location.first
      this.list.addressAll = data.data.address.location.second
      this.list.address = data.data.address.address
      this.list.third = data.data.address.location.third
      this.locations.lng = data.data.address.lng
      this.locations.lat = data.data.address.lat
      this.list.rest_time_status = data.data.rest_time.id
      this.list.work_overtime_status = data.data.work_overtime.id
      this.list.tags = data.data.tags.map(item => item.id)
      this.add = data.data.address.location.adcode
      this.list.ascode = data.data.address.location.adcode
      this.list.lng = data.data.address.lng
      this.list.lat = data.data.address.lat
      if (data.data.work_time.name === '固定工作时间') {
        this.list.work_time_start = data.data.work_time.work_time_start

        this.list.work_time_end = data.data.work_time.work_time_end
      }
      this.list.work_time = data.data.work_time.name
    },
    welfareChange (e) {
      if (e.length > 5) {
        this.$message.warning('最多可选择五个职位福利')
        this.list.tags.splice(-1)
      }
    },
    // 福利
    async getwelfareChange () {
      const { data } = await getwelfare()
      console.log('福利', data)
      this.welfareList = data.data
    }

  }
}
</script>

<style scoped>
.workface {
  margin: 30px;
  padding: 20px;
  border-radius: 18px;
}
.box_map {
  /* margin: 30px auto; */
  width: 800px;
  height: 200px;
  background-color: #f0f;
  /* position: relative; */
}
.inputVal {
  /* position: absolute; */
  /* left: 0;
  top: 0; */
  width: 50%;
}

input {
  width: 60%;
}
button {
  margin-top: 10px;
  margin-left: 20px;
  width: 40px;
  height: 30px;
}
.bt {
  height: 35px;
  padding: 10px;
  width: 80px;
}
</style>
