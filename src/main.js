// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './stylus/main.styl'
import App from './App'

// import VueFire from 'vuefire'
// Vue.use(VueFire)

// import Firebase from 'firebase'

// let config = {
//   apiKey: "AIzaSyArjuH0N-SAIwgd8DzZN7dvTxsrPIoiQVo",
//   authDomain: "myfirstfirebase-230fb.firebaseapp.com",
//   databaseURL: "https://myfirstfirebase-230fb.firebaseio.com",
//   projectId: "myfirstfirebase-230fb",
//   storageBucket: "myfirstfirebase-230fb.appspot.com",
//   messagingSenderId: "147999552069"
// }

// let app = Firebase.initializeApp(config)
// let db = app.database()




//   firebase.initializeApp(config);



import lodash from 'lodash'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import VueLodash from 'vue-lodash/dist/vue-lodash.min'
Vue.use(VueLodash, lodash)

import VueCarousel from 'vue-carousel'
Vue.use(VueCarousel)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
