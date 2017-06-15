<template>
  <lte-content-page :loading="loading">
    <section class="content no-padding-if-mobile">
      <div class="box agenda-box">
        <div class="box-header with-border">
          
          <el-date-picker class="dataAgendaPrincipal"
            v-model="dataAgenda"
            type="date"
            :picker-options="dataAgendaOptions"
            :clearable="false"
            :editable="false"
            format="'Comandas:' dd/MM/yyyy">
          </el-date-picker>
          <div class="box-tools pull-right">
            <button type="submit" class="btn add-button btn-block btn-success btn-flat">
              <i class="fa fa-plus"></i>
                Novo
            </button>    
          </div>            
        </div>   
        <div class="box-body no-padding">
          <api-table v-show="total > 0" :filter="filtro" ref="apiTable" url="/comanda" @finish="onLoadFinish" :sort="sort" :config="tableConfig" @reload="load"></api-table>
          <div class="row" style="padding: 10px" v-show="total < 1">
            <div class="col-md-12">
              <lte-ui-alert title="Ops!" type="info" message="Nenhum registro encontrado."></lte-ui-alert>
            </div>
          </div>
        </div>
      </div>
      <!-- /.box -->

    </section>
  </lte-content-page>
</template>
<script>
export default {
  name: 'ListaComanda',
  data: () => {
    return {
      loading: false,
      items: [],
      filtro: {},
      dataAgenda: new Date(),
      dataAgendaOptions: {
        shortcuts: [{
          text: 'Hoje',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: 'Ontem',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: 'Amanhã',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      },
      total: 0,
      limit: 0,
      skip: 0,
      sort: { _id: 1 },
      tableConfig: {
        fields: [
          { model: 'dataAberturaFormatada', header: 'Data' },
          { model: 'nomeCliente', header: 'Cliente' },
          { model: 'precoFinalFormatado', header: 'Preço' },
          { model: 'descricaoStatus', header: 'Status' }
        ],
        canEdit: true,
        canDelete: true,
        hasActivate: false,
        editUrl: '/venda/comanda/',
        otherActions: [
          {
            name: 'faturar', title: 'Faturar', btnClass: 'success', iconClass: 'dollar'
          }
        ]
      }
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.$refs.apiTable.load()
    },
    addFilter (name, val) {
      this.filter = this.filter || { $or: [] }
      var actual = {}
      actual[name] = val

      this.filter.$or.push(actual)
    },
    onLoadFinish (total) {
      let $vm = this
      $vm.$nextTick(() => {
        $vm.total = total
        $vm.loading = false
      })
    }
  }
}
</script>
<style>
  .clear { clear: both; }
</style>
