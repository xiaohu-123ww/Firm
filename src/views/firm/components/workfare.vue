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
              <el-col :span="5">
                <el-form-item label="" prop="city">
                  <el-select
                    v-model="list.city"
                    placeholder="北京"
                    style="margin-right: 50px"
                  >
                    <el-option label="北京" value="北京"></el-option>
                    <el-option label="天津" value="天津"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="" prop="address">
                  <el-select v-model="list.address" placeholder="海淀区">
                    <el-option label="海淀区" value="海淀区"></el-option>
                    <el-option label="武清" value="武清"></el-option>
                    <el-option label="昌平区" value="昌平区"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item prop="addressAll">
            <el-input
              v-model="list.addressAll"
              placeholder="请输入详细地址"
              style="width: 300px; margin-bottom: 15px"
            ></el-input>
            <el-button
              type="primary"
              style="width: 90px; height: 35px; padding-top: 10px"
              @click="btn"
              >搜索</el-button
            >
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
        <el-form-item prop="time">
          <div style="font-size: 18px; font-weight: 700; margin: 20px 0">
            <span style="color: red">* </span
            ><span style="color: black">工作时间</span>
          </div>
          <el-radio-group v-model="list.time">
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
                      v-model="list.date1"
                      placeholder="开始时间"
                      style="width: 100%"
                    ></el-time-picker></el-form-item
                ></el-col>
                <el-col :span="1">123</el-col>
                <el-col :span="8"
                  ><el-form-item>
                    <el-time-picker
                      v-model="list.date2"
                      placeholder="结束时间"
                      style="width: 100%"
                    ></el-time-picker></el-form-item
                ></el-col>
              </el-row>
            </div>
            <el-radio label="弹性工作时间"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="timeRest">
          <div style="font-size: 18px; font-weight: 700; margin: 20px 0">
            <span style="color: red">* </span
            ><span style="color: black">休息时间</span>
          </div>
          <el-radio-group
            v-for="item in rest"
            :key="item"
            v-model="list.timeRest"
          >
            <el-radio :label="item" style="margin-right: 20px">{{
              item
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="workOvertime">
          <div style="font-size: 18px; font-weight: 700; margin: 20px 0">
            <span style="color: red">* </span
            ><span style="color: black">加班时间</span>
          </div>
          <el-radio-group
            v-for="item in overtime"
            :key="item"
            v-model="list.workOvertime"
          >
            <el-radio :label="item" style="margin-right: 20px">{{
              item
            }}</el-radio>
          </el-radio-group>
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
</template>

<script>
// let timeId;
export default {
  data () {
    return {
      center: '',
      locations: {
        // 红色标点的经纬度需要设一个初始值，不然地图无法渲染处理
        lng: 116.379463,
        lat: 39.91668
      },
      zoom: 3,

      list: {
        city: '',
        address: '',
        addressAll: '',
        time: '',
        date1: '',
        date2: '',
        timeRest: '',
        workOvertime: ''
      },
      rest: ['周末双休', '单休', '大小周', '排班轮休'],
      overtime: ['不加班', '偶尔加班', '有偿加班'],
      rules: {
        city: [
          { required: true, message: '请选择城市', trigger: 'change,blur' }
        ],
        address: [
          { required: true, message: '请选择区域', trigger: 'change,blur' }
        ],
        addressAll: [
          { required: true, message: '请输入具体地址', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择工作时间', trigger: 'change' }
        ],

        timeRest: [
          { required: true, message: '请选择休息时间', trigger: 'change' }
        ],
        workOvertime: [
          { required: true, message: '请选择加班时间', trigger: 'change' }
        ]
      }

    }
  },
  created () {
    this.geoTest()
    this.getAddress()
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
      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: this.list.city + this.list.address + this.list.addressAll, // input框输入的地址
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

      this.list.address = res.result.addressComponent.district
      this.list.addressAll = res.result.addressComponent.street + res.result.addressComponent.street_number
    },
    onClick () {
      this.$emit('reset', 0)
    },
    submit () {
      this.$refs.rf.validate()
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
