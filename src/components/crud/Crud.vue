<template>
  <form-page ref="formPage" :loading="loading" @onSave="onSave" :title="configuration.form.title" :breadcrumbs="configuration.breadcrumbs" :returnRoute="configuration.route">
    <auto-form ref="autoForm" :configuration="configuration" v-model="model" @onSaved="savedItem"  @onLoading="changeLoading"></auto-form>  
  </form-page>
</template>
<script>
import api from './../../services/api.js'

export default {
  name: 'Crud',
  props: {
    configuration: Object
  },
  data () {
    return {
      model: {},
      options: {},
      saveError: null,
      loading: false
    }
  },
  methods: {
    changeLoading (value) {
      this.loading = value
    },
    savedItem (item) {
      let message = this.configuration.form.successMessage || 'Você salvou o item '
      if (!this.configuration.form.successMessage && this.configuration.descriptionField) {
        message = message + this.model[this.configuration.descriptionField]
      }
      let $vm = this
      this.$showMessage('Sucesso', message, 'success').then(() => { $vm.$refs.formPage.onReturn() })
    },
    onSave () {
      this.$refs.autoForm.onSave()
    }
  },
  beforeRouteEnter (to, from, next) {
    if ((to.params && to.params.id) || (to.matched[0].props.default.objectId)) {
      api.getById(to.matched[0].props.default.configuration.apiUrl, (to.params.id || to.matched[0].props.default.objectId)).then((result) => {
        next($vm2 => {
          $vm2.model = result.data
        })
      }).catch(() => next())
    } else {
      next()
    }
  }
}
</script>
