import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/dashboard.vue'
import Esg from '../components/esg.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/esg',
      name: 'Esg',
      component: Esg
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router
  