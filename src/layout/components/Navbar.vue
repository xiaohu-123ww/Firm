<template>
  <div class="navbar" style="display: flex">
    <div class="grid-content bg-purple-light">
      <Hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
    </div>
    <div class="grid-content bg-purple" style="width: 75%">
      <div class="navbar-bt">
        <Item :icon="icon" />
        {{ title }}
      </div>
    </div>
    <div class="grid-content bg-purple-light" style="width: 9%">
      <a
        href="javascript:;"
        class="navbar-firm"
        :class="{ color: bg === 1 }"
        @click="onClick"
      >
        <div>企业主页</div>
      </a>
    </div>
    <div class="grid-content bg-purple" style="width: 8%">
      <div class="navbar-firm" @click="feedback">
        <a href="javascript:;">反馈</a>
      </div>
    </div>
    <div class="grid-content bg-purple-light" style="width: 8%" @click="change">
      <a href="javascript:;"> <i class="el-icon-user"></i></a>
    </div>
    <div class="grid-content bg-purple" style="width: 8%">
      <el-dropdown class="navbar-dropdown">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Dia :add="add" @handler="handler" />
  </div>
</template>

<script>
import Item from '@/layout/components/Sidebar/Item.vue'
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { logout } from '@/api/user'
import Dia from './dia.vue'
export default {
  components: {
    Hamburger,
    Item,
    Dia
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
    show: {
      type: String
    }
  },
  data () {
    return {
      bg: 0,
      add: false
    }
  },
  methods: {
    handler (i) {
      this.add = i
    },
    feedback () {
      console.log(113)
      this.add = true
    },
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    onClick () {
      this.$router.push('/firm')
      this.bg = 1
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
      }).then(async () => {
        // 确定逻辑
        // 2. 清空数据 跳转登录页
        // vuex
        // 使用mutation
        const res = await logout()
        console.log('退出', res)
        if (res.code === 1000) {
          this.$store.commit('user/removeUserInfo')

          this.$router.push('/')
          RongIMClient.getInstance().logout()
          this.$store.commit('SET_ANSWERS', [])
          this.$store.commit('MEMBER', {})
          this.$store.commit('UserId', {})
          sessionStorage.removeItem('answer')
        } else {
          this.$message.error(res.data.msg)
        }
        // this.$store.commit('user/removeUserInfo')
        // // this.$router.push('/login')
        // // 从哪里发生的退出登录 重新登录之后再回到这个页面
        // // 思想: 跳转到登录的时候把当前的页面当成一个参数传过去
        // // 重新登录的时候做一个判断 如果发生路径上有这个参数 就以这个参数为主 如果没有这个参数
        // // 还跳转到首页
        // this.$router.push({
        //   path: '/'

        // })
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
    background-color: #256efd;
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
    // background-color: pink;
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
.color {
  background-color: #e6f1ff;
  width: 60px;
  height: 100%;
}
</style>
