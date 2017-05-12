import Vue from 'vue'
import qs from 'qs'

var generic = new Vue({
  methods: {
    getAll (url) {
      return this.$http.get(url)
    },
    getById (url, id) {
      return this.$http.get(url + '/' + id)
    },
    getWithPage (url, params) {
      return this.$http.get(url + '?' + qs.stringify(params))
    },
    save (url, obj) {
      if (obj._id) {
        const id = obj._id
        delete obj._id
        return this.$http.put(url + '/' + id, obj)
      } else {
        return this.$http.post(url, obj)
      }
    },
    delete (url, id) {
      return this.$http.delete(url + '/' + id)
    },
    postAction (url, id) {
      return this.$http.post(url + '/' + id)
    }
  }
})

export default generic
