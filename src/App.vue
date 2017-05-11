<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.login-page {
  background-color: #ecf0f5 !important;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

@media (max-width: 767px) {
  .sidebar-open .wrapper .main-sidebar {
    z-index: 830;
    width: 100%
  }
}
</style>
