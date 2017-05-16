<template>
  <div>
    <span>{{ item.nome }}</span>
  </div>
</template>

<script>
export default {
  props: { item: { required: true } }
}
</script>
