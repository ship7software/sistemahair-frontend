<template>
  <lte-content-page>
    <h1>Hello</h1>
    <autocomplete api="/cliente" :payload="{ sort: { nome: 1} }" optionText="nome"></autocomplete>
  </lte-content-page>
</template>
<script>
export default {
  name: 'Inicio'
}
</script>
<style scoped>
  td {
    vertical-align: middle !important
  }
</style>
