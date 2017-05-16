<template>
  <select class="form-control" v-model="model">
    <option value="">Selecionar</option>
    <option v-for="opt in options" :value="opt[optionValue]">{{ opt[optionText] }}</option>
  </select>   
</template>
<script>
export default {
  name: 'UiSelectApi',
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
      model: this.value
    }
  },
  watch: {
    model (newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
  },
  created () {
    let $vm = this
    this.$api.getWithPage($vm.api, $vm.payload).then((result) => {
      $vm.options = result.data
      $vm.$nextTick(() => {
        $vm.model = $vm.value
        $vm.$forceUpdate()
      })
    })
  }
}
</script>
