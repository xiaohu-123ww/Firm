import request from '@/utils/request'

/**
 *人才搜索
 * @returns
 */
export function getRetrivel (limit, data) {
  return request({
    url: '/enterprise/candidate-retrivel/',
    method: 'post',
    params: { limit: limit },
    data: data // data就是body参数
  })
}

/**
 *人才搜索分页
 * @returns
 */
export function getRetrivelList (limit, offset, data) {
  return request({
    url: '/enterprise/candidate-retrivel/',
    method: 'post',
    params: { limit: limit, offset: offset },
    data: data // data就是body参数
  })
}

/**
 * 快捷搜索
 */

export function getCandidate (id, limit, offset) {
  return request.get(`/enterprise/candidate-retrivel/${id}/`, {
    params: {
      limit, offset
    }
  })
}
