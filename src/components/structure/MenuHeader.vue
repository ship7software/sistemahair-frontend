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
          <span class="hidden-xs">{{ user.name }}<template v-if="user.tenantName"> - {{ user.tenantName }}</template></span>
        </a>
        <ul class="dropdown-menu">
          <!-- User image -->
          <li class="user-header">
            <img src="/static/img/user2-160x160.jpg" class="img-circle" alt="User Image">

            <p>
              <b>{{ user.name }}</b>
              <small v-if="user.tenantName">{{ user.tenantName }}</small>
            </p>
          </li>
          <!-- Menu Footer-->
          <li class="user-footer">
            <div class="pull-left">
              <router-link :to="user.perfilLink" class="btn btn-default btn-flat">Perfil</router-link>
              <router-link :to="user.tenantLink" class="btn btn-default btn-flat">Dados da Empresa</router-link>
            </div>
            <div class="pull-right">
              <a @click="doLogout" class="btn btn-default btn-flat">Sair</a>
            </div>
          </li>
        </ul>
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
  },
  methods: {
    doLogout () {
      this.$user.logout(() => {
        this.$router.push('/login')
      })
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
