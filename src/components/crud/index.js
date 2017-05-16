import Vue from 'vue'

import Search from './Search.vue'
import Crud from './Crud.vue'
import ShortCrud from './ShortCrud.vue'
import AutoForm from './AutoForm.vue'

Vue.component('search-form', Search)
Vue.component('crud-form', Crud)
Vue.component('short-crud', ShortCrud)
Vue.component('auto-form', AutoForm)
