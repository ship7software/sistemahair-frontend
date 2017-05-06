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

@media (max-width: 767px) {
  body, .form-control, .btn {
    font-size: 16px
  }

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
