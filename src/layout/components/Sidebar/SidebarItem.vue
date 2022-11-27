<template>
  <div v-if="!item.hidden" class="my">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          class="father"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
          <span class="aa"><i class="ft el-icon-arrow-right"></i></span>
        </el-menu-item>

        <!-- </app-link> -->
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
      :default-active="routePath"
    >
      <template slot="title">
        <!--左侧菜单中 用来显示图标的是路由对象中meta字段里的icon
        文案显示用的meta中的title -->
        <!-- icon的渲染 使用名称去匹配 icons/svg/下的图标的名称-->
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    abc: {
      type: String
    }
  },
  data () {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      changePath: 0,
      state: ''
    }
  },
  created () {
    this.changeColor()
  },
  computed: {
    routePath () {
      return this.$route.meta.guidePath ? this.$route.meta.jumpPath : this.$route.path
    }
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          // console.log(this.onlyOneChild)
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }

      return path.resolve(this.basePath, routePath)
    },
    changeColor () {
      const but = document.getElementsByClassName('my')

      for (var i = 0; i < but.length; i++) {
        // console.log(but[i])
        but[i].onclick = function () {
          for (var i = 0; i < but.length; i++) {
            // console.log(i)
            but[i].style.backgroundColor = ''
          }
          this.style.backgroundColor = '#256efd'
        }
      }
      // console.log(a)

      // this.state = ''
    }
  }
}
</script>
<style scoped lang="scss">
.father {
  position: relative;
  .aa {
    position: absolute;
    top: 0;
    left: 180px;
    width: 20px;
    height: 20px;

    // background-color: pink;
  }
}

.liBackground {
  background-color: #256efd;
}
.ba {
  background-color: aqua;
}
</style>
