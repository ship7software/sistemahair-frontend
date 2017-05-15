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
            <lte-ui-alert title="Ops!" type="danger" icon="ban" :message="saveError" v-show="saveError"></lte-ui-alert>
            <template v-for="field in configuration.form.fields">
              <endereco :ref="field.model + 'Field'" v-if="field.type == 'endereco'" v-model="model"></endereco>
              <div v-else class="form-group" :class="{ 'has-error': errors.has(field.model) }">
                <label class="col-sm-3 control-label">{{ field.title }}</label>
                <div class="col-sm-9">
                  <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model.number="model[field.model]" class="form-control" v-if="field.type == 'money'" type="number" :min="field.min || 0" step="any" :name="field.model" />
                  <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else-if="field.type == 'integer'" type="number" :min="field.min || 0" step="1" :name="field.model" />
                  <select :ref="field.model + 'Field'" v-validate="field.validation || {}" class="form-control" v-model="model[field.model]" v-else-if="field.type == 'select' && field.options" :name="field.model">
                    <option v-for="opt in field.options" :value="opt.value">{{ opt.text }}</option>
                  </select>               
                  <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else type="text" :placeholder="field.title" :name="field.model">            
                </div>
              </div>
            </template>
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
import _ from 'lodash'
import api from './../../services/api.js'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

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
      loading: false,
      moneyMask: createNumberMask({
        prefix: 'R$ ',
        thousandsSeparatorSymbol: '.',
        decimalSymbol: ',',
        allowDecimal: true
      })
    }
  },
  methods: {
    onReturn () {
      this.$router.push(this.configuration.route)
    },
    obterEndereco () {
      return {
        cep: this.model.cep,
        logradouro: this.model.logradouro,
        numeroEndereco: this.model.numeroEndereco,
        complemento: this.model.complemento,
        bairro: this.model.bairro,
        cidade: this.model.cidade,
        estado: this.model.estado
      }
    },
    onSave () {
      let $vm = this
      this.$validator.validateAll().then(() => {
        this.saveError = null
        let saveObj = {}

        _.each($vm.configuration.form.fields, (f) => {
          if (!f.disabled) {
            if (f.type === 'endereco') {
              saveObj = Object.assign(saveObj, $vm.obterEndereco())
            } else {
              saveObj[f.model] = $vm.model[f.model]
            }
          }
        })

        if ($vm.model._id) {
          saveObj._id = $vm.model._id
        }

        let message = 'Você salvou o item '
        if ($vm.configuration.descriptionField) {
          message = message + $vm.model[$vm.configuration.descriptionField]
        }

        $vm.$api.save($vm.configuration.apiUrl, saveObj).then(() => {
          $vm.$showMessage('Sucesso', message, 'success').then(() => { $vm.onReturn() })
        }).catch((err) => {
          console.log(err)
          $vm.saveError = 'Verifique se os campos foram preenchidos corretamente'
          window.scrollTo(0, 0)
        })
      }).catch(() => {
        const field = $vm.errors.errors[0].field + 'Field'
        $vm.$refs[field][0].focus()
        this.saveError = 'Verifique se os campos foram preenchidos corretamente'
        window.scrollTo(0, 0)
      })
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
<style>
</style>
