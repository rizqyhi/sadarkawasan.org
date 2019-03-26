import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Page from '@/components/Page'
import Loading from '@/components/Loading'

import './styles/app.scss'

import Layout from 'bootstrap-vue/es/components/layout'
import Modal from 'bootstrap-vue/es/components/modal'
import Nav from 'bootstrap-vue/es/components/nav'
import Dropdown from 'bootstrap-vue/es/components/dropdown'
Vue.use(Layout)
Vue.use(Modal)
Vue.use(Nav)
Vue.use(Dropdown)

Vue.use(VueAnalytics, {
  id: 'UA-100268600-1',
  router,
  autoTracking: {
    screenview: true
  },
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})
Vue.config.productionTip = false

Vue.component('page', Page)
Vue.component('loading', Loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
