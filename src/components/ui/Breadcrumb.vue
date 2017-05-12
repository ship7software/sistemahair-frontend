<template>
  <ol class="breadcrumb">
    <li v-for="item in items">
      <a v-if="typeof(item) == 'object'" :href="item.link || '#'">
        <i v-if="item.icon" :class="['fa', 'fa-' + item.icon]"></i>{{ item.text }}
      </a>
      <a v-else href="#">
        {{ item }}
      </a>      
    </li>
  </ol>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    items: Array
  }
}
</script>
<style scoped>
  
</style>
