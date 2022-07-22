import Vue from 'vue'
import Vuex from 'vuex'
import { getTonken, setTonken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 声明token
    // user: JSON.parse(localStorage.getItem('HEIMATOKEN')) || {}
    user: getTonken() || {},
    // historyRecord: JSON.parse(localStorage.getItem('heimaHistory'))
    historyRecord: JSON.parse(localStorage.getItem('History')) || []
    // articleId: JSON.parse(localStorage.getItem('articleId'))
  },

  getters: {},
  mutations: {
    setUser (state, payload) {
      state.user = payload
      // token存储在本地
      // localStorage.setItem('HEIMATOKEN', JSON.stringify(payload))
      // storage.set('HEIMATOKEN', payload)
      setTonken(payload)
    },
    history (state, payload) {
      state.historyRecord = payload
      localStorage.setItem('History', JSON.stringify(payload))
      // setHistory(payload)
    }
    // articleId (state, payload) {
    //   state.articleId = payload
    //   localStorage.setItem('articleId', JSON.stringify(payload))
    // }
  },
  actions: {},
  modules: {}
})
