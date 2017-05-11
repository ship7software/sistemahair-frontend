// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './services/api'
import { default as swal } from 'sweetalert2'
import Axios from 'axios'
import userService from './services/user'
import promiseFinally from 'promise.prototype.finally'

/* Promise */
promiseFinally.shim()

Vue.prototype.$api = api
Vue.prototype.$http = Axios
Vue.prototype.$showMessage = swal

Axios.defaults.baseURL = process.env.API_URL
Axios.interceptors.request.use((config) => {
  if (config.url.indexOf('auth') === -1 && config.url.indexOf('publico') === -1) {
    config.headers.Authorization = 'Bearer ' + userService.getUserAccessData()
  }
  return config
})

Axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401 && error.response.request.responseURL.indexOf('auth') === -1) {
    window.location.href = '/login'
    window.location.reload()
  }
  return Promise.reject(error)
})

Vue.config.productionTip = false
Vue.prototype.$user = {}
Vue.prototype.$user.logout = userService.logout
Vue.prototype.$user.perfil = userService.getPerfil
Vue.prototype.$user.fields = {
  name: 'nome',
  tenant: 'empresaId',
  tenantName: 'nome',
  perfilLink: '/usuario/perfil',
  tenantLink: '/usuario/empresa'
}

import './components'
import './config'
import './../node_modules/sweetalert2/dist/sweetalert2.min.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
