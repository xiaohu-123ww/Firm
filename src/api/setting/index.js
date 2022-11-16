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

/**
 * 简历详情
 */
export function getResume (uid, pid) {
  return request.get('/user/cv-self-information/v1.0.0/', {
    params: {
      uid, pid
    }
  })
}

/**
 * 求职意向
 */
export function getJob () {
  return request.get('/user/cv-career-objective/v1.0.0/31/')
}

/**
 * 个人优势
 */
export function getLike () {
  return request.get('/user/cv-self-evaluation/v1.0.0/31/')
}

/**
 * 工作经历
 */
export function getwork () {
  return request.get('/user/cv-job-experiences/v1.0.0/31/')
}

/**
 * 教育jin'l
 */
