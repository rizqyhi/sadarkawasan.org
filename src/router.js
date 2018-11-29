import Vue from 'vue'
import Router from 'vue-router'
import ConservationArea from './views/ConservationArea'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'conservation.map',
      component: ConservationArea
    },
    {
      path: '/kawasan/:id/:slug',
      name: 'conservation.detail',
      component: () => import(/* webpackChunkName: "conservation-are-type-view" */ './views/ConservationAreaDetail')
    },
    {
      path: '/jenis-kawasan',
      name: 'conservation.type',
      component: () => import(/* webpackChunkName: "conservation-are-type-view" */ './views/ConservationAreaType')
    },
    {
      path: '/kampanye',
      name: 'campaign',
      component: () => import(/* webpackChunkName: "campaign-view" */ './views/Campaign')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import(/* webpackChunkName: "blog-view" */ './views/Blog')
    },
    {
      path: '/tentang',
      name: 'about',
      component: () => import(/* webpackChunkName: "about-view" */ './views/About')
    }
  ]
})
