<template>
  <div>
    <div class="search">
      <div class="search-form">
        <el-form :model="form" label-width="80px">
          <div class="search-checkbox">
            <span style="margin: 5px 10px">沟通职位</span>
            <el-radio-group v-model="form.search" size="mini">
              <el-radio-button
                v-for="(item, index) in firm"
                :key="index"
                class="radio"
                :label="item"
                >{{ item }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div class="search-checkbox">
            <span style="margin: 5px 10px">学历要求</span>
            <el-checkbox-group v-model="form.checkboxGroup" size="mini">
              <el-checkbox-button
                v-for="(vItem, vIndex) in cities"
                :key="vIndex"
                :label="vItem"
                style="margin-right: 10px"
                >{{ vItem }}</el-checkbox-button
              >
            </el-checkbox-group>
          </div>
          <div class="search-checkbox">
            <span style="margin: 5px 10px">院校要求</span>
            <el-radio-group v-model="form.radio" size="mini">
              <el-radio-button label="不限" class="radio"></el-radio-button>
              <el-radio-button label="统招" class="radio"></el-radio-button>
              <el-radio-button label="985" class="radio"></el-radio-button>
              <el-radio-button label="211" class="radio"></el-radio-button>
            </el-radio-group>
          </div>
          <div style="display: flex; margin-left: 100px">
            <el-form-item label="沟通日期">
              <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="选择日期"
                style="width: 100%; margin-right: 243px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="年龄要求" style="margin-right: 30px">
              <el-select
                v-model="form.age"
                placeholder="不限"
                style="width: 200px"
              >
                <el-option label="不限" value="1"></el-option>
                <el-option label="22" value="2"></el-option>
              </el-select>
              -
              <el-select
                v-model="form.lastAge"
                placeholder="不限"
                style="width: 200px"
              >
                <el-option label="30" value="1"></el-option>
                <el-option label="35" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex; margin-left: 100px">
            <el-form-item label="年限要求" style="margin-right: 100px">
              <el-select
                v-model="form.month"
                placeholder="不限"
                style="width: 200px"
              >
                <el-option label="不限" value="1"></el-option>
                <el-option label="1年" value="2"></el-option>
              </el-select>
              -
              <el-select
                v-model="form.lastMonth"
                placeholder="不限"
                style="width: 200px"
              >
                <el-option label="不限" value="1"></el-option>
                <el-option label="2年" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作状态">
              <el-select
                v-model="form.state"
                placeholder="不限"
                style="width: 270px"
              >
                <el-option label="在职" value="1"></el-option>
                <el-option label="离职" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div style="display: flex; margin-left: 100px">
            <el-form-item label="期望城市">
              <el-select
                v-model="form.city"
                placeholder="不限"
                style="width: 270px"
              >
                <el-option label="上海" value="1"></el-option>
                <el-option label="北京" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <Recommend :list="list" />
    <Page class="position-page" :total="total" @handleSize="handleSize" />
  </div>
</template>
<script>
import Recommend from '@/views/Setting/components/recommend.vue'
import Page from '@/views/Department/components/page.vue'
export default {
  components: { Recommend, Page },
  data () {
    return {
      form: {
        search: '',
        checkboxGroup: [],
        radio: '',
        age: '',
        lastAge: '',
        month: '',
        lastMonth: '',
        time: '',
        state: '',
        city: ''

      },
      firm: ['不限', '机械工程师', 'JAVA工程师', '工业机器人工程师', '视觉工程师'],
      cities: ['不限', '初中', '高中', '中专/中技', '大专', '本科', '硕士', 'MVA/EMBA', '博士'],
      keyWord: [
        {
          value: '互联网',
          label: '互联网'
        },
        {
          value: '人工智能',
          label: '人工智能'
        }
      ],
      list: [
        {
          id: 1,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '男',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端'],
          job: '机械工程师'

        },
        {
          id: 2,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '女',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端'],
          job: '机器视觉工程师'

        },
        {
          id: 3,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '男',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端'],
          job: 'JAVA机械工程师'

        },
        {
          id: 4,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '女',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端'],
          job: '工业机器人工程师'

        },
        {
          id: 5,
          image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_2_164802939_3427154249_27.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668145104&t=ab93370abf8808218cb63d0f8f2e6274',
          name: '洛先生',
          sex: '男',
          state: '在线',
          age: '23',
          education: '1-3年',
          regular: '本科',
          stateNext: '在职正在找工作',
          work: [
            {
              time: '2021-07-至今',
              firm: '北京智能智造科技有限公司',
              job: '嵌入式工程师'
            },
            {
              time: '2020.07-2021.06',
              firm: '北京百度科技有限公司',
              job: '智能化工程师'
            }, {
              time: '2018.07-2020.06',
              firm: '北京搜狐科技有限公司',
              job: '智能化工程师'
            }
          ],
          skill: ['机械臂', '前端', '后端'],
          job: '前端工程师'

        }
      ],
      total: 100

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    // 第几页
    handleSize (page) {
      console.log(page)
    },
    details () {
      this.show = false
      this.$emit('hidden', false)
    }

  }
}
</script>
<style scoped lang="scss">
.search {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 15px 0;
  margin: 20px;
  .search-form {
    width: 100%;
    // height: 200px;
    // background-color: aqua;
    // margin: 20px;
    .search-checkbox {
      // margin: 0 auto;
      margin-left: 105px;
      width: 800px;
      margin-bottom: 15px;
      display: flex;
      // background-color: palegoldenrod;
      font-size: 14px;
    }
  }
}
.search-button {
  background-color: #f0f0f0;
  width: 110px;
  height: 25px;
  font-size: 12px;
  padding: 3px 0 0 3px;
}
.radio {
  margin-right: 10px;
}
.position-page {
  // background-color: pink;
  width: 600px;
  margin: 0 0 30px 700px;
}
</style>
