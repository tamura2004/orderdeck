import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import state from './state.coffee'

export default new Vuex.Store({
  state: state,
  getters: {
    heroes(state) { return state.heroes },
    count(state) { return state.count }
  },
  mutations: {
    inc(state) { state.count ++ },
    dec(state) { state.count -- }
  }
})

