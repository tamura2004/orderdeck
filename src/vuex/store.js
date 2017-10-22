import Vuex from 'vuex'
import Vue from 'vue'
import * as firebase from 'firebase';
import { firebaseMutations, firebaseAction } from 'vuexfire';

const config = {
  apiKey: "AIzaSyArjuH0N-SAIwgd8DzZN7dvTxsrPIoiQVo",
  authDomain: "myfirstfirebase-230fb.firebaseapp.com",
  databaseURL: "https://myfirstfirebase-230fb.firebaseio.com",
  projectId: "myfirstfirebase-230fb",
  storageBucket: "myfirstfirebase-230fb.appspot.com",
  messagingSenderId: "147999552069"
}
const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()
const deckRef = db.ref('deck')
const countRef = db.ref('count')
const roundRef = db.ref('round')

Vue.use(Vuex)

const myPlugin = store => store.dispatch('initAll')

export default new Vuex.Store({
  state: {
    deck: [],
    count: 0,
    round: 0
  },
  actions: {
    // initialize block
    initAll ({ dispatch }) {
      dispatch("initCount")
      dispatch("initRound")
      dispatch("initDeck")
    },
    initCount ({ commit }) {
      countRef.on("value", function(snapshot) {
        commit("setCount", snapshot.val())
      })
    },
    initRound ({ commit }) {
      roundRef.on("value", function(snapshot) {
        commit("setRound", snapshot.val())
      })
    },
    initDeck ({ commit }) {
      deckRef.on("value", function(snapshot) {
        commit("setDeck", snapshot.val())
      })
    },
    
    setCount (context, payload) {
      countRef.set(payload)
    },
    setRound (context, payload) {
      roundRef.set(payload)
    },
    setDeck (context, payload) {
      deckRef.set(payload)
    }
  },
  mutations: {
    setCount (state, value) {
      state.count = value
    },
    setRound (state, value) {
      state.round = value
    },
    setDeck (state, value) {
      state.deck = value
    }
  },
  plugins: [myPlugin]
})

