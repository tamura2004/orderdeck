// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
// import router from './router'

Vue.use(Vuetify)

import lodash from 'lodash'
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
