<template>
  <lte-content-page :loading="loading">
    <section class="content-header" v-if="false">
      <h1>
        {{ title }}
      </h1>
      <lte-breadcrumb :items="breadcrumbs"></lte-breadcrumb>
    </section>
    <section class="content">
      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">{{ title }}</h3> 
        </div>      
        <form class="form-horizontal" @submit.prevent.default>
          <div class="box-body">
            <slot></slot>
          </div>
          <div class="box-footer">
            <div class="pull-right">
              <button type="submit" class="btn btn-success" @click="onSave">Gravar</button>
              <button type="button" class="btn btn-default" @click="onReturn">Voltar</button>
            </div>
          </div>          
        </form>
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
  </lte-content-page>
</template>
<script>
export default {
  name: 'FormPage',
  props: {
    returnRoute: String,
    title: String,
    breadcrumbs: Array,
    loading: Boolean
  },
  methods: {
    onSave () {
      this.$emit('onSave')
    },
    onReturn () {
      this.$router.push(this.returnRoute)
    }
  }
}
</script>
