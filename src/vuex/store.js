import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck: [],
    count: 0,
    round: 0
  },
  actions: {
    setDeck({commit}, deck) {
      commit('setDeck', deck)
    },
    concatDeck({commit}, deck){
      commit('concatDeck', deck)
    }
  },
  mutations: {
    inc(state) { state.count ++ },
    dec(state) { state.count -- },
    incRound(state) { state.round ++ },
    initRound(state) { state.round = 0 },
    initDeck(state) { state.deck = [] },
    setDeck(state,deck) { state.deck = deck },
    concatDeck(state,deck) { state.deck = state.deck.concat(deck) }
  }
})

