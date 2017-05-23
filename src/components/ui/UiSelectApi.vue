<template>
  <div :class="{ 'input-group': !short && $cruds[api.replace('/', '')] }">
    <multiselect v-model="model" :showLabels="false" :track-by="optionText" :label="optionText"  :options="options" :searchable="false" :loading="loading" :clearOnSelect="true" :allow-empty="false" :internalSearch="false" placeholder="Selecionar" @input="(val) => { $emit('change', val) }"></multiselect>
    <span class="input-group-btn" v-if="!short && $cruds[api.replace('/', '')]">           
      <button @click="$refs.shortCrud.open()" title="Cadastro novo" type="submit" class="btn btn-add-multiselect btn-primary btn-flat">
        <i class="fa fa-plus"></i>
      </button>
    </span>
    <short-crud ref="shortCrud" v-if="!short && $cruds[api.replace('/', '')]" :configuration="$cruds[api.replace('/', '')]" v-model="model"></short-crud>
  </div>
</template>
<script>
export default {
  name: 'UiSelectApi',
  props: {
    value: [String, Object],
    api: String,
    payload: Object,
    optionValue: { type: String, default: '_id' },
    optionText: { type: String },
    short: { type: Boolean, default: false }
  },
  data: () => {
    return {
      options: [],
      model: {},
      loading: false
    }
  },
  watch: {
    model (newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    },
    value (newValue) {
      this.loadWithId()
    }
  },
  methods: {
    loadOptions (defaultValue) {
      let $vm = this
      $vm.loading = true
      this.$api.getWithPage($vm.api, $vm.payload).then((result) => {
        $vm.options = result.data
        $vm.$nextTick(() => {
          $vm.loading = false
          $vm.model = defaultValue
          $vm.$forceUpdate()
        })
      })
    },
    forceClear () {
      this.model = null
    },
    loadWithId () {
      let $vm = this
      if ($vm.value && typeof $vm.value === 'string') {
        $vm.loading = true
        this.$api.getById($vm.api, $vm.value).then((result) => {
          $vm.loadOptions(result.data)
        })
      } else {
        $vm.loadOptions($vm.value)
      }
    }
  },
  mounted () {
    this.loadWithId()
  }
}
</script>
