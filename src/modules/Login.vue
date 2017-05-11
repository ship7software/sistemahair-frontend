<template>
  <div class="login-box">
    <div class="login-logo">
      <img src="/static/img/logo_lottusflower.png" alt="" style="width: 100px" /><br/>Sistema <b>HAIR</b>
    </div>
    <div class="login-box-body">
      <p class="login-box-msg">Por favor, entre com suas credenciais</p>
      <lte-ui-alert title="Ops!" type="danger" icon="ban" :message="erroLogin" v-show="erroLogin"></lte-ui-alert>
      <form @submit.prevent>
        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="Usuário" v-model="usuario.login" required/>
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Senha" v-model="usuario.password" required/>
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-12"> 
            <button type="submit" class="btn btn-primary btn-block btn-flat" @click="fazerLogin">Entrar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import userService from './../services/user.js'

export default {
  name: 'Login',
  data () {
    return {
      usuario: {},
      erroLogin: null
    }
  },
  methods: {
    fazerLogin () {
      this.erroLogin = null
      userService.auth(this.usuario, (err, result) => {
        if (err) {
          this.erroLogin = 'Usuário e/ou senha inválidos!'
        } else {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style scoped>
  @media (max-width: 767px) {  
    .login-page {
      display: table;
      position: absolute;
      height: 100% !important;
      width: 100%;  
    }

    .login-box {
      display: table;
      vertical-align: middle    
    }

    .login-box-body {
      background-color: transparent
    }
  }

  @media (max-width: 767px) {

    .form-control, .btn {
      padding: 12px 12px !important;
    }

    .form-control-feedback {
      height: 46px;
      line-height: 46px;
      width: 46px
    }

    .form-control {
      height: 46px
    }
  }
</style>
