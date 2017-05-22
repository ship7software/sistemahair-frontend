<template>
  <lte-content-page :loading="loading">
    <section class="content">
      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Agenda</h3> 
          <div class="box-tools pull-right">
            <button @click="add" type="submit" class="btn add-button btn-block btn-success btn-flat">
              <i class="fa fa-plus"></i>
                Adicionar
            </button>    
          </div>            
        </div>      
        <div class="box-body">
          <schedule></schedule>
        </div>       
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
    <modal ref="addModal" :title="addTitle">
      <auto-form ref="autoForm" :configuration="configuration" v-model="novaAgenda" @onSaved="savedItem"  @onLoading="changeLoading"></auto-form>      
      <template slot="footer">
        <button type="button" class="btn btn-default pull-left" @click="saveNew">Fechar</button>
      </template>
    </modal>
  </lte-content-page>
</template>
<script>
import agendaConfig from '../router/crud/agenda.js'

export default {
  name: 'Agenda',
  data: () => {
    return {
      addTitle: 'Nova Agenda',
      novaAgenda: {},
      loading: false,
      configuration: agendaConfig,
      value1: null
    }
  },
  mounted () {

  },
  methods: {
    add () {
      this.$refs.addModal.show()
    },
    saveNew () {

    },
    savedItem () {

    },
    changeLoading (val) {
      this.loading = val
    }
  }
}
</script>
