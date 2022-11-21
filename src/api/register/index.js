import request from '@/utils/request'

/**
 * 关键字搜索 公司名称
 * @param {*} qw
 * @returns
 */
export function getFirm (qw) {
  return request.get('/enterprise/search-name/', {
    params: {
      qw
    }
  })
}

/**
 * 验证方式
 */

export function getCheckMethods (data) {
  return request.post('/enterprise/check-methods/', data)
}

/**
 * 图片上传
 */
export function getImage (data) {
  return request.post('/enterprise/input_license/v1.0.1/', data)
}

/**
 * 营业执照带邮箱验证 /enterprise/identify-by-license-with-email/
 */

export function getLicenseWithEmail (data) {
  return request.post('/enterprise/identify-by-license-with-email/', data)
}

/**
 * 营业执照 不带邮箱验证
 */
export function getLicense (data) {
  return request.post('/enterprise/identify-by-license/', data)
}

/**
 * 邮箱验证
 */
export function getLicenseEmail (data) {
  return request.post('/enterprise/identify-by-email/', data)
}
