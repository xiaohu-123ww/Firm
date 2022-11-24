<template>
  <div class="navbar">
    <el-row>
      <el-col :span="0.5"
        ><div class="grid-content bg-purple-light">
          <Hamburger
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
          /></div
      ></el-col>
      <el-col :span="19"
        ><div class="grid-content bg-purple">
          <div class="navbar-bt">
            <!-- <Item :icon="icon" />
            {{ title }} -->
          </div>
        </div></el-col
      >
      <el-col :span="1"
        ><div class="grid-content bg-purple-light">
          <a href="javascript:;" class="navbar-firm" @click="onClick">
            <div :class="{ bg: state === 1 }">企业主页</div>
          </a>
        </div></el-col
      >
      <el-col :span="1"
        ><div class="grid-content bg-purple">
          <div class="navar-news">
            <!-- <a href=""><i class="el-icon-message"></i></a>
            <div class="navbar-div">1</div> -->
          </div>
        </div></el-col
      >

      <el-col :span="1"
        ><div
          class="grid-content bg-purple-light"
          :class="{ bd: arr === 2 }"
          @click="change"
        >
          <a href=""> <i class="el-icon-user"></i></a></div
      ></el-col>
      <el-col :span="1"
        ><div class="grid-content bg-purple">
          <el-dropdown class="navbar-dropdown">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
// import Item from '@/layout/components/Sidebar/Item.vue'
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Hamburger

  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    num: {
      type: Number
    }

  },
  data () {
    return {
      state: 1,
      arr: 1
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    onClick () {
      this.$router.push('/firm')
      this.$emit('reset', 0)
    },
    change () {
      this.$router.push('/personage')
    },
    logout () {
      // 1. 询问用户
      this.$confirm('确认退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定逻辑
        // 2. 清空数据 跳转登录页
        // vuex
        // 使用mutation
        this.$store.commit('user/removeUserInfo')
        // this.$router.push('/login')
        // 从哪里发生的退出登录 重新登录之后再回到这个页面
        // 思想: 跳转到登录的时候把当前的页面当成一个参数传过去
        // 重新登录的时候做一个判断 如果发生路径上有这个参数 就以这个参数为主 如果没有这个参数
        // 还跳转到首页
        this.$router.push({
          path: '/'
          // query: {
          //   // 携带的路由参数
          //   redirect: this.$route.fullPath
          //   // to.path -> 只包含路径
          //   // fullPatch 既有路径也有参数
          // }
        })
      }).catch(() => {

      })
    }

  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  line-height: 60px;
  background-color: #fff;
  // background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 6px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    color: black;
    -webkit-tap-highlight-color: transparent;
    line-height: 60px;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .navbar-bt {
    width: 100px;
    margin: 10px 20px;
    background-color: #fff;
    border-radius: 20px;
    height: 38px;
    text-align: center;
    color: #fff;
    line-height: 38px;
    font-size: 14px;
    // font-weight: 600;
  }
  .navbar-firm {
    color: rgba(112, 112, 112);
    font-size: 14px;
    // line-height: 60px;
  }
  .navar-news {
    // background-color: pink;
    height: 60px;
    // display: flex;
    position: relative;
    .el-icon-message {
      font-size: 24px;
      line-height: 60px;
    }
    .navbar-div {
      width: 18px;
      height: 18px;
      background-color: rgba(227, 77, 89);
      border-radius: 50px;
      position: absolute;
      top: 10px;
      left: 14px;
      color: #fff;
      text-align: center;
      line-height: 18px;
      font-size: 10px;
    }
  }
  .el-icon-user {
    line-height: 60px;
    font-size: 24px;
  }
  .navbar-dropdown {
    font-size: 24px;
  }
}
.bg {
  background-color: #e6f1ff;
  width: 60px;
  height: 100%;
}
.bd {
  background-color: #e6f1ff;
  width: 25px;
  height: 100%;
}
</style>
