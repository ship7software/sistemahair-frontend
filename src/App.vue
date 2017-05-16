<template>
  <router-view :key="$route.path"></router-view>
</template>

<script>
/* global $ */
export default {
  name: 'app',
  mounted () {
    $('.sidebar').slimscroll({
      height: '3px',
      alwaysVisible: false,
      size: '200px'
    }).css('width', '100%')
  }
}
</script>

<style>
.login-page {
  background-color: #ecf0f5 !important;
}

@media (max-width: 767px) {
  .sidebar-open .wrapper .main-sidebar {
    z-index: 830;
    width: 100%
  }
}
</style>
