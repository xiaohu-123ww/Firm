import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from './auth'
const service = axios.create({
  baseURL: 'http://1.13.8.165/',
  timeout: 5000 // request timeout
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
  response => {
    const code = response.data.code || 200// 若未设置默认成功状态
    switch (code) {
      case 200:// 为200执行该行
        return response.data// 成功直接返回

      case 401:// 为1300执行该行
        MessageBox.confirm('登录状态已过期，重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          type: 'warning',
          showCancelButton: false,
          showClose: false
        }).then(() => { window.location.href = '/' })// 跳转登录页
          .catch(() => { window.location.href = '/' })// 跳转登录页
        return response.data
      default:// 都不相同执行该行
        return response.data
    }
  },
  error => {
    console.log('axios中response报错', error)
    Message({
      showClose: true,
      message: error.message, // 弹出失败原因
      type: 'error'
    })
    return Promise.reject(error)
  }

)

export default service
