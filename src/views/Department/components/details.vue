<template>
  <div class="details">
    <div class="details-position">职位详情</div>
    <el-card class="details-card">
      <div class="details-my">
        <el-row>
          <el-col :span="18"
            ><div class="bg-purple">
              <div class="bg-purple-my">
                <div class="bg-purple-trade">机械臂控制工程师</div>
                <div class="bg-purple-weal">
                  <div
                    v-for="(item, index) in weal"
                    :key="index"
                    class="bg-weal"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="bg-purple-money">8000-15000 13薪</div>
              <div class="bg-purple-firm">
                <div class="bg-firm">北京海淀</div>
                <div class="bg-firm">1-3年</div>
                <div class="bg-firm">本科</div>
              </div>
              <div class="bg-purple-image">
                <div class="bg-image">
                  <img
                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274"
                    alt=""
                    style="width: 50xp; height: 50px"
                  />
                </div>
                <div style="line-height: 50px; margin-right: 30px">张继科</div>
                <div class="bg-text">发布时间：2022.04.08 (3日后下线)</div>
                <div class="bg-text">工作地点：北京-海淀-西小口</div>
              </div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="bg-purple-light">
              <div class="bg-purple-time">30</div>
              <div style="color: #999999; font-size: 13px; margin-top: 5px">
                上线时间
              </div>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="jobDescription">
        <div class="job">职位描述</div>
        <div class="description">
          <p>1、负责公司项目：pc端、H5端、小程序端的前端页面开发工作。</p>
          <p>2、负责公司产品前端公共组件库的开发。</p>
          <p>3、与后端团队紧密配合，确保代码有效对接。</p>
          <p>
            4、与产品团队紧密配合，优化用户体验和资源占用，提高产品易用性和可靠性
          </p>
        </div>
      </div>
      <div class="certificate">
        <div class="require">证书要求</div>
        <div
          claa="certificate-img"
          style="height: 140px; padding-top: 10px; display: flex"
        >
          <div class="require-img">
            <img src="../../../assets/img/证书3.png" alt="" class="image" />
          </div>
          <div class="require-img">
            <img src="../../../assets/img/证书1.png" alt="" class="image" />
          </div>
          <div class="require-img">
            <img src="../../../assets/img/证书2.png" alt="" class="image" />
          </div>
        </div>
      </div>
      <div class="firm">
        <div class="job">工作地点</div>
        <p style="font-weight: 700">北京智能智造科技有限公司</p>
        <p style="font-size: 14px; line-height: 20px">
          是国内研究产品数字身份管理技术及应用的国家级高新技术企业。
          信标中信标客服通过25年的科技行业经验，积累了全环节数字化集成解决方案，帮助企业通过数字化管理，提高生产效率、流通效率，打破数据孤岛，实现数据系列化;
          通过生产线末端多一码、一码的材料编码，帮助企业实现高效品质后湖;
          通过数字化营销，洞察消费者，实现精准接触，CRM管理，从而优化营销决策。
          兆信数字技术使企业提高能力，赢得消费者，赢得市场增长。
        </p>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      weal: ['五险一金', '年终奖', '弹性福利', '节日福利', '带薪休假']

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {

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
  }
  .details-card {
    margin: 20px;
    border-radius: 10px;
    // background-color: aqua;
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
          width: 300px;
          height: 100%;
          // background-color: green;
          font-size: 25px;
          padding-top: 9px;
          font-weight: 700;
        }
        .bg-purple-weal {
          width: 100%;
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
          width: 80px;
          height: 25px;
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
          margin-right: 10px;
        }
        .bg-text {
          width: 300px;
          height: 50px;
          // background-color: pink;
          line-height: 50px;
          color: #999999;
          font-size: 14px;
        }
      }
    }
    .jobDescription {
      width: 100%;
      height: 200px;
      // background-color: pink;
      margin-bottom: 40px;
      .job {
        width: 100%;
        height: 40px;
        // background-color: aquamarine;
        line-height: 40px;
        font-size: 20px;
        font-weight: 700;
      }
      .description {
        height: 140px;
        width: 100%;
        // background-color: red;
      }
    }
    .certificate {
      width: 100%;
      height: 180px;
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
        background-color: aqua;
        margin-right: 20px;
        .image {
          width: 200px;
          height: 120px;
        }
      }
    }
    .firm {
      height: 180px;
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
</style>
