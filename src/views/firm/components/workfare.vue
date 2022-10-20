<template>
  <el-card class="workface">
    <div>
      <el-form>
        <el-form-item label="">
          <div style="font-size: 18px; font-weight: 700; margin-bottom: 10px">
            <span style="color: red">* </span
            ><span style="color: black">企业地址</span>
          </div>
          <div style="margin-bottom: 5px">
            <el-select
              v-model="city"
              placeholder="北京"
              style="margin-right: 50px"
            >
              <el-option label="北京" value="北京"></el-option>
              <el-option label="天津" value="天津"></el-option>
            </el-select>
            <el-select v-model="address" placeholder="海淀区">
              <el-option label="西小口" value="西小口"></el-option>
              <el-option label="武清" value="武清"></el-option>
            </el-select>
          </div>

          <el-input
            v-model="addressAll"
            placeholder="请输入详细地址"
            style="width: 300px; margin-bottom: 10px"
          ></el-input>
          <el-button
            type="primary"
            style="width: 90px; height: 35px; padding-top: 10px"
            @click="btn"
            >搜索</el-button
          >

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
        <el-form-item>
          <div style="font-size: 18px; font-weight: 700; margin: 10px 0">
            <span style="color: red">* </span
            ><span style="color: black">企业上市/投融资状态</span>
          </div>
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
        lng: 0,
        lat: 0
      },
      zoom: 3,
      city: '',
      address: '',
      addressAll: ''
    }
  },
  created () {
    this.geoTest()
  },
  methods: {

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
      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: this.city + this.address || this.city + this.address + this.addressAll, // input框输入的地址
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
</style>
