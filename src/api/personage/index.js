import request from '@/utils/request'

/**
 * 城市
 * @returns
 */
export function getBase () {
  return request.get('/enterprise/personal-base-data/v1.0.1/')
}

export function getBaseData (data) {
  return request.put('/enterprise/personal-base-data/v1.0.1/', data)
}
/**
 * 手机号验证码
 * @param {*} data
 * @returns
 */
export function getverification (mobile) {
  return request.get('/user/bind-number/v1.0.0/', {
    params: {
      mobile
    }
  })
}

/**
 * 绑定手机号
 * @param {*} data
 * @returns
 */
export function getphoto (data) {
  return request.post('/user/bind-number/v1.0.0/', data)
}

// 安全信息

export function getAuthentication () {
  return request.get('/enterprise/real-name-authentication/v1.0.1/')
}

/**
 * 邮箱验证码
 * @param {*} data
 * @returns
 */
export function getEmail (data) {
  return request.post('/user/bind-email/v1.0.0/', data)
}
/**
 *邮箱绑定
 * @param {*} data
 * @returns
 */
export function getEmailBound (data) {
  return request.post('/user/bind-email/v1.0.0/', data)
}
/**
 * 修改密码
 */
// /user/edit-password/

export function getpassword (data) {
  return request.post('/user/edit-password/', data)
}

// 解绑实名认证
// /enterprise/real-name-authentication/v1.0.1/

export function getAuthen (data) {
  return request.delete('/enterprise/real-name-authentication/v1.0.1/', data)
}
/**
 * 实名认证
 * @param {*} data
 * @returns
 */
export function getAuthenList (data) {
  return request.post('/enterprise/real-name-authentication/v1.0.1/', data)
}

/**
 * 我的企业
 */
export function getPersonal () {
  return request.get('/enterprise/personal-enterprise/v1.0.1/')
}
