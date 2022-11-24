import request from '@/utils/request'

/**
 * 新招呼
 * @returns
 */
export function getNewList (limit, data) {
  return request({
    url: '/enterprise/comm_list/new/',
    method: 'post',
    params: { limit: limit },
    data: data // data就是body参数
  })
}
/**
 * 新招呼分页
 * @returns
 */
export function getNewLists (limit, offset, data) {
  return request({
    url: '/enterprise/comm_list/new/',
    method: 'post',
    params: { limit: limit, offset: offset },
    data: data // data就是body参数
  })
}

/**
 * 未回复
 * @returns
 */
export function getWaitingList (limit, data) {
  return request({
    url: '/enterprise/comm_list/waiting/',
    method: 'post',
    params: { limit: limit },
    data: data // data就是body参数
  })
}
/**
 * 未回复分页
 * @returns
 */
export function getWaitingLists (limit, offset, data) {
  return request({
    url: '/enterprise/comm_list/waiting/',
    method: 'post',
    params: { limit: limit, offset },
    data: data // data就是body参数
  })
}

/**
 * 沟通中
 * @returns
 */
export function getCommuniCatingList (limit, data) {
  return request({
    url: '/enterprise/comm_list/communicating/',
    method: 'post',
    params: { limit: limit },
    data: data // data就是body参数
  })
}
/**
 * 沟通中分页
 * @param {*} limit
 * @param {*} offset
 * @param {*} data
 * @returns
 */
export function getCommuniCatingLists (limit, offset, data) {
  return request({
    url: '/enterprise/comm_list/communicating/',
    method: 'post',
    params: { limit: limit, offset: offset },
    data: data // data就是body参数
  })
}

/**
 * 不合适
 * @returns
 */
export function getRejectedList (limit, data) {
  return request({
    url: '/enterprise/comm_list/rejected/',
    method: 'post',
    params: { limit: limit },
    data: data // data就是body参数
  })
}
/**
 * 不合适分页
 * @returns
 */
export function getRejectedLists (limit, offset, data) {
  return request({
    url: '/enterprise/comm_list/rejected/',
    method: 'post',
    params: { limit: limit, offset: offset },
    data: data // data就是body参数
  })
}

/**
 * 已约面
 * @returns
 */
export function getInterviewList (limit, data) {
  return request({
    url: '/enterprise/interview-list/',
    method: 'post',
    params: { limit: limit },
    data: data // data就是body参数
  })
}
/**
 * 已约面分页
 * @returns
 */
export function getInterviewLists (limit, offset, data) {
  return request({
    url: '/enterprise/interview-list/',
    method: 'post',
    params: { limit: limit, offset: offset },
    data: data // data就是body参数
  })
}

/**
 * 可以聊
 */

export function getChat (comm_id) {
  return request.post(`/enterprise/pre-chat/${comm_id}/`)
}

/**
 * 不合适
 */

export function getReject (comm_id) {
  return request.post(`/enterprise/reject/${comm_id}/`)
}

/**
 * 提醒对方
 */

export function getInterests (comm_id) {
  return request.put(`/enterprise/interests/${comm_id}/`)
}

/**
 *要简历
 */

export function getChating (comm_id) {
  return request.post(`/enterprise/chating/${comm_id}/`)
}

/**
 *约面试 /enterprise/interviews/
 */

export function getInterview (data) {
  return request.post(`/enterprise/interviews/`, data)
}

/**
 * 面试详情
 */

export function getFirm (id) {
  return request.get(`enterprise/interviews/${id}/`)
}
/**
 * 面试评价
 *
 */
export function getFirmData (id, data) {
  return request.put(`/enterprise/interviews/${id}/`, data)
}

/**
 * 取消面试
 */

export function getFirmDelete (id) {
  return request.delete(`enterprise/interviews/${id}/`)
}

export function getState () {
  return request.get('/enterprise/comm-list-count/')
}
