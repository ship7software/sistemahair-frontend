<template>
  <div :class="{ 'input-group': !short && $cruds[api.replace('/', '')] }">
  <el-select v-model="model" :disabled="disabled" filterable remote clearable placeholder="Digite para buscar" :remoteMethod="load" :loading="loading">
    <el-option
      v-for="item in options"
      :key="item[optionValue]"
      :label="item[optionText]"
      :value="item">
    </el-option>
  </el-select>
      <span class="input-group-btn" v-if="!short && $cruds[api.replace('/', '')]">           
        <button @click="$refs.shortCrud.open()" title="Cadastro novo" :disabled="disabled" type="submit" class="btn btn-primary btn-flat">
          <i class="fa fa-plus"></i>
        </button>
      </span>
      <short-crud ref="shortCrud" v-if="!short && $cruds[api.replace('/', '')]" :configuration="$cruds[api.replace('/', '')]" v-model="model"></short-crud>
    </div>
</template>
<style>
  .input-group .el-select {
    width: 100%
  }
</style>
<script>
export default {
  name: 'Autocomplete',
  props: {
    value: [String, Object],
    api: String,
    payload: Object,
    optionValue: { type: String, default: '_id' },
    optionText: { type: String },
    short: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data: () => {
    return {
      options: [],
      model: this.value || {},
      loading: false,
      message: 'Nenhum registro encontrado'
    }
  },
  watch: {
    model (newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    },
    value (newValue) {
      let $vm = this
      $vm.$nextTick(() => {
        $vm.model = newValue
      })
      $vm.$forceUpdate()
    }
  },
  created () {
    this.model = this.value
  },
  methods: {
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
    },
    forceClear () {
      this.model = null
    }
  }
}
</script>
<style>
.multiselect--disabled {
  background: none !important
}
</style>
