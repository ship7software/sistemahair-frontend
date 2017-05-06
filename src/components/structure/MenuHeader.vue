<template>
  <div class="navbar-custom-menu">
    <ul class="nav navbar-nav">
      <li class="dropdown messages-menu">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <i class="fa fa-envelope-o"></i>
          <span class="label label-success" v-if="totalNewMessages && totalNewMessages > 0">{{ totalNewMessages }}</span>
        </a>
        <ul class="dropdown-menu">
          <li class="header" v-if="totalNewMessages && totalNewMessages > 0">Você tem {{ totalNewMessages }} novas mensagens</li>
          <li class="header" v-else>Você não tem novas mensagens</li>          
          <li>
            <ul class="menu">
              <li class="mensagemNaoLida">
                <a href="/mensagens/11111">
                  <h4>
                    Support Team
                    <small><i class="fa fa-clock-o"></i> 5 mins</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <!-- end message -->
            </ul>
          </li>
          <li class="footer"><a href="/mensagens">Ver todas as mensagens</a></li>
        </ul>
      </li>
      <!-- User Account: style can be found in dropdown.less -->
      <li class="dropdown user user-menu">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <img src="/static/img/user2-160x160.jpg" class="user-image" alt="User Image">
          <span class="hidden-xs">Natália Guerreiro - Glacielle Garcia</span>
        </a>
        <ul class="dropdown-menu">
          <!-- User image -->
          <li class="user-header">
            <img src="/static/img/user2-160x160.jpg" class="img-circle" alt="User Image">

            <p>
              <b>Glacielle Garcia</b><br/>
              Natália Guerreiro
              <small>Administrativo</small>
            </p>
          </li>
          <!-- Menu Footer-->
          <li class="user-footer">
            <div class="pull-left">
              <a href="#" class="btn btn-default btn-flat">Perfil</a>
              <a href="#" class="btn btn-default btn-flat">Dados da Empresa</a>
            </div>
            <div class="pull-right">
              <a href="#" class="btn btn-default btn-flat">Sair</a>
            </div>
          </li>
        </ul>
      </li>
      <!-- Control Sidebar Toggle Button -->
      <li>
        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'MenuHeader',
  props: {
    messages: {
      type: Array,
      default: function () { return [] }
    },
    totalNewMessages: Number,
    user: {
      type: Object,
      default: function () { return {} }
    }
  }
}
</script>
<style scoped>
  .mensagemNaoLida {
    border-left: #00a65a solid  
  }

  .notificacaoNaoLida {
    border-left: #f39c12 solid  
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header {
    height: 195px
  }
</style>
