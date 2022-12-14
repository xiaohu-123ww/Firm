import request from '@/utils/request'

// 登录
/**
 * @description: 登录
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

/**
 * 发送验证码
 * @param {*} data
 * @returns
 */
export function sendCapte (data) {
  return request.post('/login_mobile/', data)
}

export function getCodeLogin (code, mobile) {
  return request.get('/user/enterprise-code-login/v1.0.0/', {
    params: {
      code: code,
      mobile: mobile
    }
  })
}

/**
 * 企业注册
 */
export function sendCapteLogin (data) {
  return request.post('/user/enterprise-code-login/v1.0.0/', data)
}

/**
 * 找回密码
 */
export function sendPasswordLogin (data) {
  return request.put('/user/enterprise-login/v1.0.0/', data)
}
/**
 * 退出登录
 */
export function logout () {
  return request.post('/logout/')
}
