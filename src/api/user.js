import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { mobile,password}
 * @return {*} promise
 */
export function login (data) {
  return request.post('/user/enterprise-login/v1.0.0/', data)
}

// 刷新状态
export function getStates () {
  return request.get('/utils/online_status/v1.0.0/')
}
