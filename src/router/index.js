import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/Login'
import Inicio from '@/modules/Inicio'
import PageNotFound from '@/modules/404'
import userService from './../services/user'

Vue.use(Router)
let router = new Router({
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

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !userService.isAuthenticated()) {
    next('/login?to=' + to.path)
  } else {
    next()
  }
})

export default router
