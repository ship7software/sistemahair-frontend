<template>
  <multiselect v-model="model" :showLabels="false" :track-by="optionValue" :label="optionText" :options="options" :searchable="true" :allow-empty="true" :internalSearch="false" @search-change="load" :loading="loading" :block-keys="['Tab', 'Enter']" placeholder="Digite para buscar">
    <span slot="noResult">{{ message }}.</span>
  </multiselect>
</template>
<script>
export default {
  name: 'Autocomplete',
  props: {
    value: [String, Object],
    api: String,
    payload: Object,
    optionValue: { type: String, default: '_id' },
    optionText: { type: String }
  },
  data: () => {
    return {
      options: [],
      model: [],
      loading: false,
      message: 'Nenhum registro encontrado'
    }
  },
  watch: {
    model (newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
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
    }
  }
}
</script>
