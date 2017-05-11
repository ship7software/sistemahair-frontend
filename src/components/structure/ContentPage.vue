<template>
<lte-wrapper :color="config.color">

  <header class="main-header">
    <lte-header-logo :image="config.logo" :name="config.name"></lte-header-logo>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

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
    <strong>Copyright &copy; 2017 <a target="_blank" href="http://ship7.com.br">Ship7 Software LTDA</a>.</strong> Todos os direitos reservados
  </footer>
</lte-wrapper>
</template>
<script>
export default {
  name: 'ContentPage',
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
  }
}
</script>
<style scoped>
  .user-panel .info p {
    margin-top: 10px
  }
</style>
