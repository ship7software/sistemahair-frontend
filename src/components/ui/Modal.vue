<template>
<div class="modal" :class="{ 'modal-show': visible }">
  <div class="modal-dialog">
    <form class="form-horizontal" @submit.prevent.default>
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="hide">
          <span aria-hidden="true">×</span></button>
        <h4 class="modal-title">{{ title }}</h4>
      </div>
      <div class="modal-body" style="height: 100%; overflow-y: scroll">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button v-if="showCloseFooter" type="button" class="btn btn-default pull-left" @click="hide">Fechar</button>
        <slot name="footer"></slot>
      </div>
    </div>
    </form>
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
    title: String,
    showCloseFooter: Boolean
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
      this.$emit('hide')
    }
  }
}
</script>
<style>
.modal-show {
  display: block
}
@media (min-width: 768px) {
  .modal-dialog {
      width: 767px;
      margin: 30px auto;
  }
}
</style>
