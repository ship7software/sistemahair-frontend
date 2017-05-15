<template>
  <div class="login-box overlay-wrapper">
    <div class="login-logo">
      <img src="/static/img/logo_lottusflower.png" alt="" style="width: 100px" /><br/>Sistema <b>HAIR</b>
    </div>
    <div v-show="loading" class="overlay">
      <i class="fa fa-refresh fa-spin"></i>
    </div>
    <div class="login-box-body" v-if="!loading">
      <template v-if="eLogin">
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
      </template>
      <template v-if="eConfirmacao">
        <p class="login-box-msg">Olá, {{ usuario.nome }}</p>
        <lte-ui-alert title="Ops!" type="danger" icon="ban" message="Infelizmente não conseguimos confirmar o seu email. Mas você pode solicitar um novo link!" v-show="erroConfirmacao"></lte-ui-alert>
        <lte-ui-alert title="Pronto" type="success" icon="envelope" message="Caso você esteja cadastrado em breve você irá receber o nosso email!" v-show="sucessoConfirmacao"></lte-ui-alert>        
        <form @submit.prevent>
          <div class="form-group has-feedback">
            <input type="text" class="form-control" placeholder="Usuário" v-model="usuario.login" required/>
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="row" v-show="!sucessoConfirmacao">
            <div class="col-xs-12"> 
              <button type="submit" class="btn btn-primary btn-block btn-flat" @click="reenviarConfirmacao">Reenviar email de Confirmação</button>
            </div>
          </div>     
          <div class="row" v-show="sucessoConfirmacao">
            <div class="col-xs-12"> 
              <button type="submit" class="btn btn-primary btn-block btn-flat" @click="reenviarConfirmacao">Reenviar Email</button>
            </div>
          </div>                           
        </form>
      </template>
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
      erroLogin: null,
      eLogin: false,
      eRedefinicao: false,
      eConfirmacao: false,
      erroConfirmacao: false,
      sucessoConfirmacao: false,
      loading: true
    }
  },
  mounted () {
    this.eLogin = this.$router.currentRoute.path === '/login'
    this.eRedefinicao = this.$router.currentRoute.path === '/redefinicao'
    this.eConfirmacao = this.$router.currentRoute.path === '/confirmacao'

    if (this.eConfirmacao) {
      this.confirmarEmail(this.$router.currentRoute.query.token)
    } else {
      this.loading = false
    }
  },
  methods: {
    fazerLogin () {
      let $vm = this
      $vm.loading = true
      this.erroLogin = null
      userService.auth(this.usuario, (err, result) => {
        $vm.loading = false
        if (err) {
          if (err.data.errorCode === 'INVALID_USER') {
            this.erroLogin = 'Usuário e/ou senha inválidos!'
          } else if (err.data.errorCode === 'NOT_CONFIRMED') {
            this.eLogin = false
            this.eConfirmacao = true
            this.erroConfirmacao = true
          }
        } else {
          let to = '/'

          if (this.$router.currentRoute.query && this.$router.currentRoute.query.to) {
            to = this.$router.currentRoute.query.to
          }

          this.$router.push(to)
        }
      })
    },

    confirmarEmail (token) {
      let $vm = this
      $vm.sucessoConfirmacao = false
      $vm.erroConfirmacao = false
      this.$api.getAll('/publico/empresa/confirmar?token=' + token).then((result) => {
        $vm.loading = false
        $vm.sucessoConfirmacao = false
        $vm.erroConfirmacao = false
        console.log(result)
        if (result.data && result.data.token) {
          userService.autoLogin(result.data, () => {
            $vm.$router.push('/')
          })
        }
      }).catch(() => {
        $vm.loading = false
        $vm.erroConfirmacao = true
      })
    },

    reenviarConfirmacao () {
      let $vm = this
      $vm.loading = true
      $vm.sucessoConfirmacao = false
      $vm.erroConfirmacao = false
      this.$api.getAll('/publico/empresa/confirmar/reenviar?email' + this.usuario.email).then((result) => {
        $vm.loading = false
        $vm.sucessoConfirmacao = true
      })
    }
  }
}
</script>
