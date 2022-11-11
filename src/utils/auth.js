// 专门用来操作cookie的方法包
// 内部封装了繁琐的操作方法 参数处理 暴露三个函数 get,set,remove
import Cookies from 'js-cookie'

const TokenKey = 'hr_token'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  localStorage.removeItem(TokenKey)
}
