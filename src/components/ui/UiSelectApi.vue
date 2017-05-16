<template>
  <div class="input-group">
    <multiselect v-model="model" :showLabels="false" :track-by="optionText" :label="optionText"  :options="options" :searchable="false" :clearOnSelect="false" :allow-empty="false" :internalSearch="false" placeholder="Selecionar"></multiselect>
    <span class="input-group-btn" v-if="$cruds[api.replace('/', '')]">           
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
      model: {}
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
      console.log(defaultValue)
      let $vm = this
      this.$api.getWithPage($vm.api, $vm.payload).then((result) => {
        $vm.options = result.data
        $vm.$nextTick(() => {
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
<style>
  .multiselect__tags {
    border-radius: 0 !important
  }

  .btn-add-multiselect {
    padding-top: 9px !important;
    padding-bottom: 8px !important
  }
</style>
