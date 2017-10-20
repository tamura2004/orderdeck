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

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck: [],
    count: 0,
    round: 0
  },
  actions: {
    initCount ({ commit }) {
      countRef.on("value", function(snapshot) {
        commit("setCount", snapshot.val())
      })
      countRef.set(10)
    },
    incCount ({commit, state}) {
      countRef.set(state.count + 1)
    }
  },
  mutations: {
    setCount (state, value) {
      state.count = value
    }
  }
})

