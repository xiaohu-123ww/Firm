import { login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    removeUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  },
  getters: {

  },
  actions: {
    async fetchLogin ({ commit }, form) {
      const res = await login(form)
      console.log('res', res)
      if (res.code === 200) {
        commit('setToken', res.data.data)
      } else if (res.code === 1001) {
        removeToken()
      }
    }
  }
}
