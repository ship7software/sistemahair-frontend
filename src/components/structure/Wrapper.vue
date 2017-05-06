<template>
  <div :class="['wrapper', 'skin-' + color]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Wrapper',
  props: {
    color: {
      type: String,
      default: 'blue'
    }
  }
}
</script>
