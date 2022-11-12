import request from '@/utils/request'

/**
 * 城市
 * @returns
 */
export function getImage () {
  return request.get('/enterprise/corporate-image/v1.0.1/')
}

/**
 * 删除图片
 * @returns
 */
export function getImageDelete (data) {
  return request.delete('/enterprise/input_images/v1.0.1/', { data: data })
}

/**
 * 首页信息
 */

export function getStatusList () {
  return request.get('/enterprise/index_status_list/v1.0.1/')
}

/**
 * 企业介绍
 * @returns
 */
export function getStatus () {
  return request.get('/enterprise/enterprise-introduction/v1.0.1/')
}
/**
 * 企业介绍编辑
 */

export function getIntroduction (data) {
  return request.put('/enterprise/enterprise-introduction/v1.0.1/', data)
}

/**
 * 个人中心头像上传
 * @param {*} formData
 * @returns
 */
export function planInsert (formData) {
  return request.post('/enterprise/personal-base-data/v1.0.1/', formData)
}

/**
 * 企业主页头像上传
 * @param {*} formData
 * @returns
 */
export function getFirm (formData) {
  return request.post('/enterprise/input_images/v1.0.1/', formData)
}

/**
 * 企业形象确定
 */
export function getCorporateImage (data) {
  return request.put('/enterprise/corporate-image/v1.0.1/', data)
}

/**
 * 企业形象退出编辑
 */
export function getCorporateImageDelete (data) {
  return request.delete('/enterprise/corporate-image/v1.0.1/', { data: data })
}

/**
 * 工作制度
 * @returns
 */
export function getWorkSystem () {
  return request.get('/enterprise/work-system/v1.0.1/')
}

/**
 * 工作制度修改
 */

export function getWorkSystemAmend (data) {
  return request.put('/enterprise/work-system/v1.0.1/', data)
}

/**
 * 企业基本信息logo上传
 * @param {*} formData
 * @returns
 */
export function getEnterprise (formData) {
  return request.post('/enterprise/base-data/v1.0.1/', formData)
}

/**
 * 企业基本信息
 */

export function getEnterpriseList () {
  return request.get('/enterprise/base-data/v1.0.1/')
}

/**
 * **
 * 企业基本信息退出编辑
 */
export function getImgDelete (data) {
  return request.delete('/enterprise/base-data/v1.0.1/', { data: data })
}
/**
 * 企业基本信息修改
 */
export function getWork (data) {
  return request.put('/enterprise/base-data/v1.0.1/', data)
}
