// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './stylus/main.styl'
import App from './App'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
Vue.use(VueLodash, lodash)

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './vuex/store.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  // router,
  template: '<App/>',
  components: { App }
})
