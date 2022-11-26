import router from '@/router'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken, removeToken, getTokenInvalidFlag, setTokenInvalidFlag } from './auth'
const service = axios.create({
  baseURL: 'http://1.13.8.165/',
  timeout: 100000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 这里的return别丢！！！
    // 拿到token 存入请求头
    const token = getToken()
    if (token) {
      // 前面的authorization和后面的拼接方式都是固定的 业内规范
      // config.headers['Authorization'] = `Bearer ${token}`
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code === 2000 || res.code === 0) {
      const tokenInvalidFlag = getTokenInvalidFlag()
      console.log(tokenInvalidFlag)
      if (tokenInvalidFlag === 0 || tokenInvalidFlag === '0') {
        setTokenInvalidFlag(1)
        MessageBox.confirm('当前登录已过期 请重新登录', '提示', {
          confirmButtonText: '确定', // 确认按钮的文字显示
          type: 'warning',
          center: true, // 文字居中显示
          showCancelButton: false, // 不显示取消按钮
          showClose: false, // 是否显示右上角的x
          closeOnClickModal: false
        }).then(() => {
          //  ("501");
          // store.commit('user/removeUserInfo')
          router.push('/')
          removeToken()
        })
      }
    } else {
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 1000 && res.code !== 200 && res.code !== 1001 && res.code !== 504 && res.code === 1201 && res.code !== 1203 && res.code !== 1200) {
    //   //  (res.code);
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   console.log(res)
    //   if (res.code === 0 || res.code === 2000 || res.code === 50011 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     //  ("500");
    //     MessageBox.confirm('当前登录已过期 请重新登录', '提示', {
    //       confirmButtonText: '确认',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       //  ("501");
    //       // store.commit('user/removeUserInfo')
    //       router.push('/')
    //       removeToken()
    //     })
    //   } else {
    //     Message({
    //       message: res.data.msg || res.msg,
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //   }
    //   return res
    //   // return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    //  (error.message);
    // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
