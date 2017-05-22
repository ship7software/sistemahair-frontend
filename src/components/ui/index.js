import Vue from 'vue'

import UiAlert from './UiAlert.vue'
import ApiTable from './ApiTable.vue'
import Breadcrumb from './Breadcrumb.vue'
import UiPagination from './UiPagination.vue'
import UiEndereco from './UiEndereco.vue'
import UiSelectApi from './UiSelectApi.vue'
import Autocomplete from './Autocomplete.vue'
import Schedule from './Schedule.vue'
import Modal from './Modal.vue'

Vue.component('lte-ui-alert', UiAlert)
Vue.component('lte-ui-pagination', UiPagination)
Vue.component('api-table', ApiTable)
Vue.component('lte-breadcrumb', Breadcrumb)
Vue.component('endereco', UiEndereco)
Vue.component('ui-select-api', UiSelectApi)
Vue.component('autocomplete', Autocomplete)
Vue.component('schedule', Schedule)
Vue.component('modal', Modal)
