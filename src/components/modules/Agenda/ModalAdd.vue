<template>
  <modal ref="modal" :title="title" :showCloseFooter="false" @hide="reset"> 
    <div class="form-group" :class="{ 'has-error': errors.has('principal.data') }">
      <label class="col-sm-3 control-label">Data</label>
      <div class="col-sm-9">
        <el-date-picker ref="dataAgendamento" v-validate="'required'" v-model="model.data" :disabled="true" 
          type="date" name="data" data-vv-scope="principal" data-vv-name="data" format="dd/MM/yyyy">
        </el-date-picker>        
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('principal.clienteId') }">
      <label class="col-sm-3 control-label">Cliente</label>
      <div class="col-sm-9">
        <autocomplete ref="clienteId" v-validate="'required'" v-model="model.clienteId" name="clienteId" data-vv-scope="principal" data-vv-name="clienteId" api="/cliente" :payload="{ sort: { nome: 1 } }" optionValue="_id" optionText="nome" key="clienteId" :disabled="Boolean(model._id)"></autocomplete>
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('principal.servicoId') }">
      <label class="col-sm-3 control-label">Serviço</label>
      <div class="col-sm-9">
        <ui-select-api ref="servicoId" v-validate="'required'" v-model="model.servicoId" name="servicoId" data-vv-scope="principal" data-vv-name="servicoId" api="/servico" :payload="{ sort: { descricao: 1 } }" optionValue="_id" optionText="descricao" key="servicoId" @change="recalcularFim"></ui-select-api>
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('principal.profissionalId') }">
      <label class="col-sm-3 control-label">Profissional</label>
      <div class="col-sm-9">
        <ui-select-api ref="profissionalId" v-validate="'required'" v-model="model.profissionalId" name="profissionalId" data-vv-scope="principal" data-vv-name="profissionalId" api="/profissional" :payload="{ sort: { nome: 1 } }" optionValue="_id" optionText="nome" key="profissionalId"></ui-select-api>
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('principal.horaInicio') || errors.has('principal.horaFim') }">
      <label class="col-sm-3 col-xs-12 control-label">Hora Início/Fim</label>
      <div class="col-sm-9">
        <el-time-select class="inputHora"
          v-model="model.horaInicio" :editable="false"
          :picker-options="{
            start: startTime,
            step: '00:15',
            end: endTime
          }" name="horaInicio" data-vv-scope="principal" data-vv-name="horaInicio"
          placeholder="Inicio" @change="recalcularFim">
        </el-time-select> 
        <el-time-select class="inputHora"
          v-model="model.horaFim" :editable="false"
          :picker-options="{
            start: startTime,
            step: '00:15',
            end: endTime
          }" name="horaFim" data-vv-scope="principal" data-vv-name="horaFim"
          placeholder="Fim">
        </el-time-select>        
      </div>
    </div>
    <template slot="footer">
      <button type="button" class="btn btn-success pull-left" @click="save(false)">Salvar</button>
      <button type="button" class="btn btn-success pull-left" v-if="!model._id" @click="save(true)">Salvar e Adicionar Serviço</button>
      <button type="button" class="btn btn-danger pull-left" v-if="model._id" @click="cancel(model)">Cancelar Agendamento</button>
    </template>
  </modal>
</template>
<script>
import _ from 'lodash'
import time from '../../../util/time.js'

export default {
  name: 'AgendaModalAdd',
  props: {
    dataAgendamento: Date,
    title: String,
    startTime: String,
    endTime: String
  },
  data: () => {
    return {
      model: {
        data: this.dataAgendamento,
        horaInicio: '',
        horaFim: ''
      }
    }
  },
  created () {
    this.model.data = this.dataAgendamento
  },
  methods: {
    show () {
      this.$refs.modal.show()
    },
    edit (item) {
      this.model = _.clone(item)
      this.show()
    },
    recalcularFim () {
      if (this.model.servicoId && this.model.servicoId.duracaoPadrao && this.model.horaInicio !== '') {
        this.model.horaFim = time.addMinutes(this.model.horaInicio, this.model.servicoId.duracaoPadrao)
        this.$forceUpdate()
      }
    },
    doCancel (id) {
      let $vm = this
      this.$api.save('/agendamento', {_id: id, ativo: false}).then((ret) => {
        $vm.resetAndClose()
      }).catch(err => {
        console.log(err)
      })
    },
    cancel (item) {
      let $vm = this
      this.$showMessage({
        title: 'Você tem certeza?',
        text: 'Você está cancelando o agendamento de ' + item.clienteId.nome + ' às ' + item.horaInicio + '. Essa ação é irreversível!',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim, cancelar!'
      }).then(function () {
        $vm.doCancel(item._id)
      })
    },
    reset () {
      this.model = {
        data: this.dataAgendamento,
        horaInicio: '',
        horaFim: ''
      }
    },
    resetAndClose () {
      this.reset()
      this.$emit('saved')

      this.$refs.modal.hide()
    },
    save (continuar) {
      let $vm = this
      this.$validator.validateAll().then((ret) => {
        $vm.$api.save('/agendamento', $vm.model).then((ret) => {
          if (continuar) {
            $vm.model.horaInicio = String($vm.model.horaFim)
            $vm.model.horaFim = ''
            $vm.model.servicoId = null
            $vm.model.profissionalId = null
          } else {
            $vm.resetAndClose()
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style>
.inputHora {
  width: 120px !important
}
</style>
