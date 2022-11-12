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
      <el-col :span="17"
        ><div class="grid-content bg-purple">
          <div class="navbar-bt">
            <!-- <Item :icon="icon" />
            {{ title }} -->
          </div>
        </div></el-col
      >
      <el-col :span="3"
        ><div class="grid-content bg-purple-light">
          <a href="javascript:;" class="navbar-firm" @click="onClick">
            <div>企业主页</div>
          </a>
        </div></el-col
      >
      <el-col :span="1"
        ><div class="grid-content bg-purple">
          <div class="navar-news">
            <a href=""><i class="el-icon-message"></i></a>
            <div class="navbar-div">1</div>
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
              <el-dropdown-item @click.native="$router.push('/')"
                >退出登录</el-dropdown-item
              >
              <el-dropdown-item>首页</el-dropdown-item>
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

      arr: 2
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
