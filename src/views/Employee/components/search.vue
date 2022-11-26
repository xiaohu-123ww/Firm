<template>
  <div>
    <div v-if="!detailss">
      <div class="search">
        <div class="search-input">
          <div style="width: 100%">
            <el-input
              v-model="form.qw"
              placeholder="请输入职位关键词"
              style="width: 500px"
            ></el-input>
            <el-button class="button" @click="searchList">搜索</el-button>
          </div>
          <div class="seek">
            <div v-if="firm.length !== 0" class="search-checkbox">
              <span class="seek-span">快捷搜索</span>
              <el-radio-group v-model="key" size="mini">
                <el-radio-button
                  v-for="(item, index) in firm"
                  :key="index"
                  class="radio"
                  :label="item"
                  @click.native="fast($event, item.id)"
                  >{{ item.name }}</el-radio-button
                >
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="search-form">
          <el-form
            :model="form"
            label-width="80px"
            style="width: 1000px; margin: 0 auto"
          >
            <div class="search-checkbox">
              <span style="margin: 5px 10px">学历要求</span>
              <el-checkbox-group v-model="num" size="mini">
                <el-checkbox-button
                  v-for="(vItem, vIndex) in cities"
                  :key="vIndex.id"
                  :label="vItem.id"
                  style="margin-right: 10px"
                  @change="handleCheckAllChange(vItem.id)"
                  >{{ vItem.name }}</el-checkbox-button
                >
              </el-checkbox-group>
            </div>
            <div class="search-checkbox">
              <span style="margin: 5px 10px">院校要求</span>
              <el-radio-group v-model="ud" size="mini">
                <el-radio-button label="不限" class="radio"></el-radio-button>
                <el-radio-button label="统招" class="radio"></el-radio-button>
                <el-radio-button label="非统招" class="radio"></el-radio-button>
              </el-radio-group>
            </div>
            <div style="display: flex; margin-left: 95px; width: 1000px">
              <el-form-item label="年龄要求" style="margin-right: 30px">
                <el-select
                  v-model="form.age_min"
                  placeholder="不限"
                  style="width: 200px"
                >
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
                <el-select
                  v-model="form.age_max"
                  placeholder="不限"
                  style="width: 200px"
                >
                  <el-option
                    v-for="(item, index) in startAge"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="期望职位">
                <el-select
                  v-model="classPlt"
                  multiple
                  placeholder="请选择职业"
                  class="box"
                  style="width: 370px"
                  @change="bindChange"
                >
                  <div style="display: flex">
                    <div>
                      <el-option
                        v-for="(item, index) in optionss"
                        :key="index"
                        :label="index"
                        :value="index"
                        disabled
                        @mousemove.native="tradeChange(item)"
                      >
                      </el-option>
                    </div>
                    <div>
                      <el-option
                        v-for="(item, index) in tradelist"
                        :key="index"
                        :label="index"
                        :value="index"
                        disabled
                        @mousemove.native="serchPostChange(item)"
                      >
                      </el-option>
                    </div>
                    <div>
                      <el-option
                        v-for="(item, index) in positionJobList"
                        :key="index"
                        :label="index"
                        :value="item"
                        @click.native="jobChange(item)"
                      >
                      </el-option>
                    </div>
                  </div>
                </el-select>
              </el-form-item>
            </div>
            <div style="display: flex; margin-left: 95px">
              <el-form-item label="年限要求" style="margin-right: 30px">
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
                </el-select>
              </el-form-item>
              <el-form-item label="工作状态">
                <el-select
                  v-model="form.candidate_status"
                  placeholder="不限"
                  style="width: 270px"
                >
                  <el-option
                    v-for="(item, index) in status"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div style="display: flex; margin-left: 95px">
              <el-form-item label="薪资要求" style="margin-right: 30px">
                <el-input
                  v-model="start_money"
                  style="width: 200px"
                  placeholder="不限"
                ></el-input>
                <span style="margin: 0px 5px; color: rgb(220, 223, 230)"
                  >——</span
                >
                <el-input
                  v-model="end_money"
                  style="width: 200px"
                  placeholder="不限"
                ></el-input>
              </el-form-item>
              <el-form-item label="活跃日期">
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
            </div>
            <div style="display: flex; margin-left: 95px">
              <el-form-item label="性别" style="margin-right: 198px">
                <el-select
                  v-model="form.sex"
                  placeholder="不限"
                  style="width: 270px"
                >
                  <el-option label="不限" value="2"></el-option>
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
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
                    </div></div
                ></el-select>
              </el-form-item>
            </div>
            <div class="search-checkbox">
              <span style="margin: 5px 18px 5px 32px">筛选</span>
              <el-radio-group v-model="screen" size="mini">
                <el-radio-button label="不限" class="radio"></el-radio-button>
                <el-radio-button label="已看过" class="radio"></el-radio-button>
                <el-radio-button label="已聊过" class="radio"></el-radio-button>
              </el-radio-group>
            </div>
          </el-form>
        </div>
      </div>
      <div>
        <div
          v-if="loading"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgb(244, 246, 249)"
          style="height: 700px; font-size: 100px"
        ></div>
        <div v-else>
          <div v-if="list.length !== 0">
            <List :list="list" @newResume="newResume" />
            <el-pagination
              style="margin: 30px 300px"
              background
              :current-page="offset"
              :page-sizes="[5, 10, 20]"
              :page-size="limit"
              layout="  prev, pager, next,sizes, jumper,total"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
          <el-empty
            v-if="list.length === 0"
            description="暂无数据"
            style="height: 500px"
          ></el-empty>
        </div>
      </div>
    </div>
    <Recommendsss v-if="detailss" :resume-list="resumeList" :pid="pid" />
  </div>
</template>
<script>
import { getCity } from '@/api/bai/index'
// import Recommend from '@/views/Setting/components/recommend.vue'
import Page from '../../Department/components/page.vue'
import { getEnterprise } from '@/api/setting/index'
import { getShowClass } from '@/api/department/online'
import { getRetrivel, getRetrivelList, getCandidate } from '@/api/employee/index'
import List from './list.vue'
import Recommendsss from '../../Setting/components/resumeDetails'
import { getResume } from '@/api/setting/index'
export default {
  components: { List, Recommendsss },
  data () {
    return {
      pid: 0,
      detailss: false,
      resumeList: {},
      key: '',
      ud: '',
      form: {
        qw: '',
        edu: null,
        ur: null,
        age_min: null,
        age_max: null,
        salary: null,
        active: null,
        sex: null,
        pst_class: [],
        candidate_status: null,
        year_min: null,
        year_max: null,
        city: null,
        viewed: 0,
        commed: 0

      },
      firm: [],
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

      list: [],
      total: 0,
      start_money: null,
      end_money: null,
      screen: null,
      num: [],

      optionss: {},
      tradelist: {},
      // 职位
      positionJobList: {},
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
      cityAll: [],
      town: [],
      initial: {},
      limit: 5,
      offset: 1,
      loading: false,
      classPlt: [],
      position: 0

    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.getJob()
    this.getPostList()
    this.getCityList()
    this.getList()
  },
  methods: {
    handleCheckAllChange (value) {
      if (value === 0) {
        this.num = [0]
        // this.num.push(0)
      } else {
        if (this.num[0] === 0) {
          this.num = [value]
        }
      }
      console.log(this.num)
    },
    // 第几页
    handleSize (page) {
      console.log(page)
    },
    details () {
      this.show = false
      this.$emit('hidden', false)
    },
    async getJob () {
      const { data } = await getEnterprise()
      console.log('岗位', data)
      const list = Object.values(data.data)
      if (list.length === 0) {
        console.log(1)
      } else {
        this.backgroundColor = list[0].id

        this.firm = data.data
        if (this.firm.length > 8) {
          this.firm.splice(7, this.firm.length - 7)
        }
      }
    },
    // 岗位
    async getPostList () {
      const { data } = await getShowClass()
      console.log('岗位', data)
      this.optionss = data
    },
    tradeChange (index) {
      console.log('index', index)
      this.tradelist = index
    },

    serchPostChange (index) {
      console.log('index1', index)
      this.positionJobList = index
    },
    jobChange (item) {
      console.log('123', item)
      // this.ruleForm.pst_class = item
    },
    bindChange (e) {
      if (e.length > 3) {
        this.$message.warning('最多可选择三个行业类型')
        this.form.pst_class.splice(-1)
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
    // 初始列表
    async getList () {
      this.loading = true
      this.search()
      const res = await getRetrivel(this.limit, this.initial)
      console.log('列表123', res)
      this.list = res.data.results
      this.total = res.data.count
      this.loading = false
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('handleSize', val)
      this.limit = val
      this.getList()
    },
    async handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.offset = val
      const offset = this.limit * (val - 1)
      this.loading = true
      // this.searchList()
      const res = await getRetrivelList(this.limit, offset, this.initial)
      console.log('列表123', res)
      this.list = res.data.results
      this.total = res.data.count
      this.loading = false
    },
    search () {
      const list = this.form
      // this.salary = Number(this.end_money)
      // this.edu = this.num[0]
      // console.log(this.form, this.num, this.form.ur, this.form.age_min, this.form.sex)
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
      if (this.classPlt.length === 0) {
        delete list.pst_class
      } else {
        list.pst_class = this.classPlt
      }

      if (this.screen === '不限' || this.screen === null) {
        delete list.viewed
        delete list.commed
      } else if (this.screen === '已看过') {
        list.viewed = 1
        delete list.commed
      } else {
        delete list.viewed
        list.commed = 1
      }

      if (list.qw === '') {
        delete list.qw
      }
      if (list.year_min === null || list.year_min === '') {
        delete list.year_min
      }
      if (list.year_max === null || list.year_max === '') {
        delete list.year_max
      }
      if (list.candidate_status === null || list.candidate_status === 4) {
        delete list.candidate_status
      }

      if (this.end_money !== null) {
        list.salary = Number(this.end_money)
      } else if (this.end_money === null || list.salary === 0) {
        delete list.salary
      }
      if (list.salary === 0) {
        delete list.salary
      }
      if (list.active === null || list.active === 0) {
        delete list.active
      }
      if (list.sex === '2' || list.sex === null) {
        delete list.sex
      }
      if (list.city === null) {
        delete list.city
      }
      if (list.active === '' || list.active === null) {
        delete list.active
      }
      // console.log(this.num)
      console.log(list, this.ud)
      this.initial = list
    },
    searchList () {
      this.getList()
      this.offset = 1
    },
    async fast (e, id) {
      if (e.target.tagName === 'INPUT') return
      this.position = id
      console.log(id)
      this.loading = true
      const res = await getCandidate(id, this.limit)
      console.log('快捷搜索12', res)

      this.list = res.data.results
      this.total = res.data.count
      this.loading = false
    },
    async newResume (id) {
      console.log(id)
      this.pid = id
      const res = await getResume(id)
      console.log('简历', res)
      this.resumeList = res.data.data
      this.detailss = true
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
  .search-input {
    height: 80px;
    // background-color: pink;
    text-align: center;
    margin-bottom: 20px;
    .seek {
      // background-color: aqua;
      margin-top: 12px;
      .seek-span {
        font-size: 14px;
        margin-right: 13px;
      }
    }
  }
  .search-form {
    width: 100%;
    // height: 200px;
    // background-color: aqua;
    .search-checkbox {
      margin: 0 auto;
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
.button {
  width: 70px;
  height: 35px;
  padding: 10px;
  background-color: #256efd;
  color: #fff;
  margin-left: 10px;
}
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
</style>
