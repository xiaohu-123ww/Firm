import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

import router from './router'
import '@/icons' // icon
import VueQuillEditor from 'vue-quill-editor'
import { Upload } from 'element-ui'
import BaiduMap from 'vue-baidu-map'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.use(Upload)
Vue.use(BaiduMap, {

  ak: 'ZrI2HTuyRbAXHDuci4xowYtUOepEzMmK'
})

Vue.config.productionTip = false

// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
