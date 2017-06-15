<template>
  <transition name="fade">
    <router-view :key="$route.path"></router-view>
  </transition>
</template>

<script>
/* global $ */
export default {
  name: 'app',
  mounted () {
    console.log($.AdminLTE)
    $.AdminLTE.tree('.sidebar')
    $('.sidebar').slimscroll({
      height: '3px',
      alwaysVisible: false,
      size: '200px'
    }).css('width', '100%')
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

.login-page {
  background-color: #ecf0f5 !important;
}

@media (max-width: 767px) {
  .sidebar-open .wrapper .main-sidebar {
    z-index: 830;
    width: 100%
  }

  .no-padding-if-mobile {
    padding: 0
  }
}
</style>
