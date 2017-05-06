import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/Login'
import Inicio from '@/modules/Inicio'
import PageNotFound from '@/modules/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    { path: '*', component: PageNotFound }
  ]
})
