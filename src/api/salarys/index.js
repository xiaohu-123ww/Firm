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
 * 沟通中
 * @returns
 */
export function getCommuniCatingList (data) {
  return request({
    url: '/enterprise/comm_list/communicating/',
    method: 'post',
    params: { limit: limit },
    data: data // data就是body参数
  })
}

/**
 * 未回复
 * @returns
 */
export function getRejectedList (data) {
  return request({
    url: '/enterprise/comm_list/rejected/',
    method: 'post',
    params: { limit: limit },
    data: data // data就是body参数
  })
}
