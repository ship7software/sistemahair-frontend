// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import api from './services/api'
import { default as swal } from 'sweetalert2'
import Axios from 'axios'
import userService from './services/user'
import promiseFinally from 'promise.prototype.finally'
import VeeValidate from 'vee-validate'
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)
Vue.use(VeeValidate)
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
    // window.location.reload()
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
  perfilLink: '/perfil',
  tenantLink: '/empresa'
}

import VueNumeric from 'vue-numeric'
import Multiselect from 'vue-multiselect'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI, { locale })

  // register globally
Vue.component('multiselect', Multiselect)
Vue.component('vue-numeric', VueNumeric)

import './components'
import './config'
import router from './router'
import './../node_modules/sweetalert2/dist/sweetalert2.min.css'
import './../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import './assets/index.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
