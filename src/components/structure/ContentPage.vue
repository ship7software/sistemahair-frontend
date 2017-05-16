<template>
<lte-wrapper :color="config.color">
  <div v-show="loading" class="overlay">
    <i class="fa fa-refresh fa-spin"></i>
  </div>
  <header class="main-header">
    <lte-header-logo class="logo-main" :image="config.logo" :name="config.name"></lte-header-logo>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <lte-header-logo class="logo-nav" :image="config.logo" :name="config.name"></lte-header-logo>
      <lte-header-menu :totalNewMessages="4" :user="user"></lte-header-menu>
    </nav>
  </header>

  <!-- =============================================== -->

  <!-- Left side column. contains the sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="/static/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <small>{{ user.tenantName }}</small>
          <p>{{ user.name }}</p>
        </div>
        <div class="btn-group pull-right" style="margin-top: 10px">
          <button @click="$router.push(user.perfilLink)" type="button" class="btn btn-success" title="Desativar"><i class="fa fa-user"></i>  Perfil</button>    
          <button @click="$router.push(user.tenantLink)" type="button" class="btn btn-info" title="Desativar"><i class="fa fa-building"></i>  Dados da Empresa</button>  
          <button @click="doLogout" type="button" class="btn btn-danger" title="Desativar"><i class="fa fa-power-off"></i>  Sair</button>                                            
        </div>        
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Buscar...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <lte-main-menu :items="config.menus"></lte-main-menu>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <slot></slot>
  </div>


    <!-- /.content -->
  <!-- /.content-wrapper -->

  <footer v-if="false" class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Versão</b> 0.0.0
    </div>
    Feito com <i class="fa fa-heart"></i> por <strong><a target="_blank" href="http://ship7.com.br">Ship7 Software LTDA</a></strong>
  </footer>
</lte-wrapper>
</template>
<script>
export default {
  name: 'ContentPage',
  props: {
    loading: Boolean
  },
  data: function () {
    return {
      config: this.$siteConfig,
      user: {
        name: '',
        tenantName: '',
        perfilLink: this.$user.fields.perfilLink,
        tenantLink: this.$user.fields.tenantLink,
        logout: this.$user.logout
      }
    }
  },
  created () {
    let perfil = this.$user.perfil()
    this.user.name = perfil[this.$user.fields.name]
    this.user.tenantName = perfil[this.$user.fields.tenant][this.$user.fields.tenantName]
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
<style> 
  .user-panel .info p {
    margin-top: 10px
  }

  .navbar-nav > .user-menu .user-image {
    height: 40px !important;
    width: 40px !important;
  }
  .navbar-nav > .user-menu a {
    padding: 15px 15px 15px 5px !important
  }  

  @media (max-width: 767px) {
    .logo-main {
      display: none !important
    }    

    .navbar-nav > .user-menu a {
      padding: 12px 5px 5px 5px !important
    }    

    .fixed .content-wrapper, .fixed .right-side, .main-sidebar, .left-side {
        padding-top: 50px;
    }

    section.content {
      padding: 0
    }

    section.content .box {
      box-shadow: none
    }

    .content-wrapper, .right-side {
      background-color: white !important
    }

    .sidebar {
      border-top: 3px solid #d2d6de;
    }
  }
  @media (min-width: 768px) {
    .logo-nav {
      display: none !important
    }
    .navbar-nav > .user-menu .user-image {
      margin-top: -10px
    }
  }

  .logo-nav {
    width: auto !important;
    float: left !important
  }



  @media(min-width: 331px) {
    .sidebar .user-panel {
      height: auto
    }

    .sidebar .user-panel {
      display: none
    }
  }  

  @media(max-width: 330px) {
    .sidebar .user-panel {
      height: 100px
    }

    .sidebar .user-panel  {
      display: block
    }
  }    

  footer i.fa-heart {
    color: red
  }

  .content-wrapper {
    border-left: 0 !important
  }
</style>
