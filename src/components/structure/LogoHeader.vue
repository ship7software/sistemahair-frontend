<template>
  <router-link to="/" class="logo">
    <span class="logo-mini">
      <img :src="image" alt="logo" height="35px">
    </span>
    <span class="logo-lg">
      <img :src="image" alt="logo" height="35px">
      <span v-html="name"></span>
    </span>
  </router-link>
</template>
<script>
export default {
  name: 'LogoHeader',
  props: {
    image: String,
    name: String
  }
}
</script>
<style scoped>
img {
  margin-top: -10px;
}

.logo-lg img {
  margin-right: 15px
}
</style>
