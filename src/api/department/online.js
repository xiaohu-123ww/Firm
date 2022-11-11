import request from '@/utils/request'

/**
 * 在线职位 (0, "未通过"),(1, "审核中"),(2, "在线中"),(3, "未上线"),
 * @param {*} status
 * @returns
 */
export function getOnline (status, limit, offset) {
  return request.get('/enterprise/position-select/v1.0.1/', {
    params: {
      status,
      limit, offset
    }
  })
}

/**
 * 职位中心搜索
 * @param {*} status
 * @param {*} limit
 * @param {*} offset
 * @returns
 */
export function getfullnameCity (status, limit, offset, fullname_city) {
  return request.get('/enterprise/position-select/v1.0.1/', {
    params: {
      status,
      limit, offset,
      fullname_city
    }
  })
}
/**
 * 职位刷新
 * @param {*} id
 * @returns
 */
export function getPostPosition (id) {
  return request.get('/enterprise/post-position/v1.0.1/', {
    params: {
      id
    }
  })
}
/**
 * 职位下线
 * @param {*} data
 * @returns
 */
export function getTapeOut (data) {
  return request.put('/enterprise/post-position/v1.0.1/', data)
}

/**
 * 职位复制
 * @param {*} id
 * @returns
 */
export function getPositionCopy (id) {
  return request.get('/enterprise/position-copy/v1.0.1/', {
    params: {
      id
    }
  })
}

/**
 * 职位上线
 * @param {*} data
 * @returns
 */
export function getTopThread (data) {
  return request.post('/enterprise/post-position/v1.0.1/', data)
}
/**
 * 删除职位
 */
export function getJobDelete (id) {
  return request.delete(`/enterprise/position-make/v1.0.1/`, {
    params: {
      id
    }
  })
}

/**
 * 职位详情
 * @param {*} id
 * @returns
 */
export function getDetail (id) {
  return request.get('/enterprise/position-detail/v1.0.1/', {
    params: {
      id
    }
  })
}

/**
 * 发布职位   岗位分类
 */

export function getShowClass () {
  return request.get('/enterprise/show-pst-class/v1.0.1/')
}
/**
 * 行业领域列表
 * @returns
 */
export function getIndustryField () {
  return request.get('/enterprise/show-field/v1.0.1/')
}
/**
 * 其他要求
 * @returns
 */
export function getRequirement () {
  return request.get('/user/condition-lists/')
}
/**
 *职位关键字
 */

export function getJobkeywords () {
  return request.get('/enterprise/show-jobkeywords/v1.0.1/')
}
/**
 * 职位福利
 */
export function getwelfare () {
  return request.get('/enterprise/show-tag/v1.0.1/')
}
/**
 * 证书
 * @param {*} id
 * @returns
 */
export function getCertList () {
  return request.get(`/user/cert-list/`)
}
/**
 * 发布职位
 */
export function getPositionMake (data) {
  return request.post(`/enterprise/position-make/v1.0.1/`, data)
}

/**
 *修改职位查询
 */
export function getPositionMakeAmend (id) {
  return request.get(`/enterprise/position-make/v1.0.1/`, {
    params: {
      id
    }
  })
}

/**
 * 修改职位
 *
 */
export function getMake (data) {
  return request.put('/enterprise/position-make/v1.0.1/', data)
}
