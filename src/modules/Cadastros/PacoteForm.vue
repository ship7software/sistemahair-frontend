<template>
  <form-page title="Cadastro de Pacotes" returnRoute="/pacote" :loading="loading" @onSave="save">
    <div class="form-group" :class="{ 'has-error': errors.has('descricao') }">
      <label class="col-sm-3 control-label">Descrição</label>
      <div class="col-sm-9">
        <input ref="descricao" v-validate="'required'" v-model="model.descricao" class="form-control" type="text" placeholder="Descrição" name="descricao" data-vv-name="descricao">      
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('dataInicio') }">
      <label class="col-sm-3 control-label">Data Início</label>
      <div class="col-sm-9">
        <input ref="dataInicio" v-validate="'required|date'" v-model="model.dataInicio" class="form-control" type="date" placeholder="Data Início" name="dataInicio" data-vv-name="dataInicio">
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('dataFim') }">
      <label class="col-sm-3 control-label">Data Fim</label>
      <div class="col-sm-9">
        <input ref="dataFim" v-validate="'date'" v-model="model.dataFim" class="form-control" type="date" placeholder="Data Fim" name="dataFim" data-vv-name="dataFim">
      </div>
    </div>     
    <div class="form-group" :class="{ 'has-error': errors.has('dataFim') }">
      <label class="col-sm-3 control-label">Preço</label>
      <div class="col-sm-9">
        <vue-numeric currency="R$" :precision="2" separator="." ref="preco" v-validate="'required'" class="form-control" :min="0" name="preco" data-vv-name="preco" v-model="model.preco"></vue-numeric>       
      </div>
    </div>
    <div class="box-header with-border"><h5>Produtos</h5></div>
    <button style="margin-bottom: 10px" type="button" @click="adicionarItemLista('produtos', 'quantidadeProduto_')" class="btn btn-success btn-block">Adicionar</button>
    <lte-ui-alert type="info" message="Nenhum produto adicionado" v-show="produtos.length === 0"></lte-ui-alert>
    <table class="table table-bordered table-hover dataTable" v-if="produtos && produtos.length > 0">
      <thead>
        <tr>
          <th>Quantidade</th>        
          <th>Produto</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(produto, idx) in produtos">
          <td v-show="!produto.editing">{{ produto.quantidade }}</td>
          <td v-show="produto.editing">
            <input :ref="'quantidadeProduto_' + idx" v-validate="'required'" v-model="produto.quantidade" class="form-control" type="number" min="0" step="1" name="quantidade" data-vv-name="quantidade" :data-vv-scope="'produto_' + idx" />
          </td>
          <td v-show="!produto.editing">{{ (produto.produtoId || {}).descricao }}</td>
          <td v-show="produto.editing">
            <autocomplete :ref="'produtoId_' + idx" v-validate="'required'" v-model="produto.produtoId" name="produtoId" data-vv-name="produtoId" api="/produto" :payload="{ sort: { descricao: 1}, ativo: true }" :data-vv-scope="'produto_' + idx" optionText="descricao"></autocomplete>             
          </td>          
          <td>
            <div class="btn-group">
              <button v-if="produto.editing" type="button" @click="salvarItemLista(idx, 'produtos')" class="btn btn-success" title="Salvar"><i class="fa fa-save"></i></button>            
              <button v-if="!produto.editing" type="button" @click="editarItemLista(idx, 'produtos', 'quantidadeProduto_')" class="btn btn-info" title="Editar"><i class="fa fa-edit"></i></button>
              <button type="button" @click="excluirItemLista(idx, 'produtos')" class="btn btn-danger" title="Excluir"><i class="fa fa-trash"></i></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="box-header with-border"><h5>Serviços</h5></div>
    <button style="margin-bottom: 10px" type="button" @click="adicionarItemLista('servicos', 'quantidadeServico_')" class="btn btn-success btn-block">Adicionar</button>
    <lte-ui-alert type="info" message="Nenhum serviço adicionado" v-show="servicos.length === 0"></lte-ui-alert>
    <table class="table table-bordered table-hover dataTable" v-if="servicos && servicos.length > 0">
      <thead>
        <tr>
          <th>Quantidade</th>        
          <th>Serviço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(servico, idx) in servicos">
          <td v-show="!servico.editing">{{ servico.quantidade }}</td>
          <td v-show="servico.editing">
            <input :ref="'quantidadeServico_' + idx" v-validate="'required'" v-model="servico.quantidade" class="form-control" type="number" min="0" step="1" name="quantidade" data-vv-name="quantidade" :data-vv-scope="'servicos_' + idx" />
          </td>
          <td v-show="!servico.editing">{{ (servico.servicoId || {}).descricao }}</td>
          <td v-show="servico.editing">
            <autocomplete :ref="'servicoId_' + idx" v-validate="'required'" v-model="servico.servicoId" name="servicoId" data-vv-name="servicoId" api="/servico" :payload="{ sort: { descricao: 1}, ativo: true }" :data-vv-scope="'servicos_' + idx" optionText="descricao"></autocomplete>             
          </td>          
          <td>
            <div class="btn-group">
              <button v-if="servico.editing" type="button" @click="salvarItemLista(idx, 'servicos')" class="btn btn-success" title="Salvar"><i class="fa fa-save"></i></button>            
              <button v-if="!servico.editing" type="button" @click="editarItemLista(idx, 'servicos', 'quantidadeServico_')" class="btn btn-info" title="Editar"><i class="fa fa-edit"></i></button>
              <button type="button" @click="excluirItemLista(idx, 'servicos')" class="btn btn-danger" title="Excluir"><i class="fa fa-trash"></i></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>    
  </form-page>
</template>
<script>
import api from './../../services/api.js'

export default {
  name: 'PacoteForm',
  data: () => {
    return {
      model: { preco: '', produtos: [], servicos: [] },
      loading: false,
      produtoAdd: {},
      produtos: [],
      servicos: [],
      showValidationProduto: false
    }
  },
  methods: {
    save () {

    },
    focusListObject (idx, listName, focusName) {
      if (focusName && listName && idx > -1) {
        let $vm = this
        this.$nextTick(() => {
          $vm.$refs[focusName + ($vm[listName].length - 1)][0].focus()
        })
      }
    },
    editarItemLista (idx, listName, focusName) {
      this[listName][idx].editing = true
      this.focusListObject(idx, listName, focusName)
    },
    salvarItemLista (idx, listName) {
      this[listName][idx].editing = false
    },
    excluirItemLista (idx, listName) {
      this[listName].splice(idx, 1)
    },
    adicionarItemLista (listName, focusName) {
      this[listName].push({
        editing: true
      })
      this.focusListObject(this[listName].length - 1, listName, focusName)
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params && to.params.id) {
      api.getById(to.matched[0].props.default.configuration.apiUrl, to.params.id).then((result) => {
        next($vm2 => {
          $vm2.model = result.data
        })
      }).catch(() => next())
    } else {
      next()
    }
  }
}
</script>
<style>
.form-multi {
  margin-top: 10px
}
</style>
