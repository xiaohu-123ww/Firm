import request from '@/utils/request'

/**
 * 首页 - 我的职位
 * @returns
 */
export function getPersonal () {
  return request.get('/enterprise/personal-position/v1.0.1/')
}

/**
 * 首页 - 我的面试
 */
export function getInterviewsShort () {
  return request.get('/enterprise/my-interviews-short/')
}

/**
 * 首页 - 我的沟通
 */
export function getMyComm () {
  return request.get('/enterprise/my-comm/')
}
