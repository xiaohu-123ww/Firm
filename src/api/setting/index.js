import request from '@/utils/request'

/**
 * 人才推荐 以上线的岗位
 * @returns
 */
export function getEnterprise () {
  return request.get('/enterprise/enterprise-position/v1.0.1/')
}
