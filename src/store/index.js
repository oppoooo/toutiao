import Vue from 'vue'
import Vuex from 'vuex'
import { getTonken, setTonken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 声明token
    // user: JSON.parse(localStorage.getItem('HEIMATOKEN')) || {}
    user: getTonken() || {}
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.token = payload
      // token存储在本地
      // localStorage.setItem('HEIMATOKEN', JSON.stringify(payload))
      // storage.set('HEIMATOKEN', payload)
      setTonken(payload)
    }
  },
  actions: {},
  modules: {}
})
