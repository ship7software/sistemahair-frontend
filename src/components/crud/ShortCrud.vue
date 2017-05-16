<template>
  <div class="modal overlay-wrapper" :class="{ 'modalActive': show }">
    <div v-show="loading" class="overlay">
      <i class="fa fa-refresh fa-spin"></i>
    </div>  
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ configuration.form.title }}</h4>
        </div>
        <form class="form-horizontal" @submit.prevent.default>
        <div class="modal-body">
          <lte-ui-alert title="Ops!" type="danger" icon="ban" :message="saveError" v-show="saveError"></lte-ui-alert>
          <template v-for="field in configuration.form.fields" v-if="field.validation && field.validation.indexOf('required') > -1">
            <endereco :ref="field.model + 'Field'" v-if="field.type == 'endereco'" v-model="model"></endereco>
            <div v-else class="form-group" :class="{ 'has-error': errors.has(field.model) }">
              <label class="col-sm-3 control-label">{{ field.title }}</label>
              <div class="col-sm-9">
                <vue-numeric currency="R$" :precision="2" separator="." v-if="field.type == 'money'" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" :min="field.min || 0" :name="field.model" :data-vv-name="field.model"></vue-numeric>
                <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else-if="field.type == 'integer'" type="number" :min="field.min || 0" step="1" :name="field.model" :data-vv-name="field.model" />
                <select :ref="field.model + 'Field'" v-validate="field.validation || {}" class="form-control" v-model="model[field.model]" v-else-if="field.type == 'select' && field.options" :name="field.model" :data-vv-name="field.model">
                  <option v-for="opt in field.options" :value="opt.value">{{ opt.text }}</option>
                </select>
                <ui-select-api :ref="field.model + 'Field'" v-validate="field.validation || {}" class="form-control" v-model="model[field.model]" v-else-if="field.type == 'select' && field.api" :name="field.model" :data-vv-name="field.model" :api="field.api" :payload="field.payload" :optionValue="field.optionValue" :optionText="field.optionText"></ui-select-api>                
                <the-mask class="form-control" v-else-if="field.type === 'telefone'" :mask="['(##) ####-####', '(##) #####-####']" type="tel" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]">
                </the-mask>             
                <the-mask class="form-control" v-else-if="field.type === 'cpfCnpj'" :mask="['###.###.###-##', '##.###.###/####-##']" type="tel" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]">
                </the-mask>
                <the-mask class="form-control" v-else-if="field.mask" :mask="field.mask" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" :type="field.inputType || 'text'">
                </the-mask>                       
                <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else-if="field.type === 'date'" type="date" :placeholder="field.title" :name="field.model" :data-vv-name="field.model">                          
                <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else type="text" :placeholder="field.title" :name="field.model" :data-vv-name="field.model">            
              </div>
            </div>
          </template>   
        </div>
        <div class="modal-footer">
          <div class="pull-right">
            <button type="submit" class="btn btn-success" @click="onSave">Gravar</button>
            <button type="button" class="btn btn-default" @click="onReturn">Voltar</button>
          </div>
        </div>
        </form>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>
<script>
import _ from 'lodash'
import api from './../../services/api.js'

export default {
  name: 'ShortCrud',
  props: {
    configuration: Object,
    value: Object
  },
  data () {
    return {
      model: {},
      options: {},
      saveError: null,
      loading: false,
      show: false
    }
  },
  created () {
    for (var i = 0; i < this.configuration.form.fields.length; i++) {
      if (this.configuration.form.fields[i].type === 'money' && !this.model[this.configuration.form.fields[i].model]) {
        this.model[this.configuration.form.fields[i].model] = ''
      }
    }
  },
  methods: {
    open () {
      this.show = true
    },
    close () {
      this.show = false
    },
    onReturn () {
      this.close()
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

        $vm.$api.save($vm.configuration.apiUrl, saveObj).then((ret) => {
          $vm.$emit('input', ret.data)
          $vm.$emit('change', ret.data)
          $vm.$emit('onSave', ret.data)
          $vm.onReturn()
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
.modalActive {
  display: block
}
</style>
