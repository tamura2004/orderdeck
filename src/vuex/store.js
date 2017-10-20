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
const rootRef = db.ref('root')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck: [],
    root: {
      count: 0,
      round: 0
    }
  },
  actions: {
    initDeck: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('deck', deckRef, { wait: true })
    }),
    initCount: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('root', rootRef)
    }),
    incCount: firebaseAction(({ state, bindFirebaseRef }) => {
      rootRef.child('count').set(state.root.count + 1)
    }),
    decCount: firebaseAction(({ state, bindFirebaseRef }) => {
      rootRef.child('count').set(state.root.count - 1)
    }),
    incRound: firebaseAction(({ state, bindFirebaseRef }) => {
      rootRef.child('round').set(state.root.round + 1)
    }),
    setDeck: firebaseAction(({ bindFirebaseRef }, deck) => {
      deckRef.set(deck)
    }),
    concatDeck: firebaseAction(({ state, bindFirebaseRef }, deck) => {
      deckRef.set(state.deck.concat(deck))
    })
  },
  mutations: {
    ...firebaseMutations
  }
})

