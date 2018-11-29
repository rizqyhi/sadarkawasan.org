import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Page from '@/components/Page'
import Loading from '@/components/Loading'

import './styles/app.scss'

Vue.use(BootstrapVue)
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
  store,
  render: h => h(App)
}).$mount('#app')
