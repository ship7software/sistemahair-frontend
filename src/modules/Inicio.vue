<template>
  <lte-content-page>
    <section class="content-header">
      <h1>
        Início
        <small>Painel de Controle</small>
      </h1>
    </section> 
    <section class="content">
      <div class="row" style="padding-bottom: 15px">
        <div class="col-sm-6 col-md-4 col-lg-4 col-xs-12">
          <el-date-picker class="dataAgendaPrincipal"
            v-model="dataAgenda"
            type="date"
            :picker-options="dataAgendaOptions"
            :clearable="false"
            :editable="false"
            format="'Resumo do dia: 'dd/MM/yyyy">
          </el-date-picker>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-4 col-xs-12">
            <div class="small-box bg-aqua">
              <div class="inner">
                <h3>15</h3>

                <p>Agendamentos</p>
              </div>
              <div class="icon">
                <i class="fa fa-calendar"></i>
              </div>
              <a href="#" class="small-box-footer">
                Ir para a Agenda <i class="fa fa-arrow-circle-right"></i>
              </a>
            </div>      
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 col-xs-12">
            <div class="small-box bg-green">
              <div class="inner">
                <h3>R$ 100,00</h3>

                <p>Caixa</p>
              </div>
              <div class="icon">
                <i class="fa fa-dollar"></i>
              </div>
              <a href="#" class="small-box-footer">
                Ir para o Financeiro <i class="fa fa-arrow-circle-right"></i>
              </a>
            </div>      
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 col-xs-12">
            <div class="small-box bg-yellow">
              <div class="inner">
                <h3>6</h3>

                <p>Comandas Ativas</p>
              </div>
              <div class="icon">
                <i class="fa fa-list"></i>
              </div>
              <a href="#" class="small-box-footer">
                Ir para o Financeiro <i class="fa fa-arrow-circle-right"></i>
              </a>
            </div>      
        </div>                  
      </div>
    </section>
  </lte-content-page>
</template>
<script>
export default {
  name: 'Inicio',
  data: () => {
    return {
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
      }
    }
  }
}
</script>
<style scoped>
  td {
    vertical-align: middle !important
  }
.dataAgendaPrincipal.el-input {
  width: 100%
}
.linhaDataAgenda {
  margin: 15px
}
@media (min-width: 768px) {
  .linhaDataAgenda {
    margin-bottom: 0px
  }
}
</style>
