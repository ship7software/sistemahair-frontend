<template>
  <form-page ref="formPage" :loading="loading" @onSave="onSave" title="Comanda" returnRoute="/venda/comanda">
    <div class="form-group">
      <label class="col-sm-3 control-label">Data</label>
      <div class="col-sm-9">
        <el-date-picker @focus.native="$event.target.select()" v-model="model.dataAbertura" 
          type="date" name="dataAbertura" format="dd/MM/yyyy">
        </el-date-picker>
      </div>
    </div>  
    <div class="form-group">
      <label class="col-sm-3 control-label">Cliente</label>
      <div class="col-sm-9">
        <ui-select-api v-model="model.clienteId" name="clienteId" api="/cliente" :payload="{ ativo: true }" optionValue="_id" optionText="nome"></ui-select-api>
      </div>
    </div> 
    <detail-crud :configuration="servicosDetail" v-model="model.servicos" name="servicos"></detail-crud> 
  </form-page>
</template>
<script>
export default {
  name: 'ComandaCrud',
  props: {
  },
  data: () => {
    return {
      model: {
        dataAbertura: new Date()
      },
      loading: false,
      servicosDetail: {
        title: 'Serviços',
        model: 'servicos',
        type: 'detail',
        default: {
          preco: 0
        },
        form: {
          fields: [
            {
              title: 'Serviço',
              model: 'servicoId',
              type: 'select',
              api: '/servico',
              optionValue: '_id',
              optionText: 'descricao',
              payload: {
                sort: {
                  descricao: 1
                },
                ativo: true
              },
              validation: 'required'
            },
            {
              title: 'Profissional',
              model: 'profissionalId',
              type: 'select',
              api: '/servico',
              optionValue: '_id',
              optionText: 'descricao',
              payload: {
                sort: {
                  descricao: 1
                },
                ativo: true
              },
              validation: 'required'
            },
            { title: 'Preço', model: 'preco', type: 'money', min: 0, width: '150' }
          ]
        }
      }
    }
  },
  methods: {
    onSave () {

    }
  }
}
</script>
