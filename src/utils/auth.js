// 专门用来操作cookie的方法包
// 内部封装了繁琐的操作方法 参数处理 暴露三个函数 get,set,remove
import Cookies from 'js-cookie'

const TokenKey = 'hr_token'

export function getToken () {
  return sessionStorage.getItem(TokenKey)
}

export function setToken (token) {
  sessionStorage.setItem(TokenKey, token)
  sessionStorage.setItem('TokenInvalidFlag', 0)
}

export function removeToken () {
  sessionStorage.removeItem(TokenKey)
}

export function getTokenInvalidFlag () {
  return sessionStorage.getItem('TokenInvalidFlag')
}

export function setTokenInvalidFlag (tokenInvalidFlag) {
  sessionStorage.setItem('TokenInvalidFlag', tokenInvalidFlag)
}
