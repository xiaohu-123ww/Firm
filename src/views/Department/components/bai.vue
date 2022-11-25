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
          <div style="display: flex; margin-bottom: 20px">
            <el-select
              v-model="list.city"
              placeholder="省"
              style="width: 200px; margin-right: 10px"
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

            <el-select
              v-model="list.address"
              placeholder="市"
              style="width: 200px; margin-right: 10px"
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

            <el-select v-model="list.third" placeholder="区/县" style="">
              <el-option
                v-for="item in prefecture"
                :key="item.id"
                :label="item.name"
                :value="item.name"
                @click.native="prefectureChange(item.id, item.name)"
                >{{ item.name }}</el-option
              >
            </el-select>
          </div>

          <el-input
            id="searchAddress"
            v-model="list.addressAll"
            placeholder="请输入详细地址"
            style="width: 450px; margin-bottom: 15px"
          ></el-input>
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
import { sendCapte } from '@/api/user'
import Baidusss from '@/components/bai/components/baidu/index.vue'

export default {

  props: {
    dialog: {
      type: Boolean
    }
  },
  data () {
    return {
      // 搜索地址
      searchAddress: '',
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
      adcode: 0,
      address: ''
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
    add () {
      console.log(1)
    },
    // 逆向解析地址
    // 逆向解析地址
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
        that.list.address = addressInfo.city
        that.list.third = addressInfo.district
        that.list.addressAll = address
      })
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
        this.locations.lng = res.point.lng
        this.locations.lat = res.point.lat
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
        // sessionStorage.setItem('address', searchValue.business)
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
      this.adcode = res.result.addressComponent.adcode
      this.list.addressAll = res.result.addressComponent.street + res.result.addressComponent.street_number
    },
    dialogBeforeClose () {
      this.$confirm('确定取消城市选择吗? 不填写，职位数据会无法保存哦！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { this.$emit('dialo', false) })
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
        address: this.list.city + this.list.address + this.list.third + name, // input框输入的地址
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
    btn () {
      this.geoTest()
      this.$message.success('地址加载成功')
    },
    confirm () {
      // this.list.addressAll = sessionStorage.getItem('address')
      const address = this.list.city + this.list.address + this.list.third + this.address
      this.$emit('dialogReset', false, address, this.adcode, this.list.addressAll, this.locations)
      // this.list.city = ''
      // this.list.address = ''
      // this.list.third = ''
      // this.list.addressAll = ''
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
