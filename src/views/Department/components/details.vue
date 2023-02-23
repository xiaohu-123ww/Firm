<template>
  <div class="details">
    <div class="details-position">
      <el-row>
        <el-col :span="22"> 职位详情</el-col>
        <el-col :span="2">
          <el-button
            class="list-my-bt"
            type="text"
            style="margin-left: 45px; font-size: 20px"
            @click="resetForm"
            ><Item icon="KHCFDC" /></el-button
        ></el-col>
      </el-row>
    </div>
    <el-card class="details-card">
      <div class="details-my" style="display: flex">
        <div class="bg-purple" style="width: 80%">
          <div class="bg-purple-my">
            <div class="bg-purple-trade">{{ particulars.fullname }}</div>
            <div class="bg-purple-weal">
              <div
                v-for="(item, index) in particulars.tag"
                :key="index"
                class="bg-weal"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="bg-purple-money">
            {{ particulars.salary_min }}k - {{ particulars.salary_max }}k·{{
              particulars.salary_unit
            }}薪
          </div>
          <div class="bg-purple-firm">
            <div class="bg-firm">
              {{ particulars.adcode.second }}{{ particulars.adcode.third }}
            </div>
            <div class="bg-firm">{{ particulars.job_experience.name }}</div>
            <div class="bg-firm">{{ particulars.education.name }}</div>
          </div>
          <div class="bg-purple-image">
            <div style="width: 8%">
              <div class="bg-image">
                <img
                  :src="disposeImg(particulars.users.image)"
                  alt=""
                  style="width: 50xp; height: 50px; border-radius: 100px"
                />
              </div>
            </div>
            <div style="line-height: 50px; margin-right: 15px">
              {{ particulars.users.name }}
            </div>
            <div class="bg-text" style="margin-right: 15px">
              发布时间：{{
                parseTime(
                  new Date(particulars.users.create_time).toLocaleString()
                )
              }}({{ particulars.users.post_last_days }}日后下线)
            </div>
            <div class="bg-text">
              工作地点： {{ particulars.adcode.second
              }}{{ particulars.adcode.third
              }}{{ particulars.work_adcode.adcode_detail }}
            </div>
          </div>
        </div>
        <div
          v-if="typeof particulars.post_days === 'number'"
          class="bg-purple-light"
        >
          <div class="bg-purple-time">{{ particulars.post_last_days }}</div>
          <div style="color: #999999; font-size: 13px; margin-top: 5px">
            上线时间
          </div>
        </div>
      </div>
      <div class="jobDescription">
        <div class="job">职位描述</div>
        <div class="description">
          <div style="margin: 20px 30px" v-html="particulars.job_content"></div>
        </div>
      </div>
      <div class="certificate">
        <div class="require">证书要求</div>
        <div
          claa="certificate-img"
          style="height: 140px; padding-top: 10px; display: flex"
        >
          <div
            v-for="(item, index) in particulars.certificationInfo_id"
            :key="index"
            class="require-img"
          >
            <img :src="disposeImg(item.image)" alt="" class="image" />
          </div>
        </div>
      </div>
      <div class="certificate">
        <div class="require">公司介绍</div>
        <p style="font-weight: 700">
          {{ particulars.enterprise_data.name }}
        </p>
        <div
          style="line-height: 20px"
          v-html="particulars.enterprise_data.introduction"
        ></div>
        <!-- <div
          claa="certificate-img"
          style="height: 140px; padding-top: 10px; display: flex"
        >
          <div
            v-for="(item, index) in particulars.certificationInfo_id"
            :key="index"
            class="require-img"
          >
            <img :src="disposeImg(item.image)" alt="" class="image" />
          </div>
        </div> -->
      </div>
      <div class="firm">
        <div class="job">工作地点</div>
        <p style="font-weight: 700">
          {{ particulars.adcode.second }}{{ particulars.adcode.third
          }}{{ particulars.work_adcode.adcode_detail }}
        </p>
        <!-- <p style="font-size: 14px; line-height: 20px">
          是国内研究产品数字身份管理技术及应用的国家级高新技术企业。
          信标中信标客服通过25年的科技行业经验，积累了全环节数字化集成解决方案，帮助企业通过数字化管理，提高生产效率、流通效率，打破数据孤岛，实现数据系列化;
          通过生产线末端多一码、一码的材料编码，帮助企业实现高效品质后湖;
          通过数字化营销，洞察消费者，实现精准接触，CRM管理，从而优化营销决策。
          兆信数字技术使企业提高能力，赢得消费者，赢得市场增长。
        </p> -->
        <!-- <div
          style="line-height: 20px"
          v-html="particulars.enterprise_data.introduction"
        ></div> -->
      </div>
      <div>
        <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
          <bm-view class="map"></bm-view>
          <!-- animation="BMAP_ANIMATION_BOUNCE" -->
          <bm-marker
            :position="{
              lng: center.lng,
              lat: center.lat
            }"
            :dragging="true"
          >
          </bm-marker>
        </baidu-map>
      </div>
    </el-card>
  </div>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import Item from '@/layout/components/Sidebar/Item.vue'
export default {
  props: {
    particulars: {
      type: Object
    }
  },
  components: {
    BaiduMap, Item
  },
  data () {
    return {
      weal: ['五险一金', '年终奖', '弹性福利', '节日福利', '带薪休假'],
      ak: 'ZrI2HTuyRbAXHDuci4xowYtUOepEzMmK',
      center: { lng: 0, lat: 0 },
      zoom: 0

    }
  },
  mounted () {

  },
  computed: {
    commendContent () {
      // this.commend.content是后端传回来的文本数据，就是要对这个数据进行处理
      const arr = this.particulars.job_content
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    }
  },
  watch: {
    particulars (newVal, oldVal) {
      console.log('122', newVal)
    }
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = this.particulars.work_adcode.longitude
      this.center.lat = this.particulars.work_adcode.latitude
      this.zoom = 15
    },
    resetForm () {
      this.$emit('reset', true)
    }

  }
}
</script>
<style scoped lang="scss">
.details {
  .details-position {
    height: 60px;
    background-color: #fff;
    line-height: 60px;
    padding-left: 30px;
    font-weight: 700;
  }
  .details-card {
    margin: 20px;
    border-radius: 10px;
    // background-color: aqua;
    padding: 20px;
    .details-my {
      height: 180px;
      // background-color: aqua;
      margin-bottom: 40px;
      .bg-purple-light {
        width: 100px;
        height: 80px;
        // background-color: pink;
        margin: 20px 50px;
        text-align: center;

        .bg-purple-time {
          width: 100%;
          height: 55px;
          // background-color: antiquewhite;
          font-size: 55px;
        }
      }
    }
    .bg-purple {
      width: 100%;
      height: 170px;
      // background-color: pink;
      .bg-purple-my {
        width: 100%;
        height: 40px;
        // background-color: red;
        display: flex;

        .bg-purple-trade {
          // width: 100%;
          height: 100%;
          margin-right: 15px;
          // background-color: green;
          font-size: 20px;
          padding-top: 9px;
          font-weight: 700;
        }
        .bg-purple-weal {
          // width: 100%;
          height: 100%;
          // background-color: coral;
          display: flex;
          .bg-weal {
            width: 80px;
            height: 20px;
            background-color: #f5f5f5;
            color: #6e6e6e;
            margin: 11px 2px;
            font-size: 14px;
            text-align: center;
            line-height: 20px;
          }
        }
      }
      .bg-purple-money {
        width: 100%;
        height: 40px;
        // background-color: rgb(47, 0, 255);
        line-height: 40px;
        color: red;
        font-size: 14px;
      }
      .bg-purple-firm {
        width: 100%;
        height: 30px;
        // background-color: rgb(140, 128, 196);
        display: flex;
        padding-top: 5px;
        .bg-firm {
          // width: 80px;
          padding-right: 10px;
          height: 23px;
          margin-right: 8px;
          // background-color: red;
          border-right: 1px solid #e6e6e6;
          font-size: 17px;
          text-align: center;
        }
      }
      .bg-purple-image {
        height: 70px;
        width: 100%;
        // background-color: blueviolet;
        padding-top: 20px;
        display: flex;

        .bg-image {
          width: 50px;
          height: 50px;
          // background-color: pink;
          border-radius: 100px;
          overflow: hidden;
          // margin-right: 10px;
        }
        .bg-text {
          // width: 300px;
          // margin-left: 10px;
          height: 50px;
          // background-color: pink;
          line-height: 50px;
          color: #999999;
          font-size: 13px;
        }
      }
    }
    .jobDescription {
      width: 100%;
      height: auto;

      // background-color: pink;
      margin-bottom: 50px;
      .job {
        width: 100%;
        height: 40px;
        // background-color: aquamarine;
        line-height: 40px;
        font-size: 20px;
        font-weight: 700;
      }
      .description {
        height: auto;
        width: 100%;
        // background-color: red;
      }
    }
    .certificate {
      width: 100%;
      // height: 180px;
      // background-color: aqua;
      margin-bottom: 40px;
      .require {
        width: 100%;
        height: 40px;
        // background-color: aquamarine;
        line-height: 40px;
        font-size: 20px;
        font-weight: 700;
      }
      .require-img {
        width: 200px;
        height: 120px;
        // background-color: aqua;
        margin-right: 20px;
        .image {
          width: 200px;
          height: 120px;
        }
      }
    }
    .firm {
      // height: 180px;
      // background-color: pink;
    }
  }
}
.job {
  width: 100%;
  height: 40px;
  // background-color: aquamarine;
  line-height: 40px;
  font-size: 20px;
  font-weight: 700;
}
.map {
  width: 100%;
  height: 300px;
}
</style>
