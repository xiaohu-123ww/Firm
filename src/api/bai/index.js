import request from '@/utils/request'

/**
 * 城市
 * @returns
 */
export function getCity () {
  return request.get('/user/adcode/v1.0.1/')
}
