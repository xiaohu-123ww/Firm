import request from '@/utils/request'

// 融云即时通讯建立链接沟通

export function getRongyun (data) {
  return request.post('/user/get-im-token/', data)
}

/**
 * 新招呼
 * @returns
 */
export function getpreChat (data) {
  return request.post('/enterprise/im-list/new/', data)
}
/**
 * 未回复
 * @returns
 */
export function getInterest (data) {
  return request.post('/enterprise/im-list/waiting/', data)
}

/**
 * 沟通中
 */
export function getComming (data) {
  return request.post('/enterprise/im-list/communicating/', data)
}

/**
 * 已约面P
 */
export function getPosted (data) {
  return request.post('/enterprise/im-list/interviewed/', data)
}

/**
 * 不合适
 */
export function getReject (data) {
  return request.post('/enterprise/im-list/rejected/', data)
}

/**
 * 是否交换手机号
 */

export function getPhoneChange (id) {
  return request.get('/enterprise/view-phone/', {
    params: {
      comm_id: id
    }
  })
}

