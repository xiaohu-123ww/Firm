import request from '@/utils/request'

export function getFirm (qw) {
  return request.get('/enterprise/search-name/', {
    params: {
      qw
    }
  })
}
