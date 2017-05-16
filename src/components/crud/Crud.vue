<template>
  <lte-content-page :loading="loading">
    <section class="content-header" v-if="false">
      <h1>
        {{ configuration.form.title }}
      </h1>
      <lte-breadcrumb :items="configuration.breadcrumbs"></lte-breadcrumb>
    </section>
    <section class="content">
      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">{{ configuration.form.title }}</h3> 
        </div>      
        <form class="form-horizontal" @submit.prevent.default>
          <div class="box-body">
            <auto-form ref="autoForm" :configuration="configuration" v-model="model" @onSaved="savedItem"  @onLoading="changeLoading"></auto-form>
          </div>
          <div class="box-footer">
            <div class="pull-right">
              <button type="submit" class="btn btn-success" @click="onSave">Gravar</button>
              <button type="button" class="btn btn-default" @click="onReturn">Voltar</button>
            </div>
          </div>          
        </form>
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
  </lte-content-page>
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
    onReturn () {
      this.$router.push(this.configuration.route)
    },
    changeLoading (value) {
      this.loading = value
    },
    savedItem (item) {
      let message = 'Você salvou o item '
      if (this.configuration.descriptionField) {
        message = message + this.model[this.configuration.descriptionField]
      }
      let $vm = this
      this.$showMessage('Sucesso', message, 'success').then(() => { $vm.onReturn() })
    },
    onSave () {
      this.$refs.autoForm.onSave()
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params && to.params.id) {
      api.getById(to.matched[0].props.default.configuration.apiUrl, to.params.id).then((result) => {
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
