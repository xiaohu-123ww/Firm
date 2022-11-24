<template>
  <div>
    <div class="search">
      <div>
        <div class="search-form">
          <el-form :model="form" label-width="80px">
            <div class="search-checkbox">
              <span style="margin: 5px 10px">沟通职位</span>
              <el-radio-group v-model="position" size="mini">
                <el-radio-button
                  v-for="(item, index) in firm"
                  :key="index"
                  class="radio"
                  :label="item.id"
                  @click.native="fast($event, item.id)"
                  >{{ item.name }}</el-radio-button
                >
              </el-radio-group>
            </div>
            <div class="search-checkbox">
              <span style="margin: 5px 10px">学历要求</span>
              <el-checkbox-group
                v-model="num"
                size="mini"
                @change="handleCheckAllChange"
              >
                <el-checkbox-button
                  v-for="(vItem, vIndex) in cities"
                  :key="vIndex"
                  :label="vItem.id"
                  style="margin-right: 10px"
                  >{{ vItem.name }}</el-checkbox-button
                >
              </el-checkbox-group>
            </div>
            <div class="search-checkbox">
              <span style="margin: 5px 10px">院校要求</span>
              <el-radio-group
                v-model="ud"
                size="mini"
                @click.native="numm($event)"
              >
                <el-radio-button label="不限" class="radio"></el-radio-button>
                <el-radio-button label="统招" class="radio"></el-radio-button>
                <el-radio-button label="非统招" class="radio"></el-radio-button>
              </el-radio-group>
            </div>
            <div style="display: flex; margin-left: 100px">
              <el-form-item label="活跃日期" style="margin-right: 268px">
                <el-select
                  v-model="form.active"
                  placeholder="不限"
                  style="width: 270px"
                >
                  <el-option
                    v-for="(item, index) in data"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄要求">
                <div style="display: flex">
                  <el-select v-model="form.age_min" placeholder="不限">
                    <el-option
                      v-for="(item, index) in startAge"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <span style="margin: 0px 5px; color: rgb(220, 223, 230)"
                    >——</span
                  >
                  <el-select v-model="form.age_max" placeholder="不限">
                    <el-option
                      v-for="(item, index) in startAge"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div style="display: flex; margin-left: 100px">
              <el-form-item label="年限要求" style="margin-right: 100px">
                <div style="display: flex">
                  <el-select
                    v-model="form.year_min"
                    placeholder="不限"
                    style="width: 200px"
                  >
                    <el-option
                      v-for="(item, index) in yearsWorking"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <span style="margin: 0px 5px; color: rgb(220, 223, 230)"
                    >——</span
                  >
                  <el-select
                    v-model="form.year_max"
                    placeholder="不限"
                    style="width: 200px"
                  >
                    <el-option
                      v-for="(item, index) in yearsWorking"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select></div
              ></el-form-item>
              <el-form-item label="工作状态">
                <el-select v-model="form.candidate_status" placeholder="不限">
                  <el-option
                    v-for="(item, index) in status"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
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
                  <div style="display: flex">
                    <div style="width: 150px">
                      <el-option
                        v-for="item in cityAll"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        disabled
                        @mousemove.native="cityChange(item)"
                      >
                      </el-option>
                    </div>
                    <div tyle="width: 150px">
                      <el-option
                        v-for="item in town"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </div>
                  </div>
                </el-select>
              </el-form-item>
              <el-button
                type="primary"
                style="height: 35px; padding-top: 10px; margin-left: 400px"
                @click="search"
                >搜索</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <!-- <Recommend
      :list="list"
      :show="show"
      :call="call"
      :communication="communication"
      :face="face"
    />
    <Page class="position-page" :total="total" @handleSize="handleSize" /> -->
  </div>
</template>
<script>

import { getEnterprise } from '@/api/setting/index'
import { getCity } from '@/api/bai/index'

export default {
  props: {

    show: {
      type: Boolean
    },
    call: {
      type: Boolean
    },
    communication: {
      type: Boolean
    },
    face: {
      type: Boolean
    }

  },

  data () {
    return {
      num: [],
      ud: '',
      form: {
        edu: null,
        ur: null,
        age_min: null,
        age_max: null,
        active: null,
        candidate_status: null,
        year_min: null,
        year_max: null,
        city: null

      },
      firm: [],
      cities: [
        {
          name: '不限',
          id: 0
        },

        {
          name: '初中以下',
          id: 1
        },
        {
          name: '高中',
          id: 2
        },
        {
          name: '中专/技校',
          id: 3
        },
        {
          name: '大专',
          id: 4
        },
        {
          name: '本科',
          id: 5
        },
        {
          name: '硕士',
          id: 6
        },
        {
          name: 'MBA/EMBA',
          id: 7
        },
        {
          name: '博士',
          id: 8
        }
      ],
      data: [
        {
          name: '不限',
          id: 0
        },
        {
          name: '最近3天',
          id: 1
        },
        {
          name: '最近一周',
          id: 2
        },
        {
          name: '最近两周',
          id: 3
        },
        {
          name: '最近两周',
          id: 3
        },
        {
          name: '最近一个月',
          id: 4
        },
        {
          name: '最近三个月',
          id: 5
        }, {
          name: '最近半年',
          id: 6
        }, {
          name: '最近一年',
          id: 7
        }
      ],
      startAge: [
        {
          name: '不限',
          id: ''
        },
        {
          name: '16岁',
          id: 16
        },
        {
          name: '17岁',
          id: 17
        },
        {
          name: '18岁',
          id: 18
        },
        {
          name: '19岁',
          id: 19
        },
        {
          name: '20岁',
          id: 20
        },
        {
          name: '21岁',
          id: 21
        },
        {
          name: '22岁',
          id: 22
        },
        {
          name: '23岁',
          id: 23
        },
        {
          name: '24岁',
          id: 24
        },
        {
          name: '25岁',
          id: 25
        },
        {
          name: '26岁',
          id: 26
        },
        {
          name: '27岁',
          id: 27
        },
        {
          name: '28岁',
          id: 28
        },
        {
          name: '29岁',
          id: 29
        },
        {
          name: '30岁',
          id: '30'
        },
        {
          name: '31岁',
          id: 31
        },
        {
          name: '32岁',
          id: 32
        },
        {
          name: '33岁',
          id: 33
        },
        {
          name: '34岁',
          id: 34
        },
        {
          name: '35岁',
          id: 35
        },
        {
          name: '36岁',
          id: 36
        },
        {
          name: '37岁',
          id: 37
        },
        {
          name: '38岁',
          id: 38
        },
        {
          name: '39岁',
          id: 39
        },
        {
          name: '40岁',
          id: 40
        },
        {
          name: '41岁',
          id: 41
        },
        {
          name: '42岁',
          id: 42
        },
        {
          name: '43岁',
          id: 43
        },
        {
          name: '44岁',
          id: 44
        },
        {
          name: '45岁',
          id: 45
        },
        {
          name: '46岁',
          id: 46
        },
        {
          name: '47岁',
          id: 47
        },
        {
          name: '48岁',
          id: 48
        },
        {
          name: '49岁',
          id: 49
        },
        {
          name: '50岁',
          id: 50
        }],
      yearsWorking: [
        {
          name: '不限',
          id: ''
        },
        {
          name: '无经验',
          id: 0
        },
        {
          name: '1年',
          id: 1
        },
        {
          name: '2年',
          id: 2
        },
        {
          name: '3年',
          id: 3
        },
        {
          name: '4年',
          id: 4
        },
        {
          name: '5年',
          id: 5
        },
        {
          name: '6年',
          id: 6
        },
        {
          name: '7年',
          id: 7
        },
        {
          name: '8年',
          id: 8
        },
        {
          name: '9年',
          id: 9
        },
        {
          name: '10年',
          id: 10
        },
        {
          name: '11年',
          id: 11
        },
        {
          name: '12年',
          id: 12
        },
        {
          name: '13年',
          id: 13
        },
        {
          name: '14年',
          id: 14
        },
        {
          name: '15年',
          id: 15
        },
        {
          name: '16年及以上',
          id: 16
        }

      ],
      status: [
        {
          name: '不限',
          id: 4
        },
        {
          name: '离职-随时到岗',
          id: 0
        },
        {
          name: '在职-暂不考虑',
          id: 1
        },
        {
          name: '在职-考虑机会',
          id: 2
        },
        {
          name: '在职-月内到岗',
          id: 3
        }
      ],

      list: [

      ],
      total: 100,
      cityAll: [],
      town: [],
      offset: 0,
      limit: 5,
      position: '',
      type: [
        {
          id: 1,
          name: '不限'
        },
        {
          id: 2,
          name: '统招'
        },
        {
          id: 3,
          name: '非统招'
        }
      ]

    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getJob()
    this.getCityList()
    // this.search()
  },
  methods: {
    handleCheckAllChange (value) {
      console.log('value', value)
      for (let i = 0; i < value.length; i++) {
        if (this.num[i] === 0) {
          this.num = [0]
        }
      }
    },
    buttonss (id) {
      this.ud = id
    },
    // 第几页
    handleSize (page) {
      console.log(page)
    },
    details () {
      this.show = false
      this.$emit('hidden', false)
    },
    // 沟通职位
    async getJob () {
      const { data } = await getEnterprise()
      console.log('job', data)
      this.firm = data.data
      if (this.firm.length > 5) {
        this.firm.splice(5, this.firm.length - 5)
        this.position = this.firm[0].id
      }
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
    numm (e) {
      if (e.target.tagName === 'INPUT') return
      console.log(e)
    },
    fast (e, id) {
      if (e.target.tagName === 'INPUT') return
      this.$emit('fast', id)
    },
    search (e) {
      if (e.target.tagName === 'INPUT') return
      const list = this.form
      // this.salary = Number(this.end_money)
      // this.edu = this.num[0]
      if (this.ud === '不限' || this.ud === '' || list.ur === null) {
        delete list.ur
      } else if (this.ud === '统招') {
        list.ur = true
      } else if (this.ud === '非统招') {
        list.ur = false
      }
      if (this.num.length === 0) {
        delete list.edu
      } else if (this.num[0] === 0) {
        delete list.edu
      } else {
        list.edu = this.num
      }
      if (list.age_min === '' || list.age_min === null) {
        delete list.age_min
      }
      if (list.age_max === '' || list.age_max === null) {
        delete list.age_max
      }
      if (list.year_min === null || list.year_min === '') {
        delete list.year_min
      }
      if (list.year_max === null || list.year_max === '' || list.year_max === 0) {
        delete list.year_max
      }
      if (list.candidate_status === null || list.candidate_status === 4) {
        delete list.candidate_status
      }
      if (list.active === null || list.active === 0) {
        delete list.active
      }
      if (list.city === null) {
        delete list.city
      }
      if (list.active === '' || list.active === null) {
        delete list.active
      }
      // console.log(this.num)
      console.log(list, this.ud)
      this.$emit('search', list)
    }

  }
}
</script>
<style scoped lang="scss">
.search {
  // width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 15px 0;
  margin: 20px 30px;
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
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
</style>
