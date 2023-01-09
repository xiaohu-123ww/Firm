import Vue from 'vue'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'element-ui/lib/theme-chalk/icon.css'
// import './styles/element-variables.scss'
// import './plugins/element.js'

import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

import router from './router'
import '@/icons' // icon
import VueQuillEditor from 'vue-quill-editor'
import { Upload } from 'element-ui'
import BaiduMap from 'vue-baidu-map'
// import { BaiduMap, BmNavigation, BmView, BmGeolocation, BmCityList, BmLocalSearch } from 'vue-baidu-map'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { VueJsonp } from 'vue-jsonp'
import { disposeImg, parseTime, changeDateToStr1, changeDate, changeDateTo } from './utils/disposeImg'

Vue.use(VueJsonp)

Vue.use(ElementUI)
Vue.use(Element)
// Vue.use(Element, {
//   size: Cookies.get('size') || 'medium' // set element-ui default size
//   // locale: enLang // 如果使用中文，无需设置，请删除
// })
Vue.use(VueQuillEditor)

Vue.use(Upload)
Vue.use(BaiduMap, {

  ak: 'ZrI2HTuyRbAXHDuci4xowYtUOepEzMmK'
})
// Vue.use(BmNavigation, BmView, BmGeolocation, BmCityList, BmLocalSearch)

Vue.config.productionTip = false
Vue.prototype.disposeImg = disposeImg
Vue.prototype.parseTime = parseTime
Vue.prototype.changeDateToStr1 = changeDateToStr1
Vue.prototype.changeDate = changeDate
Vue.prototype.changeDateTo = changeDateTo

// console.log = console.warn = () => { }s
// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
