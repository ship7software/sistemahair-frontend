import Vue from 'vue'
import cookies from 'cookiesjs'

const user = new Vue({
  data: () => ({
    token: null,
    data: null
  }),
  methods: {
    auth (obj, cb) {
      const $vm = this
      return this.$http.post('/usuario/auth', obj).then(response => {
        if (response.data && response.data.token) {
          const encodedCookie = btoa(response.data.token)
          const encodedUserData = btoa(JSON.stringify(response.data.user))

          cookies({sistemaHairUserToken: encodedCookie, sistemaHairUserData: encodedUserData})
          $vm.token = response.data.token
          $vm.data = response.data.user
        }
        cb(null, response.data)
      }).catch(err => {
        cb(err.response)
      })
    },
    getDecodedCookie () {
      const cookie = cookies('sistemaHairUserToken')
      const decodedCookie = cookie && atob(cookie)

      return decodedCookie
    },
    getDecodedData () {
      const cookie = cookies('sistemaHairUserData')
      const decodedCookie = cookie && atob(cookie)

      return JSON.parse(decodedCookie)
    },
    getUserAccessData () {
      return this.token || this.getDecodedCookie()
    },
    isAuthenticated () {
      const userData = this.getUserAccessData()

      return Boolean(userData)
    },

    getPerfil () {
      return this.data || this.getDecodedData()
    },

    deleteCookie () {
      cookies({sistemaHairUserToken: null, sistemaHairUserData: null})
      this.token = null
      this.data = null
    },
    logout (next) {
      this.deleteCookie()
      next()
    }
  }
})

export default user
