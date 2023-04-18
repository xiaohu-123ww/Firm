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
/**
 * 是否交换微信号
 */

export function getWetNumber (id) {
  return request.get('/enterprise/view-wechat/', {
    params: {
      comm_id: id
    }
  })
}
/**
 * 查询微信号
 */

export function getWetChat () {
  return request.get('/user/set-wechat/')
}

/**
 * 修改微信号及绑定微信号
 *
 */

export function getWetChatChange (id) {
  // return request.put('/user/phone-exchange/', id)
  return request.put(`/user/set-wechat/?wechat=${id}`)
}

/**
 * 面试详情
 */

export function getParticulars (id) {
  return request.get(`/enterprise/interviews/${id}/`)
}

/**
 * 不合适
 */

export function getRejectss (comm_id) {
  return request.post(`/enterprise/reject/${comm_id}/`)
}

/**
 * 切换沟通岗位
 */

export function getCommunication (comm_id, pos_id) {
  return request.put(`/enterprise/change-position/?comm_id=${comm_id}&pos_id=${pos_id}`)
}
