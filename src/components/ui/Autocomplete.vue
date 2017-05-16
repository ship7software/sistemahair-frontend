<template>
  <input type="text" class="form-control" v-model="text">
</template>
<script>
import ItemTemplate from './AutoCompleteItem'
export default {
  name: 'Autocomplete',
  props: {
    value: [String, Object],
    api: String,
    payload: Object,
    labelField: String,
    filterField: String
  },
  data: () => {
    return {
      items: [],
      text: '',
      model: this.value,
      template: ItemTemplate
    }
  },
  watch: {
    model (newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
  },
  methods: {
    getLabel (item) {
      return item[this.labelField]
    },
    updateItems (text) {
      this.payload[this.filterField] = { $regex: text.toUpperCase() }
      let $vm = this
      this.$api.getWithPage(this.api, this.payload).then((ret) => {
        $vm.items = ret.data
      })
    }
  }
}
</script>
