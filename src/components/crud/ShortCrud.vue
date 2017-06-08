<template>
  <div class="modal overlay-wrapper" :class="{ 'modalActive': show }">
    <div v-show="loading" class="overlay">
      <i class="fa fa-refresh fa-spin"></i>
    </div>  
    <div class="modal-dialog">
      <div class="modal-content">
        <form class="form-horizontal" @submit.prevent.default>
          <div class="modal-header">
            <h4 class="modal-title">{{ configuration.form.title }}</h4>
            <div class="pull-right">
              <button type="submit" class="btn btn-success" @click="onSave">Gravar</button>
              <button type="button" class="btn btn-default" @click="onReturn">Voltar</button>
            </div>          
          </div>
          <div class="modal-body">
            <auto-form ref="autoForm" :configuration="configuration" v-model="model" @onSaved="savedItem"  @onLoading="changeLoading" :short="true"></auto-form>          
          </div>
        </form>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>
<script>
export default {
  name: 'ShortCrud',
  props: {
    configuration: Object,
    value: [Object, Array]
  },
  data () {
    return {
      model: {},
      options: {},
      saveError: null,
      loading: false,
      show: false
    }
  },
  created () {
    for (var i = 0; i < this.configuration.form.fields.length; i++) {
      if (this.configuration.form.fields[i].type === 'money' && !this.model[this.configuration.form.fields[i].model]) {
        this.model[this.configuration.form.fields[i].model] = ''
      }
    }
  },
  methods: {
    open () {
      this.show = true
    },
    close () {
      this.show = false
    },
    onReturn () {
      this.close()
    },
    changeLoading (value) {
      this.loading = value
    },
    savedItem (item) {
      let $vm = this
      $vm.$emit('input', item)
      $vm.$emit('change', item)
      $vm.$emit('onSave', item)
      $vm.onReturn()
    },
    onSave () {
      this.$refs.autoForm.onSave()
    }
  }
}
</script>
<style>
.modalActive {
  display: block
}

.modal-title {
  float:left;
  margin-top: 4px
}
</style>
