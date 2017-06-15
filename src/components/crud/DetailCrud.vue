<template>
  <div>
    <div class="box-header with-border" style="margin-bottom: 10px;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: 2px #ccc solid;">
      <h5>{{ configuration.title }}</h5>
    </div>
    <lte-ui-alert type="info" message="Nenhum item adicionado" v-show="lista.length === 0"></lte-ui-alert>
    <table class="table table-hover dataTable">
      <thead v-if="lista && lista.length > 0">
        <tr>
          <th v-for="head in configuration.form.fields" :width="head.width">{{ head.title }}</th>
          <th width="100">Ações</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, idx) in lista">
          <auto-form :isTable="true" ref="autoForm" :configuration="configuration" v-model="lista[idx]">
            <td style="float: right">
              <div class="btn-group">
                <button v-if="item.editing" type="button" @click="salvarItemLista(idx)" class="btn btn-success" title="Salvar"><i class="fa fa-save"></i></button>            
                <button v-if="!item.editing" type="button" @click="editarItemLista(idx)" class="btn btn-info" title="Editar"><i class="fa fa-edit"></i></button>
                <button type="button" @click="excluirItemLista(idx)" class="btn btn-danger" title="Excluir"><i class="fa fa-trash"></i></button>
              </div>
            </td>
          </auto-form>          
        </template>
        <tr>
          <td style="padding: 0" colspan="3">
            <button type="button" style="width: 100px; float:right; margin: 5px 8px" @click="adicionarItemLista" class="btn btn-warning btn-block">Adicionar</button>        
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'DetailCrud',
  props: {
    configuration: Object,
    value: Array
  },
  data: () => {
    return {
      lista: this.value || []
    }
  },
  watch: {
    lista (newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    },
    value (newValue) {
      this.lista = newValue || []
    }
  },
  methods: {
    focusListObject (idx, focusName) {
      if (focusName && idx > -1) {
        let $vm = this
        this.$nextTick(() => {
          $vm.$refs[focusName + ($vm.lista.length - 1)][0].focus()
        })
      }
    },
    editarItemLista (idx) {
      let $vm = this
      this.$nextTick(() => {
        $vm.lista[idx].editing = true
      })
      $vm.$forceUpdate()
    },
    salvarItemLista (idx) {
      let $vm = this
      this.$nextTick(() => {
        $vm.lista[idx].editing = false
      })
      $vm.$forceUpdate()
    },
    excluirItemLista (idx) {
      let $vm = this
      this.$nextTick(() => {
        $vm.lista.splice(idx, 1)
      })
      $vm.$forceUpdate()
    },
    adicionarItemLista () {
      let newValue = (this.configuration.default || {})
      newValue.editing = true
      this.lista.push(newValue)
    }
  }
}
</script>
<style>
</style>
