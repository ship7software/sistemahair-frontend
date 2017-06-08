<template>
  <div :class="{ 'input-group': !short && $cruds[api.replace('/', '')] }">
  <el-select v-model="model" :filterable="autocomplete" :remote="autocomplete" :remoteMethod="load" :loading="loading" clearable placeholder="Selecionar" :multiple="multiple">
    <el-option
      v-for="item in options"
      :key="item[optionValue]"
      :label="item[optionText]"
      :value="item[optionValue]">
    </el-option>
  </el-select>
    <span class="input-group-btn" v-if="!short && $cruds[api.replace('/', '')]">           
      <button @click="$refs.shortCrud.open()" title="Cadastro novo" type="submit" class="btn btn-primary btn-flat">
        <i class="fa fa-plus"></i>
      </button>
    </span>
    <short-crud ref="shortCrud" v-if="!short && $cruds[api.replace('/', '')]" :configuration="$cruds[api.replace('/', '')]" v-model="newModel"></short-crud>
  </div>
</template>
<style>
  .input-group .el-select {
    width: 100%
  }
</style>
<script>
import _ from 'lodash'

export default {
  name: 'UiSelectApi',
  props: {
    value: [String, Object, Array],
    api: String,
    payload: Object,
    optionValue: { type: String, default: '_id' },
    optionText: { type: String },
    short: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    autocomplete: { type: Boolean, default: false }
  },
  data: () => {
    return {
      options: [],
      model: this.multiple ? [(this.value || {})[this.optionValue]] : (this.value || {})[this.optionValue],
      loading: false,
      newModel: {},
      doEmit: true
    }
  },
  watch: {
    newModel (newValue) {
      this.options = (this.options || []).concat([newValue])
      this.model = this.multiple ? (this.model || []).concat([newValue[this.optionValue]]) : (this.value || {})[this.optionValue]
    },
    model (newValue) {
      if (this.doEmit) {
        this.$emit('input', newValue)
        this.$emit('change', newValue)
      }
      this.doEmit = true
    },
    value (newValue) {
      this.doEmit = false
      if (typeof newValue === 'string' || Array.isArray(newValue)) {
        this.model = newValue
      } else {
        this.model = newValue[this.optionValue]
      }
    }
  },
  created () {
    let $vm = this
    console.log(this.value)
    this.model = this.multiple ? (this.value || []) : (this.value || {})[this.optionValue]
    this.$api.getWithPage($vm.api, $vm.payload).then((result) => {
      $vm.options = result.data
    })
  },
  methods: {
    forceClear () {
      this.model = null
    },
    getOptionDetail (value) {
      let filter = {}
      filter[this.optionValue] = value
      let results = _.filter(this.options, filter)
      if (results && results.length > 0) {
        return results[0]
      }
      return null
    },
    loadWithId () {
      let $vm = this
      if ($vm.value && typeof $vm.value === 'string') {
        $vm.loading = true
        this.$api.getById($vm.api, $vm.value).then((result) => {
          $vm.model = result.data
        })
      }
    },
    load (text) {
      let $vm = this
      if (text && text.length > 2) {
        $vm.message = 'Nenhum registro encontrado'
        $vm.loading = true
        $vm.payload[$vm.optionText] = { $regex: text, $options: 'i' }
        this.$api.getWithPage($vm.api, $vm.payload).then((result) => {
          $vm.options = result.data
          $vm.$nextTick(() => {
            $vm.loading = false
            $vm.model = $vm.value
          })
        })
      } else {
        $vm.message = 'Digite no mínimo 3 caracteres para buscar'
      }
    }
  },
  mounted () {
    this.loadWithId()
  }
}
</script>
