const state = {
  memberInfo: {}, // 用户信息
  targetId: '', // 目标ID
  answer: [], // 消息列表
  appkey: 'x18ywvqfxypqc',
  list: {}// 消息列表
}
const mutations = {
  SET_MEMBER (state, memberInfo) {
    state.memberInfo = memberInfo
    // sessionStorage.setItem('memberInfo', JSON.stringify(state.memberInfo))
    // localStorage.setItem('memberInfo', JSON.stringify(state.memberInfo))
  },
  SET_UserId (state, memberInfo) {
    state.list = memberInfo
    // sessionStorage.setItem('list', JSON.stringify(state.list))
  },
  SET_TARGETID (state, targetId) {
    state.targetId = targetId
    // sessionStorage.setItem('targetId', state.targetId)
  },
  SET_ANSWER (state, playload) {
    console.log('playload', playload)
    const say = {
      css: 'left', // css 样式
      txt: playload.content, // 文本内容
      headImg: playload.extra,
      time: playload.time,
      messageName: playload.messageName,
      imageUri: playload.imageUri,
      title: playload.title,
      targetId: playload.targetId

      // phone: playload.phone

      // 头像
    }
    state.answer.push(say)
    window.sessionStorage.setItem('answer', JSON.stringify(state.answer))
  },
  SET_ANSWERS (state, playload) {
    state.answer = playload
  },
  MEMBER (state, playload) {
    state.memberInfo = playload
  },
  UserId (state, playload) {
    state.list = playload
  }
}
export default {
  state,
  mutations

}

