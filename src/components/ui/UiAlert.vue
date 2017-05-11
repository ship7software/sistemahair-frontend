<template>
  <div :class="['alert', 'alert-' + type, { 'alert-dismissible': dismissible }]">
    <button v-if="dismissible" type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <h4 v-if="title"><i v-if="icon" class="icon fa " :class="'fa-' + icon"></i> {{ title }}</h4>
    {{ message }}
  </div> 
</template>
<script>
export default {
  name: 'UiAlert',
  props: {
    title: String,
    message: String,
    dismissible: Boolean,
    icon: { type: String, default: 'info' },
    type: { type: String, default: 'info' }
  }
}
</script>
