<template>
<div class="modal" :class="{ 'modal-show': visible }">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="hide">
          <span aria-hidden="true">×</span></button>
        <h4 class="modal-title">{{ title }}</h4>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" @click="hide">Fechar</button>
        <slot name="footer"></slot>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    dismissable: Boolean,
    title: String
  },
  data: () => {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    }
  }
}
</script>
<style>
.modal-show {
  display: block
}
.modal-footer {
  border: 0
}
.modal-body {
  
}
</style>
