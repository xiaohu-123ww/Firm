import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [

  {
    path: '/',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index'),
    hidden: true

  },

  {
    path: '/dashboard',
    component: Layout,
    redirect: '',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/index'),
      meta: { title: '首页', icon: '首页' }
    }

    ]
  },

  {
    path: '/firm',
    component: Layout,
    linkActiveClass: 'active',
    children: [{
      path: '',
      name: 'firm',
      component: () => import('@/views/firm/index.vue')

    }]
  },
  {
    path: '/personage',
    component: Layout,
    linkActiveClass: 'active',
    children: [{
      path: '',
      name: 'personage',
      component: () => import('@/views/personage/index.vue')
    }]
  },

  {
    path: '/department',
    component: Layout,
    linkActiveClass: 'active',
    children: [{
      path: '',
      name: 'departments',
      component: () => import('@/views/Department/index'),
      meta: { title: '职位中心', icon: 'biao' }
    }]
  },

  {
    path: '/setting',
    component: Layout,
    linkActiveClass: 'active',
    children: [{
      path: '',
      name: 'settings',
      component: () => import('@/views/Setting/index'),
      meta: { title: '人才推荐', icon: 'tui' }
    }]
  },

  {
    path: '/employee',
    component: Layout,
    linkActiveClass: 'active',
    children: [{
      path: '',
      name: 'employees',
      component: () => import('@/views/Employee/index'),
      meta: { title: '人才搜索', icon: 'sou' }
    }]
  },

  // {
  //   path: '/permission',
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     name: 'permissions',
  //     component: () => import('@/views/Permission/index'),
  //     meta: { title: '互动消息', icon: 'el-icon-chat-dot-round' }
  //   }]
  // },

  {
    path: '/salarys',
    component: Layout,
    hidden: false,
    children: [{
      path: '',
      name: 'salarys',
      component: () => import('@/views/Salary'),
      meta: { title: '人才管理', icon: '人才信息' }
    }]
  },
  {
    path: '/information',
    component: Layout,
    hidden: false,
    children: [{
      path: '',
      name: 'information',
      component: () => import('@/views/Information'),
      meta: { title: '人才信息', icon: '人' }
    }]
  },
  {
    path: '/interaction',
    component: Layout,
    hidden: false,
    children: [{
      path: '',
      name: 'interaction',
      component: () => import('@/views/interaction'),
      meta: { title: '互动消息', icon: '互动' }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  base: process.env.NODE_ENV === 'production' ? '/RtcScreen/' : './'
})
// base: process.env.NODE_ENV === 'production' ? '/RtcScreen /' : './'
const router = createRouter()

// reset 路由方法
export function resetRouter () {
  // 得到一个全新的router实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher // reset router
}

export default router
