<template>
  <lte-content-page :loading="loading">
    <section class="content no-padding-if-mobile">
      <!-- Default box -->
      <div class="box agenda-box">
        <div class="box-header with-border">
          
          <el-date-picker class="dataAgendaPrincipal"
            v-model="dataAgenda"
            type="date"
            :picker-options="dataAgendaOptions"
            :clearable="false"
            :editable="false"
            format="'Agenda: 'dd/MM/yyyy" @change="load">
          </el-date-picker>
          <div class="box-tools pull-right">
            <button @click="add" type="submit" class="btn add-button btn-block btn-success btn-flat">
              <i class="fa fa-plus"></i>
                Novo
            </button>    
          </div>            
        </div>      
        <div class="box-body">
          <schedule class="principalSchedule" :startTime="startTime" :endTime="endTime" :step="step" :items="agendamentos" @onSelect="edit"></schedule>
          <schedule class="mobileSchedule" :startTime="startTime" :endTime="endTime" :step="step" :items="agendamentos" @onSelect="edit" :short="true" ref="shortSchedule"></schedule>
        </div>       
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
    <agenda-modal-add :startTime="startTime" :endTime="endTime" :dataAgendamento="dataAgenda" :title="addTitle" ref="addModal" @saved="load"></agenda-modal-add>
  </lte-content-page>
</template>
<script>
import agendaConfig from '../router/crud/agenda.js'
import moment from 'moment'

export default {
  name: 'Agenda',
  data: () => {
    return {
      addTitle: 'Nova Agenda',
      novaAgenda: {},
      loading: false,
      configuration: agendaConfig,
      dataAgenda: new Date(),
      profissionalSelecionado: null,
      startTime: '09:00',
      endTime: '19:00',
      step: 30,
      agendamentos: [],
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
      }
    }
  },
  mounted () {
    this.load()
  },
  watch: {
    novaAgenda: function (novoValor) {
    }
  },
  methods: {
    add () {
      this.addTitle = 'Nova Agenda'
      let prof = null
      if (this.$refs.shortSchedule.$el.clientHeight > 0) {
        prof = this.$refs.shortSchedule.getSelectedProfissional()
      }
      this.$refs.addModal.show(prof)
    },
    edit (item) {
      this.addTitle = 'Editar Agenda'
      this.$refs.addModal.edit(item)
    },
    load () {
      let dataFormatada = moment(this.dataAgenda).format('YYYY-MM-DD')
      let $vm = this
      $vm.loading = true
      this.$api.getById('/agendamento/montar', dataFormatada).then((ret) => {
        $vm.agendamentos = ret.data
        $vm.loading = false
      }).catch((err) => { console.log(err); $vm.loading = false })
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
<style>
.dataAgendaPrincipal.el-input {
  width: 100%
}
.dataAgendaPrincipal.el-input i {
  left: 0;
  font-size: 18px
}
.dataAgendaPrincipal.el-input input {
  /*width: 100%*/
  padding-left: 35px;
  border: none;
  font-size: 18px;
  font-weight: 500;
  height: inherit;
  background: none
}
.mobileSchedule {
  display: none
}
@media(max-width: 500px) {
  .agenda-box .box-header {
    background-color: white;
    position: fixed;
    top: 51px;
    width: 100%;
    z-index: 100;
  }

  .agenda-box .box-body {
    padding-top: 55px
  }
  .mobileSchedule {
    display: block
  }
  .principalSchedule {
    display: none
  }
}
</style>
