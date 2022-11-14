import request from '@/utils/request'

/**
 * 人才推荐 以上线的岗位
 * @returns
 */
export function getEnterprise () {
  return request.get('/enterprise/enterprise-position/v1.0.1/')
}

// /enterprise/cv-recommend/v1.0.1/

/**
 * 人才推荐列表
 * @returns
 */
export function getCvRecommend (id) {
  return request.get('/enterprise/cv-recommend/v1.0.1/', {
    params: {
      id
    }
  })
}

/**
 * 打招呼
 */

export function getInterests (user_id, position_id) {
  return request.post(`/enterprise/interests/${user_id}/${position_id}/`)
}
