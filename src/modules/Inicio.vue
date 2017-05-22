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
          <select class="form-control">
            <option value="2017-05-21">Hoje: 21/05/2017</option>
          </select>
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
  name: 'Inicio'
}
</script>
<style scoped>
  td {
    vertical-align: middle !important
  }
</style>
