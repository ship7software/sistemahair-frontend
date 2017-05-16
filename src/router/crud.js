import Search from './../components/crud/Search.vue'
import Crud from './../components/crud/Crud.vue'
import _ from 'lodash'
import produto from './crud/produto'
import servico from './crud/servico'
import formaPagamento from './crud/formaPagamento'
import pessoa from './crud/pessoa'
import conta from './crud/conta'
import categoria from './crud/categoria'
import Vue from 'vue'

let configs = [
  produto,
  servico,
  formaPagamento,
  conta,
  categoria,
  pessoa('/cliente', 'Clientes'),
  pessoa('/fornecedor', 'Fornecedores'),
  pessoa('/profissional', 'Profissionais', { title: 'Comissão', model: 'comissao', type: 'money', min: 0 })
]

let cruds = {}
let crudRoutes = []

_.each(configs, (item) => {
  if (item.search) {
    crudRoutes.push({
      path: item.route,
      component: Search,
      props: {
        configuration: item
      }
    })
  }
  if (item.form) {
    cruds[item.route.replace('/', '')] = item
    crudRoutes.push({
      path: item.route + '/add',
      component: Crud,
      props: {
        configuration: item
      }
    })
    crudRoutes.push({
      path: item.route + '/:id',
      component: Crud,
      props: {
        configuration: item
      }
    })
  }
})

Vue.prototype.$cruds = cruds
export default crudRoutes
