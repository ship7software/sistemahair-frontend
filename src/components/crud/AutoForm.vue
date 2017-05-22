<template>
  <div v-if="!isTable"> 
    <lte-ui-alert title="Ops!" type="danger" icon="ban" :message="saveError" v-show="saveError"></lte-ui-alert>
    <template v-for="field in configuration.form.fields" v-if="!short || (field.validation && field.validation.indexOf('required') > -1)">
      <endereco :ref="field.model + 'Field'" v-if="field.type == 'endereco'" v-model="model"></endereco>
      <detail-crud v-else-if="field.type === 'detail'" :configuration="field" v-model="model[field.model]" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model"></detail-crud>          
      <div v-else class="form-group" :class="{ 'has-error': errors.has(field.model) }">
        <label class="col-sm-3 control-label">{{ field.title }}</label>
        <div class="col-sm-9">
          <vue-numeric currency="R$" :precision="2" separator="." v-if="field.type == 'money'" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" :min="field.min || 0" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model"></vue-numeric>
          <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else-if="field.type == 'integer'" type="number" :min="field.min || 0" step="1" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model" />
          <el-select :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" v-else-if="field.type == 'select' && field.options" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model">
            <el-option
              v-for="item in field.options"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
          <ui-select-api :short="short" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" v-else-if="field.type == 'select' && field.api" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model" :api="field.api" :payload="field.payload" :optionValue="field.optionValue" :optionText="field.optionText"></ui-select-api>    
          <autocomplete :short="short" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" v-else-if="field.type == 'autocomplete'" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model" :api="field.api" :payload="field.payload" :optionValue="field.optionValue" :optionText="field.optionText" :key="field.model"></autocomplete>                        
          <the-mask class="form-control" v-else-if="field.type === 'telefone'" :mask="['(##) ####-####', '(##) #####-####']" :data-vv-scope="scope" :data-vv-name="field.model" type="tel" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]">
          </the-mask>             
          <the-mask class="form-control" v-else-if="field.type === 'cpfCnpj'" :mask="['###.###.###-##', '##.###.###/####-##']" :data-vv-scope="scope" :data-vv-name="field.model" type="tel" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]">
          </the-mask>
          <the-mask class="form-control" v-else-if="field.mask" :mask="field.mask" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" :type="field.inputType || 'text'">
          </the-mask>                       
          <el-date-picker :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" 
            type="date" v-else-if="field.type === 'date'" :placeholder="field.title" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model" format="dd/MM/yyyy">
          </el-date-picker>                           
          <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else type="text" :placeholder="field.title" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model">            
        </div>
      </div>
    </template>
  </div>
  <tr v-else>
    <td v-for="field in configuration.form.fields">
      <div v-show="!model.editing">
        {{ getTextTableForm(field, model[field.model]) }}
      </div>
      <div v-show="model.editing">
        <vue-numeric currency="R$" :precision="2" separator="." v-if="field.type == 'money'" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" :min="field.min || 0" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model"></vue-numeric>
        <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else-if="field.type == 'integer'" type="number" :min="field.min || 0" step="1" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model" />
        <el-select :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" v-else-if="field.type == 'select' && field.options" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model">
          <el-option
            v-for="item in field.options"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
        <ui-select-api :short="short" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" v-else-if="field.type == 'select' && field.api" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model" :api="field.api" :payload="field.payload" :optionValue="field.optionValue" :optionText="field.optionText"></ui-select-api>    
        <autocomplete :short="short" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" v-else-if="field.type == 'autocomplete'" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model" :api="field.api" :payload="field.payload" :optionValue="field.optionValue" :optionText="field.optionText"></autocomplete>                        
        <the-mask class="form-control" v-else-if="field.type === 'telefone'" :mask="['(##) ####-####', '(##) #####-####']" :data-vv-scope="scope" :data-vv-name="field.model" type="tel" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]">
        </the-mask>             
        <the-mask class="form-control" v-else-if="field.type === 'cpfCnpj'" :mask="['###.###.###-##', '##.###.###/####-##']" :data-vv-scope="scope" :data-vv-name="field.model" type="tel" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]">
        </the-mask>
        <the-mask class="form-control" v-else-if="field.mask" :mask="field.mask" :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" :type="field.inputType || 'text'">
        </the-mask>                  
        <el-date-picker :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" 
          type="date" v-else-if="field.type === 'date'" :placeholder="field.title" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model" format="dd/MM/yyyy">
        </el-date-picker>              
        <input :ref="field.model + 'Field'" v-validate="field.validation || {}" v-model="model[field.model]" class="form-control" v-else type="text" :placeholder="field.title" :name="field.model" :data-vv-scope="scope" :data-vv-name="field.model">         
      </div>          
    </td>
    <slot></slot>
  </tr>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'AutoForm',
  props: {
    configuration: Object,
    value: Object,
    short: { type: Boolean, default: false },
    isTable: { type: Boolean, default: false },
    scope: String
  },
  data () {
    return {
      model: this.value || {},
      options: {},
      saveError: null,
      loading: false
    }
  },
  watch: {
    model (newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    },
    value (newValue) {
      this.model = newValue
    }
  },
  created () {
    for (var i = 0; i < this.configuration.form.fields.length; i++) {
      if (this.configuration.form.fields[i].type === 'money' && !this.model[this.configuration.form.fields[i].model]) {
        this.model[this.configuration.form.fields[i].model] = ''
      }
    }
  },
  mounted () {
    this.$nextTick(($vm) => {
      this.model = this.value || {}
    })
  },
  methods: {
    getTextTableForm (field, value) {
      if (field.type === 'autocomplete' && field.optionText && value) {
        return value[field.optionText]
      }
      return value
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
    validate () {
      return this.$validator.validateAll(this.scope)
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
              if (((f.type === 'select' && f.api) || (f.type === 'autocomplete')) && $vm.model[f.model]) {
                saveObj[f.model] = $vm.model[f.model]._id
              } else {
                saveObj[f.model] = $vm.model[f.model]
              }
            }
          }
        })

        if ($vm.model._id) {
          saveObj._id = $vm.model._id
        }

        this.$emit('onLoading', true)
        $vm.$api.save($vm.configuration.apiUrl, saveObj).then((ret) => {
          if (!ret.data._id) {
            this.$emit('input', $vm.model)
            this.$emit('change', $vm.model)
            this.$emit('onSaved', $vm.model)
          } else {
            this.$emit('input', ret.data)
            this.$emit('change', ret.data)
            this.$emit('onSaved', ret.data)
          }
          this.$emit('onLoading', false)
        }).catch((err) => {
          console.log(err)
          this.$emit('onLoading', false)
          this.saveError = 'Verifique se os campos foram preenchidos corretamente'
          window.scrollTo(0, 0)
        })
      }).catch(() => {
        const field = $vm.errors.errors[0].field + 'Field'
        $vm.$refs[field][0].focus()
        this.saveError = 'Verifique se os campos foram preenchidos corretamente'
        window.scrollTo(0, 0)
      })
    }
  }
}
</script>
