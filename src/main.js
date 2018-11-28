import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Page from '@/components/Page'
import Loading from '@/components/Loading'

import './styles/app.scss'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('page', Page)
Vue.component('loading', Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
